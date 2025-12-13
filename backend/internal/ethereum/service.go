package ethereum

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"math/big"
	"time"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/rs/zerolog/log"

	"github.com/saintparish4/apx/internal/domain"
)

// Service handles Ethereum blockchain interactions
type Service struct {
	client               *ethclient.Client
	chainID              *big.Int
	privateKey           *ecdsa.PrivateKey
	signerAddress        common.Address
	providerRegistryAddr common.Address
	claimsRegistryAddr   common.Address
}

// NewService creates a new Ethereum Service
func NewService(
	rpcURL string,
	chainID int64,
	privateKeyHex string,
	providerRegistryAddr string,
	claimsRegistryAddr string,
) (*Service, error) {
	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to Ethereum node: %w", err)
	}

	var privateKey *ecdsa.PrivateKey
	var signerAddress common.Address

	if privateKeyHex != "" {
		privateKey, err = crypto.HexToECDSA(privateKeyHex)
		if err != nil {
			return nil, fmt.Errorf("invalid private key: %w", err)
		}
		signerAddress = crypto.PubkeyToAddress(privateKey.PublicKey)
	}

	return &Service{
		client:               client,
		chainID:              big.NewInt(chainID),
		privateKey:           privateKey,
		signerAddress:        signerAddress,
		providerRegistryAddr: common.HexToAddress(providerRegistryAddr),
		claimsRegistryAddr:   common.HexToAddress(claimsRegistryAddr),
	}, nil
}

// GetSignerAddress returns the address of the signer
func (s *Service) GetSignerAddress() common.Address {
	return s.signerAddress
}

