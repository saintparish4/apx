"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  isDemoMode,
  useMockWalletIntegration,
  useMockClaims,
  useMockTransactions,
  useMockProviderStats,
  useMockClaimSubmission,
  useAnimatedConsensus,
  type Claim as DemoClaim,
} from "@/lib";

// Local interfaces for UI compatibility
interface Claim {
  id: string;
  patientId: string;
  procedureCode: string;
  amount: string;
  status: "pending" | "verified" | "flagged" | "rejected" | "verifying";
  timestamp: string;
  consensusProgress: number;
  transactionHash?: string;
}

interface Transaction {
  id: string;
  type: "submission" | "verification" | "payment";
  amount: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  hash: string;
}

// Submission process types
type SubmissionStage = 'idle' | 'validating' | 'encrypting' | 'uploading' | 'submitting' | 'consensus' | 'complete' | 'error';

// Submission Walkthrough Component

interface SubmissionWalkthroughProps {
  stage: SubmissionStage;
  details: {
    validation?: { cptValid: boolean; icd10Valid: boolean; npiValid: boolean };
    encryption?: { algorithm: string; keyHash: string };
    ipfs?: { cid: string; size: number };
    blockchain?: { txHash: string; blockNumber?: number };
    consensus?: { verifiers: string[]; votes: number; required: number };
    claimId?: string;
  };
  onClose?: () => void;
}

