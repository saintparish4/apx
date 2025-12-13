package domain

import (
	"math/big"
	"time"

	"github.com/ethereum/go-ethereum/common"
)

// ProviderStatus mirrors the smart contract enum
type ProviderStatus uint8

const (
	ProviderStatusNone ProviderStatus = iota
	ProviderStatusPending
	ProviderStatusActive
	ProviderStatusSuspended
	ProviderStatusRevoked
)

func (s ProviderStatus) String() string {
	switch s {
	case ProviderStatusNone:
		return "None"
	case ProviderStatusPending:
		return "Pending"
	case ProviderStatusActive:
		return "Active"
	case ProviderStatusSuspended:
		return "Suspended"
	case ProviderStatusRevoked:
		return "Revoked"
	default:
		return "Unknown"
	}
}

// Provider represents a healthcare provider
type Provider struct {
	WalletAddress        common.Address `json:"wallet_address"`
	CredentialsHash      [32]byte       `json:"credentials_hash"`
	Stake                *big.Int       `json:"stake"`
	Reputation           uint64         `json:"reputation"`
	TotalClaimsSubmitted uint64         `json:"total_claims_submitted"`
	ApprovedClaims       uint64         `json:"approved_claims"`
	RejectedClaims       uint64         `json:"rejected_claims"`
	RegisteredAt         time.Time      `json:"registered_at"`
	LastActivityAt       time.Time      `json:"last_activity_at"`
	Status               ProviderStatus `json:"status"`
}

// ClaimStatus mirrors the smart contract enum
type ClaimStatus uint8

const (
	ClaimStatusNone ClaimStatus = iota
	ClaimStatusSubmitted
	ClaimStatusUnderReview
	ClaimStatusApproved
	ClaimStatusRejected
	ClaimStatusDisputed
	ClaimStatusExpired
)

func (s ClaimStatus) String() string {
	switch s {
	case ClaimStatusNone:
		return "None"
	case ClaimStatusSubmitted:
		return "Submitted"
	case ClaimStatusUnderReview:
		return "Under Review"
	case ClaimStatusApproved:
		return "Approved"
	case ClaimStatusRejected:
		return "Rejected"
	case ClaimStatusDisputed:
		return "Disputed"
	case ClaimStatusExpired:
		return "Expired"
	default:
		return "Unknown"
	}
}

// Claim represents a healthcare claim
type Claim struct {
	ClaimID         [32]byte       `json:"claim_id"`
	Provider        common.Address `json:"provider"`
	DataHash        [32]byte       `json:"data_hash"`
	IPFSCID         string         `json:"ipfs_cid"`
	Amount          *big.Int       `json:"amount"`
	SubmittedAt     time.Time      `json:"submitted_at"`
	VerifiedAt      time.Time      `json:"verified_at,omitempty"`
	Status          ClaimStatus    `json:"status"`
	ApprovalsCount  uint64         `json:"approvals_count"`
	RejectionsCount uint64         `json:"rejections_count"`
	RejectionReason string         `json:"rejection_reason,omitempty"`
}

// ClaimData represents the off-chain claim data stored in IPFS
type ClaimData struct {
	// Patient info (encrypted or hashed for privacy)
	PatientID      string `json:"patient_id"`       // Hashed patient identifier
	PatientDOBHash string `json:"patient_dob_hash"` // Hashed DOB for verification

	// Provider info
	ProviderNPI string `json:"provider_npi"`
	FacilityID  string `json:"facility_id,omitempty"`

	// Service Info
	ServiceDate    string   `json:"service_date"`
	ProcedureCodes []string `json:"procedure_codes"` // CPT codes
	DiagnosisCodes []string `json:"diagnosis_codes"` // ICD-10 codes
	PlaceOfService string   `json:"place_of_service"`

	// Financial
	BilledAmount     string `json:"billed_amount"`
	AllowedAmount    string `json:"allowed_amount,omitempty"`
	CopayAmount      string `json:"copay_amount,omitempty"`
	DeductibleAmount string `json:"deductible_amount,omitempty"`

	// Supporting documents (IPFS CIDs)
	SupportingDocuments []string `json:"supporting_documents,omitempty"`

	// Metadata
	SubmissionTimestamp int64  `json:"submission_timestamp"`
	ClaimType           string `json:"claim_type"` // professional, institutional, etc.

	// Encryption metadata
	EncryptionKeyID string   `json:"encryption_key_id,omitempty"`
	EncryptedFields []string `json:"encrypted_fields,omitempty"`
}

// Verification represents a verifier's decision
type Verification struct {
	Verifier  common.Address `json:"verifier"`
	Approved  bool           `json:"approved"`
	Reason    string         `json:"reason"`
	Timestamp time.Time      `json:"timestamp"`
}

// ClaimSubmissionRequest is the API request for submitting a claim
type ClaimSubmissionRequest struct {
	ClaimData ClaimData `json:"claim_data"`
}

// ClaimSubmissionResponse is the API response after submitting a claim
type ClaimSubmissionResponse struct {
	ClaimID     string `json:"claim_id"`
	IPFSCID     string `json:"ipfs_cid"`
	DataHash    string `json:"data_hash"`
	Transaction string `json:"transaction_hash"`
}

// ValidationRequest represents the outcome of claim validation
type ValidationResult struct {
	Valid     bool     `json:"valid"`
	Approved  bool     `json:"approved"`
	Score     float64  `json:"score"`
	Reasons   []string `json:"reasons"`
	Warnings  []string `json:"warnings,omitempty"`
	RiskLevel string   `json:"risk_level"` // low, medium, high
}
