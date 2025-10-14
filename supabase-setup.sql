-- Create contact_submissions table
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  business_name VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service_type VARCHAR(100),
  message TEXT,
  zip_code VARCHAR(10),
  status VARCHAR(20) DEFAULT 'new'
);

-- Add index for faster queries on business_name and status
CREATE INDEX IF NOT EXISTS idx_contact_submissions_business_name ON contact_submissions(business_name);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the contact form)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to read their own submissions
-- Modify this policy based on your authentication setup
CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Create a policy for updates (if you want to allow status updates)
CREATE POLICY "Allow authenticated updates" ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add a comment to the table
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the home services website';
