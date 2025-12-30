# APX API Documentation

## Base URL

**Development:** `http://localhost:8080`  
**Testnet:** `https://api-testnet.apx.health`  
**Production:** `https://api.apx.health`

## Authentication

Currently, the API does not require authentication for development. In production, API keys or OAuth2 tokens will be required.

**Future Authentication:**
- API Key: `X-API-Key: your-api-key`
- Bearer Token: `Authorization: Bearer your-token`

## Rate Limiting

**Current Limits:**
- 100 requests per minute per IP
- 1000 requests per hour per IP

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Content Type

All requests and responses use `application/json` unless otherwise specified.

## Endpoints

### Health Check

Check API health and service status.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "ethereum": {
    "status": "healthy"
  },
  "ipfs": {
    "status": "healthy"
  }
}
```

**Status Codes:**
- `200 OK`: All services healthy
- `503 Service Unavailable`: One or more services unhealthy

**Example (curl):**
```bash
curl -X GET http://localhost:8080/health
```

**Example (JavaScript):**
```javascript
const response = await fetch('http://localhost:8080/health');
const data = await response.json();
console.log(data);
```

**Example (Python):**
```python
import requests

response = requests.get('http://localhost:8080/health')
print(response.json())
```

**Example (Go):**
```go
resp, err := http.Get("http://localhost:8080/health")
if err != nil {
    log.Fatal(err)
}
defer resp.Body.Close()

