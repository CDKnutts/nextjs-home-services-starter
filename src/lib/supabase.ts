import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for contact form submissions
export type ContactSubmission = {
  business_name: string;
  name: string;
  email: string;
  phone: string;
  service_type?: string;
  message?: string;
  zip_code?: string;
  status?: string;
  source?: string;        // Lead source identifier (website_form, chatbot, etc.)
  client_id?: string;     // UUID linking to clients table
};
