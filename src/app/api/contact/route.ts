import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { ContactSubmission } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body: ContactSubmission = await request.json();

    // Validate required fields
    if (!body.business_name || !body.name || !body.email || !body.phone || !body.zip_code) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
