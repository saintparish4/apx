package verifier

import (
	"context"
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/rs/zerolog/log"
	"github.com/saintparish4/apx/internal/domain"
	"github.com/saintparish4/apx/internal/ethereum"
	"github.com/saintparish4/apx/internal/ipfs"
)

// ValidationRule defines a single validation rule
type ValidationRule struct {
	Name        string
	Description string
	Severity    string // error, warning, etc
	Check       func(*domain.ClaimData) (bool, string)
}

// Node is the verification node service
type Node struct {
	ethService  *ethereum.Service
	ipfsService *ipfs.Service
	rules       []ValidationRule
}

// NewNode creates a new verification node
func NewNode(ethService *ethereum.Service, ipfsService *ipfs.Service) *Node {
	node := &Node{
		ethService:  ethService,
		ipfsService: ipfsService,
	}
	node.initializeRules()
	return node
}

// initializeRules sets up the validation rules
func (n *Node) initializeRules() {
	n.rules = []ValidationRule{
		{
			Name:        "valid_procedure_codes",
			Description: "All procedure codes must be valid CPT codes",
			Severity:    "error",
			Check:       n.checkProcedureCodes,
		},
		{
			Name:        "valid_diagnosis_codes",
			Description: "All diagnosis codes must be valid ICD-10 format",
			Severity:    "error",
			Check:       n.checkDiagnosisCodes,
		},
		{
			Name:        "valid_amount",
			Description: "Claim amount must be positive and reasonable",
			Severity:    "error",
			Check:       n.checkAmount,
		},
		{
			Name:        "valid_service_date",
			Description: "Service date must be in the past and not too old",
			Severity:    "error",
			Check:       n.checkServiceDate,
		},
		{
			Name:        "valid_npi",
			Description: "Provider NPI must be valid format",
			Severity:    "error",
			Check:       n.checkNPI,
		},
		{
			Name:        "has_required_fields",
			Description: "All required fields must be present",
			Severity:    "error",
			Check:       n.checkRequiredFields,
		},
		{
			Name:        "reasonable_amount_for_procedure",
			Description: "Amount should be reasonable for the procedures",
			Severity:    "warning",
			Check:       n.checkAmountReasonableness,
		},
		{
			Name:        "diagnosis_procedure_match",
			Description: "Diagnosis and procedure codes should be compatible",
			Severity:    "warning",
			Check:       n.checkDiagnosisProcedureMatch,
		},
	}
}

// Start starts the verification node to listen for claim events
func (n *Node) Start(ctx context.Context) error {
	events, err := n.ethService.SubscribeToClaimEvents(ctx)
	if err != nil {
		return fmt.Errorf("failed to subscribe to events: %w", err)
	}

	log.Info().Msg("Verification node started, listening for claims...")

	go func() {
		for event := range events {
			if event.Type == "ClaimSubmitted" {
				go n.processClaim(ctx, event)
			}
		}
	}()

	return nil
}

// processClaim processes a single claim
func (n *Node) processClaim(ctx context.Context, event *ethereum.ClaimEvent) {
	logger := log.With().
		Str("claim_id", fmt.Sprintf("%x", event.ClaimID)).
		Str("provider", event.Provider.Hex()).
		Logger()

	logger.Info().Msg("Processing claim...")

	// Retrieve claim data from IPFS
	claimData, err := n.ipfsService.RetrieveClaimData(ctx, event.IPFSCID)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to retrieve claim data from IPFS")
		// TODO: Submit rejection transaction
		return
	}

	// Validate the claim
	result := n.ValidateClaim(claimData)

	logger.Info().
		Bool("approved", result.Approved).
		Float64("score", result.Score).
		Strs("reasons", result.Reasons).
		Msg("Validation completed")
}

// ValdiateClaim validates claim data against all rules
func (n *Node) ValidateClaim(claimData *domain.ClaimData) *domain.ValidationResult {
	result := &domain.ValidationResult{
		Valid:    true,
		Approved: true,
		Score:    100.0,
		Reasons:  []string{},
		Warnings: []string{},
	}

	errorCount := 0
	warningCount := 0

	for _, rule := range n.rules {
		passed, message := rule.Check(claimData)
		if !passed {
			if rule.Severity == "error" {
				errorCount++
				result.Reasons = append(result.Reasons, fmt.Sprintf("%s: %s", rule.Name, message))
			} else {
				warningCount++
				result.Warnings = append(result.Warnings, fmt.Sprintf("%s: %s", rule.Name, message))
			}
		}
	}

	// Calculate score (errors have more impact than warnings)
	result.Score = 100.0 - float64(errorCount*15) - float64(warningCount*5)
	if result.Score < 0 {
		result.Score = 0
	}

	// Determine validity and approval
	result.Valid = errorCount == 0
	result.Approved = errorCount == 0 && result.Score >= 60

	// Determine risk level
	switch {
	case errorCount > 0 || result.Score < 50:
		result.RiskLevel = "high"
	case warningCount > 1 || result.Score < 80:
		result.RiskLevel = "medium"
	default:
		result.RiskLevel = "low"
	}

	return result
}

// Individual validation checks

