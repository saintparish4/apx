-- APX Healthcare Claims Verification Network 
-- PostgreSQL Schema for OFff-Chain Data

-- Enable required extensions 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Providers table (mirrors on-chain data with additional metadata)
CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    credentials_hash VARCHAR(66) NOT NULL, 

    -- Off-chain metadata 
    organization_name VARCHAR(255),
    npi VARCHAR(10),
    tax_id VARCHAR(20),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code VARCHAR(10),

    -- Cached on-chain data
    stake_amount NUMERIC(78, 0),
    reputation_score INTEGER,
    status VARCHAR(20),
    total_claims INTEGER DEFAULT 0,
    approved_claims INTEGER DEFAULT 0, 
    rejected_claims INTEGER DEFAULT 0,

    -- Timestamps 
    registered_at TIMESTAMPTZ,
    last_activity_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
);

CREATE INDEX idx_providers_wallet ON providers (wallet_address);
CREATE INDEX idx_providers_status ON providers (status);
CREATE INDEX idx_providers_npi ON providers (npi);

-- Claims table (off-chain index with references to on-chain data)
CREATE TABLE claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id VARCHAR(66) UNIQUE NOT NULL, -- On-chain claim ID (bytes32 hex) 
    provider_address VARCHAR(42) NOT NULL,

    -- IPFS references
    ipfs_cid VARCHAR(100) NOT NULL,
    data_hash VARCHAR(66) NOT NULL,

    -- IPFS references
    ipfs_cid VARCHAR(100) NOT NULL,
    data_hash VARCHAR(66) NOT NULL,
    
    -- Claim details (extracted from IPFS for indexing)
    patient_id_hash VARCHAR(66),
    claim_type VARCHAR(50),
    service_date DATE,
    amount NUMERIC(18, 2),
    
    -- Procedure and diagnosis codes (for searching)
    procedure_codes TEXT[], -- Array of CPT codes
    diagnosis_codes TEXT[], -- Array of ICD-10 codes
    
    -- Status tracking
    status VARCHAR(20) NOT NULL DEFAULT 'submitted',
    approvals_count INTEGER DEFAULT 0,
    rejections_count INTEGER DEFAULT 0,
    rejection_reason TEXT,
    
    -- Timestamps
    submitted_at TIMESTAMPTZ NOT NULL,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Foreign keys
    CONSTRAINT fk_provider FOREIGN KEY (provider_address) 
        REFERENCES providers(wallet_address) ON DELETE CASCADE
);

CREATE INDEX idx_claims_claim_id ON claims(claim_id);
CREATE INDEX idx_claims_provider ON claims(provider_address);
CREATE INDEX idx_claims_status ON claims(status);
CREATE INDEX idx_claims_service_date ON claims(service_date);
CREATE INDEX idx_claims_submitted_at ON claims(submitted_at);
CREATE INDEX idx_claims_procedure_codes ON claims USING GIN(procedure_codes);
CREATE INDEX idx_claims_diagnosis_codes ON claims USING GIN(diagnosis_codes);

-- Verifications table
CREATE TABLE verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id VARCHAR(66) NOT NULL,
    verifier_address VARCHAR(42) NOT NULL,
    approved BOOLEAN NOT NULL,
    reason TEXT,
    
    -- Validation details
    validation_score NUMERIC(5, 2),
    risk_level VARCHAR(20),
    validation_details JSONB,
    
    -- Transaction info
    tx_hash VARCHAR(66),
    block_number BIGINT,
    
    -- Timestamps
    verified_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Unique constraint
    UNIQUE(claim_id, verifier_address)
);

CREATE INDEX idx_verifications_claim ON verifications(claim_id);
CREATE INDEX idx_verifications_verifier ON verifications(verifier_address);

-- Blockchain events log
CREATE TABLE blockchain_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    block_number BIGINT NOT NULL,
    tx_hash VARCHAR(66) NOT NULL,
    log_index INTEGER NOT NULL,
    
    -- Event data
    event_data JSONB NOT NULL,
    
    -- Processing status
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMPTZ,
    error TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(tx_hash, log_index)
);

