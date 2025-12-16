package api

import (
	"context"
	"encoding/hex"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"github.com/saintparish4/apx/internal/domain"
	"github.com/saintparish4/apx/internal/ethereum"
	"github.com/saintparish4/apx/internal/ipfs"
	"github.com/saintparish4/apx/internal/verifier"
)

// Handler contains all HTTP handlers
type Handler struct {
	ethService   *ethereum.Service
	ipfsService  *ipfs.Service
	verifierNode *verifier.Node
}

// NewHandler createsa a new handler
func NewHandler(
	ethService *ethereum.Service,
	ipfsService *ipfs.Service,
	verifierNode *verifier.Node,
) *Handler {
	return &Handler{
		ethService:   ethService,
		ipfsService:  ipfsService,
		verifierNode: verifierNode,
	}
}

// SubmitClaimRequest represents the claim submission request
type SubmitClaimRequest struct {
	ClaimData domain.ClaimData `json:"claim_data" binding:"required"`
}

// SubmitClaimResponse represents the claim submission response
type SubmitClaimResponse struct {
	ClaimID    string `json:"claim_id"`
	IPFSCID    string `json:"ipfs_cid"`
	DataHash   string `json:"data_hash"`
	TxHash     string `json:"tx_hash,omitempty"`
	GatewayURL string `json:"gateway_url"`
}

// SubmitClaim handles POST /claims
func (h *Handler) SubmitClaim(c *gin.Context) {
	var req SubmitClaimRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request body",
			"details": err.Error(),
		})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 30*time.Second)
	defer cancel()

	// Set submission timestamp
	req.ClaimData.SubmissionTimestamp = time.Now().Unix()

	// Store claim data in IPFS
	ipfsCid, err := h.ipfsService.StoreClaimData(ctx, &req.ClaimData)
	if err != nil {
		log.Error().Err(err).Msg("Failed to store claim data in IPFS")
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to store claim data",
		})
		return
	}

	// Calculate data hash
	claimDataBytes, err := json.Marshal(req.ClaimData)
	if err != nil {
		log.Error().Err(err).Msg("Failed to marshal claim data")
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to process claim data",
		})
		return
	}
	dataHash := ethereum.HashClaimData(claimDataBytes)

	// TODO: Submit claim to blockchain
	// This would call claimsRegistry.submitClaim(dataHash, ipfsCid, amount)
	// For now, return the prepared data

	resp := SubmitClaimResponse{
		ClaimID:    "", // Will be set after blockchain submission
		IPFSCID:    ipfsCid,
		DataHash:   "0x" + hex.EncodeToString(dataHash[:]),
		GatewayURL: h.ipfsService.GetGatewayURL(ipfsCid),
	}

	c.JSON(http.StatusCreated, resp)
}

// GetClaimRequest represents path paramaeters for claim retrieval
type GetClaimRequest struct {
	ClaimID string `uri:"id" binding:"required"`
}

// GetClaim handles GET /claims/:id
func (h *Handler) GetClaim(c *gin.Context) {
	var req GetClaimRequest
	if err := c.ShouldBindUri(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid claim ID"})
		return
	}

	// TODO: Fetch claim from blockchain using claimsRegistry.getClaim(claimId)
	// For now, return placeholder

	c.JSON(http.StatusOK, gin.H{
		"claim_id": req.ClaimID,
		"message":  "Claim retrieval requires blockchain connection",
	})
}

// GetClaimDataRequest represents the request for claim data
type GetClaimDataRequest struct {
	IPFSCID string `uri:"cid" binding:"required"`
}

// GetClaimData handles GET /claims/data/:cid
func (h *Handler) GetClaimData(c *gin.Context) {
	var req GetClaimDataRequest
	if err := c.ShouldBindUri(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid IPFS CID"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 30*time.Second)
	defer cancel()

	claimData, err := h.ipfsService.RetrieveClaimData(ctx, req.IPFSCID)
	if err != nil {
		log.Error().Err(err).Str("cid", req.IPFSCID).Msg("Failed to retrieve claim data")
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Claim data not found",
		})
		return
	}

	c.JSON(http.StatusOK, claimData)
}

// ValidateClaimRequest represents the validation request
type ValidateClaimRequest struct {
	ClaimData *domain.ClaimData `json:"claim_data,omitempty"`
	IPFSCID   string            `json:"ipfs_cid,omitempty"`
}

