"use client";

import { useState } from "react";
import Link from "next/link";

interface Claim {
  id: string;
  patientId: string;
  procedureCode: string;
  amount: string;
  status: "pending" | "verified" | "flagged" | "rejected";
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

export default function Dashboard() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [activeTab, setActiveTab] = useState<"submit" | "claims" | "history">("submit");
  
  // Form state
  const [patientId, setPatientId] = useState("");
  const [procedureCode, setProcedureCode] = useState("");
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [amount, setAmount] = useState("");
  const [npiNumber, setNpiNumber] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const [claims] = useState<Claim[]>([
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

  const [transactions] = useState<Transaction[]>([
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

  const reputationScore = 98.4;

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate claim submission
    setTimeout(() => {
      setIsSubmitting(false);
      setPatientId("");
      setProcedureCode("");
      setDiagnosisCode("");
      setAmount("");
      setNpiNumber("");
      setDocuments([]);
      alert("Claim submitted successfully!");
      setActiveTab("claims");
    }, 2000);
  };

  const getStatusColor = (status: Claim["status"]) => {
    switch (status) {
      case "verified":
        return "text-green-500 bg-green-500/10";
      case "pending":
        return "text-blue-500 bg-blue-500/10";
      case "flagged":
        return "text-amber-500 bg-amber-500/10";
      case "rejected":
        return "text-red-500 bg-red-500/10";
    }
  };

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
              {!walletConnected ? (
                <button
                  onClick={connectWallet}
                  className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-white/10 bg-zinc-950 px-4 py-2 text-sm font-mono">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
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

      {!walletConnected ? (
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
              onClick={connectWallet}
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
              onClick={() => setActiveTab("submit")}
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
              <h2 className="text-2xl font-semibold">Submit New Claim</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Fill in the claim details and upload supporting documents. All data is encrypted before storage.
              </p>

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
            </div>
          )}

          {/* My Claims Tab */}
          {activeTab === "claims" && (
            <div className="space-y-4">
              {claims.map((claim) => (
                <div
                  key={claim.id}
                  className="rounded-3xl border border-white/10 bg-zinc-950 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-semibold">{claim.id}</div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                            claim.status
                          )}`}
                        >
                          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-zinc-400">
                        Patient: {claim.patientId} • Procedure: {claim.procedureCode}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold">{claim.amount}</div>
                      <div className="text-xs text-zinc-500">{claim.timestamp}</div>
                    </div>
                  </div>

                  {claim.status === "pending" && (
                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Consensus Progress</span>
                        <span className="text-white">{claim.consensusProgress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
                          style={{ width: `${claim.consensusProgress}%` }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-zinc-500">
                        {Math.floor(claim.consensusProgress / 20)}/5 validator nodes approved
                      </div>
                    </div>
                  )}

                  {claim.transactionHash && (
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <span className="text-zinc-500">Transaction:</span>
                      <span className="font-mono text-blue-500">{claim.transactionHash}</span>
                      <button className="text-zinc-400 hover:text-white">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Transaction History Tab */}
          {activeTab === "history" && (
            <div className="rounded-3xl border border-white/10 bg-zinc-950">
              <div className="overflow-x-auto">
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
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

