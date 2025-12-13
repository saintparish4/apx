package ipfs

import (
	"bytes"
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/rs/zerolog/log"
	"github.com/saintparish4/apx/internal/domain"
)

// Service handles IPFS Operations
type Service struct {
	apiURL        string
	gatewayURL    string
	httpClient    *http.Client
	encryptionKey []byte // AES-256 key for encryption
}

// NewService creates a new IPFS Service
func NewService(apiURL, gatewayURL string, encryptionKey []byte) *Service {
	return &Service{
		apiURL:     apiURL,
		gatewayURL: gatewayURL,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
		encryptionKey: encryptionKey,
	}
}

// AddResult contains the result of adding content to IPFS
type AddResult struct {
	CID  string `json:"Hash"`
	Size string `json:"Size"`
}

// StoreClaimData encrypts and stores claim data in IPFS
func (s *Service) StoreClaimData(ctx context.Context, data *domain.ClaimData) (string, error) {
	// Serialize to JSON
	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", fmt.Errorf("failed to marshal claim data: %w", err)
	}

	// Encrypt the data
	encryptedData, err := s.encrypt(jsonData)
	if err != nil {
		return "", fmt.Errorf("failed to encrypt claim data: %w", err)
	}

	// Add to IPFS
	cid, err := s.add(ctx, encryptedData)
	if err != nil {
		return "", fmt.Errorf("failed to add to IPFS: %w", err)
	}

	log.Info().
		Str("cid", cid).
		Int("orginal_size", len(jsonData)).
		Int("encrypted_size", len(encryptedData)).
		Msg("Stored claim data in IPFS")

	return cid, nil
}

// RetrieveClaimData retrieves and decrypts claim data from IPFS
func (s *Service) RetrieveClaimData(ctx context.Context, cid string) (*domain.ClaimData, error) {
	// Get from IPFS
	encryptedData, err := s.cat(ctx, cid)
	if err != nil {
		return nil, fmt.Errorf("failed to get from IPFS: %w", err)
	}

	// Decrypt
	jsonData, err := s.decrypt(encryptedData)
	if err != nil {
		return nil, fmt.Errorf("failed to decrypt claim data: %w", err)
	}

	// Deserialize
	var data domain.ClaimData
	if err := json.Unmarshal(jsonData, &data); err != nil {
		return nil, fmt.Errorf("failed to unmarshal claim data: %w", err)
	}

	return &data, nil
}

// StoreRaw stores raw bytes in IPFS (for supporting documents)
func (s *Service) StoreRaw(ctx context.Context, data []byte, encrypt bool) (string, error) {
	var toStore []byte
	var err error

	if encrypt {
		toStore, err = s.encrypt(data)
		if err != nil {
			return "", fmt.Errorf("failed to encrypt: %w", err)
		}
	} else {
		toStore = data
	}

	return s.add(ctx, toStore)
}

// RetrieveRaw retrieves raw bytes from IPFS
func (s *Service) RetrieveRaw(ctx context.Context, cid string, encrypted bool) ([]byte, error) {
	data, err := s.cat(ctx, cid)
	if err != nil {
		return nil, err
	}

	if encrypted {
		return s.decrypt(data)
	}
	return data, nil
}

// Pin pins a CID to ensure it's not garbage collected
func (s *Service) Pin(ctx context.Context, cid string) error {
	url := fmt.Sprintf("%s/api/v0/pin/add?arg=%s", s.apiURL, cid)

	req, err := http.NewRequestWithContext(ctx, "POST", url, nil)
	if err != nil {
		return err
	}

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to pin: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("pin failed with status %d: %s", resp.StatusCode, string(body))
	}

	return nil
}

// Unpin removes a pin from a CID
func (s *Service) Unpin(ctx context.Context, cid string) error {
	url := fmt.Sprintf("%s/api/v0/pin/rm?arg=%s", s.apiURL, cid)

	req, err := http.NewRequestWithContext(ctx, "POST", url, nil)
	if err != nil {
		return err
	}

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to unpin: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("unpin failed with status %d: %s", resp.StatusCode, string(body))
	}

	return nil
}

// GetGatewayURL returns the gateway URL for a CID
func (s *Service) GetGatewayURL(cid string) string {
	return s.gatewayURL + cid
}

// add adds content to IPFS and returns the CID
func (s *Service) add(ctx context.Context, data []byte) (string, error) {
	url := fmt.Sprintf("%s/api/v0/add?pin=true", s.apiURL)

	// Create multipart form
	body := &bytes.Buffer{}
	body.Write(data)

	req, err := http.NewRequestWithContext(ctx, "POST", url, body)
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/octet-stream")

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("IPFS add request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("IPFS add failed with status %d: %s", resp.StatusCode, string(respBody))
	}

	var result AddResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", fmt.Errorf("failed to decode IPFS response: %w", err)
	}

	return result.CID, nil
}

// cat retrieves content from IPFS by CID
func (s *Service) cat(ctx context.Context, cid string) ([]byte, error) {
	url := fmt.Sprintf("%s/api/v0/cat?arg=%s", s.apiURL, cid)

	req, err := http.NewRequestWithContext(ctx, "POST", url, nil)
	if err != nil {
		return nil, err
	}

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("IPFS cat request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("IPFS cat failed with status %d: %s", resp.StatusCode, string(body))
	}

	return io.ReadAll(resp.Body)
}

// encrypt encrypts data using AES-256-GCM
func (s *Service) encrypt(plaintext []byte) ([]byte, error) {
	block, err := aes.NewCipher(s.encryptionKey)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, err
	}

	// Prepend nonce to ciphertext
	ciphertext := gcm.Seal(nonce, nonce, plaintext, nil)
	return ciphertext, nil
}

// decrypt decrypts data using AES-256-GCM
func (s *Service) decrypt(ciphertext []byte) ([]byte, error) {
	block, err := aes.NewCipher(s.encryptionKey)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		return nil, fmt.Errorf("ciphertext too short")
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return nil, err
	}

	return plaintext, nil
}

// HealthCheck checks if IPFS node is available
func (s *Service) HealthCheck(ctx context.Context) error {
	url := fmt.Sprintf("%s/api/v0/id", s.apiURL)

	req, err := http.NewRequestWithContext(ctx, "POST", url, nil)
	if err != nil {
		return err
	}

	resp, err := s.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("IPFS health check failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("IPFS health check returned status %d", resp.StatusCode)
	}

	return nil
}