// ValidateClaim handles POST /claims/validate
func (h *Handler) ValidateClaim(c *gin.Context) {
	var req ValidateClaimRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var result *domain.ValidationResult

	if req.ClaimData != nil {
		// Validate provided claim data directly
		result = h.verifierNode.ValidateClaim(req.ClaimData)
	} else if req.IPFSCID != "" {
		// Retrieve and validate from IPFS
		ctx, cancel := context.WithTimeout(c.Request.Context(), 30*time.Second)
		defer cancel()

		var err error
		result, err = h.verifierNode.ManualValidate(ctx, req.IPFSCID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to validate claim",
				"details": err.Error(),
			})
			return
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Either claim_data or ipfs_cid must be provided",
		})
		return
	}

	if result == nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Validation returned no result",
		})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetProviderRequest represents path parameters for provider retrieval
type GetProviderRequest struct {
	Address string `uri:"address" binding:"required"`
}

// GetProvider handles GET /providers/:address
func (h *Handler) GetProvider(c *gin.Context) {
	var req GetProviderRequest
	if err := c.ShouldBindUri(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid provider address"})
		return
	}

	// TODO: Fetch provider from blockchain using providerRegistry.getProvider(address)

	c.JSON(http.StatusOK, gin.H{
		"address": req.Address,
		"message": "Provider retrieval requires blockchain connection",
	})
}

// ListProvidersRequest represents query parameters for listing providers
type ListProvidersRequest struct {
	Offset int `form:"offset" binding:"min=0"`
	Limit  int `form:"limit" binding:"min=1,max=100"`
}

// ListProviders handles GET /providers
func (h *Handler) ListProviders(c *gin.Context) {
	var req ListProvidersRequest
	req.Limit = 20 // Default
	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid query parameters"})
		return
	}

	// TODO: Fetch providers from blockchain
	c.JSON(http.StatusOK, gin.H{
		"providers": []interface{}{},
		"offset":    req.Offset,
		"limit":     req.Limit,
		"message":   "Provider listing requires blockchain connection",
	})
}

// HealthCheck handles GET /health
func (h *Handler) HealthCheck(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	status := gin.H{
		"status":    "healthy",
		"timestamp": time.Now().Format(time.RFC3339),
	}

	// Check Ethereum connection
	if err := h.ethService.HealthCheck(ctx); err != nil {
		status["ethereum"] = gin.H{"status": "unhealthy", "error": err.Error()}
	} else {
		status["ethereum"] = gin.H{"status": "healthy"}
	}

	// Check IPFS connection
	if err := h.ipfsService.HealthCheck(ctx); err != nil {
		status["ipfs"] = gin.H{"status": "unhealthy", "error": err.Error()}
	} else {
		status["ipfs"] = gin.H{"status": "healthy"}
	}

	c.JSON(http.StatusOK, status)
}

// GetStats handles GET /stats
func (h *Handler) GetStats(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	stats := gin.H{
		"timestamp": time.Now().Format(time.RFC3339),
	}

	// Get block number
	blockNumber, err := h.ethService.GetBlockNumber(ctx)
	if err == nil {
		stats["current_block"] = blockNumber
	}

	// TODO: Get contract stats
	// - Total claims
	// - Approved claims
	// - Rejected claims
	// - Total providers
	// - Active providers

	c.JSON(http.StatusOK, stats)
}

// UploadDocument handles POST /documents
func (h *Handler) UploadDocument(c *gin.Context) {
	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file provided"})
		return
	}
	defer file.Close()

	// Check file size (max 10MB)
	if header.Size > 10*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File too large (max 10MB)"})
		return
	}

	// Read file content
	content, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read file"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 60*time.Second)
	defer cancel()

	// Store in IPFS (encrypted by default)
	encrypt := c.Query("encrypt") != "false"
	cid, err := h.ipfsService.StoreRaw(ctx, content, encrypt)
	if err != nil {
		log.Error().Err(err).Msg("Failed to store document in IPFS")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store document"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"cid":         cid,
		"filename":    header.Filename,
		"size":        header.Size,
		"encrypted":   encrypt,
		"gateway_url": h.ipfsService.GetGatewayURL(cid),
	})
}

// Helper function to parse pagination parameters
// TODO: Move to utils package
func parsePagination(c *gin.Context) (offset, limit int) {
	offset, _ = strconv.Atoi(c.DefaultQuery("offset", "0"))
	limit, _ = strconv.Atoi(c.DefaultQuery("limit", "20"))

	if offset < 0 {
		offset = 0
	}
	if limit < 1 {
		limit = 1
	}
	if limit > 100 {
		limit = 100
	}

	return offset, limit
}
