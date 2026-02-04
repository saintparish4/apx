"use client";

import Link from "next/link";

export default function Home() {
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
            className="px-6 flex items-center text-sm cursor-pointer transition-colors hover:bg-black/[0.03]"
            style={{ borderRight: 'var(--border)' }}
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

      {/* Hero Section */}
      <section 
        className="h-[600px] grid grid-cols-[60%_40%]"
        style={{ borderBottom: 'var(--heavy-border)' }}
      >
        <div 
          className="p-16 flex flex-col justify-between"
          style={{ borderRight: 'var(--heavy-border)' }}
        >
          <div>
            <div className="font-mono mb-4" style={{ color: 'var(--clay)' }}>
              ◆ Mainnet v4.2 Clinical Ledger
            </div>
            <h1 
              className="font-serif text-[5.5rem] leading-[0.9] mb-8"
              style={{ color: 'var(--ink)' }}
            >
              Health is<br />
              <span className="italic" style={{ color: 'var(--forest)' }}>cryptographic</span>.
            </h1>
            <p className="text-xl max-w-[420px] text-gray-600 mb-12">
              APX replaces vulnerable databases with distributed clinical intelligence. We secure biometric truth across zero-knowledge proofs.
            </p>
            <Link 
              href="#"
              className="inline-block px-8 py-4 text-sm font-mono transition-all hover:text-white"
              style={{ 
                border: '1px solid var(--ink)',
                color: 'var(--ink)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ink)';
                e.currentTarget.style.color = 'var(--paper)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--ink)';
              }}
            >
              Initialize Key Pair →
            </Link>
          </div>
        </div>
        
        <div 
          className="relative overflow-hidden p-8 flex items-center justify-center"
          style={{ backgroundColor: 'var(--forest)' }}
        >
          {/* Invoice Card */}
          <div 
            className="w-full max-w-[380px] p-8 shadow-2xl relative"
            style={{ 
              backgroundColor: 'var(--paper)',
              transform: 'rotate(-2deg)',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            <div className="flex justify-between pb-4 mb-6" style={{ borderBottom: '2px dashed #ccc' }}>
              <div className="font-mono text-xs">HL7-FHIR PROOF</div>
              <div className="font-mono text-xs">ZKP-VERIFIED</div>
            </div>
            <div className="flex justify-between mb-3 font-mono text-sm">
              <span>Sequence ID</span>
              <span>0x7F...9A4E</span>
            </div>
            <div className="flex justify-between mb-3 font-mono text-sm">
              <span>Clinical Markers</span>
              <span style={{ color: 'var(--forest)' }}>VALIDATED</span>
            </div>
            <div 
              className="flex justify-between mb-3 font-mono text-sm px-2 py-1 -mx-2"
              style={{ backgroundColor: 'var(--highlight)', color: '#111' }}
            >
              <span>Status: Immutable</span>
              <span>SYNCHRONIZED</span>
            </div>
            <div className="flex justify-between mb-3 font-mono text-sm">
              <span>Collision Risk</span>
              <span>&lt; 1e-18</span>
            </div>
            <div className="mt-8 pt-4 text-center font-mono text-xs" style={{ borderTop: '1px solid #eee' }}>
              BLOCK COMMIT SUCCESSFUL
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div 
        className="overflow-hidden whitespace-nowrap py-4"
        style={{ borderBottom: 'var(--heavy-border)', backgroundColor: 'var(--ink)', color: 'var(--paper)' }}
      >
        <div className="inline-block animate-marquee font-mono text-sm">
          DECENTRALIZED MEDICAL RECORD CONSENSUS ✦ AES-256 ENCRYPTED BYZANTINE FAULT TOLERANCE ✦ ZERO-KNOWLEDGE PATIENT PRIVACY ✦ DECENTRALIZED MEDICAL RECORD CONSENSUS ✦ AES-256 ENCRYPTED BYZANTINE FAULT TOLERANCE ✦ ZERO-KNOWLEDGE PATIENT PRIVACY ✦&nbsp;
        </div>
      </div>

      {/* Value Grid */}
      <section 
        className="grid grid-cols-4"
        style={{ borderBottom: 'var(--heavy-border)' }}
      >
        {[
          { num: '01', value: '100%', title: 'Data Sovereignty', desc: 'Patients retain private keys to their own phenotypic and genomic data.' },
          { num: '02', value: 'ms', title: 'Latency Transfer', desc: 'Instant interoperability between hospital nodes via lightning channels.' },
          { num: '03', value: 'PB', title: 'Clinical Depth', desc: 'Petabytes of verified clinical trials cross-referenced on-chain.' },
          { num: '04', value: 'SHA', title: 'Tamper Proof', desc: 'Every diagnostic entry is hashed and anchored to the global state.' },
        ].map((item, i) => (
          <div 
            key={i}
            className="p-8 flex flex-col justify-between h-[300px] transition-colors hover:bg-white"
            style={{ borderRight: i < 3 ? 'var(--border)' : 'none' }}
          >
            <div className="font-mono text-xs">{item.num}</div>
            <div>
              <div className="font-serif text-5xl mb-4" style={{ color: 'var(--clay)' }}>{item.value}</div>
              <div className="font-semibold uppercase text-xs tracking-wider mb-2">{item.title}</div>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Demo Section */}
      <section 
        className="py-24 px-16"
        style={{ backgroundColor: '#E8E6E1', borderBottom: 'var(--heavy-border)' }}
      >
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono text-xs mb-4" style={{ color: 'var(--forest)' }}>
              — Cryptographic Integrity
            </div>
            <h2 className="font-serif text-6xl mb-6">Code is medicine.</h2>
            <p className="text-lg mb-8 max-w-[400px]">
              Legacy healthcare relies on trust. APX relies on math. We build an immutable fortress around patient identity using distributed ledger technology.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span 
                  className="w-2.5 h-2.5 rounded-full mr-4 block"
                  style={{ backgroundColor: 'var(--clay)' }}
                />
                Homomorphic encryption for analytics
              </li>
              <li className="flex items-center">
                <span 
                  className="w-2.5 h-2.5 rounded-full mr-4 block"
                  style={{ backgroundColor: 'var(--forest)' }}
                />
                Multi-sig provider authorization
              </li>
            </ul>
          </div>

          {/* Control Panel */}
          <div 
            className="p-8 rounded-xl text-white"
            style={{ backgroundColor: 'var(--ink)' }}
          >
            <div className="flex justify-between pb-4 mb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              <span className="font-mono text-xs">CONSENSUS STATUS</span>
              <span className="font-mono text-xs">EPOCH 812</span>
            </div>

            <div className="flex items-center mb-6">
              <span className="w-36 font-mono text-xs text-gray-400">Centralized Server</span>
              <div className="flex-grow h-1 bg-white/10 mx-4 relative">
                <div className="h-full bg-gray-500" style={{ width: '65%' }} />
              </div>
              <span className="font-mono text-sm text-gray-400">VULNERABLE</span>
            </div>

            <div className="flex items-center mb-6">
              <span className="w-36 font-mono text-xs text-gray-400">APX Protocol</span>
              <div className="flex-grow h-1 bg-white/10 mx-4 relative">
                <div className="h-full animate-fill-bar" style={{ backgroundColor: 'var(--highlight)' }} />
              </div>
              <span className="font-mono text-sm" style={{ color: 'var(--highlight)' }}>IMMUTABLE</span>
            </div>

            <div 
              className="mt-8 pt-4 flex justify-between items-center"
              style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              <span className="font-mono text-xs text-gray-400">DISTRIBUTED VERIFICATION CONFIDENCE</span>
              <span className="text-2xl" style={{ color: 'var(--highlight)' }}>99.99%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-8 text-center">
        <h2 className="font-serif text-5xl mb-4">Permissionless access tiers.</h2>
        <p className="text-gray-600">Gas-optimized verification. No middleware fees.</p>

        <div className="max-w-[900px] mx-auto mt-16" style={{ borderTop: '2px solid var(--ink)' }}>
          {/* Header Row */}
          <div 
            className="grid grid-cols-[2fr_1fr_1fr] py-4 text-left font-mono uppercase text-xs"
            style={{ borderBottom: '2px solid var(--ink)' }}
          >
            <span>Capabilities</span>
            <span>Legacy EHR</span>
            <span className="font-bold" style={{ color: 'var(--forest)' }}>APX NODE</span>
          </div>

          {[
            { cap: 'End-to-End Encryption', legacy: 'Partial', apx: '✓' },
            { cap: 'Audit Trail Integrity', legacy: 'Editable', apx: 'HASH-LOCKED' },
            { cap: 'ZKP Patient Privacy', legacy: '—', apx: '✓' },
            { cap: 'Real-time Verification', legacy: '7-10 Days', apx: 'INSTANT' },
          ].map((row, i) => (
            <div 
              key={i}
              className="grid grid-cols-[2fr_1fr_1fr] py-6 text-left items-center"
              style={{ borderBottom: '1px solid var(--ink)' }}
            >
              <span>{row.cap}</span>
              <span style={{ color: 'var(--forest)', fontWeight: 'bold' }}>{row.legacy}</span>
              <span style={{ color: 'var(--forest)', fontWeight: 'bold' }}>{row.apx}</span>
            </div>
          ))}

          <div 
            className="grid grid-cols-[2fr_1fr_1fr] py-6 text-left items-center font-serif text-xl"
            style={{ borderBottom: '1px solid var(--ink)' }}
          >
            <span>Access Cost</span>
            <span>Subscription</span>
            <span style={{ color: 'var(--forest)' }}>Stake-Based</span>
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
