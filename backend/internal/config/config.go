package config

import (
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	// Server
	ServerPort     string
	Environment    string
	AllowedOrigins []string

	// Database
	DatabaseURL string

	// Ethereum
	EthereumRPCURL          string
	ProviderRegistryAddress string
	ClaimsRegistryAddress   string
	PrivateKey              string // verifier node private key
	ChainID                 int64

	// IPFS
	IPFSAPIURL     string
	IPFSGatewayURL string

	// JWT
	JWTSecret     string
	JWTExpiration time.Duration

	// Rate Limiting
	RateLimitPerMinute int
}

func Load() (*Config, error) {
	// Load .env file if exists
	_ = godotenv.Load()

	cfg := &Config{
		// Server Defaults
		ServerPort:     getEnv("SERVER_PORT", "8080"),
		Environment:    getEnv("ENVIRONMENT", "development"),
		AllowedOrigins: []string{getEnv("ALLOWED_ORIGINS", "http://localhost:3000")},

		// Database
		DatabaseURL: getEnv("DATABASE_URL", "postgres://user:password@localhost:5432/apx?sslmode=disable"),

		// Ethereum - Sepolia defaults
		EthereumRPCURL:          getEnv("ETHEREUM_RPC_URL", ""),
		ProviderRegistryAddress: getEnv("PROVIDER_REGISTRY_ADDRESS", ""),
		ClaimsRegistryAddress:   getEnv("CLAIMS_REGISTRY_ADDRESS", ""),
		PrivateKey:              getEnv("VERIFIER_PRIVATE_KEY", ""),
		ChainID:                 getEnvInt64("CHAIN_ID", 11155111), // Sepolia Chain ID

		// IPFS
		IPFSAPIURL:     getEnv("IPFS_API_URL", "https://localhost:5001"),
		IPFSGatewayURL: getEnv("IPFS_GATEWAY_URL", "https://localhost:8080/ipfs/"),

		// JWT
		JWTSecret:     getEnv("JWT_SECRET", "change-me-in-production"),
		JWTExpiration: getEnvDuration("JWT_EXPIRATION", 24*time.Hour),

		// Rate Limiting
		RateLimitPerMinute: getEnvInt("RATE_LIMIT_PER_MINUTE", 60),
	}
	return cfg, nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

func getEnvInt64(key string, defaultValue int64) int64 {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.ParseInt(value, 10, 64); err == nil {
			return intValue
		}
	}
	return defaultValue
}

func getEnvDuration(key string, defaultValue time.Duration) time.Duration {
	if value := os.Getenv(key); value != "" {
		if duration, err := time.ParseDuration(value); err == nil {
			return duration
		}
	}
	return defaultValue
}