var health map[string]interface{}
json.NewDecoder(resp.Body).Decode(&health)
fmt.Println(health)
```

---

### Submit Claim

Submit a new healthcare claim for verification.

**Endpoint:** `POST /claims`

**Request Body:**
```json
{
  "claim_data": {
    "patient_id": "hashed_patient_identifier",
    "patient_dob_hash": "hashed_date_of_birth",
    "provider_npi": "1234567890",
    "facility_id": "FAC001",
    "service_date": "2024-01-15",
    "procedure_codes": ["99213", "36415"],
    "diagnosis_codes": ["E11.9", "I10"],
    "place_of_service": "11",
    "billed_amount": "500.00",
    "allowed_amount": "400.00",
    "copay_amount": "50.00",
    "deductible_amount": "100.00",
    "supporting_documents": ["QmHash1", "QmHash2"],
    "claim_type": "professional",
    "encryption_key_id": "key-123",
    "encrypted_fields": ["patient_id", "patient_dob_hash"]
  }
}
```

**Response:**
```json
{
  "claim_id": "",
  "ipfs_cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "data_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "tx_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "gateway_url": "https://ipfs.io/ipfs/QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Status Codes:**
- `201 Created`: Claim submitted successfully
- `400 Bad Request`: Invalid request body
- `500 Internal Server Error`: Failed to store claim data

**Example (curl):**
```bash
curl -X POST http://localhost:8080/claims \
  -H "Content-Type: application/json" \
  -d '{
    "claim_data": {
      "patient_id": "hashed_patient_123",
      "patient_dob_hash": "hashed_dob",
      "provider_npi": "1234567890",
      "service_date": "2024-01-15",
      "procedure_codes": ["99213"],
      "diagnosis_codes": ["E11.9"],
      "place_of_service": "11",
      "billed_amount": "500.00",
      "claim_type": "professional"
    }
  }'
```

**Example (JavaScript):**
```javascript
const claimData = {
  claim_data: {
    patient_id: "hashed_patient_123",
    patient_dob_hash: "hashed_dob",
    provider_npi: "1234567890",
    service_date: "2024-01-15",
    procedure_codes: ["99213"],
    diagnosis_codes: ["E11.9"],
    place_of_service: "11",
    billed_amount: "500.00",
    claim_type: "professional"
  }
};

const response = await fetch('http://localhost:8080/claims', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(claimData)
});

const result = await response.json();
console.log(result);
```

**Example (Python):**
```python
import requests

claim_data = {
    "claim_data": {
        "patient_id": "hashed_patient_123",
        "patient_dob_hash": "hashed_dob",
        "provider_npi": "1234567890",
        "service_date": "2024-01-15",
        "procedure_codes": ["99213"],
        "diagnosis_codes": ["E11.9"],
        "place_of_service": "11",
        "billed_amount": "500.00",
        "claim_type": "professional"
    }
}

response = requests.post(
    'http://localhost:8080/claims',
    json=claim_data
)
print(response.json())
```

---

### Get Claim

Retrieve claim information by claim ID.

**Endpoint:** `GET /claims/:id`

**Path Parameters:**
- `id` (string, required): Claim ID (bytes32 hex string)

**Response:**
```json
{
  "claim_id": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "message": "Claim retrieval requires blockchain connection"
}
```

**Status Codes:**
- `200 OK`: Claim found
- `400 Bad Request`: Invalid claim ID
- `404 Not Found`: Claim not found

**Example (curl):**
```bash
curl -X GET http://localhost:8080/claims/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

**Example (JavaScript):**
```javascript
const claimId = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
const response = await fetch(`http://localhost:8080/claims/${claimId}`);
const claim = await response.json();
console.log(claim);
```

---

### Get Claim Data

Retrieve full claim data from IPFS by CID.

**Endpoint:** `GET /claims/data/:cid`

**Path Parameters:**
- `cid` (string, required): IPFS Content Identifier

**Response:**
```json
{
  "patient_id": "hashed_patient_identifier",
  "patient_dob_hash": "hashed_date_of_birth",
  "provider_npi": "1234567890",
  "facility_id": "FAC001",
  "service_date": "2024-01-15",
  "procedure_codes": ["99213", "36415"],
  "diagnosis_codes": ["E11.9", "I10"],
  "place_of_service": "11",
  "billed_amount": "500.00",
  "allowed_amount": "400.00",
  "copay_amount": "50.00",
  "deductible_amount": "100.00",
  "supporting_documents": ["QmHash1", "QmHash2"],
  "submission_timestamp": 1705312200,
  "claim_type": "professional",
  "encryption_key_id": "key-123",
  "encrypted_fields": ["patient_id", "patient_dob_hash"]
}
```

**Status Codes:**
- `200 OK`: Claim data retrieved successfully
- `400 Bad Request`: Invalid IPFS CID
- `404 Not Found`: Claim data not found
- `500 Internal Server Error`: Failed to retrieve from IPFS

**Example (curl):**
```bash
curl -X GET http://localhost:8080/claims/data/QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Example (JavaScript):**
```javascript
const ipfsCid = "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const response = await fetch(`http://localhost:8080/claims/data/${ipfsCid}`);
const claimData = await response.json();
console.log(claimData);
```

---

### Validate Claim

Validate a claim's data and return validation results.

**Endpoint:** `POST /claims/validate`

**Request Body (Option 1 - Direct Data):**
```json
{
  "claim_data": {
    "patient_id": "hashed_patient_identifier",
    "provider_npi": "1234567890",
    "service_date": "2024-01-15",
    "procedure_codes": ["99213"],
    "diagnosis_codes": ["E11.9"],
    "billed_amount": "500.00"
  }
}
```

**Request Body (Option 2 - IPFS CID):**
```json
{
  "ipfs_cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Response:**
```json
{
  "valid": true,
  "approved": true,
  "score": 0.95,
  "reasons": [
    "Procedure codes match diagnosis",
    "Provider NPI is valid",
    "Service date is within acceptable range"
  ],
  "warnings": [
    "High billed amount relative to allowed amount"
  ],
  "risk_level": "low"
}
```

**Status Codes:**
- `200 OK`: Validation completed
- `400 Bad Request`: Invalid request (missing claim_data or ipfs_cid)
- `500 Internal Server Error`: Validation failed

**Example (curl):**
```bash
curl -X POST http://localhost:8080/claims/validate \
  -H "Content-Type: application/json" \
  -d '{
    "ipfs_cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }'
```

**Example (JavaScript):**
```javascript
const validationRequest = {
  ipfs_cid: "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};

const response = await fetch('http://localhost:8080/claims/validate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(validationRequest)
});

const result = await response.json();
console.log(result);
```

---

### Get Provider

Retrieve provider information by wallet address.

**Endpoint:** `GET /providers/:address`

**Path Parameters:**
- `address` (string, required): Ethereum wallet address (0x...)

**Response:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "message": "Provider retrieval requires blockchain connection"
}
```

**Status Codes:**
- `200 OK`: Provider found
- `400 Bad Request`: Invalid address format
- `404 Not Found`: Provider not found

**Example (curl):**
```bash
curl -X GET http://localhost:8080/providers/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

**Example (JavaScript):**
```javascript
const providerAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
const response = await fetch(`http://localhost:8080/providers/${providerAddress}`);
const provider = await response.json();
console.log(provider);
```

---

### List Providers

List all registered providers with pagination.

**Endpoint:** `GET /providers`

**Query Parameters:**
- `offset` (integer, optional): Pagination offset (default: 0)
- `limit` (integer, optional): Number of results (default: 20, max: 100)

**Response:**
```json
{
  "providers": [],
  "offset": 0,
  "limit": 20,
  "message": "Provider listing requires blockchain connection"
}
```

**Status Codes:**
- `200 OK`: Providers retrieved successfully
- `400 Bad Request`: Invalid query parameters

**Example (curl):**
```bash
curl -X GET "http://localhost:8080/providers?offset=0&limit=20"
```

**Example (JavaScript):**
```javascript
const params = new URLSearchParams({
  offset: '0',
  limit: '20'
});

const response = await fetch(`http://localhost:8080/providers?${params}`);
const result = await response.json();
console.log(result);
```

---

### Upload Document

Upload a supporting document to IPFS.

**Endpoint:** `POST /documents`

**Request:**
- Content-Type: `multipart/form-data`
- Field name: `file`
- Optional query parameter: `encrypt` (default: true)

**Response:**
```json
{
  "cid": "QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "filename": "medical_report.pdf",
  "size": 1024000,
  "encrypted": true,
  "gateway_url": "https://ipfs.io/ipfs/QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Status Codes:**
- `201 Created`: Document uploaded successfully
- `400 Bad Request`: No file provided or file too large (>10MB)
- `500 Internal Server Error`: Failed to store document

**Example (curl):**
```bash
curl -X POST http://localhost:8080/documents \
  -F "file=@medical_report.pdf" \
  -F "encrypt=true"
```

**Example (JavaScript):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('encrypt', 'true');

const response = await fetch('http://localhost:8080/documents', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);
```

**Example (Python):**
```python
import requests

with open('medical_report.pdf', 'rb') as f:
    files = {'file': f}
    data = {'encrypt': 'true'}
    response = requests.post(
        'http://localhost:8080/documents',
        files=files,
        data=data
    )
    print(response.json())
```

---

### Get Statistics

Retrieve system statistics and metrics.

**Endpoint:** `GET /stats`

**Response:**
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "current_block": 12345678,
  "total_claims": 1500,
  "approved_claims": 1200,
  "rejected_claims": 250,
  "total_providers": 50,
  "active_providers": 45
}
```

**Status Codes:**
- `200 OK`: Statistics retrieved successfully
- `500 Internal Server Error`: Failed to retrieve statistics

**Example (curl):**
```bash
curl -X GET http://localhost:8080/stats
```

**Example (JavaScript):**
```javascript
const response = await fetch('http://localhost:8080/stats');
const stats = await response.json();
console.log(stats);
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description",
  "details": "Additional error details (optional)"
}
```

### Common Error Codes

| Status Code | Description | Example |
|------------|-------------|---------|
| `400 Bad Request` | Invalid request format or parameters | Missing required field |
| `404 Not Found` | Resource not found | Claim ID doesn't exist |
| `500 Internal Server Error` | Server-side error | Database connection failed |
| `503 Service Unavailable` | Service temporarily unavailable | Blockchain node offline |

### Error Examples

**400 Bad Request:**
```json
{
  "error": "Invalid request body",
  "details": "claim_data is required"
}
```

**404 Not Found:**
```json
{
  "error": "Claim data not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to store claim data"
}
```

---

## Request/Response Schemas

### ClaimData Schema

```json
{
  "type": "object",
  "required": [
    "patient_id",
    "provider_npi",
    "service_date",
    "procedure_codes",
    "diagnosis_codes",
    "billed_amount",
    "claim_type"
  ],
  "properties": {
    "patient_id": {
      "type": "string",
      "description": "Hashed patient identifier"
    },
    "patient_dob_hash": {
      "type": "string",
      "description": "Hashed date of birth"
    },
    "provider_npi": {
      "type": "string",
      "pattern": "^[0-9]{10}$",
      "description": "National Provider Identifier"
    },
    "facility_id": {
      "type": "string",
      "description": "Facility identifier"
    },
    "service_date": {
      "type": "string",
      "format": "date",
      "description": "Date of service (YYYY-MM-DD)"
    },
    "procedure_codes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "CPT procedure codes"
    },
    "diagnosis_codes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "ICD-10 diagnosis codes"
    },
    "place_of_service": {
      "type": "string",
      "description": "Place of service code"
    },
    "billed_amount": {
      "type": "string",
      "pattern": "^[0-9]+\\.[0-9]{2}$",
      "description": "Billed amount in USD"
    },
    "allowed_amount": {
      "type": "string",
      "description": "Allowed amount in USD"
    },
    "copay_amount": {
      "type": "string",
      "description": "Copay amount in USD"
    },
    "deductible_amount": {
      "type": "string",
      "description": "Deductible amount in USD"
    },
    "supporting_documents": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "IPFS CIDs of supporting documents"
    },
    "submission_timestamp": {
      "type": "integer",
      "description": "Unix timestamp (auto-generated)"
    },
    "claim_type": {
      "type": "string",
      "enum": ["professional", "institutional", "pharmacy"],
      "description": "Type of claim"
    },
    "encryption_key_id": {
      "type": "string",
      "description": "Encryption key identifier"
    },
    "encrypted_fields": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of encrypted field names"
    }
  }
}
```

### ValidationResult Schema

```json
{
  "type": "object",
  "properties": {
    "valid": {
      "type": "boolean",
      "description": "Whether the claim data is valid"
    },
    "approved": {
      "type": "boolean",
      "description": "Whether the claim should be approved"
    },
    "score": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "Validation score (0-1)"
    },
    "reasons": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Reasons for validation decision"
    },
    "warnings": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Warning messages"
    },
    "risk_level": {
      "type": "string",
      "enum": ["low", "medium", "high"],
      "description": "Risk level assessment"
    }
  }
}
```

---

## Webhooks (Future)

Webhooks will be available for real-time notifications:

**Events:**
- `claim.submitted`
- `claim.verified`
- `claim.approved`
- `claim.rejected`
- `claim.disputed`

**Webhook Payload:**
```json
{
  "event": "claim.verified",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "claim_id": "0x...",
    "status": "approved",
    "verifications": 3
  }
}
```

---

## SDK Examples

### JavaScript/TypeScript SDK (Future)

```typescript
import { APXClient } from '@apx/sdk';

const client = new APXClient({
  apiKey: 'your-api-key',
  baseURL: 'https://api.apx.health'
});

// Submit claim
const claim = await client.claims.submit({
  patient_id: 'hashed_patient_123',
  provider_npi: '1234567890',
  // ... other fields
});

// Get claim status
const status = await client.claims.get(claim.claim_id);

// Validate claim
const validation = await client.claims.validate({
  ipfs_cid: claim.ipfs_cid
});
```

### Python SDK (Future)

```python
from apx import APXClient

client = APXClient(api_key='your-api-key', base_url='https://api.apx.health')

# Submit claim
claim = client.claims.submit({
    'patient_id': 'hashed_patient_123',
    'provider_npi': '1234567890',
    # ... other fields
})

# Get claim status
status = client.claims.get(claim['claim_id'])

# Validate claim
validation = client.claims.validate({
    'ipfs_cid': claim['ipfs_cid']
})
```

### Go SDK (Future)

```go
import "github.com/apx/go-sdk"

client := apx.NewClient("your-api-key", "https://api.apx.health")

// Submit claim
claim, err := client.Claims.Submit(&apx.ClaimData{
    PatientID: "hashed_patient_123",
    ProviderNPI: "1234567890",
    // ... other fields
})

// Get claim status
status, err := client.Claims.Get(claim.ClaimID)

// Validate claim
validation, err := client.Claims.Validate(&apx.ValidationRequest{
    IPFSCID: claim.IPFSCID,
})
```

---

## Best Practices

### Error Handling

Always check HTTP status codes and handle errors appropriately:

```javascript
try {
  const response = await fetch('http://localhost:8080/claims', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(claimData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }

  const result = await response.json();
  return result;
} catch (error) {
  console.error('Error submitting claim:', error);
  throw error;
}
```

### Retry Logic

Implement exponential backoff for transient failures:

```javascript
async function retryRequest(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}
```

### Request Timeouts

Set appropriate timeouts for API calls:

```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

try {
  const response = await fetch(url, {
    signal: controller.signal
  });
  clearTimeout(timeoutId);
  return response;
} catch (error) {
  if (error.name === 'AbortError') {
    throw new Error('Request timeout');
  }
  throw error;
}
```

---

## Changelog

### Version 1.0.0 (Current)
- Initial API release
- Claim submission and retrieval
- Provider management endpoints
- Document upload
- Health check and statistics

### Future Versions
- Authentication and authorization
- Webhook support
- Rate limiting improvements
- GraphQL endpoint
- Batch operations

---

## Support

For API support, please contact:
- Email: api-support@apx.health
- Documentation: https://docs.apx.health
- GitHub Issues: https://github.com/apx/issues

---

## References

- [Architecture Documentation](./ARCHITECTURE.md)
- [Smart Contracts Documentation](./SMART_CONTRACTS.md)
- [Integration Guide](./INTEGRATION.md)