// GetTransactOpts creates transaction options for sending transactions
func (s *Service) GetTransactOpts(ctx context.Context) (*bind.TransactOpts, error) {
	if s.privateKey == nil {
		return nil, fmt.Errorf("no private key configured")
	}

	nonce, err := s.client.PendingNonceAt(ctx, s.signerAddress)
	if err != nil {
		return nil, fmt.Errorf("failed to get pending nonce: %w", err)
	}

	gasPrice, err := s.client.SuggestGasPrice(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get gas price: %w", err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(s.privateKey, s.chainID)
	if err != nil {
		return nil, fmt.Errorf("failed to create transactor: %w", err)
	}

	auth.Nonce = big.NewInt(int64(nonce))
	auth.Value = big.NewInt(0)
	auth.GasPrice = gasPrice
	auth.Context = ctx

	return auth, nil
}

// GetCallOpts creates call options for read-only calls
func (s *Service) GetCallOpts(ctx context.Context) *bind.CallOpts {
	return &bind.CallOpts{
		Context: ctx,
	}
}

// WaitForTransaction waits for a transaction to be mined
func (s *Service) WaitForTransaction(ctx context.Context, txHash common.Hash) (*types.Receipt, error) {
	ticker := time.NewTicker(2 * time.Second)
	defer ticker.Stop()

	timeout := time.After(5 * time.Minute)

	for {
		select {
		case <-ctx.Done():
			return nil, ctx.Err()
		case <-timeout:
			return nil, fmt.Errorf("transaction timeout")
		case <-ticker.C:
			receipt, err := s.client.TransactionReceipt(ctx, txHash)
			if err == ethereum.NotFound {
				continue
			}
			if err != nil {
				return nil, fmt.Errorf("failed to get receipt: %w", err)
			}
			if receipt.Status == types.ReceiptStatusFailed {
				return receipt, fmt.Errorf("transaction failed")
			}
			return receipt, nil
		}
	}
}

// SubscribeToClaimEvents subscribes to claim-related events
func (s *Service) SubscribeToClaimEvents(ctx context.Context) (chan *ClaimEvent, error) {
	// Create filter query for ClaimSubmitted events
	query := ethereum.FilterQuery{
		Addresses: []common.Address{s.claimsRegistryAddr},
	}

	logs := make(chan types.Log)
	sub, err := s.client.SubscribeFilterLogs(ctx, query, logs)
	if err != nil {
		return nil, fmt.Errorf("failed to subscribe to logs: %w", err)
	}

	events := make(chan *ClaimEvent, 100)

	go func() {
		defer close(events)
		for {
			select {
			case <-ctx.Done():
				sub.Unsubscribe()
				return
			case err := <-sub.Err():
				log.Error().Err(err).Msg("Event subscription error")
				return
			case vLog := <-logs:
				event, err := s.parseClaimEvent(vLog)
				if err != nil {
					log.Warn().Err(err).Msg("Failed to parse event")
					continue
				}
				if event != nil {
					events <- event
				}
			}
		}
	}()
	return events, nil
}

// ClaimEvent represents a parsed claim event
type ClaimEvent struct {
	Type        string
	ClaimID     [32]byte
	Provider    common.Address
	DataHash    [32]byte
	IPFSCID     string
	Amount      *big.Int
	BlockNumber uint64
	TxHash      common.Hash
}

// ClaimSubmitted event signature
var claimSubmittedSig = crypto.Keccak256Hash([]byte("ClaimSubmitted(bytes32,address,bytes32,string,uint256,uint256)"))

func (s *Service) parseClaimEvent(vLog types.Log) (*ClaimEvent, error) {
	if len(vLog.Topics) == 0 {
		return nil, nil
	}

	switch vLog.Topics[0] {
	case claimSubmittedSig:
		return s.parseClaimSubmitted(vLog)
	default:
		return nil, nil
	}
}

func (s *Service) parseClaimSubmitted(vLog types.Log) (*ClaimEvent, error) {
	if len(vLog.Topics) < 3 {
		return nil, fmt.Errorf("invalid ClaimSubmitted event")
	}

	event := &ClaimEvent{
		Type:        "ClaimSubmitted",
		BlockNumber: vLog.BlockNumber,
		TxHash:      vLog.TxHash,
	}

	// Topics[1] = indexed claimId
	copy(event.ClaimID[:], vLog.Topics[1].Bytes())

	// Topics[2] = indexed provider
	event.Provider = common.HexToAddress(vLog.Topics[2].Hex())

	// Non-indexed data needs to be decoded from Data field
	// For a full implementation, will use abigen-generated bindings

	return event, nil
}

// GetBalance gets the ETH balance of an address
func (s *Service) GetBalance(ctx context.Context, address common.Address) (*big.Int, error) {
	return s.client.BalanceAt(ctx, address, nil)
}

// GetBlockNumber gets the current block number
func (s *Service) GetBlockNumber(ctx context.Context) (uint64, error) {
	return s.client.BlockNumber(ctx)
}

// EstimateGas estimates gas for a transaction
func (s *Service) EstimateGas(ctx context.Context, msg ethereum.CallMsg) (uint64, error) {
	return s.client.EstimateGas(ctx, msg)
}

// HealthCheck checks if the Ethereum node is available
func (s *Service) HealthCheck(ctx context.Context) error {
	_, err := s.client.BlockNumber(ctx)
	if err != nil {
		return fmt.Errorf("ethereum health check failed: %w", err)
	}
	return nil
}

// Close closes the client connection
func (s *Service) Close() {
	s.client.Close()
}

// Helper to convert domain types to contract types and vice versa

// ToProviderStatus convery uint8 to domain.ProviderStatus
func ToProviderStatus(status uint8) domain.ProviderStatus {
	return domain.ProviderStatus(status)
}

// ToClaimStatus converts uint8 to domain.ClaimStatus
func ToClaimStatus(status uint8) domain.ClaimStatus {
	return domain.ClaimStatus(status)
}

// HashClaimData creates a keccak256 hash of claim data
func HashClaimData(data []byte) [32]byte {
	return crypto.Keccak256Hash(data)
}