func (n *Node) checkProcedureCodes(data *domain.ClaimData) (bool, string) {
	if len(data.ProcedureCodes) == 0 {
		return false, "No procedure codes provided"
	}

	// CPT codes are 5 digits, optionally followed by modifiers
	cptRegex := regexp.MustCompile(`^\d{5}(-\d{2})?$`)

	for _, code := range data.ProcedureCodes {
		if !cptRegex.MatchString(code) {
			return false, fmt.Sprintf("Invalid CPT code: %s", code)
		}
	}

	return true, ""
}

func (n *Node) checkDiagnosisCodes(data *domain.ClaimData) (bool, string) {
	if len(data.DiagnosisCodes) == 0 {
		return false, "No diagnosis codes provided"
	}

	// ICD-10 format: Letter + 2 digits + optional decimal + up to 4 more chars
	icd10Regex := regexp.MustCompile(`^[A-Z]\d{2}(\.\d{1,4})?$`)

	for _, code := range data.DiagnosisCodes {
		if !icd10Regex.MatchString(code) {
			return false, fmt.Sprintf("Invalid ICD-10 code format: %s", code)
		}
	}

	return true, ""
}

func (n *Node) checkAmount(data *domain.ClaimData) (bool, string) {
	amount, err := strconv.ParseFloat(data.BilledAmount, 64)
	if err != nil {
		return false, "Invalid amount format"
	}

	if amount <= 0 {
		return false, "Amount must be positive"
	}

	// Max reasonable claim amount ($1M)
	if amount > 1000000 {
		return false, "Amount exceeds maximum allowed"
	}

	return true, ""
}

func (n *Node) checkServiceDate(data *domain.ClaimData) (bool, string) {
	if data.ServiceDate == "" {
		return false, "Service date is required"
	}

	serviceDate, err := time.Parse("2006-01-02", data.ServiceDate)
	if err != nil {
		return false, "Invalid service date format (YYYY-MM-DD)"
	}

	now := time.Now()

	// Service date cannot be in the future
	if serviceDate.After(now) {
		return false, "Service date cannot be in the future"
	}

	// Service date cannot be more than 1 year old
	oneYearAgo := now.AddDate(-1, 0, 0)
	if serviceDate.Before(oneYearAgo) {
		return false, "Service date cannot be more than 1 year old"
	}

	return true, ""
}

func (n *Node) checkNPI(data *domain.ClaimData) (bool, string) {
	if data.ProviderNPI == "" {
		return false, "Provider NPI is required"
	}

	// NPI is exactly 10 digits
	npiRegex := regexp.MustCompile(`^\d{10}$`)
	if !npiRegex.MatchString(data.ProviderNPI) {
		return false, "Invalid NPI format (must be 10 digits)"
	}

	// TODO: Validate NPI checksum (Luhn algorithm variant)

	return true, ""
}

func (n *Node) checkRequiredFields(data *domain.ClaimData) (bool, string) {
	missing := []string{}

	if data.PatientID == "" {
		missing = append(missing, "patient_id")
	}
	if data.ProviderNPI == "" {
		missing = append(missing, "provider_npi")
	}
	if data.ServiceDate == "" {
		missing = append(missing, "service_date")
	}
	if len(data.ProcedureCodes) == 0 {
		missing = append(missing, "procedure_codes")
	}
	if len(data.DiagnosisCodes) == 0 {
		missing = append(missing, "diagnosis_codes")
	}
	if data.BilledAmount == "" {
		missing = append(missing, "billed_amount")
	}
	if data.ClaimType == "" {
		missing = append(missing, "claim_type")
	}

	if len(missing) > 0 {
		return false, fmt.Sprintf("Missing required fields: %s", strings.Join(missing, ", "))
	}

	return true, ""
}

func (n *Node) checkAmountReasonableness(data *domain.ClaimData) (bool, string) {
	amount, err := strconv.ParseFloat(data.BilledAmount, 64)
	if err != nil {
		return true, "" // Already checked in checkAmount
	}

	// Simple heuristic: flag if amount is unusually high for number of procedures
	avgPerProcedure := amount / float64(len(data.ProcedureCodes))

	// Flag if average is over $10k per procedure (very rough heuristic)
	if avgPerProcedure > 10000 {
		return false, fmt.Sprintf("Amount seems high: $%.2f per procedure", avgPerProcedure)
	}

	return true, ""
}

func (n *Node) checkDiagnosisProcedureMatch(data *domain.ClaimData) (bool, string) {
	// This would ideally use a medical coding database to validate
	// that the procedures are appropriate for the diagnoses
	// For MVP, I will just check that we have both

	if len(data.DiagnosisCodes) == 0 || len(data.ProcedureCodes) == 0 {
		return false, "Both diagnosis and procedure codes required"
	}

	// TODO: Implement actual medical coding validation
	// This would involve looking up CPT/ICD-10 compatibility matrices

	return true, ""
}

// ManualValidate allows manual validation without blockchain events
func (n *Node) ManualValidate(ctx context.Context, ipfsCid string) (*domain.ValidationResult, error) {
	claimData, err := n.ipfsService.RetrieveClaimData(ctx, ipfsCid)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve claim data: %w", err)
	}

	return n.ValidateClaim(claimData), nil
}
