-- ========================================
-- SECURITY FIXES FOR VIEWS AND FUNCTIONS
-- Version: 1.1
-- Date: 2025-10-16
-- Purpose: Fix Supabase linter errors/warnings
-- ========================================

-- ========================================
-- FIX VIEWS: Add security_invoker = true
-- ========================================
-- This fixes ERROR: "Views are defined as SECURITY DEFINER"
-- Views should execute with the privileges of the calling user, not the creator

-- Drop existing views
DROP VIEW IF EXISTS client_leads;
DROP VIEW IF EXISTS client_products;
DROP VIEW IF EXISTS chatbot_performance;

-- Recreate client_leads view with security_invoker
CREATE VIEW client_leads
WITH (security_invoker = true)
AS
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
WHERE cs.id IS NOT NULL
ORDER BY cs.created_at DESC;

COMMENT ON VIEW client_leads IS 'Unified view of all leads per client';

-- Recreate client_products view with security_invoker
CREATE VIEW client_products
WITH (security_invoker = true)
AS
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

-- Recreate chatbot_performance view with security_invoker
CREATE VIEW chatbot_performance
WITH (security_invoker = true)
AS
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
-- FIX FUNCTIONS: Add SET search_path
-- ========================================
-- This fixes WARN: "Functions have mutable search_path"
-- Prevents search_path hijacking attacks

-- Fix increment_chatbot_usage function
CREATE OR REPLACE FUNCTION increment_chatbot_usage(p_client_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE chatbot_configs
  SET messages_used_this_month = messages_used_this_month + 1,
      updated_at = NOW()
  WHERE client_id = p_client_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog, public;

COMMENT ON FUNCTION increment_chatbot_usage IS 'Safely increment message counter for rate limiting';

-- Fix reset_monthly_chatbot_usage function
CREATE OR REPLACE FUNCTION reset_monthly_chatbot_usage()
RETURNS void AS $$
BEGIN
  UPDATE chatbot_configs
  SET messages_used_this_month = 0,
      month_reset_date = CURRENT_DATE,
      updated_at = NOW()
  WHERE month_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog, public;

COMMENT ON FUNCTION reset_monthly_chatbot_usage IS 'Reset message counters monthly (call via cron)';

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = pg_catalog, public;

-- ========================================
-- MIGRATION COMPLETE
-- ========================================
-- All security issues resolved:
-- ✓ 3 views now use security_invoker = true
-- ✓ 3 functions now have SET search_path = pg_catalog, public
