package main

import (
	"context"
	"encoding/hex"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/saintparish4/apx/internal/api"
	"github.com/saintparish4/apx/internal/config"
	"github.com/saintparish4/apx/internal/ethereum"
	"github.com/saintparish4/apx/internal/ipfs"
	"github.com/saintparish4/apx/internal/verifier"
)

func main() {
	// Configure logging
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	if os.Getenv("ENVIRONMENT") != "production" {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	}

	// Load Configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to load configuration")
	}

	log.Info().
		Str("environment", cfg.Environment).
		Str("port", cfg.ServerPort).
		Msg("Starting APX Healthcare Claims Verification API")

	// Initialize Ethereum Service
	ethService, err := ethereum.NewService(
		cfg.EthereumRPCURL,
		cfg.ChainID,
		cfg.PrivateKey,
		cfg.ProviderRegistryAddress,
		cfg.ClaimsRegistryAddress,
	)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to initialize Ethereum Service")
	}
	defer ethService.Close()

	// Initialize IPFS Service
	// Generate or load encryption key ( TODO: in production, use proper key management)
	encryptionKey, err := getOrCreateEncryptionKey()
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to get encryption key")
	}

	ipfsService := ipfs.NewService(cfg.IPFSAPIURL, cfg.IPFSGatewayURL, encryptionKey)

	// Initialize Verifier Node
	verifierNode := verifier.NewNode(ethService, ipfsService)

	// Initialize API Handler
	handler := api.NewHandler(ethService, ipfsService, verifierNode)

	// Set up Gin router
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(requestLogger())

	// CORS configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins:     cfg.AllowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Routes
	router.GET("/health", handler.HealthCheck)
	router.GET("/stats", handler.GetStats)

	// Claims routes
	claims := router.Group("/claims")
	{
		claims.POST("", handler.SubmitClaim)
		claims.GET("/:id", handler.GetClaim)
		claims.GET("/data/:cid", handler.GetClaimData)
		claims.POST("/validate", handler.ValidateClaim)
	}

	// Providers routes
	providers := router.Group("/providers")
	{
		providers.GET("", handler.ListProviders)
		providers.GET("/:address", handler.GetProvider)
	}

	// Documents routes
	router.POST("/documents", handler.UploadDocument)

	// WebSocket for real-time updates (placeholder)
	router.GET("/ws", func(c *gin.Context) {
		c.JSON(http.StatusNotImplemented, gin.H{
			"message": "WebSocket endpoint not yet implemented",
		})
	})

	// Create HTTP server
	srv := &http.Server{
		Addr:         ":" + cfg.ServerPort,
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start verifier node in background
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	if cfg.EthereumRPCURL != "" {
		go func() {
			if err := verifierNode.Start(ctx); err != nil {
				log.Error().Err(err).Msg("Verifier node failed to start")
			}
		}()
	}

	// Start server in goroutine
	go func() {
		log.Info().Str("addr", srv.Addr).Msg("Starting HTTP server")
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal().Err(err).Msg("HTTP server failed")
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Info().Msg("Shutting down server...")

	// Graceful shutdown with 30 second timeout
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer shutdownCancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Error().Err(err).Msg("Server forced to shutdown")
	}

	log.Info().Msg("Server exited")
}

// requestLogger creates a request logging middleware
func requestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		query := c.Request.URL.RawQuery

		c.Next()

		latency := time.Since(start)
		status := c.Writer.Status()

		event := log.Info()
		if status >= 400 {
			event = log.Warn()
		}
		if status >= 500 {
			event = log.Error()
		}

		event.
			Str("method", c.Request.Method).
			Str("path", path).
			Str("query", query).
			Int("status", status).
			Dur("latency", latency).
			Str("ip", c.ClientIP()).
			Msg("Request")
	}
}

// getOrCreateEncryptionKey gets or creates a 32-byte AES encryption key
func getOrCreateEncryptionKey() ([]byte, error) {
	keyHex := os.Getenv("IPFS_ENCRYPTION_KEY")
	if keyHex != "" {
		return hex.DecodeString(keyHex)
	}

	// For development, use a fixed key (DO NOT USE IN PRODUCTION)
	log.Warn().Msg("Using default encryption key - NOT SECURE FOR PRODUCTION")
	return []byte("12345678901234567890123456789012"), nil // 32 bytes for AES-256
}