function SubmissionWalkthrough({ stage, details, onClose }: SubmissionWalkthroughProps) {
  const steps = [
    {
      id: 'validating',
      title: 'Form Validation',
      description: 'Validating input fields and medical codes',
      icon: '✓',
    },
    {
      id: 'encrypting',
      title: 'Encryption',
      description: 'Encrypting claim data with AES-256-GCM',
      icon: '🔒',
    },
    {
      id: 'uploading',
      title: 'IPFS Upload',
      description: 'Uploading encrypted data to decentralized storage',
      icon: '📤',
    },
    {
      id: 'submitting',
      title: 'Blockchain Submission',
      description: 'Generating hash and submitting to blockchain',
      icon: '⛓️',
    },
    {
      id: 'consensus',
      title: 'Consensus Verification',
      description: 'Multiple validators reviewing and approving',
      icon: '👥',
    },
    {
      id: 'complete',
      title: 'Verification Complete',
      description: 'Claim verified and ready for payment',
      icon: '✅',
    },
  ];

  const getStepStatus = (stepId: string): 'pending' | 'processing' | 'complete' | 'error' => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === stage);
    
    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) {
      if (stage === 'error') return 'error';
      if (stage === 'complete' && stepId === 'complete') return 'complete';
      return 'processing';
    }
    return 'pending';
  };

  const getStepColor = (status: 'pending' | 'processing' | 'complete' | 'error') => {
    switch (status) {
      case 'complete':
        return 'text-green-500 border-green-500/20 bg-green-500/10';
      case 'processing':
        return 'text-blue-500 border-blue-500/20 bg-blue-500/10';
      case 'error':
        return 'text-red-500 border-red-500/20 bg-red-500/10';
      default:
        return 'text-zinc-500 border-zinc-500/20 bg-zinc-500/5';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Processing Your Claim</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Your claim is being processed through the APX verification network
          </p>
        </div>
        {stage === 'complete' && onClose && (
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Close
          </button>
        )}
      </div>

      {/* Progress Timeline */}
      <div className="relative">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.id} className="relative flex gap-4 pb-8">
              {/* Connection Line */}
              {!isLast && (
                <div className={`absolute left-6 top-12 h-full w-0.5 ${
                  status === 'complete' ? 'bg-green-500/30' : 'bg-zinc-800'
                }`} />
              )}
              
              {/* Step Icon */}
              <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 transition-all ${getStepColor(status)}`}>
                {status === 'complete' ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : status === 'processing' ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : status === 'error' ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <span className="text-lg">{step.icon}</span>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 rounded-xl border border-white/10 bg-black p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{step.description}</p>
                  </div>
                  {status === 'processing' && (
                    <div className="text-xs text-blue-500">Processing...</div>
                  )}
                </div>

                {/* Technical Details */}
                {status !== 'pending' && (
                  <div className="mt-4 space-y-2">
                    {step.id === 'validating' && details.validation && (
                      <div className="rounded-lg border border-white/5 bg-zinc-950 p-3 text-xs">
                        <div className="space-y-1 font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">CPT Code:</span>
                            <span className={details.validation.cptValid ? 'text-green-500' : 'text-red-500'}>
                              {details.validation.cptValid ? '✓ Valid' : '✗ Invalid'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">ICD-10 Code:</span>
                            <span className={details.validation.icd10Valid ? 'text-green-500' : 'text-red-500'}>
                              {details.validation.icd10Valid ? '✓ Valid' : '✗ Invalid'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">NPI Number:</span>
                            <span className={details.validation.npiValid ? 'text-green-500' : 'text-red-500'}>
                              {details.validation.npiValid ? '✓ Valid' : '✗ Invalid'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.id === 'encrypting' && details.encryption && (
                      <div className="rounded-lg border border-white/5 bg-zinc-950 p-3 text-xs">
                        <div className="space-y-1 font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">Algorithm:</span>
                            <span className="text-white">{details.encryption.algorithm}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">Key Hash:</span>
                            <span className="text-blue-400">{details.encryption.keyHash.slice(0, 20)}...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.id === 'uploading' && details.ipfs && (
                      <div className="rounded-lg border border-white/5 bg-zinc-950 p-3 text-xs">
                        <div className="space-y-1 font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">IPFS CID:</span>
                            <span className="text-blue-400">{details.ipfs.cid}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">Size:</span>
                            <span className="text-white">{(details.ipfs.size / 1024).toFixed(2)} KB</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.id === 'submitting' && details.blockchain && (
                      <div className="rounded-lg border border-white/5 bg-zinc-950 p-3 text-xs">
                        <div className="space-y-1 font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">Transaction Hash:</span>
                            <span className="text-blue-400">{details.blockchain.txHash.slice(0, 20)}...</span>
                          </div>
                          {details.blockchain.blockNumber && (
                            <div className="flex items-center justify-between">
                              <span className="text-zinc-500">Block Number:</span>
                              <span className="text-white">{details.blockchain.blockNumber.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {step.id === 'consensus' && details.consensus && (
                      <div className="rounded-lg border border-white/5 bg-zinc-950 p-3 text-xs">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">Consensus Progress:</span>
                            <span className="text-white">
                              {details.consensus.votes} / {details.consensus.required} verifiers
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
                              style={{ width: `${(details.consensus.votes / details.consensus.required) * 100}%` }}
                            />
                          </div>
                          <div className="mt-2 space-y-1">
                            {details.consensus.verifiers.slice(0, details.consensus.votes).map((verifier, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-green-500">
                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-mono text-xs">{verifier}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step.id === 'complete' && details.claimId && (
                      <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                        <div className="flex items-center gap-2 text-green-500">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold">Claim Verified Successfully!</span>
                        </div>
                        <div className="mt-2 space-y-1 text-xs font-mono">
                          <div className="flex items-center justify-between text-zinc-400">
                            <span>Claim ID:</span>
                            <span className="text-white">{details.claimId}</span>
                          </div>
                          {details.blockchain?.txHash && (
                            <div className="flex items-center justify-between text-zinc-400">
                              <span>Transaction:</span>
                              <span className="text-blue-400">{details.blockchain.txHash}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 text-xs text-zinc-400">
                          Your claim has been verified and is now eligible for payment processing.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Learn More Link */}
      {stage !== 'complete' && (
        <div className="rounded-xl border border-white/10 bg-black p-4 text-center">
          <p className="text-sm text-zinc-400">
            Want to learn more about how this process works?{' '}
            <a href="/how-it-works" className="text-blue-500 hover:text-blue-400">
              View detailed documentation →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"submit" | "claims" | "history">("submit");
  
  // Form state
  const [patientId, setPatientId] = useState("");
  const [procedureCode, setProcedureCode] = useState("");
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [amount, setAmount] = useState("");
  const [npiNumber, setNpiNumber] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);

  // Submission process state
  const [submissionStage, setSubmissionStage] = useState<SubmissionStage>('idle');
  const [showProcessWalkthrough, setShowProcessWalkthrough] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState<{
    validation?: { cptValid: boolean; icd10Valid: boolean; npiValid: boolean };
    encryption?: { algorithm: string; keyHash: string };
    ipfs?: { cid: string; size: number };
    blockchain?: { txHash: string; blockNumber?: number };
    consensus?: { verifiers: string[]; votes: number; required: number };
    claimId?: string;
  }>({});

  // Demo mode hooks
  const demoMode = isDemoMode();
  const mockWallet = useMockWalletIntegration();
  const { claims: demoClaims, loading: claimsLoading } = useMockClaims();
  const { transactions: demoTxns, loading: txLoading } = useMockTransactions();
  const { stats: providerStats } = useMockProviderStats();
  const { submitClaim: submitMockClaim, submitting: isSubmitting } = useMockClaimSubmission();

  // Production wallet state (fallback when not in demo mode)
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Production wallet connection (fallback)
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        }) as string[];
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } else {
        alert("Please install MetaMask to connect your wallet");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Production mock data (fallback when not in demo mode)
  const [productionClaims] = useState<Claim[]>([
    {
      id: "CLM-2024-001",
      patientId: "PT-8472",
      procedureCode: "99213",
      amount: "$245.00",
      status: "verified",
      timestamp: "2024-01-15 14:23",
      consensusProgress: 100,
      transactionHash: "0x7f3a..."
    },
    {
      id: "CLM-2024-002",
      patientId: "PT-6391",
      procedureCode: "99214",
      amount: "$380.00",
      status: "pending",
      timestamp: "2024-01-16 09:45",
      consensusProgress: 60,
    },
    {
      id: "CLM-2024-003",
      patientId: "PT-2847",
      procedureCode: "99285",
      amount: "$890.00",
      status: "flagged",
      timestamp: "2024-01-16 11:12",
      consensusProgress: 40,
    },
  ]);

  const [productionTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "verification",
      amount: "$245.00",
      timestamp: "2024-01-15 14:25",
      status: "completed",
      hash: "0x7f3a8b2c..."
    },
    {
      id: "2",
      type: "submission",
      amount: "$0.12",
      timestamp: "2024-01-16 09:45",
      status: "completed",
      hash: "0x9e4c5d1a..."
    },
    {
      id: "3",
      type: "submission",
      amount: "$0.12",
      timestamp: "2024-01-16 11:12",
      status: "pending",
      hash: "0x2b8f7c3e..."
    },
  ]);

  // Conditional wallet connection
  const walletConnectedState = demoMode ? mockWallet.status === "connected" : walletConnected;
  const walletAddressState = demoMode ? mockWallet.address : walletAddress;
  const connectWalletFn = demoMode ? mockWallet.connect : connectWallet;

  // Convert demo claims to UI format
  const claims: Claim[] = useMemo(() => {
    if (demoMode && demoClaims.length > 0) {
      return demoClaims.map((claim) => ({
        id: claim.id,
        patientId: claim.patientId,
        procedureCode: claim.procedureCodes[0] || "",
        amount: `$${claim.amount.toFixed(2)}`,
        status: claim.status as Claim["status"],
        timestamp: new Date(claim.submittedAt).toLocaleString(),
        consensusProgress: claim.consensus
          ? Math.round((claim.consensus.current / claim.consensus.required) * 100)
          : 0,
        transactionHash: claim.txHash,
      }));
    }
    return productionClaims;
  }, [demoMode, demoClaims, productionClaims]);

  // Convert demo transactions to UI format
  const transactions: Transaction[] = useMemo(() => {
    if (demoMode && demoTxns.length > 0) {
      return demoTxns.map((tx) => ({
        id: tx.hash,
        type: tx.type === "claim_submission" ? "submission" : tx.type === "verification" ? "verification" : "payment",
        amount: tx.value !== "0.0" ? `$${parseFloat(tx.value).toFixed(2)}` : "$0.12",
        timestamp: new Date(tx.timestamp).toLocaleString(),
        status: tx.status as Transaction["status"],
        hash: tx.hash,
      }));
    }
    return productionTransactions;
  }, [demoMode, demoTxns, productionTransactions]);

  // Get verifying claim IDs for animated consensus
  const verifyingClaimIds = useMemo(() => {
    if (demoMode) {
      return claims.filter(c => c.status === "verifying").map(c => c.id);
    }
    return [];
  }, [demoMode, claims]);

  // Hook for animated consensus (only for first verifying claim to avoid multiple hooks)
  const animatedConsensus = useAnimatedConsensus(
    demoMode && verifyingClaimIds.length > 0 ? verifyingClaimIds[0] : null
  );

  // Provider stats
  const reputationScore = demoMode && providerStats ? providerStats.reputation : 98.4;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show walkthrough
    setShowProcessWalkthrough(true);
    setSubmissionStage('validating');
    setSubmissionDetails({});

    // Helper function to simulate delay
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      // Step 1: Form Validation (1-2 seconds)
      await delay(1500);
      setSubmissionDetails({
        validation: {
          cptValid: procedureCode.length > 0,
          icd10Valid: diagnosisCode.length > 0,
          npiValid: npiNumber.length === 10,
        }
      });
      setSubmissionStage('encrypting');

      // Step 2: Encryption (1 second)
      await delay(1000);
      const encryptionKeyHash = `0x${Math.random().toString(16).substring(2, 18)}${Math.random().toString(16).substring(2, 18)}`;
      setSubmissionDetails(prev => ({
        ...prev,
        encryption: {
          algorithm: 'AES-256-GCM',
          keyHash: encryptionKeyHash,
        }
      }));
      setSubmissionStage('uploading');

      // Step 3: IPFS Upload (2-3 seconds)
      await delay(2500);
      const ipfsCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      const fileSize = documents.reduce((sum, file) => sum + file.size, 0) || 1024;
      setSubmissionDetails(prev => ({
        ...prev,
        ipfs: {
          cid: ipfsCid,
          size: fileSize,
        }
      }));
      setSubmissionStage('submitting');

      // Step 4: Hash Generation & Blockchain Submission (2-3 seconds)
      await delay(2000);
      const txHash = demoMode 
        ? `0xdemo${Date.now().toString(16)}`
        : `0x${Math.random().toString(16).substring(2, 18)}${Math.random().toString(16).substring(2, 18)}`;
      const blockNumber = Math.floor(5000000 + Math.random() * 100000);
      setSubmissionDetails(prev => ({
        ...prev,
        blockchain: {
          txHash,
          blockNumber,
        }
      }));
      setSubmissionStage('consensus');

      // Step 5: Consensus (3-5 seconds with progress)
      const verifiers = [
        '0xValidator1...',
        '0xValidator2...',
        '0xValidator3...',
        '0xValidator4...',
        '0xValidator5...',
      ];
      const required = 4;
      
      // Simulate consensus progress
      for (let i = 1; i <= required; i++) {
        await delay(800);
        setSubmissionDetails(prev => ({
          ...prev,
          consensus: {
            verifiers,
            votes: i,
            required,
          }
        }));
      }
      
      setSubmissionStage('complete');
      
      // Actually submit the claim
      if (demoMode) {
        const result = await submitMockClaim({
          patientId,
          diagnosisCodes: diagnosisCode ? [diagnosisCode] : [],
          procedureCodes: procedureCode ? [procedureCode] : [],
          amount: parseFloat(amount) || 0,
          description: `Claim for ${procedureCode}`,
        });
        
        setSubmissionDetails(prev => ({
          ...prev,
          claimId: result.claimId,
        }));

        // Reset form after showing success
        setTimeout(() => {
          setPatientId("");
          setProcedureCode("");
          setDiagnosisCode("");
          setAmount("");
          setNpiNumber("");
          setDocuments([]);
          setActiveTab("claims");
        }, 3000);
      } else {
        // Production submission
        setTimeout(() => {
          setPatientId("");
          setProcedureCode("");
          setDiagnosisCode("");
          setAmount("");
          setNpiNumber("");
          setDocuments([]);
          setActiveTab("claims");
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      setSubmissionStage('error');
    }
  };

  const getStatusColor = (status: Claim["status"]) => {
    switch (status) {
      case "verified":
        return "text-green-500 bg-green-500/10";
      case "pending":
      case "verifying":
        return "text-blue-500 bg-blue-500/10";
      case "flagged":
        return "text-amber-500 bg-amber-500/10";
      case "rejected":
        return "text-red-500 bg-red-500/10";
    }
  };

  // ClaimCard component with animated consensus support
  function ClaimCard({ 
    claim, 
    animatedClaim 
  }: { 
    claim: Claim; 
    animatedClaim?: DemoClaim | null;
  }) {
    // Use animated consensus data if available
    const displayClaim = animatedClaim && claim.status === "verifying"
      ? {
          ...claim,
          consensusProgress: animatedClaim.consensus
            ? Math.round((animatedClaim.consensus.current / animatedClaim.consensus.required) * 100)
            : claim.consensusProgress,
        }
      : claim;

    return (
      <div
        key={displayClaim.id}
        className="rounded-3xl border border-white/10 bg-zinc-950 p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-lg font-semibold">{displayClaim.id}</div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                  displayClaim.status
                )}`}
              >
                {displayClaim.status.charAt(0).toUpperCase() + displayClaim.status.slice(1)}
              </span>
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              Patient: {displayClaim.patientId} • Procedure: {displayClaim.procedureCode}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold">{displayClaim.amount}</div>
            <div className="text-xs text-zinc-500">{displayClaim.timestamp}</div>
          </div>
        </div>

        {(displayClaim.status === "pending" || displayClaim.status === "verifying") && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">Consensus Progress</span>
              <span className="text-white">{displayClaim.consensusProgress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
                style={{ width: `${displayClaim.consensusProgress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-zinc-500">
              {Math.floor(displayClaim.consensusProgress / 20)}/5 validator nodes approved
            </div>
          </div>
        )}

        {displayClaim.transactionHash && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-zinc-500">Transaction:</span>
            <span className="font-mono text-blue-500">{displayClaim.transactionHash}</span>
            <button className="text-zinc-400 hover:text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              APX
            </Link>
            <div className="flex items-center gap-4">
              {!walletConnectedState ? (
                <button
                  onClick={connectWalletFn}
                  className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-white/10 bg-zinc-950 px-4 py-2 text-sm font-mono">
                    {walletAddressState ? `${walletAddressState.slice(0, 6)}...${walletAddressState.slice(-4)}` : ""}
                    {demoMode && mockWallet.isDemo && (
                      <span className="ml-2 text-xs text-amber-400">🎭 Demo</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-green-500">Connected</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {!walletConnectedState ? (
        // Wallet Connection Screen
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-zinc-950">
              <svg className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold">Connect Your Wallet</h1>
            <p className="mt-4 text-zinc-400">
              Connect your wallet to access the APX Provider Dashboard and start submitting claims.
            </p>
            <button
              onClick={connectWalletFn}
              className="mt-8 rounded-full bg-blue-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-700"
            >
              Connect Wallet
            </button>
            <div className="mt-8 grid gap-4 text-sm">
              <div className="flex items-center gap-3 text-zinc-400">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Secure wallet connection</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>MetaMask & WalletConnect supported</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Your keys, your control</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Dashboard Content
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          {/* Context Banner */}
          <div className="mb-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Welcome to the APX Provider Dashboard</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  This dashboard allows healthcare providers to submit claims, track their verification status in real-time, and monitor their reputation score. 
                  Claims are verified through a decentralized consensus network that processes them in hours instead of weeks.
                </p>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400"><strong className="text-white">Submit Claim:</strong> Upload claim details and documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400"><strong className="text-white">My Claims:</strong> Track verification progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400"><strong className="text-white">History:</strong> View transaction records</span>
                  </div>
                </div>
                <div className="mt-4">
                  <a href="/how-it-works" className="text-sm text-blue-500 hover:text-blue-400">
                    Learn more about how APX works →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
              <div className="text-sm text-zinc-400">Reputation Score</div>
              <div className="mt-2 flex items-baseline gap-2">
                <div className="text-3xl font-semibold">{reputationScore}</div>
                <div className="text-sm text-green-500">+2.4%</div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400"
                  style={{ width: `${reputationScore}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
              <div className="text-sm text-zinc-400">Total Claims</div>
              <div className="mt-2 text-3xl font-semibold">{claims.length}</div>
              <div className="mt-2 text-xs text-zinc-500">This month</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
              <div className="text-sm text-zinc-400">Verified</div>
              <div className="mt-2 text-3xl font-semibold">
                {claims.filter((c) => c.status === "verified").length}
              </div>
              <div className="mt-2 text-xs text-green-500">100% success rate</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
              <div className="text-sm text-zinc-400">Pending</div>
              <div className="mt-2 text-3xl font-semibold">
                {claims.filter((c) => c.status === "pending").length}
              </div>
              <div className="mt-2 text-xs text-zinc-500">In consensus</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-2 border-b border-white/5">
            <button
              onClick={() => {
                setActiveTab("submit");
                // Reset walkthrough when switching to submit tab if completed
                if (submissionStage === 'complete' || submissionStage === 'error') {
                  setShowProcessWalkthrough(false);
                  setSubmissionStage('idle');
                  setSubmissionDetails({});
                }
              }}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "submit"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Submit Claim
            </button>
            <button
              onClick={() => setActiveTab("claims")}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "claims"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              My Claims
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "history"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Transaction History
            </button>
          </div>

          {/* Submit Claim Tab */}
          {activeTab === "submit" && (
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              {!showProcessWalkthrough ? (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold">Submit New Claim</h2>
                      <p className="mt-2 text-sm text-zinc-400">
                        Fill in the claim details and upload supporting documents. All data is encrypted before storage.
                      </p>
                    </div>
                    <a
                      href="/how-it-works"
                      className="shrink-0 text-sm text-blue-500 hover:text-blue-400"
                    >
                      Learn how it works →
                    </a>
                  </div>

                  <form onSubmit={handleSubmitClaim} className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="patientId" className="block text-sm font-medium">
                      Patient ID
                    </label>
                    <input
                      type="text"
                      id="patientId"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      placeholder="PT-12345"
                      required
                      className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="npiNumber" className="block text-sm font-medium">
                      NPI Number
                    </label>
                    <input
                      type="text"
                      id="npiNumber"
                      value={npiNumber}
                      onChange={(e) => setNpiNumber(e.target.value)}
                      placeholder="1234567890"
                      required
                      className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="procedureCode" className="block text-sm font-medium">
                      CPT Procedure Code
                    </label>
                    <input
                      type="text"
                      id="procedureCode"
                      value={procedureCode}
                      onChange={(e) => setProcedureCode(e.target.value)}
                      placeholder="99213"
                      required
                      className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="diagnosisCode" className="block text-sm font-medium">
                      ICD-10 Diagnosis Code
                    </label>
                    <input
                      type="text"
                      id="diagnosisCode"
                      value={diagnosisCode}
                      onChange={(e) => setDiagnosisCode(e.target.value)}
                      placeholder="J06.9"
                      required
                      className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium">
                      Claim Amount (USD)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="245.00"
                      step="0.01"
                      required
                      className="mt-2 w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="documents" className="block text-sm font-medium">
                    Supporting Documents
                  </label>
                  <div className="mt-2 rounded-lg border border-dashed border-white/10 bg-black p-8 text-center">
                    <input
                      type="file"
                      id="documents"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="documents" className="cursor-pointer">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                        <svg
                          className="h-6 w-6 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div className="text-sm text-zinc-400">
                        Click to upload or drag and drop
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        PDF, PNG, JPG up to 10MB (encrypted before upload)
                      </div>
                    </label>
                  </div>
                  {documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {documents.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border border-white/10 bg-black px-4 py-2 text-sm"
                        >
                          <span className="text-zinc-300">{file.name}</span>
                          <span className="text-zinc-500">
                            {(file.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Claim"}
                  </button>
                  <div className="text-sm text-zinc-400">
                    Estimated fee: <span className="font-medium text-white">$0.10</span>
                  </div>
                </div>
              </form>
                </>
              ) : (
                <SubmissionWalkthrough
                  stage={submissionStage}
                  details={submissionDetails}
                  onClose={() => {
                    setShowProcessWalkthrough(false);
                    setSubmissionStage('idle');
                    setSubmissionDetails({});
                  }}
                />
              )}
            </div>
          )}

          {/* My Claims Tab */}
          {activeTab === "claims" && (
            <div className="space-y-4">
              {claimsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-zinc-400">Loading claims...</div>
                </div>
              ) : claims.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-zinc-400">No claims found</div>
                </div>
              ) : (
                claims.map((claim) => {
                  // Use animated consensus for the first verifying claim
                  const isAnimatedClaim = demoMode && 
                    claim.status === "verifying" && 
                    claim.id === verifyingClaimIds[0];
                  const claimData = isAnimatedClaim && animatedConsensus.claim
                    ? {
                        ...claim,
                        consensusProgress: animatedConsensus.claim.consensus
                          ? Math.round((animatedConsensus.claim.consensus.current / animatedConsensus.claim.consensus.required) * 100)
                          : claim.consensusProgress,
                      }
                    : claim;
                  
                  return (
                    <ClaimCard 
                      key={claim.id} 
                      claim={claimData} 
                      animatedClaim={isAnimatedClaim ? animatedConsensus.claim : null}
                    />
                  );
                })
              )}
            </div>
          )}

          {/* Transaction History Tab */}
          {activeTab === "history" && (
            <div className="rounded-3xl border border-white/10 bg-zinc-950">
              <div className="overflow-x-auto">
                {txLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-zinc-400">Loading transactions...</div>
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-zinc-400">No transactions found</div>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                          Transaction Hash
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                          Type
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-white/5 last:border-0">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm text-blue-500">{tx.hash}</span>
                              <button className="text-zinc-400 hover:text-white">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="capitalize text-zinc-300">{tx.type}</span>
                          </td>
                          <td className="px-6 py-4 font-medium text-white">{tx.amount}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                tx.status === "completed"
                                  ? "bg-green-500/10 text-green-500"
                                  : tx.status === "pending"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : "bg-red-500/10 text-red-500"
                              }`}
                            >
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-400">{tx.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

