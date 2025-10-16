# DATABASE MIGRATION REVIEW - CHATBOT INTEGRATION

**Project:** RepPreps Home Services Template + Chatbot Product
**Date:** 2025-10-16
**Reviewer:** AI Analysis
**Status:** APPROVED WITH MODIFICATIONS

---

## EXECUTIVE SUMMARY

### Safety Assessment: ✅ CONDITIONAL GO

The proposed database migration is **technically sound and safe to run** with the following conditions:

- ✅ Migration SQL won't break existing deployments
- ✅ Backward compatible with current website forms
- ✅ Can be run on live database with <30 seconds downtime
- ⚠️ **MUST** add RLS policies before production use (security requirement)
- ⚠️ **MUST** plan for client record creation and environment variable updates

**Risk Level:** LOW
**Breaking Changes:** None (if implemented correctly)
**Recommended Approach:** Phased rollout over 4-6 weeks

---

## TABLE OF CONTENTS

1. [Breaking Changes Analysis](#1-breaking-changes-analysis)
2. [Code Changes Required](#2-code-changes-required)
3. [Architecture Validation](#3-architecture-validation)
4. [Migration Safety](#4-migration-safety)
5. [Alternative Approaches](#5-alternative-approaches)
6. [Backward Compatibility](#6-backward-compatibility)
7. [Future Scalability](#7-future-scalability)
8. [Corrected Migration Script](#8-corrected-migration-script)
9. [Implementation Checklist](#9-implementation-checklist)
10. [Rollback Plan](#10-rollback-plan)
11. [Recommendations](#11-recommendations)

---

## 1. BREAKING CHANGES ANALYSIS

### ✅ Good News: No Immediate Breaking Changes

**Adding `source` and `client_id` columns to contact_submissions:**

- ✅ **Won't break existing code** - Both columns are nullable or have defaults
- ✅ **API route continues working** - The INSERT at `src/app/api/contact/route.ts:37-51` uses object notation, so extra columns are ignored
- ✅ **TypeScript types safe** - `ContactSubmission` type at `src/lib/supabase.ts:13-22` doesn't include database-only fields

**Existing data compatibility:**

- ✅ **No backfill needed immediately** - `source` has DEFAULT 'website_form'
- ✅ **NULL client_id is fine** - FK constraints allow NULL values

### ⚠️ Operational Issues to Address

- All existing submissions will have NULL `client_id` (impossible to know which website)
- New submissions will also have NULL `client_id` unless code is updated
- Multi-tenant architecture currently relies on `business_name` field only

---

## 2. CODE CHANGES REQUIRED

### Files That MUST Be Updated

#### File: `src/lib/supabase.ts` (Lines 13-22)

**Current TypeScript Type:**
```typescript
export type ContactSubmission = {
  business_name: string;
  name: string;
  email: string;
  phone: string;
  service_type?: string;
  message?: string;
  zip_code?: string;
  status?: string;
};
```

**Updated Type (add optional fields):**
```typescript
export type ContactSubmission = {
  business_name: string;
  name: string;
  email: string;
  phone: string;
  service_type?: string;
  message?: string;
  zip_code?: string;
  status?: string;
  source?: string;        // NEW - lead source identifier
  client_id?: string;     // NEW - UUID linking to clients table
};
```

#### File: `src/app/api/contact/route.ts`

**Option A: Minimal Change (Maintains Backward Compatibility)**

Update the insert at lines 36-51:

```typescript
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
      source: 'website_form',  // NEW - explicitly set source
      // client_id remains NULL for now (legacy mode)
    },
  ])
  .select();
```

**Option B: Full Integration (Requires CLIENT_ID environment variable)**

Add at top of file (line 13):
```typescript
const clientId = process.env.CLIENT_ID || null;
```

Update the insert (lines 36-51):
```typescript
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
      source: 'website_form',  // NEW
      client_id: clientId,     // NEW - from environment variable
    },
  ])
  .select();
```

### Files That DON'T Need Changes

- ✅ `src/components/ContactForm.tsx` - No changes needed
- ✅ All other components - They don't directly query the database

### New Environment Variables

**Per Deployment (Vercel Dashboard):**
```bash
CLIENT_ID=uuid-from-clients-table  # Different for each deployment
```

---

## 3. ARCHITECTURE VALIDATION

### ✅ Solid Design with Minor Concerns

**Normalization Approach:**
- ✅ **Excellent** - Central `clients` table with separate product configs is textbook normalization
- ✅ **UNIQUE(client_id)** constraints ensure one-to-one relationships
- ✅ **ON DELETE CASCADE** is appropriate for this use case

**Nullable client_id Concern:**
- ⚠️ **Design inconsistency** - `contact_submissions.client_id` is nullable, but `clients` should be the master hub
- **Recommendation**: Make a decision:
  - **Option A (Recommended)**: Require `client_id` for all NEW submissions, allow NULL only for legacy data
  - **Option B**: Keep nullable permanently, accept that some submissions won't be tied to clients

**Index Strategy:**
- ✅ **Good coverage** - Indexes on foreign keys, status fields, and timestamps
- ⚠️ **Consider adding**: Composite index on `(client_id, created_at DESC)` for common queries

### Table Relationships

```
clients (master hub)
  ├── website_configs (1:1)
  ├── chatbot_configs (1:1)
  ├── chatbot_conversations (1:N)
  ├── chatbot_analytics (1:N)
  └── contact_submissions (1:N) - via optional FK
```

---

## 4. MIGRATION SAFETY

### ✅ YES - Safe to Run on Live Database

**Why It's Safe:**
- ✅ Uses `IF NOT EXISTS` clauses (idempotent)
- ✅ Adding nullable columns doesn't lock tables long
- ✅ `ADD COLUMN` operations are non-blocking in PostgreSQL
- ✅ FK constraint allows NULL, so existing data remains valid
- ✅ Indexes created with `IF NOT EXISTS`

**Minimal Downtime Impact:**
- ✅ Website forms continue working during migration
- ✅ No data loss risk
- ✅ Estimated migration time: **< 30 seconds** (depending on table size)

### Pre-Migration Verification

Run this BEFORE migration to ensure columns don't already exist with bad data:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contact_submissions'
  AND column_name IN ('source', 'client_id');
```

### Migration Versioning

**✅ YES**, you should version this migration:

- Create: `supabase/migrations/20251016000000_add_chatbot_tables.sql`
- Use Supabase CLI: `supabase migration new add_chatbot_tables`

---

## 5. ALTERNATIVE APPROACHES

### Alternative 1: Separate chatbot_leads Table

**Instead of modifying contact_submissions:**

```sql
CREATE TABLE chatbot_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20),
  -- ... same fields as contact_submissions
);

-- Unified view:
CREATE VIEW all_leads AS
  SELECT *, 'website_form' as source FROM contact_submissions
  UNION ALL
  SELECT *, 'chatbot' as source FROM chatbot_leads;
```

**Pros:** Zero breaking changes, complete backward compatibility
**Cons:** Data duplication, more complex queries
**Verdict:** Not recommended - proposed approach is cleaner

### Alternative 2: Generic Products Table

```sql
CREATE TABLE client_products (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  product_type VARCHAR(50), -- 'website', 'chatbot', 'seo', etc.
  config JSONB,
  status VARCHAR(20)
);
```

**Pros:** Infinitely extensible for future products
**Cons:** Loss of type safety, harder to query, less clear schema
**Verdict:** Current approach better for 2-5 products

### Alternative 3: Separate Databases

**One database per client:**

**Pros:** Complete data isolation, easier to scale individual clients
**Cons:** Expensive, complex management, can't query across clients
**Verdict:** Overkill for hundreds of clients

### Recommendation

**✅ Stick with proposed approach** (adding columns to contact_submissions) with the corrected migration script that includes:
- RLS policies
- Composite indexes
- Authentication integration
- Helper functions

---

## 6. BACKWARD COMPATIBILITY

### ⚠️ CRITICAL PLANNING NEEDED

**Current Situation:**
- Multiple deployed websites (all independent)
- All write to same `contact_submissions` table
- Identified by `business_name` field only
- No `client_id` tracking

**After Migration:**
- ✅ **Existing websites continue working** - No code changes required immediately
- ⚠️ **BUT** - They'll insert records with NULL `client_id`
- ⚠️ **Problem** - Can't use new client-based features for these submissions

### Transition Strategy (RECOMMENDED)

#### Phase 1: Migration (Day 0)
- Run the migration
- All existing data has NULL `client_id`
- New submissions also have NULL `client_id`
- Everything works, but client relationships aren't established

#### Phase 2: Client Record Creation (Day 0-7)

```sql
-- Manually create client records for each deployed website:
INSERT INTO clients (business_name, contact_email, contact_name)
VALUES
  ('ABC Plumbing FL', 'owner@abcplumbing.com', 'John Smith'),
  ('XYZ HVAC TX', 'info@xyzhvac.com', 'Jane Doe');
  -- ... for each deployed website

-- Get the client_id for each:
SELECT id, business_name FROM clients;
```

#### Phase 3: Code Updates (Day 7-30)
- Add `CLIENT_ID` environment variable to each Vercel deployment
- Deploy updated code (Option B from section 2)
- New submissions will have `client_id` populated

#### Phase 4: Backfill Existing Data (Optional)

```sql
-- Match existing submissions to clients by business_name:
UPDATE contact_submissions cs
SET client_id = c.id
FROM clients c
WHERE cs.business_name = c.business_name
  AND cs.client_id IS NULL;
```

### Handling Legacy Deployments

**Three Options:**

1. **Option A (Recommended)**: Update all deployments with CLIENT_ID environment variable
2. **Option B**: Leave old deployments as-is (NULL client_id), only new deployments get client integration
3. **Option C**: Use a database trigger to auto-match by business_name (NOT recommended - fragile)

---

## 7. FUTURE SCALABILITY

### ✅ Scales Well with Minor Optimizations

**Handling Hundreds of Clients:**
- ✅ Indexes support efficient lookups
- ✅ One-to-one relationships prevent data explosion
- ✅ PostgreSQL handles this schema at scale easily

### Potential Bottlenecks

**1. JSONB Columns**
- `chatbot_conversations.messages` could grow large
- **Mitigation**: Consider separate `chatbot_messages` table with one row per message
- **When**: If conversations regularly exceed 100 messages

**2. Views Without Indexes**
- `client_leads`, `chatbot_performance` views scan entire tables
- **Mitigation**: Create materialized views with refresh schedule
- **When**: If you have 10,000+ submissions

### Adding Future Products

**Current pattern established:** Create `seo_configs`, `ads_campaigns` tables

✅ All reference `clients.id` as foreign key
⚠️ Consider if 5+ product tables become unwieldy

### Recommended Composite Indexes

```sql
-- For "show me recent submissions for this client":
CREATE INDEX idx_contact_submissions_client_created
  ON contact_submissions(client_id, created_at DESC);

-- For "show me conversations with leads for this client":
CREATE INDEX idx_chatbot_conversations_client_lead
  ON chatbot_conversations(client_id, lead_captured, created_at DESC);
```

---

## 8. CORRECTED MIGRATION SCRIPT

This version includes all critical improvements: RLS policies, authentication integration, composite indexes, helper functions, and triggers.

```sql
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
```

---

## 9. IMPLEMENTATION CHECKLIST

### Phase 1: Pre-Migration (Day -1)

- [ ] **1.1** Create backup of Supabase database
  ```
  In Supabase Dashboard → Database → Backups → Create Manual Backup
  ```

- [ ] **1.2** Document all currently deployed websites
  ```
  Create spreadsheet with columns:
  - Business Name (from brand.companyName)
  - Deployment URL
  - NOTIFICATION_EMAIL
  - Contact person
  - Deploy date
  ```

- [ ] **1.3** Test migration on development/staging Supabase instance
  ```sql
  -- Run the corrected migration script
  -- Verify no errors
  -- Check table counts
  ```

- [ ] **1.4** Create a communications plan
  ```
  - Notify team of maintenance window
  - Expected downtime: < 5 minutes
  - Rollback plan ready
  ```

### Phase 2: Database Migration (Day 0)

- [ ] **2.1** Verify no active form submissions happening
  ```sql
  -- Check recent submission rate:
  SELECT COUNT(*), MAX(created_at)
  FROM contact_submissions
  WHERE created_at > NOW() - INTERVAL '5 minutes';
  ```

- [ ] **2.2** Run the corrected migration script
  ```
  Copy entire script from section 8 above
  Run in Supabase SQL Editor
  Expected time: 20-30 seconds
  ```

- [ ] **2.3** Verify migration success
  ```sql
  -- Check new columns exist:
  SELECT column_name, data_type, is_nullable
  FROM information_schema.columns
  WHERE table_name = 'contact_submissions'
  AND column_name IN ('source', 'client_id');
  -- Should return 2 rows

  -- Check new tables:
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name IN ('clients', 'website_configs', 'chatbot_configs',
                      'chatbot_conversations', 'chatbot_analytics');
  -- Should return 5 rows

  -- Verify RLS enabled:
  SELECT tablename, rowsecurity
  FROM pg_tables
  WHERE schemaname = 'public'
  AND tablename IN ('clients', 'website_configs', 'chatbot_configs');
  -- All should have rowsecurity = true
  ```

- [ ] **2.4** Test existing website forms still work
  ```
  Submit a test form from one deployed website
  Verify it appears in contact_submissions table
  Check that source = 'website_form' (default)
  Check that client_id = NULL (expected for now)
  ```

### Phase 3: Client Record Creation (Day 0-1)

- [ ] **3.1** Create client records for all deployed websites
  ```sql
  -- For each deployed website, run:
  INSERT INTO clients (
    business_name,
    contact_email,
    contact_name,
    website_url,
    is_active
  ) VALUES (
    'ABC Plumbing FL',           -- EXACT match to brand.companyName
    'owner@abcplumbing.com',     -- Owner email
    'John Smith',                -- Owner name
    'https://abcplumbing.com',   -- Production URL
    true
  );
  -- Repeat for each website from your spreadsheet
  ```

- [ ] **3.2** Record client_id values
  ```sql
  -- Get all client IDs:
  SELECT id, business_name, contact_email
  FROM clients
  ORDER BY business_name;
  -- Add client_id column to your spreadsheet
  ```

- [ ] **3.3** (Optional) Backfill existing submissions
  ```sql
  -- Match existing submissions to clients by business_name:
  UPDATE contact_submissions cs
  SET client_id = c.id
  FROM clients c
  WHERE cs.business_name = c.business_name
    AND cs.client_id IS NULL;

  -- Verify:
  SELECT
    client_id IS NULL as has_no_client,
    COUNT(*) as count
  FROM contact_submissions
  GROUP BY (client_id IS NULL);
  ```

### Phase 4: Code Updates (Day 1-7)

- [ ] **4.1** Update TypeScript types
  ```typescript
  // src/lib/supabase.ts
  export type ContactSubmission = {
    business_name: string;
    name: string;
    email: string;
    phone: string;
    service_type?: string;
    message?: string;
    zip_code?: string;
    status?: string;
    source?: string;        // ADD THIS
    client_id?: string;     // ADD THIS
  };
  ```

- [ ] **4.2** Update API route (minimal version)
  ```typescript
  // src/app/api/contact/route.ts
  // In the insert object, add:
  source: 'website_form',
  ```

- [ ] **4.3** Test updated code locally
  ```bash
  npm run dev
  # Submit test form
  # Verify source field is set
  ```

- [ ] **4.4** Commit and push changes
  ```bash
  git add src/lib/supabase.ts src/app/api/contact/route.ts
  git commit -m "Add support for contact_submissions.source field"
  git push origin main
  ```

### Phase 5: Deployment Updates (Day 7-30)

For EACH deployed website:

- [ ] **5.1** Add CLIENT_ID environment variable in Vercel
  ```
  1. Go to Vercel Dashboard → Project → Settings → Environment Variables
  2. Add new variable:
     Name: CLIENT_ID
     Value: [UUID from clients table]
     Environment: Production
  3. Save
  ```

- [ ] **5.2** Update API route to use CLIENT_ID (if doing full integration)
  ```typescript
  // src/app/api/contact/route.ts (line 13)
  const clientId = process.env.CLIENT_ID || null;

  // In insert (line 48):
  client_id: clientId,
  ```

- [ ] **5.3** Redeploy the website
  ```bash
  # Trigger redeployment in Vercel
  # Or: git push with updated code
  ```

- [ ] **5.4** Test form submission
  ```bash
  # Submit test form
  # Verify client_id is populated in database
  ```

- [ ] **5.5** Update tracking spreadsheet
  ```
  Mark deployment as "migrated" with date
  ```

### Phase 6: Chatbot Development (Day 30+)

- [ ] **6.1** Create chatbot_configs for test clients
  ```sql
  INSERT INTO chatbot_configs (
    client_id,
    tier,
    notification_email,
    monthly_message_limit,
    brand_color
  ) VALUES (
    'client-uuid-here',
    'starter',
    'notifications@client.com',
    1000,
    '#0066CC'
  );
  ```

- [ ] **6.2** Build chatbot frontend integration

- [ ] **6.3** Build chatbot API endpoints

- [ ] **6.4** Test end-to-end chatbot → lead capture flow

### Phase 7: Monitoring & Optimization (Ongoing)

- [ ] **7.1** Set up database monitoring
  ```sql
  -- Weekly: Check for NULL client_id submissions
  SELECT COUNT(*) as null_client_count
  FROM contact_submissions
  WHERE client_id IS NULL
    AND created_at > NOW() - INTERVAL '7 days';
  -- Should decrease over time as deployments are updated
  ```

- [ ] **7.2** Monitor chatbot usage
  ```sql
  -- Check clients approaching monthly limit:
  SELECT
    c.business_name,
    cc.messages_used_this_month,
    cc.monthly_message_limit,
    ROUND((cc.messages_used_this_month::NUMERIC / cc.monthly_message_limit) * 100, 2) as usage_pct
  FROM clients c
  JOIN chatbot_configs cc ON c.id = cc.client_id
  WHERE cc.messages_used_this_month > (cc.monthly_message_limit * 0.8)
  ORDER BY usage_pct DESC;
  ```

- [ ] **7.3** Set up monthly usage reset cron job
  ```sql
  -- In Supabase Dashboard → Database → Cron Jobs
  -- Create job to run: SELECT reset_monthly_chatbot_usage();
  -- Schedule: 0 0 1 * * (first day of each month at midnight)
  ```

- [ ] **7.4** Review and optimize slow queries
  ```sql
  -- Enable pg_stat_statements extension:
  CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

  -- After 30 days, check slowest queries:
  SELECT
    query,
    calls,
    mean_exec_time,
    total_exec_time
  FROM pg_stat_statements
  WHERE query LIKE '%contact_submissions%' OR query LIKE '%chatbot%'
  ORDER BY mean_exec_time DESC
  LIMIT 10;
  ```

---

## 10. ROLLBACK PLAN

### ⚠️ IMPORTANT: When to Rollback

**Only rollback if:**
- Migration failed critically
- You're in first 24 hours and no chatbot data has been created
- No client records have been populated yet

**DO NOT ROLLBACK if:**
- Chatbot conversations have been stored
- Client records are in use
- It's been >7 days since migration (too much data at risk)

### Full Rollback SQL Script

```sql
-- ========================================
-- ROLLBACK SCRIPT FOR CHATBOT MIGRATION
-- DANGER: This will delete all new tables and data
-- ========================================

-- Step 1: Verify this is what you want
-- Uncomment and run to see what will be lost:
/*
SELECT 'clients' as table_name, COUNT(*) as rows_to_delete FROM clients
UNION ALL
SELECT 'website_configs', COUNT(*) FROM website_configs
UNION ALL
SELECT 'chatbot_configs', COUNT(*) FROM chatbot_configs
UNION ALL
SELECT 'chatbot_conversations', COUNT(*) FROM chatbot_conversations
UNION ALL
SELECT 'chatbot_analytics', COUNT(*) FROM chatbot_analytics
UNION ALL
SELECT 'contact_submissions (will keep, just remove columns)',
       COUNT(*) FILTER (WHERE source IS NOT NULL OR client_id IS NOT NULL)
FROM contact_submissions;
*/

-- Step 2: Drop triggers
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
DROP TRIGGER IF EXISTS update_website_configs_updated_at ON website_configs;
DROP TRIGGER IF EXISTS update_chatbot_configs_updated_at ON chatbot_configs;
DROP TRIGGER IF EXISTS update_chatbot_conversations_updated_at ON chatbot_conversations;

-- Step 3: Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS increment_chatbot_usage(UUID);
DROP FUNCTION IF EXISTS reset_monthly_chatbot_usage();

-- Step 4: Drop views
DROP VIEW IF EXISTS client_leads CASCADE;
DROP VIEW IF EXISTS client_products CASCADE;
DROP VIEW IF EXISTS chatbot_performance CASCADE;

-- Step 5: Remove RLS policies from contact_submissions
DROP POLICY IF EXISTS "Users can view submissions for their client" ON contact_submissions;

-- Step 6: Remove foreign key constraint from contact_submissions
ALTER TABLE contact_submissions
DROP CONSTRAINT IF EXISTS fk_contact_submissions_client;

-- Step 7: Drop indexes on contact_submissions new columns
DROP INDEX IF EXISTS idx_contact_submissions_client;
DROP INDEX IF EXISTS idx_contact_submissions_source;
DROP INDEX IF EXISTS idx_contact_submissions_client_created;

-- Step 8: Remove new columns from contact_submissions
-- WARNING: This will lose data in these columns!
-- If you've backfilled client_id, you may want to keep these columns instead
ALTER TABLE contact_submissions
DROP COLUMN IF EXISTS source;

ALTER TABLE contact_submissions
DROP COLUMN IF EXISTS client_id;

-- Step 9: Drop new tables (CASCADE will drop dependent objects)
DROP TABLE IF EXISTS chatbot_analytics CASCADE;
DROP TABLE IF EXISTS chatbot_conversations CASCADE;
DROP TABLE IF EXISTS chatbot_configs CASCADE;
DROP TABLE IF EXISTS website_configs CASCADE;
DROP TABLE IF EXISTS clients CASCADE;

-- Step 10: Verification
SELECT
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'contact_submissions'
ORDER BY ordinal_position;
-- Should NOT include 'source' or 'client_id'

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('clients', 'website_configs', 'chatbot_configs',
                    'chatbot_conversations', 'chatbot_analytics');
-- Should return 0 rows

-- ========================================
-- ROLLBACK COMPLETE
-- ========================================
```

### Alternative: Soft Rollback

If you want to keep the new tables but stop using them:

```sql
-- Disable RLS (makes tables inaccessible via API)
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE website_configs DISABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_configs DISABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_analytics DISABLE ROW LEVEL SECURITY;

-- Mark all chatbot configs as suspended
UPDATE chatbot_configs SET status = 'suspended';

-- Revert code changes in your repository
-- Remove source and client_id from ContactSubmission type
-- Remove them from API route insert
```

### Recovery After Rollback

1. Restore from Supabase backup (if available)
2. Re-run migration script with fixes
3. Verify with test data before going live

---

## 11. RECOMMENDATIONS

### 🔴 CRITICAL - Must Address

#### 1. Authentication Strategy Missing

**Problem:** No clear plan for how clients authenticate to view their data

**Solution:** Add `user_id` column to `clients` table (already in corrected script)

**Implementation:**
```sql
-- Create auth user for each client:
-- Use Supabase Dashboard → Authentication → Add user
-- Or via API

-- Link to client:
UPDATE clients SET user_id = 'auth-user-uuid' WHERE id = 'client-uuid';
```

**Alternative:** Build an internal admin dashboard with service role access (no client authentication needed initially)

#### 2. RLS Policies Need Refinement

**Problem:** Current RLS policies assume clients have auth accounts

**Solution:** Start with service role only (admin dashboard), add client auth later

**Immediate action:** Document that API routes MUST use service role key

#### 3. Chatbot Messages Storage

**Problem:** Storing all messages as JSONB array will become slow for long conversations

**Solution:** For production, create separate `chatbot_messages` table:
```sql
CREATE TABLE chatbot_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES chatbot_conversations(id),
  role VARCHAR(20) CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**When:** Before chatbot launch if you expect 50+ message conversations

### 🟡 HIGH PRIORITY - Should Consider

#### 4. Client Identifier Strategy

**Current:** Using `business_name` for tenant identification

**Problem:** Not unique, can have typos, changes over time

**Recommendation:** Add `client_slug` field for URL-safe unique identifier
```sql
ALTER TABLE clients ADD COLUMN slug VARCHAR(100) UNIQUE;
CREATE INDEX idx_clients_slug ON clients(slug);

-- Example: 'abc-plumbing-fl', 'xyz-hvac-tx'
```

**Benefit:** Use for API routing (`/api/chatbot/{client_slug}`)

#### 5. Soft Deletes Instead of Hard Deletes

**Current:** `ON DELETE CASCADE` permanently deletes data

**Risk:** Accidental client deletion loses all history

**Recommendation:** Add `deleted_at` columns:
```sql
ALTER TABLE clients ADD COLUMN deleted_at TIMESTAMP;
ALTER TABLE contact_submissions ADD COLUMN deleted_at TIMESTAMP;

-- Update views to filter out deleted:
WHERE deleted_at IS NULL
```

**Benefit:** Data recovery possible, audit trail preserved

#### 6. Lead Status Workflow

**Current:** `contact_submissions.status` has no workflow

**Recommendation:** Define status progression:
```sql
-- Add constraint:
ALTER TABLE contact_submissions
ADD CONSTRAINT check_status
CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost'));

-- Add status history:
CREATE TABLE contact_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES contact_submissions(id),
  old_status VARCHAR(20),
  new_status VARCHAR(20),
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);
```

### 🟢 NICE TO HAVE - Future Enhancements

#### 7. Materialized Views for Performance

**When:** After 10,000+ submissions

**Example:**
```sql
CREATE MATERIALIZED VIEW mv_client_stats AS
SELECT
  client_id,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'converted') as conversions,
  DATE_TRUNC('day', created_at) as date
FROM contact_submissions
GROUP BY client_id, DATE_TRUNC('day', created_at);

-- Refresh daily via cron:
REFRESH MATERIALIZED VIEW mv_client_stats;
```

#### 8. Event Sourcing for Audit Log

**Current:** No audit trail for config changes

**Recommendation:** Create generic events table:
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  event_type VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,  -- 'chatbot_config', 'website_config', etc.
  entity_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_events_client_created ON events(client_id, created_at DESC);
```

#### 9. Feature Flags for Gradual Rollout

**Purpose:** Enable chatbot for specific clients first

**Implementation:**
```sql
ALTER TABLE chatbot_configs
ADD COLUMN feature_flags JSONB DEFAULT '{"enabled": true, "beta_features": []}';
```

#### 10. Rate Limiting at Database Level

**Current:** `monthly_message_limit` tracked manually

**Enhancement:** Add database function to enforce:
```sql
CREATE OR REPLACE FUNCTION can_send_message(p_client_id UUID)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM chatbot_configs
    WHERE client_id = p_client_id
      AND status = 'active'
      AND messages_used_this_month < monthly_message_limit
  );
END;
$$ LANGUAGE plpgsql;
```

### 📋 Data Governance

#### 11. PII Handling & GDPR Compliance

**Concern:** Storing customer names, emails, phones

**Action items:**
- Document data retention policy
- Implement data deletion endpoint
- Add `data_retention_days` to clients table
- Create cron job to purge old data:
```sql
CREATE OR REPLACE FUNCTION purge_old_submissions()
RETURNS void AS $$
BEGIN
  UPDATE contact_submissions
  SET deleted_at = NOW(),
      email = 'redacted@example.com',
      phone = 'redacted',
      name = 'Redacted'
  WHERE created_at < NOW() - INTERVAL '7 years'
    AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql;
```

#### 12. Backup & Disaster Recovery

**Current:** Supabase automatic backups (daily)

**Recommendation:**
- Enable Point-in-Time Recovery (PITR) in Supabase Pro
- Document backup retention (30 days minimum)
- Test restore procedure quarterly
- Export critical data monthly to external storage

### 🔧 Technical Debt to Avoid

#### 13. Don't mix client identification methods
- ❌ Don't rely on both `business_name` AND `client_id`
- ✅ Choose one: Use `client_id` everywhere going forward
- ✅ Keep `business_name` for display only

#### 14. Don't use JSONB as a crutch
- ❌ Don't add new fields to JSONB columns if they need indexes
- ✅ Use JSONB for truly dynamic data (user preferences, metadata)
- ✅ Use proper columns for queryable data

#### 15. Don't skip migrations
- ❌ Don't run ad-hoc SQL updates directly in production
- ✅ Always create migration files with version numbers
- ✅ Use Supabase CLI migrations workflow

### 📊 Monitoring & Observability

#### 16. Database Monitoring Dashboard

**Track these metrics:**
- Submissions per client per day
- Chatbot usage vs. limits
- Conversion rates
- Response times for key queries

**Tool:** Use Supabase Dashboard → Database → Performance

#### 17. Alerting

**Set up alerts for:**
- Client approaching 90% of message limit
- Spike in submission errors
- RLS policy failures
- Slow queries (>1 second)

---

## QUESTIONS TO ADDRESS

Before proceeding with migration:

### 1. Authentication
Do you need clients to login and view their own data? Or is this just for internal admin use?

### 2. Existing Deployments
How many websites are currently deployed? Do you have a list of their `business_name` values?

### 3. Timeline
When do you need the chatbot launched? This determines how aggressively you need to update existing deployments.

### 4. Budget
Are you on Supabase Free tier? Some recommendations (PITR, materialized views) require Pro tier.

---

## APPENDIX

### Key Files Modified in Codebase

- `src/lib/supabase.ts` - TypeScript types
- `src/app/api/contact/route.ts` - API route handler
- `supabase-setup.sql` - Original database schema

### Supabase CLI Commands

```bash
# Initialize Supabase locally
supabase init

# Create new migration
supabase migration new add_chatbot_tables

# Apply migrations
supabase db push

# Reset local database
supabase db reset
```

### Useful SQL Queries

```sql
-- Check all submissions without client_id
SELECT COUNT(*) as orphaned_submissions
FROM contact_submissions
WHERE client_id IS NULL;

-- List all clients and their product configurations
SELECT * FROM client_products;

-- Get conversion rate by client
SELECT * FROM chatbot_performance;

-- Find clients over usage limit
SELECT business_name, usage_pct
FROM chatbot_performance
WHERE usage_pct > 80;
```

---

## CONCLUSION

This migration is **well-architected and safe to execute** with the provided corrections. The phased implementation approach ensures minimal risk while enabling the new chatbot product to integrate seamlessly with existing website deployments.

**Next Steps:**
1. Review this document with stakeholders
2. Answer the questions in the Questions section
3. Schedule migration window
4. Execute Phase 1 of implementation checklist

**Support:** If you encounter issues during migration, refer to the rollback plan in Section 10.
