import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import type { ContactSubmission } from '@/lib/supabase';

// Initialize Resend (will be undefined if API key not set)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Create server-side Supabase client for API routes
// Use service role key for server-side operations (bypasses RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body: ContactSubmission = await request.json();

    // Validate required fields
    if (!body.business_name || !body.name || !body.email || !body.phone || !body.zip_code) {
      console.error('[API] Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a server-side Supabase client with service role key
    // Service role bypasses RLS, which is appropriate for server-side API routes
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          business_name: body.business_name,
          name: body.name,
          email: body.email,
          phone: body.phone,
          service_type: body.service_type || null,
          message: body.message || null,
          zip_code: body.zip_code,
          status: 'new',
          source: 'website_form',  // Lead source identifier
        },
      ])
      .select();

    if (error) {
      console.error('[API] Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit form', details: error.message },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking, errors are logged but don't fail the request)
    if (resend && process.env.NOTIFICATION_EMAIL) {
      sendEmailNotification(body).catch((emailError) => {
        console.error('[API] Email notification failed (non-critical):', emailError);
      });
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Send email notification for new contact submission
 * Errors are caught and logged but don't affect the main request
 */
async function sendEmailNotification(submission: ContactSubmission): Promise<void> {
  if (!resend || !process.env.NOTIFICATION_EMAIL) {
    return;
  }

  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 6px;
              border-left: 4px solid #0066CC;
            }
            .field-label {
              font-weight: bold;
              color: #0066CC;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .field-value {
              font-size: 16px;
              color: #333;
            }
            .message-field {
              white-space: pre-wrap;
              word-break: break-word;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
            .business-badge {
              display: inline-block;
              background: #FF6B35;
              color: white;
              padding: 4px 12px;
              border-radius: 4px;
              font-size: 14px;
              font-weight: bold;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔔 New Lead Received</h1>
            <div class="business-badge">${submission.business_name}</div>
          </div>

          <div class="content">
            <div class="field">
              <div class="field-label">Customer Name</div>
              <div class="field-value">${submission.name}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">
                <a href="mailto:${submission.email}" style="color: #0066CC; text-decoration: none;">
                  ${submission.email}
                </a>
              </div>
            </div>

            <div class="field">
              <div class="field-label">Phone</div>
              <div class="field-value">
                <a href="tel:${submission.phone}" style="color: #0066CC; text-decoration: none;">
                  ${submission.phone}
                </a>
              </div>
            </div>

            ${submission.service_type ? `
              <div class="field">
                <div class="field-label">Service Type</div>
                <div class="field-value">${submission.service_type}</div>
              </div>
            ` : ''}

            ${submission.zip_code ? `
              <div class="field">
                <div class="field-label">Zip Code</div>
                <div class="field-value">${submission.zip_code}</div>
              </div>
            ` : ''}

            ${submission.message ? `
              <div class="field">
                <div class="field-label">Message</div>
                <div class="field-value message-field">${submission.message}</div>
              </div>
            ` : ''}

            <div class="footer">
              <p>This lead was submitted via ${submission.business_name}'s website contact form.</p>
              <p>Received: ${new Date().toLocaleString('en-US', {
                timeZone: 'America/New_York',
                dateStyle: 'full',
                timeStyle: 'short'
              })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: 'leads@reppreps.com',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Lead: ${submission.business_name}`,
      html: htmlContent,
    });
  } catch (error) {
    console.error('[EMAIL] Error in sendEmailNotification:', error);
    // Re-throw to be caught by the caller's catch block
    throw error;
  }
}