CREATE INDEX idx_events_type ON blockchain_events(event_type);
CREATE INDEX idx_events_block ON blockchain_events(block_number);
CREATE INDEX idx_events_processed ON blockchain_events(processed);

-- API keys for providers
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_address VARCHAR(42) NOT NULL,
    key_hash VARCHAR(64) NOT NULL, -- SHA-256 of the API key
    name VARCHAR(100),
    
    -- Permissions
    scopes TEXT[] DEFAULT ARRAY['claims:read', 'claims:write'],
    
    -- Rate limiting
    rate_limit_per_minute INTEGER DEFAULT 60,
    
    -- Status
    active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMPTZ,
    
    -- Timestamps
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_api_key_provider FOREIGN KEY (provider_address)
        REFERENCES providers(wallet_address) ON DELETE CASCADE
);

CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_provider ON api_keys(provider_address);

-- Audit log
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_address VARCHAR(42),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id VARCHAR(100),
    
    -- Request details
    ip_address INET,
    user_agent TEXT,
    
    -- Changes
    old_value JSONB,
    new_value JSONB,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_actor ON audit_log(actor_address);
CREATE INDEX idx_audit_action ON audit_log(action);
CREATE INDEX idx_audit_resource ON audit_log(resource_type, resource_id);
CREATE INDEX idx_audit_created ON audit_log(created_at);

-- Analytics aggregates
CREATE TABLE daily_stats (
    date DATE PRIMARY KEY,
    
    -- Claims
    claims_submitted INTEGER DEFAULT 0,
    claims_approved INTEGER DEFAULT 0,
    claims_rejected INTEGER DEFAULT 0,
    claims_expired INTEGER DEFAULT 0,
    total_amount_submitted NUMERIC(20, 2) DEFAULT 0,
    total_amount_approved NUMERIC(20, 2) DEFAULT 0,
    
    -- Providers
    providers_registered INTEGER DEFAULT 0,
    providers_activated INTEGER DEFAULT 0,
    total_stake NUMERIC(78, 0) DEFAULT 0,
    
    -- Verifications
    verifications_submitted INTEGER DEFAULT 0,
    avg_verification_time_seconds INTEGER,
    
    -- Gas
    total_gas_used NUMERIC(78, 0) DEFAULT 0,
    avg_gas_price NUMERIC(78, 0) DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply timestamp triggers
CREATE TRIGGER update_providers_timestamp
    BEFORE UPDATE ON providers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_claims_timestamp
    BEFORE UPDATE ON claims
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_daily_stats_timestamp
    BEFORE UPDATE ON daily_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Insert initial admin provider (for development)
INSERT INTO providers (
    wallet_address,
    credentials_hash,
    organization_name,
    npi,
    status
) VALUES (
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', -- Anvil default account
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    'Development Provider',
    '1234567890',
    'active'
) ON CONFLICT (wallet_address) DO NOTHING;

-- Useful views

-- Provider performance view
CREATE VIEW provider_performance AS
SELECT 
    p.wallet_address,
    p.organization_name,
    p.reputation_score,
    p.total_claims,
    p.approved_claims,
    p.rejected_claims,
    CASE 
        WHEN p.total_claims > 0 
        THEN ROUND(p.approved_claims::NUMERIC / p.total_claims * 100, 2)
        ELSE 0 
    END as approval_rate,
    p.stake_amount,
    p.status
FROM providers p
WHERE p.status = 'active';

-- Recent claims view
CREATE VIEW recent_claims AS
SELECT 
    c.claim_id,
    c.provider_address,
    p.organization_name as provider_name,
    c.claim_type,
    c.amount,
    c.status,
    c.submitted_at,
    c.verified_at,
    c.approvals_count,
    c.rejections_count
FROM claims c
JOIN providers p ON c.provider_address = p.wallet_address
ORDER BY c.submitted_at DESC
LIMIT 100;

COMMENT ON TABLE providers IS 'Healthcare providers registered in the network';
COMMENT ON TABLE claims IS 'Healthcare claims submitted for verification';
COMMENT ON TABLE verifications IS 'Verification decisions from verifier nodes';
COMMENT ON TABLE blockchain_events IS 'Raw blockchain events for processing';
COMMENT ON TABLE daily_stats IS 'Aggregated daily statistics for analytics';