-- ========================================
-- REPREPS CHATBOT DATABASE MIGRATION (CORRECTED)
-- Version: 1.0
-- Date: 2025-10-16
-- ========================================

-- Step 1: Create clients table (master hub for all businesses)
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  business_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255),
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(20),
  industry VARCHAR(100),
  website_url VARCHAR(255),
  stripe_customer_id VARCHAR(255) UNIQUE,
  is_active BOOLEAN DEFAULT true,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE  -- NEW: Link to Supabase Auth
);

CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(contact_email);
CREATE INDEX IF NOT EXISTS idx_clients_stripe ON clients(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_clients_user ON clients(user_id);  -- NEW

COMMENT ON TABLE clients IS 'Master hub for all business clients (website + chatbot customers)';
COMMENT ON COLUMN clients.user_id IS 'References auth.users for client portal access';

-- Step 2: Create website_configs table
CREATE TABLE IF NOT EXISTS website_configs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  domain VARCHAR(255),
  subdomain VARCHAR(255),
  brand_config JSONB NOT NULL,
  template_version VARCHAR(20) DEFAULT '1.0',
  tier VARCHAR(20) NOT NULL CHECK (tier IN ('basic', 'professional', 'enterprise')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'suspended')),
  launched_at TIMESTAMP,
  UNIQUE(client_id)
);

CREATE INDEX IF NOT EXISTS idx_website_configs_client ON website_configs(client_id);
CREATE INDEX IF NOT EXISTS idx_website_configs_domain ON website_configs(domain);

COMMENT ON TABLE website_configs IS 'Website template configurations per client';

-- Step 3: Create chatbot_configs table
CREATE TABLE IF NOT EXISTS chatbot_configs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  tier VARCHAR(20) NOT NULL CHECK (tier IN ('starter', 'growth', 'enterprise')),
  brand_color VARCHAR(7) DEFAULT '#0066CC',
  welcome_message TEXT,
  placeholder_text VARCHAR(255) DEFAULT 'Ask us anything...',
  knowledge_base JSONB NOT NULL DEFAULT '{"faqs": [], "business": {}, "context": {}}',
  notification_email VARCHAR(255) NOT NULL,
  notification_sms VARCHAR(20),
  monthly_message_limit INTEGER NOT NULL,
  messages_used_this_month INTEGER DEFAULT 0,
  month_reset_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'suspended')),
  UNIQUE(client_id)
);

CREATE INDEX IF NOT EXISTS idx_chatbot_configs_client ON chatbot_configs(client_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_configs_status ON chatbot_configs(status);

COMMENT ON TABLE chatbot_configs IS 'Chatbot product configurations per client';
COMMENT ON COLUMN chatbot_configs.messages_used_this_month IS 'Tracks usage against monthly_message_limit';

-- Step 4: Create chatbot_conversations table
CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  visitor_id VARCHAR(100) NOT NULL,
  messages JSONB DEFAULT '[]',
  message_count INTEGER DEFAULT 0,
  lead_captured BOOLEAN DEFAULT false,
  lead_data JSONB,
  metadata JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived'))
);

CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_client ON chatbot_conversations(client_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_visitor ON chatbot_conversations(visitor_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_created ON chatbot_conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_lead ON chatbot_conversations(lead_captured) WHERE lead_captured = true;
-- NEW: Composite index for common query pattern
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_client_created ON chatbot_conversations(client_id, created_at DESC);

COMMENT ON TABLE chatbot_conversations IS 'Stores all chatbot conversation threads';
COMMENT ON COLUMN chatbot_conversations.visitor_id IS 'Anonymous visitor identifier (cookie-based)';

-- Step 5: Create chatbot_analytics table
CREATE TABLE IF NOT EXISTS chatbot_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  event_type VARCHAR(50) NOT NULL,
  conversation_id UUID REFERENCES chatbot_conversations(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_client ON chatbot_analytics(client_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_event ON chatbot_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_created ON chatbot_analytics(created_at DESC);
-- NEW: Composite index for reporting queries
CREATE INDEX IF NOT EXISTS idx_chatbot_analytics_client_event ON chatbot_analytics(client_id, event_type, created_at DESC);

COMMENT ON TABLE chatbot_analytics IS 'Event tracking for chatbot interactions';

-- Step 6: Modify existing contact_submissions table
ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'website_form';

ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS client_id UUID;

-- Add foreign key constraint (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_contact_submissions_client'
  ) THEN
    ALTER TABLE contact_submissions
    ADD CONSTRAINT fk_contact_submissions_client
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_contact_submissions_client ON contact_submissions(client_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_source ON contact_submissions(source);
-- NEW: Composite index for common query pattern
CREATE INDEX IF NOT EXISTS idx_contact_submissions_client_created ON contact_submissions(client_id, created_at DESC);

COMMENT ON COLUMN contact_submissions.source IS 'Lead source: website_form, chatbot, or other';
COMMENT ON COLUMN contact_submissions.client_id IS 'Links submission to client (NULL for legacy data)';

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_analytics ENABLE ROW LEVEL SECURITY;

-- Clients table policies
CREATE POLICY "Users can view their own client record" ON clients
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role has full access to clients" ON clients
  USING (auth.jwt()->>'role' = 'service_role');

-- Website configs policies
CREATE POLICY "Users can view their website config" ON website_configs
  FOR SELECT
  USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Service role has full access to website_configs" ON website_configs
  USING (auth.jwt()->>'role' = 'service_role');

-- Chatbot configs policies
CREATE POLICY "Users can view their chatbot config" ON chatbot_configs
  FOR SELECT
  USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their chatbot config" ON chatbot_configs
  FOR UPDATE
  USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Service role has full access to chatbot_configs" ON chatbot_configs
  USING (auth.jwt()->>'role' = 'service_role');

-- Chatbot conversations policies
CREATE POLICY "Anyone can insert conversations" ON chatbot_conversations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their conversations" ON chatbot_conversations
  FOR SELECT
  USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

CREATE POLICY "Service role has full access to chatbot_conversations" ON chatbot_conversations
  USING (auth.jwt()->>'role' = 'service_role');

-- Chatbot analytics policies
CREATE POLICY "Service role has full access to chatbot_analytics" ON chatbot_analytics
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Users can view their analytics" ON chatbot_analytics
  FOR SELECT
  USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

-- Contact submissions RLS (keep existing policies, add client-based)
-- Note: Your existing setup allows public inserts and authenticated reads
-- Adding client-scoped reads for the new multi-product architecture:
CREATE POLICY "Users can view submissions for their client" ON contact_submissions
  FOR SELECT
  USING (client_id IN (SELECT id FROM clients WHERE user_id = auth.uid()));

-- ========================================
-- HELPER VIEWS
-- ========================================

-- Step 7: Create helpful views
CREATE OR REPLACE VIEW client_leads AS
SELECT
  c.id as client_id,
  c.business_name,
  cs.id as lead_id,
  cs.source,
  cs.name,
  cs.email,
  cs.phone,
  cs.message,
  cs.created_at
FROM clients c
LEFT JOIN contact_submissions cs ON c.id = cs.client_id
WHERE cs.id IS NOT NULL  -- NEW: Only show clients with submissions
ORDER BY cs.created_at DESC;

COMMENT ON VIEW client_leads IS 'Unified view of all leads per client';

CREATE OR REPLACE VIEW client_products AS
SELECT
  c.id as client_id,
  c.business_name,
  c.contact_email,
  c.is_active as client_active,
  CASE WHEN wc.id IS NOT NULL THEN true ELSE false END as has_website,
  wc.tier as website_tier,
  wc.status as website_status,
  wc.launched_at as website_launched_at,
  CASE WHEN cc.id IS NOT NULL THEN true ELSE false END as has_chatbot,
  cc.tier as chatbot_tier,
  cc.status as chatbot_status,
  cc.monthly_message_limit,
  cc.messages_used_this_month
FROM clients c
LEFT JOIN website_configs wc ON c.id = wc.client_id
LEFT JOIN chatbot_configs cc ON c.id = cc.client_id
ORDER BY c.business_name;

COMMENT ON VIEW client_products IS 'Product inventory per client';

CREATE OR REPLACE VIEW chatbot_performance AS
SELECT
  c.id as client_id,
  c.business_name,
  cc.tier,
  cc.status,
  COUNT(DISTINCT conv.id) as total_conversations,
  COUNT(DISTINCT conv.id) FILTER (WHERE conv.lead_captured = true) as leads_captured,
  ROUND(
    COUNT(DISTINCT conv.id) FILTER (WHERE conv.lead_captured = true)::NUMERIC /
    NULLIF(COUNT(DISTINCT conv.id), 0) * 100,
    2
  ) as conversion_rate_pct,
  MAX(conv.created_at) as last_conversation_at,
  cc.messages_used_this_month,
  cc.monthly_message_limit,
  ROUND(
    (cc.messages_used_this_month::NUMERIC / NULLIF(cc.monthly_message_limit, 0)) * 100,
    2
  ) as usage_pct
FROM clients c
INNER JOIN chatbot_configs cc ON c.id = cc.client_id
LEFT JOIN chatbot_conversations conv ON c.id = conv.client_id
GROUP BY c.id, c.business_name, cc.tier, cc.status, cc.messages_used_this_month, cc.monthly_message_limit
ORDER BY total_conversations DESC;

COMMENT ON VIEW chatbot_performance IS 'Chatbot performance metrics per client';

-- ========================================
-- HELPER FUNCTIONS
-- ========================================

-- Function to increment chatbot message usage
CREATE OR REPLACE FUNCTION increment_chatbot_usage(p_client_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE chatbot_configs
  SET messages_used_this_month = messages_used_this_month + 1,
      updated_at = NOW()
  WHERE client_id = p_client_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION increment_chatbot_usage IS 'Safely increment message counter for rate limiting';

-- Function to reset monthly usage (call from cron job)
CREATE OR REPLACE FUNCTION reset_monthly_chatbot_usage()
RETURNS void AS $$
BEGIN
  UPDATE chatbot_configs
  SET messages_used_this_month = 0,
      month_reset_date = CURRENT_DATE,
      updated_at = NOW()
  WHERE month_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION reset_monthly_chatbot_usage IS 'Reset message counters monthly (call via cron)';

-- ========================================
-- DATA INTEGRITY TRIGGERS
-- ========================================

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_clients_updated_at') THEN
    CREATE TRIGGER update_clients_updated_at
      BEFORE UPDATE ON clients
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_website_configs_updated_at') THEN
    CREATE TRIGGER update_website_configs_updated_at
      BEFORE UPDATE ON website_configs
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_chatbot_configs_updated_at') THEN
    CREATE TRIGGER update_chatbot_configs_updated_at
      BEFORE UPDATE ON chatbot_configs
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_chatbot_conversations_updated_at') THEN
    CREATE TRIGGER update_chatbot_conversations_updated_at
      BEFORE UPDATE ON chatbot_conversations
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- ========================================
-- MIGRATION COMPLETE
-- ========================================

-- Verification query (run after migration):
/*
SELECT
  'clients' as table_name, COUNT(*) as row_count FROM clients
UNION ALL
SELECT 'website_configs', COUNT(*) FROM website_configs
UNION ALL
SELECT 'chatbot_configs', COUNT(*) FROM chatbot_configs
UNION ALL
SELECT 'chatbot_conversations', COUNT(*) FROM chatbot_conversations
UNION ALL
SELECT 'contact_submissions', COUNT(*) FROM contact_submissions;
*/
