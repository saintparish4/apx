export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              <div className="text-2xl font-semibold tracking-tight">APX</div>
              <div className="hidden gap-8 lg:flex">
                <a href="#platform" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  Platform
                </a>
                <a href="#features" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  Features
                </a>
                <a href="#pricing" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  Pricing
                </a>
                <a href="#docs" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  Docs
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/dashboard" className="text-sm text-zinc-400 transition-colors hover:text-white">
                Sign In
              </a>
              <a href="/dashboard" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl pt-12">
          <div className="text-center">
            <h1 className="text-6xl font-medium leading-[1.1] tracking-tight lg:text-7xl xl:text-8xl">
              Claims verification
              <br />
              for those who take
              <br />
              <span className="italic">healthcare seriously.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400 lg:text-xl">
              Enterprise-grade blockchain infrastructure for healthcare claims processing.
              Built for providers, payers, and networks that demand security and speed.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <a href="/dashboard" className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-700">
                Open Account
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="border-y border-white/5 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="font-medium text-white">Portal Account</span>
              <span className="text-zinc-500">Claim submission & tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="font-medium text-white">High Yield Cache</span>
              <span className="text-zinc-500">Optimized validation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="font-medium text-white">Treasury Account</span>
              <span className="text-zinc-500">Multi-sig approvals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="font-medium text-white">Investment Grade</span>
              <span className="text-zinc-500">Enterprise verification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="font-medium text-white">IG Main</span>
              <span className="text-zinc-500">Network consensus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="platform" className="relative overflow-hidden bg-black py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-5xl font-medium tracking-tight lg:text-6xl">
              The new standard
              <br />
              for claims processing.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Professional-grade infrastructure trusted by healthcare providers and insurance networks.
            </p>
          </div>

          <div className="mt-20 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Instant claim verification</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Real-time consensus validation across distributed nodes. Process claims in hours, not weeks.
              </p>
              <div className="mt-6 rounded-xl border border-white/5 bg-black p-4">
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Status:</span>
                    <span className="text-green-500">Verified ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Consensus:</span>
                    <span className="text-white">4/5 nodes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Time:</span>
                    <span className="text-white">1.2 hrs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/10">
                <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Cryptographic security</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Keccak256 hashing with AES-256-GCM encryption. Patient data never touches the blockchain.
              </p>
              <div className="mt-6 rounded-xl border border-white/5 bg-black p-4">
                <div className="space-y-2 text-xs font-mono">
                  <div className="text-zinc-500">Hash:</div>
                  <div className="truncate text-zinc-300">0x8f4a...</div>
                  <div className="mt-3 text-zinc-500">IPFS CID:</div>
                  <div className="truncate text-zinc-300">Qm7x3...</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600/10">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Provider reputation</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                On-chain reputation tracking. Higher scores mean faster processing and lower fees.
              </p>
              <div className="mt-6 rounded-xl border border-white/5 bg-black p-4">
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Score:</span>
                    <span className="font-semibold text-green-500">98.4/100</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full w-[98%] bg-gradient-to-r from-green-500 to-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="features" className="border-t border-white/5 bg-zinc-950 py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              Tools built for compliance
              <br />
              and transparency.
            </h2>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-black p-10">
                <div className="mb-6 inline-flex rounded-lg bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
                  REAL-TIME ANALYTICS
                </div>
                <h3 className="text-2xl font-semibold">Claims Dashboard</h3>
                <p className="mt-4 text-zinc-400">
                  Monitor all submitted claims, validation status, and consensus progress in real-time.
                  Track metrics across your entire network.
                </p>
                <div className="mt-8 rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">Pending</span>
                      <span className="text-xl font-semibold">14</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">Verified</span>
                      <span className="text-xl font-semibold text-green-500">142</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">Flagged</span>
                      <span className="text-xl font-semibold text-amber-500">3</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black p-10">
                <div className="mb-6 inline-flex rounded-lg bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
                  AUTOMATION
                </div>
                <h3 className="text-2xl font-semibold">Smart Contracts</h3>
                <p className="mt-4 text-zinc-400">
                  Automated validation rules for CPT codes, ICD-10 diagnoses, and NPI verification.
                  Deploy custom logic for your organization.
                </p>
                <div className="mt-8 space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-zinc-400">Code validation: Active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-zinc-400">NPI lookup: Active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-zinc-400">Fraud detection: Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-black p-10">
                <div className="mb-6 inline-flex rounded-lg bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
                  SECURITY
                </div>
                <h3 className="text-2xl font-semibold">Encrypted Storage</h3>
                <p className="mt-4 text-zinc-400">
                  IPFS integration with AES-256-GCM encryption. Patient data remains private while
                  maintaining verifiable integrity on-chain.
                </p>
                <div className="mt-8 rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="text-zinc-500">Encryption</div>
                      <div className="mt-1 text-white">AES-256-GCM</div>
                    </div>
                    <div>
                      <div className="text-zinc-500">Storage</div>
                      <div className="mt-1 text-white">IPFS Decentralized</div>
                    </div>
                    <div>
                      <div className="text-zinc-500">Hash Function</div>
                      <div className="mt-1 text-white">Keccak256</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black p-10">
                <div className="mb-6 inline-flex rounded-lg bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
                  NETWORK
                </div>
                <h3 className="text-2xl font-semibold">Consensus Engine</h3>
                <p className="mt-4 text-zinc-400">
                  Multi-node verification with configurable thresholds. Distributed validators ensure
                  no single point of control or failure.
                </p>
                <div className="mt-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Network Status</span>
                    <span className="text-green-500">Online</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((node) => (
                      <div
                        key={node}
                        className="flex h-12 flex-1 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/5"
                      >
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-center text-xs text-zinc-500">
                    5/5 validator nodes active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-white/5 bg-black py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950 px-4 py-2 text-sm">
              <span className="text-zinc-400">Average</span>
              <span className="font-semibold text-white">$0.12/claim</span>
            </div>
            <h2 className="mt-8 text-4xl font-medium tracking-tight lg:text-5xl">
              Simple, transparent pricing.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              Pay only for verified claims. No hidden fees, no subscriptions.
            </p>
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Starter */}
              <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
                <div className="text-sm font-medium text-zinc-400">STARTER</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">$0.15</span>
                  <span className="text-zinc-500">/claim</span>
                </div>
                <p className="mt-4 text-sm text-zinc-400">
                  Perfect for small practices and testing the network.
                </p>
                <button className="mt-6 w-full rounded-full border border-white/10 py-3 text-sm font-medium transition-colors hover:bg-white/5">
                  Get Started
                </button>
                <ul className="mt-8 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Up to 100 claims/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Standard verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">API access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Email support</span>
                  </li>
                </ul>
              </div>

              {/* Professional */}
              <div className="relative rounded-3xl border border-blue-500/50 bg-gradient-to-b from-blue-950/50 to-zinc-950 p-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-medium text-white">
                  MOST POPULAR
                </div>
                <div className="text-sm font-medium text-blue-400">PROFESSIONAL</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">$0.10</span>
                  <span className="text-zinc-500">/claim</span>
                </div>
                <p className="mt-4 text-sm text-zinc-400">
                  For growing practices and multi-provider networks.
                </p>
                <button className="mt-6 w-full rounded-full bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                  Get Started
                </button>
                <ul className="mt-8 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Up to 1,000 claims/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Priority verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Custom smart contracts</span>
                  </li>
                </ul>
              </div>

              {/* Enterprise */}
              <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
                <div className="text-sm font-medium text-zinc-400">ENTERPRISE</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">Custom</span>
                </div>
                <p className="mt-4 text-sm text-zinc-400">
                  For hospital networks and insurance providers.
                </p>
                <button className="mt-6 w-full rounded-full border border-white/10 py-3 text-sm font-medium transition-colors hover:bg-white/5">
                  Contact Sales
                </button>
                <ul className="mt-8 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Unlimited claims</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Dedicated nodes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">White-label options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">24/7 support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">SLA guarantees</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-white/5 bg-zinc-950 py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              Trusted by healthcare leaders.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              Processing thousands of claims daily across multiple networks.
            </p>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black p-8 text-center">
              <div className="text-5xl font-semibold">99.9%</div>
              <div className="mt-2 text-sm text-zinc-400">Network Uptime</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black p-8 text-center">
              <div className="text-5xl font-semibold">&lt;2hr</div>
              <div className="mt-2 text-sm text-zinc-400">Avg. Verification</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black p-8 text-center">
              <div className="text-5xl font-semibold">10K+</div>
              <div className="mt-2 text-sm text-zinc-400">Claims Processed</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black p-8 text-center">
              <div className="text-5xl font-semibold">256-bit</div>
              <div className="mt-2 text-sm text-zinc-400">Encryption</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="border-t border-white/5 bg-black py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              Seamless integration with
              <br />
              your existing systems.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Connect to APX using standard healthcare protocols and modern APIs.
              Works with any EHR or practice management system.
            </p>
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">REST API</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Full-featured REST API with comprehensive documentation and SDKs
                  for popular languages.
                </p>
                <div className="mt-6 rounded-xl border border-white/5 bg-black p-4 font-mono text-xs">
                  <div className="text-green-400">POST</div>
                  <div className="mt-2 text-zinc-400">/api/v1/claims/submit</div>
                  <div className="mt-4 text-zinc-500">
                    {"{"} &quot;claimId&quot;: &quot;...&quot;, &quot;status&quot;: &quot;verified&quot; {"}"}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">Healthcare Standards</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Native support for HL7 FHIR, X12 EDI, and other industry-standard formats.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="text-zinc-400">HL7 FHIR R4</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-zinc-400">X12 EDI 837/835</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                    </div>
                    <span className="text-zinc-400">NCPDP SCRIPT</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">Webhooks</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Real-time notifications for claim status changes and validation events.
                </p>
                <div className="mt-6 space-y-2 text-xs">
                  <div className="rounded-lg border border-white/5 bg-black px-3 py-2 text-zinc-400">
                    claim.submitted
                  </div>
                  <div className="rounded-lg border border-white/5 bg-black px-3 py-2 text-zinc-400">
                    claim.verified
                  </div>
                  <div className="rounded-lg border border-white/5 bg-black px-3 py-2 text-zinc-400">
                    claim.flagged
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
                <h3 className="text-xl font-semibold">SDKs & Libraries</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Official client libraries for your favorite programming languages.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Python", "Node.js", "Go", "Ruby", "Java", "PHP"].map((lang) => (
                    <div
                      key={lang}
                      className="rounded-full border border-white/10 bg-black px-3 py-1 text-xs text-zinc-400"
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="docs" className="border-t border-white/5 bg-zinc-950 py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-medium tracking-tight lg:text-6xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Join the future of healthcare claims processing. Open your account in minutes
              and start verifying claims on the network.
            </p>
            <div className="mt-12 flex items-center justify-center gap-4">
              <a href="/dashboard" className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-700">
                Open Account
              </a>
              <button className="rounded-full border border-white/10 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-white/5">
                View Documentation
              </button>
            </div>

            <div className="mt-16 grid gap-4 text-sm sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black p-6">
                <div className="font-semibold">No commitments</div>
                <div className="mt-2 text-zinc-400">Pay per claim. Cancel anytime.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black p-6">
                <div className="font-semibold">Quick setup</div>
                <div className="mt-2 text-zinc-400">Get started in under 5 minutes.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black p-6">
                <div className="font-semibold">24/7 support</div>
                <div className="mt-2 text-zinc-400">We&apos;re here to help.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="text-2xl font-semibold tracking-tight">APX</div>
              <p className="mt-4 max-w-sm text-sm text-zinc-400">
                Decentralized healthcare claims verification. Built for providers
                who demand speed, security, and transparency.
              </p>
              <div className="mt-6 flex gap-4">
                <a href="#" className="text-zinc-400 transition-colors hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-400 transition-colors hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-400 transition-colors hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Product</div>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#platform" className="text-zinc-400 transition-colors hover:text-white">Platform</a></li>
                <li><a href="#features" className="text-zinc-400 transition-colors hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-zinc-400 transition-colors hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-zinc-400 transition-colors hover:text-white">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold">Developers</div>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-zinc-400 transition-colors hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-zinc-400 transition-colors hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-zinc-400 transition-colors hover:text-white">Smart Contracts</a></li>
                <li><a href="#" className="text-zinc-400 transition-colors hover:text-white">GitHub</a></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold">Company</div>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-zinc-400 transition-colors hover:text-white">About</a></li>
                <li><a href="#" className="text-zinc-400 transition-colors hover:text-white">Blog</a></li>
                <li><a href="#" className="text-zinc-400 transition-colors hover:text-white">Careers</a></li>
                <li><a href="#" className="text-zinc-400 transition-colors hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-8 text-sm text-zinc-400">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>© 2025 APX. All rights reserved.</div>
              <div className="flex gap-6">
                <a href="#" className="transition-colors hover:text-white">Privacy</a>
                <a href="#" className="transition-colors hover:text-white">Terms</a>
                <a href="#" className="transition-colors hover:text-white">Security</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
