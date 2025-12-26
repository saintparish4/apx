import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/" className="text-2xl font-semibold tracking-tight">APX</Link>
              <div className="hidden gap-8 lg:flex">
                <Link href="/#how-it-works" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  How It Works
                </Link>
                <Link href="/#platform" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  Platform
                </Link>
                <Link href="/#features" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  Features
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700">
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl pt-12">
          <div className="text-center">
            <h1 className="text-5xl font-medium leading-[1.1] tracking-tight lg:text-6xl">
              How APX Works
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400 lg:text-xl">
              A detailed look at the technical architecture and workflow of the decentralized healthcare claims verification network
            </p>
          </div>
        </div>
      </section>

      {/* The Healthcare Claims Problem */}
      <section className="border-y border-white/5 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              The Healthcare Claims Problem
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Healthcare claims processing is one of the most inefficient and expensive parts of the healthcare system. Here&apos;s why:
            </p>

            <div className="mt-12 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-black p-8">
                <h3 className="text-xl font-semibold">Slow Processing Times</h3>
                <p className="mt-3 text-zinc-400">
                  Traditional claims processing takes 2-4 weeks on average. This creates cash flow problems for healthcare providers who have already delivered services but must wait weeks or months for payment. Patients are left uncertain about their bills, and providers struggle with financial planning.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-8">
                <h3 className="text-xl font-semibold">High Administrative Costs</h3>
                <p className="mt-3 text-zinc-400">
                  The healthcare industry spends billions annually on administrative overhead. Manual verification processes require extensive human resources, paperwork, and coordination between providers, insurers, and clearinghouses. These costs are ultimately passed on to patients and taxpayers.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-8">
                <h3 className="text-xl font-semibold">Fraud and Abuse</h3>
                <p className="mt-3 text-zinc-400">
                  Centralized systems are vulnerable to fraud. Without proper verification mechanisms, fraudulent claims can slip through, costing insurers and patients billions of dollars annually. The lack of transparency makes it difficult to detect and prevent fraud effectively.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-8">
                <h3 className="text-xl font-semibold">Lack of Transparency</h3>
                <p className="mt-3 text-zinc-400">
                  Providers often can&apos;t track the status of their claims. Patients don&apos;t know what&apos;s happening with their insurance claims. Insurers operate in silos with proprietary systems. This information asymmetry creates frustration and delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Blockchain Solves This */}
      <section className="border-b border-white/5 bg-black py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              How Blockchain Technology Solves This
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              APX uses blockchain technology to create a decentralized, transparent, and efficient claims verification network:
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">Distributed Consensus</h3>
                <p className="mt-3 text-zinc-400">
                  Instead of a single authority verifying claims, multiple validator nodes independently review and approve claims. This eliminates single points of failure and prevents fraud through distributed verification.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">Cryptographic Security</h3>
                <p className="mt-3 text-zinc-400">
                  Patient data is encrypted and stored off-chain on IPFS. Only cryptographic hashes are stored on the blockchain, ensuring data privacy while maintaining verifiable integrity.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">Smart Contract Automation</h3>
                <p className="mt-3 text-zinc-400">
                  Automated validation rules encoded in smart contracts handle code verification, reducing manual work and processing time from weeks to hours.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">Immutable Audit Trail</h3>
                <p className="mt-3 text-zinc-400">
                  Every claim action is recorded on the blockchain, creating a permanent, transparent audit trail that all parties can verify but no one can alter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="border-b border-white/5 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              Technical Architecture
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              APX consists of three main layers working together:
            </p>

            <div className="mt-12 space-y-8">
              <div className="rounded-2xl border border-white/10 bg-black p-8">
                <h3 className="text-xl font-semibold">Blockchain Layer (Solidity)</h3>
                <p className="mt-3 text-zinc-400">
                  Smart contracts written in Solidity manage claim submission, verification logic, and state transitions. The contracts use Keccak256 hashing to verify claim data integrity without exposing sensitive information on-chain. A multi-signature consensus mechanism requires multiple verifiers to approve claims before they&apos;re finalized.
                </p>
                <div className="mt-6 rounded-xl border border-white/5 bg-zinc-950 p-4">
                  <div className="text-sm font-mono text-zinc-400">
                    <div>• Claim submission and validation</div>
                    <div>• Multi-signature consensus logic</div>
                    <div>• Provider reputation tracking</div>
                    <div>• On-chain staking mechanisms</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-8">
                <h3 className="text-xl font-semibold">Backend Infrastructure (Go)</h3>
                <p className="mt-3 text-zinc-400">
                  High-performance consensus nodes written in Go validate claims across the network. The backend integrates with IPFS for decentralized storage of sensitive claim documents. Off-chain computation engines process complex verification logic, and blockchain synchronization services maintain network state consistency.
                </p>
                <div className="mt-6 rounded-xl border border-white/5 bg-zinc-950 p-4">
                  <div className="text-sm font-mono text-zinc-400">
                    <div>• Consensus node validation</div>
                    <div>• IPFS integration</div>
                    <div>• Off-chain computation</div>
                    <div>• Network synchronization</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-8">
                <h3 className="text-xl font-semibold">Frontend Interface (Next.js/TypeScript)</h3>
                <p className="mt-3 text-zinc-400">
                  The provider dashboard built with Next.js and TypeScript allows healthcare providers to submit claims, track status in real-time, view consensus progress, and monitor their reputation scores. The interface integrates with the RESTful API backend and displays blockchain data in a user-friendly format.
                </p>
                <div className="mt-6 rounded-xl border border-white/5 bg-zinc-950 p-4">
                  <div className="text-sm font-mono text-zinc-400">
                    <div>• Claim submission forms</div>
                    <div>• Real-time status tracking</div>
                    <div>• Consensus visualization</div>
                    <div>• Reputation analytics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Integration */}
      <section className="border-b border-white/5 bg-black py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              API Integration
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Integrate APX into your existing healthcare systems using our RESTful API:
            </p>

            <div className="mt-12 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">Submit Claim</h3>
                <div className="mt-4 rounded-xl border border-white/5 bg-black p-4 font-mono text-sm">
                  <div className="text-green-400">POST</div>
                  <div className="mt-2 text-zinc-300">/api/v1/claims/submit</div>
                  <div className="mt-4 text-zinc-500">
                    {`{
  "patientId": "PT-12345",
  "procedureCodes": ["99213"],
  "diagnosisCodes": ["E11.9"],
  "amount": 150.00,
  "npi": "1234567890",
  "serviceDate": "2024-01-15"
}`}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">Check Claim Status</h3>
                <div className="mt-4 rounded-xl border border-white/5 bg-black p-4 font-mono text-sm">
                  <div className="text-blue-400">GET</div>
                  <div className="mt-2 text-zinc-300">/api/v1/claims/{`{claimId}`}</div>
                  <div className="mt-4 text-zinc-500">
                    {`{
  "claimId": "CLM-2024-001",
  "status": "verifying",
  "consensusProgress": 60,
  "verifiers": ["0x123...", "0x456...", "0x789..."],
  "transactionHash": "0xabc..."
}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-white/5 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              Ready to See It in Action?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Try the demo dashboard to see how APX works in practice
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/dashboard" className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-700">
                Try Demo Dashboard
              </Link>
              <Link href="/" className="rounded-full border border-white/10 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-white/5">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="text-2xl font-semibold tracking-tight">APX</div>
            <p className="mt-4 text-sm text-zinc-400">
              Decentralized healthcare claims verification
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

