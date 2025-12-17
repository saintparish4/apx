export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
          <div className="flex h-16 items-center justify-between">
            <div className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
              APX
            </div>
            <div className="hidden gap-8 md:flex">
              <a
                href="#features"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Features
              </a>
              <a
                href="#technology"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Technology
              </a>
              <a
                href="#use-cases"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Use Cases
              </a>
              <a
                href="#docs"
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Documentation
              </a>
            </div>
            <button className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-40 pb-24 sm:px-12 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center sm:text-left">
            <div className="text-5xl font-light tracking-tighter text-zinc-900 dark:text-zinc-50 lg:text-6xl">
              APX
            </div>
          </div>

          <div className="mb-8 flex items-center justify-center sm:justify-start">
            <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-700" />
            <span className="mx-4 text-sm font-medium tracking-wider text-zinc-500 dark:text-zinc-400">
              BLOCKCHAIN INFRASTRUCTURE
            </span>
            <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-700" />
          </div>

          <h1 className="text-center text-5xl font-light leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-left sm:text-6xl lg:text-7xl">
            Healthcare claims.
            <br />
            <span className="font-normal">Verified by consensus.</span>
          </h1>

          <p className="mt-10 max-w-2xl text-center text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-left sm:text-2xl">
            A decentralized network that transforms healthcare claims
            verification through distributed consensus, cryptographic proofs,
            and transparent processing.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <button className="group relative overflow-hidden rounded-full bg-zinc-900 px-8 py-4 text-base font-medium text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Get Started
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <button className="rounded-full border border-zinc-300 px-8 py-4 text-base font-medium text-zinc-900 transition-all hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-900">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            <div className="text-center sm:text-left">
              <div className="text-4xl font-light text-zinc-900 dark:text-zinc-50 lg:text-5xl">
                Hours
              </div>
              <div className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                Processing time, not weeks
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-4xl font-light text-zinc-900 dark:text-zinc-50 lg:text-5xl">
                Distributed
              </div>
              <div className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                Multi-node consensus
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-4xl font-light text-zinc-900 dark:text-zinc-50 lg:text-5xl">
                Transparent
              </div>
              <div className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                Immutable audit trail
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-32 sm:px-12 lg:px-16"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-left lg:text-5xl">
            Designed for healthcare systems.
          </h2>

          <div className="mt-20 space-y-20">
            <div className="group">
              <div className="mb-4 inline-block rounded-full bg-zinc-100 px-4 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                Fraud Reduction
              </div>
              <h3 className="text-2xl font-normal text-zinc-900 dark:text-zinc-50 lg:text-3xl">
                Trust through transparency
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Distributed consensus and provider reputation scoring make
                fraudulent claims exponentially harder to execute. Every
                modification is permanently recorded on an immutable blockchain
                audit trail.
              </p>
            </div>

            <div className="group">
              <div className="mb-4 inline-block rounded-full bg-zinc-100 px-4 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                Cost Efficiency
              </div>
              <h3 className="text-2xl font-normal text-zinc-900 dark:text-zinc-50 lg:text-3xl">
                Eliminate intermediaries
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Smart contracts and off-chain computation automate verification,
                reducing administrative costs while IPFS storage minimizes
                on-chain transaction expenses.
              </p>
            </div>

            <div className="group">
              <div className="mb-4 inline-block rounded-full bg-zinc-100 px-4 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                Accelerated Processing
              </div>
              <h3 className="text-2xl font-normal text-zinc-900 dark:text-zinc-50 lg:text-3xl">
                From weeks to hours
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Multi-node consensus and parallel verification dramatically
                reduce processing times, improving cash flow for providers and
                reducing billing uncertainty for patients.
              </p>
            </div>

            <div className="group">
              <div className="mb-4 inline-block rounded-full bg-zinc-100 px-4 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                Interoperability
              </div>
              <h3 className="text-2xl font-normal text-zinc-900 dark:text-zinc-50 lg:text-3xl">
                Seamless data sharing
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Cross-system compatibility enables data sharing across
                healthcare networks, insurance providers, and geographic regions
                while maintaining privacy and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-32 sm:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 lg:text-5xl">
              Enterprise-grade infrastructure.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Built with the security, scalability, and reliability that
              healthcare systems demand.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-px bg-zinc-200 dark:bg-zinc-800 md:grid-cols-3">
            <div className="bg-white p-10 dark:bg-zinc-950">
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                CONSENSUS
              </div>
              <h3 className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                Multi-Node Verification
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Distributed validators collectively verify claims without
                central authority. No single point of failure.
              </p>
            </div>

            <div className="bg-white p-10 dark:bg-zinc-950">
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                SECURITY
              </div>
              <h3 className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                Cryptographic Hashing
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Keccak256 verification ensures data integrity without exposing
                sensitive patient information.
              </p>
            </div>

            <div className="bg-white p-10 dark:bg-zinc-950">
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                VALIDATION
              </div>
              <h3 className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                Automated Rules
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Complex algorithms validate CPT codes, ICD-10 diagnoses, and NPI
                identifiers.
              </p>
            </div>

            <div className="bg-white p-10 dark:bg-zinc-950">
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                STORAGE
              </div>
              <h3 className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                IPFS Integration
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Decentralized storage with AES-256-GCM encryption for medical
                documents and evidence.
              </p>
            </div>

            <div className="bg-white p-10 dark:bg-zinc-950">
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                PERFORMANCE
              </div>
              <h3 className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                Off-Chain Computation
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Complex verification algorithms run off-chain with results
                posted on-chain for efficiency.
              </p>
            </div>

            <div className="bg-white p-10 dark:bg-zinc-950">
              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                REPUTATION
              </div>
              <h3 className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                Provider Scoring
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Historical accuracy tracking creates economic incentives for
                honest participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section
        id="technology"
        className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <div className="mx-auto max-w-7xl px-6 py-32 sm:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-left lg:text-5xl">
              Built on proven technology.
            </h2>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  BLOCKCHAIN
                </div>
                <div className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  Smart Contracts
                </div>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Solidity-based contracts with Keccak256 verification and
                  multi-signature consensus.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  BACKEND
                </div>
                <div className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  Go Infrastructure
                </div>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  High-performance consensus nodes with IPFS integration and
                  off-chain computation.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  STORAGE
                </div>
                <div className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  IPFS Decentralized
                </div>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Content-addressed storage with AES-256-GCM encryption for
                  sensitive documents.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  VALIDATION
                </div>
                <div className="mt-4 text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  Automated Rules
                </div>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  CPT, ICD-10, and NPI validation against industry standards
                  before submission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        id="use-cases"
        className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl px-6 py-32 sm:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-left lg:text-5xl">
              Real-world applications.
            </h2>
            <p className="mt-6 text-center text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-left">
              APX is transforming healthcare claims verification across diverse
              scenarios and jurisdictions.
            </p>
          </div>

          <div className="mx-auto mt-20 max-w-5xl space-y-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50">
                  <span className="text-lg text-white dark:text-zinc-900">
                    🏥
                  </span>
                </div>
                <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  Multi-Provider Networks
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Insurance claims verified across multiple provider networks
                  with distributed consensus, eliminating single points of
                  control and reducing processing delays.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50">
                  <span className="text-lg text-white dark:text-zinc-900">
                    🌍
                  </span>
                </div>
                <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  Cross-Border Claims
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Seamless verification of medical services across jurisdictions
                  with multi-jurisdictional validation protocols and compliance
                  frameworks.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50">
                  <span className="text-lg text-white dark:text-zinc-900">
                    🔍
                  </span>
                </div>
                <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  Fraud Detection
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Real-time anomaly identification through consensus-based
                  pattern analysis, flagging suspicious claims before
                  they&apos;re processed.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50">
                  <span className="text-lg text-white dark:text-zinc-900">
                    📋
                  </span>
                </div>
                <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  Regulatory Compliance
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Immutable audit trails for regulatory compliance and dispute
                  resolution, with complete transparency for all stakeholders.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50">
                  <span className="text-lg text-white dark:text-zinc-900">
                    ✓
                  </span>
                </div>
                <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  Provider Credentials
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Decentralized verification of provider credentials and
                  reputation-based network participation scoring.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-50">
                  <span className="text-lg text-white dark:text-zinc-900">
                    ⚡
                  </span>
                </div>
                <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                  Emergency Services
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Rapid claim verification for emergency medical services with
                  expedited consensus protocols for time-sensitive situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-12 lg:px-16">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-4xl font-light text-zinc-900 dark:text-zinc-50 lg:text-5xl">
                99.9%
              </div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Network Uptime
              </div>
            </div>
            <div>
              <div className="text-4xl font-light text-zinc-900 dark:text-zinc-50 lg:text-5xl">
                &lt;2hr
              </div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Avg. Verification Time
              </div>
            </div>
            <div>
              <div className="text-4xl font-light text-zinc-900 dark:text-zinc-50 lg:text-5xl">
                256-bit
              </div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Encryption Standard
              </div>
            </div>
            <div>
              <div className="text-4xl font-light text-zinc-900 dark:text-zinc-50 lg:text-5xl">
                Multi
              </div>
              <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Node Consensus
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-6 py-32 sm:px-12 lg:px-16">
          <h2 className="text-center text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-left lg:text-5xl">
            Frequently asked questions.
          </h2>

          <div className="mt-16 space-y-8">
            <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
              <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                How does consensus-based verification work?
              </h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Multiple independent validator nodes review each claim using
                automated validation rules and provider reputation scores. A
                minimum threshold of approvals is required before claims are
                finalized, ensuring no single entity can approve or reject
                claims unilaterally.
              </p>
            </div>

            <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
              <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                Is patient data secure on the blockchain?
              </h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Sensitive patient information is never stored directly on-chain.
                Full claim data is encrypted with AES-256-GCM and stored on
                IPFS, with only cryptographic hashes recorded on the blockchain
                for verification. This ensures data integrity while maintaining
                privacy.
              </p>
            </div>

            <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
              <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                What makes this more efficient than traditional systems?
              </h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                By eliminating intermediary overhead and enabling parallel
                verification across multiple nodes, APX dramatically reduces
                processing times. Smart contracts automate routine verification
                tasks, while off-chain computation handles complex algorithms
                efficiently.
              </p>
            </div>

            <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
              <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                How does provider reputation scoring work?
              </h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                The network tracks historical claim accuracy and validation
                performance for each provider. Higher reputation scores result
                in faster claim processing and reduced verification
                requirements, creating economic incentives for honest
                participation.
              </p>
            </div>

            <div className="pb-8">
              <h3 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
                Can this integrate with existing healthcare systems?
              </h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Yes. APX provides RESTful APIs and standard healthcare data
                format support (HL7, FHIR) for seamless integration with
                existing electronic health record systems and practice
                management software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-6 py-32 sm:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 lg:text-5xl">
              The future of healthcare infrastructure.
            </h2>
            <p className="mt-8 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
              Democratizing access to efficient claims processing for
              underserved regions where traditional infrastructure is weak or
              absent. Making healthcare more affordable and accessible while
              maintaining the highest standards of security and privacy.
            </p>
            <div className="mt-12">
              <button className="group rounded-full bg-zinc-900 px-8 py-4 text-base font-medium text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                Join the Network
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="docs"
        className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl px-6 py-32 sm:px-12 lg:px-16">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 px-8 py-20 text-center dark:border-zinc-800 dark:bg-zinc-900 md:px-16">
            <h2 className="text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-50 lg:text-5xl">
              Ready to transform your claims verification?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Join healthcare providers and insurance networks already
              leveraging decentralized consensus for faster, more transparent
              claims processing.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="group rounded-full bg-zinc-900 px-8 py-4 text-base font-medium text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                Start Building
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button className="rounded-full border border-zinc-300 px-8 py-4 text-base font-medium text-zinc-900 transition-all hover:border-zinc-400 hover:bg-white dark:border-zinc-700 dark:text-zinc-50 dark:hover:border-zinc-600 dark:hover:bg-zinc-950">
                View Documentation
              </button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Open Source
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Production Ready
              </span>
              <span className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Full Documentation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-12 lg:px-16">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
                APX
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Decentralized healthcare claims verification through distributed
                consensus.
              </p>
            </div>

            <div>
              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Product
              </div>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#technology"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#use-cases"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Use Cases
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Developers
              </div>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Smart Contracts
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Company
              </div>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row">
              <div>© 2025 APX — Decentralized Healthcare Claims Network</div>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  Security
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
