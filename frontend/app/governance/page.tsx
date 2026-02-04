"use client";

import Link from "next/link";

export default function GovernancePage() {
  const activeProposals = [
    {
      id: 'HIP-84',
      title: 'Implement Recursive SNARKs for Batch Verification',
      description: 'Upgrade the clinical ledger to support recursive ZK-proofs, reducing node storage requirements by 40%.',
      yesPercent: 72,
      quorumPercent: 12,
      status: 'active'
    },
    {
      id: 'HIP-85',
      title: 'Biometric Hash Salt Expansion',
      description: 'Standardize identity entropy parameters for genomic sequence indexing across EU-based nodes.',
      yesPercent: 24,
      quorumPercent: 2,
      status: 'active'
    }
  ];

  const pastProposals = [
    {
      id: 'HIP-82',
      title: 'Validator Slashing Parameter adjustment',
      result: '94.2% YES',
      status: 'executed'
    }
  ];

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}>
      {/* Navigation */}
      <nav 
        className="flex justify-between items-stretch sticky top-0 z-50"
        style={{ borderBottom: 'var(--heavy-border)', backgroundColor: 'var(--paper)' }}
      >
        <Link 
          href="/"
          className="p-6 font-serif text-2xl font-semibold flex items-center"
          style={{ borderRight: 'var(--heavy-border)', width: '280px' }}
        >
          APX.
        </Link>
        <div className="flex flex-grow">
          <Link 
            href="/protocol"
            className="px-6 flex items-center text-sm cursor-pointer transition-colors hover:bg-black/[0.03]"
            style={{ borderRight: 'var(--border)' }}
          >
            Protocol
          </Link>
          <Link 
            href="/biometric-hash"
            className="px-6 flex items-center text-sm cursor-pointer transition-colors hover:bg-black/[0.03]"
            style={{ borderRight: 'var(--border)' }}
          >
            Biometric Hash
          </Link>
          <Link 
            href="/governance"
            className="px-6 flex items-center text-sm cursor-pointer font-semibold"
            style={{ borderRight: 'var(--border)', backgroundColor: 'rgba(0,0,0,0.05)' }}
          >
            Governance
          </Link>
          <Link 
            href="/node-map"
            className="px-6 flex items-center text-sm cursor-pointer transition-colors hover:bg-black/[0.03]"
            style={{ borderRight: 'var(--border)' }}
          >
            Node Map
          </Link>
        </div>
        <Link 
          href="/provision-node"
          className="flex items-center justify-center px-8 font-mono text-sm cursor-pointer transition-all hover:text-white"
          style={{ 
            backgroundColor: 'var(--ink)', 
            color: 'var(--paper)', 
            borderLeft: 'var(--heavy-border)',
            width: '280px'
          }}
        >
          PROVISION NODE
        </Link>
      </nav>

      {/* Governance Header */}
      <div 
        className="grid"
        style={{ gridTemplateColumns: '280px 1fr', borderBottom: 'var(--heavy-border)' }}
      >
        {/* Sidebar */}
        <aside 
          className="p-8"
          style={{ borderRight: 'var(--heavy-border)', backgroundColor: '#E8E6E1' }}
        >
          <div className="font-mono text-xs mb-8" style={{ color: 'var(--clay)' }}>
            ◆ DAO Parameters
          </div>

          {/* Stat Cards */}
          <div className="mb-6 p-6 bg-white" style={{ border: 'var(--border)' }}>
            <div className="font-mono text-xs text-gray-500 mb-1">Total Staked</div>
            <div className="font-serif text-3xl">4.2M HLX</div>
          </div>

          <div className="mb-6 p-6 bg-white" style={{ border: 'var(--border)' }}>
            <div className="font-mono text-xs text-gray-500 mb-1">Quorum Requirement</div>
            <div className="font-serif text-3xl">15.0%</div>
          </div>

          <div className="mb-6 p-6 bg-white" style={{ border: 'var(--border)' }}>
            <div className="font-mono text-xs text-gray-500 mb-1">Active Proposals</div>
            <div className="font-serif text-3xl">07</div>
          </div>

          <button 
            className="w-full px-6 py-3 font-mono text-xs transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)] mt-4"
            style={{ border: '1px solid var(--ink)', backgroundColor: 'transparent' }}
          >
            NEW PROPOSAL +
          </button>
          <div className="font-mono text-xs text-gray-400 mt-4 text-center">
            Requires 10,000 HLX Stake
          </div>
        </aside>

        {/* Main Content */}
        <main className="p-16">
          <div className="font-mono text-xs mb-4" style={{ color: 'var(--forest)' }}>
            — On-Chain Consensus
          </div>
          <h1 className="font-serif text-6xl mb-12">Distributed Decision Making</h1>

          {/* Proposal List */}
          <div>
            <div 
              className="font-mono text-xs pb-2 flex justify-between"
              style={{ borderBottom: '2px solid var(--ink)' }}
            >
              <span>Active Proposals</span>
              <span>Status: Open</span>
            </div>

            {/* Active Proposals */}
            {activeProposals.map((proposal) => (
              <div 
                key={proposal.id}
                className="py-8 grid items-center hover:bg-black/[0.01]"
                style={{ 
                  gridTemplateColumns: '1fr 200px 150px',
                  borderBottom: 'var(--border)'
                }}
              >
                <div>
                  <span 
                    className="font-mono text-xs px-2 py-0.5 mb-2 inline-block"
                    style={{ backgroundColor: 'var(--highlight)', color: '#000' }}
                  >
                    {proposal.id}
                  </span>
                  <h3 className="font-serif text-2xl mt-2">{proposal.title}</h3>
                  <p className="text-sm text-gray-600 max-w-[500px] mt-1">
                    {proposal.description}
                  </p>
                </div>
                <div className="px-4">
                  <div className="font-mono text-xs">Voting Progress</div>
                  <div className="h-1 bg-gray-200 w-full mt-2 relative">
                    <div 
                      className="h-full"
                      style={{ 
                        width: `${proposal.yesPercent}%`,
                        backgroundColor: 'var(--forest)'
                      }}
                    />
                  </div>
                  <div className="font-mono text-xs mt-1 flex justify-between">
                    <span>Yes: {proposal.yesPercent}%</span>
                    <span>Quorum: {proposal.quorumPercent}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <button 
                    className="px-6 py-3 font-mono text-xs transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                    style={{ border: '1px solid var(--ink)', backgroundColor: 'transparent' }}
                  >
                    VOTE
                  </button>
                </div>
              </div>
            ))}

            {/* Past Resolutions Header */}
            <div 
              className="font-mono text-xs pt-12 pb-2"
              style={{ borderBottom: '1px solid var(--ink)' }}
            >
              Past Resolutions
            </div>

            {/* Past Proposals */}
            {pastProposals.map((proposal) => (
              <div 
                key={proposal.id}
                className="py-8 grid items-center opacity-70"
                style={{ 
                  gridTemplateColumns: '1fr 200px 150px',
                  borderBottom: 'var(--border)'
                }}
              >
                <div>
                  <span 
                    className="font-mono text-xs px-2 py-0.5 mb-2 inline-block text-white"
                    style={{ backgroundColor: 'var(--clay)' }}
                  >
                    {proposal.id} (EXECUTED)
                  </span>
                  <h3 className="font-serif text-xl mt-2">{proposal.title}</h3>
                </div>
                <div>
                  <div className="font-mono text-xs">Final Result</div>
                  <div className="font-mono text-lg" style={{ color: 'var(--clay)' }}>
                    {proposal.result}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs cursor-pointer hover:underline">View Archive</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Value Grid */}
      <section 
        className="grid grid-cols-3"
        style={{ borderBottom: 'var(--heavy-border)' }}
      >
        <div className="p-12" style={{ borderRight: 'var(--border)' }}>
          <div className="font-mono text-xs">STAKEHOLDERS</div>
          <div className="font-serif text-4xl my-4" style={{ color: 'var(--clay)' }}>12.4k</div>
          <div className="text-sm text-gray-600">
            Unique identity hashes currently participating in consensus voting.
          </div>
        </div>
        <div className="p-12" style={{ borderRight: 'var(--border)' }}>
          <div className="font-mono text-xs">DELEGATION</div>
          <div className="font-serif text-4xl my-4" style={{ color: 'var(--forest)' }}>68%</div>
          <div className="text-sm text-gray-600">
            Tokens delegated to verified clinical research organizations.
          </div>
        </div>
        <div className="p-12">
          <div className="font-mono text-xs">LATENCY</div>
          <div className="font-serif text-4xl my-4" style={{ color: 'var(--ink)' }}>12h</div>
          <div className="text-sm text-gray-600">
            Average time for an approved HIP to reach block finality and execution.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-16 px-8 grid grid-cols-4 gap-8 text-gray-300"
        style={{ backgroundColor: 'var(--forest)' }}
      >
        <div>
          <div className="font-serif text-2xl text-white mb-4">APX.</div>
          <div className="font-mono text-xs opacity-60">© 2024 APX FOUNDATION LTD.</div>
        </div>
        
        <div>
          <h4 className="font-mono text-sm mb-6" style={{ color: 'var(--clay)' }}>NETWORK</h4>
          <ul className="space-y-3">
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Protocol Specs</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Cryptography</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Staking</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Block Explorer</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm mb-6" style={{ color: 'var(--clay)' }}>DOCUMENTATION</h4>
          <ul className="space-y-3">
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Whitepaper</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Smart Contracts</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">API Reference</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Security Audit</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm mb-6" style={{ color: 'var(--clay)' }}>FOUNDATION</h4>
          <ul className="space-y-3">
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">DAO Governance</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Ecosystem</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Compliance</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Grants</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
