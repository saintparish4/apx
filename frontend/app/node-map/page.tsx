"use client";

import Link from "next/link";

export default function NodeMapPage() {
  const nodes = [
    {
      name: 'Mayo_Clinic_01',
      location: 'Rochester, US',
      address: '0x4A...2C91',
      latency: '14ms',
      status: 'Verified'
    },
    {
      name: 'Charite_Berlin_A',
      location: 'Berlin, DE',
      address: '0x8E...77B2',
      latency: '32ms',
      status: 'Verified'
    },
    {
      name: 'Sing_Health_Core',
      location: 'Singapore, SG',
      address: '0xFD...003A',
      latency: '8ms',
      status: 'Verified'
    },
    {
      name: 'Mount_Sinai_Gen',
      location: 'New York, US',
      address: '0x11...BB90',
      latency: '19ms',
      status: 'Verified'
    }
  ];

  const mapNodes = [
    { id: 'US-EAST-LEAD', top: '38%', left: '22%' },
    { id: 'EU-WEST-CONSENSUS', top: '32%', left: '48%' },
    { id: 'ASIA-PAC-GATEWAY', top: '55%', left: '78%' },
    { id: 'LATAM-EDGE-04', top: '68%', left: '35%' }
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
            className="px-6 flex items-center text-sm cursor-pointer transition-colors hover:bg-black/[0.03]"
            style={{ borderRight: 'var(--border)' }}
          >
            Governance
          </Link>
          <Link 
            href="/node-map"
            className="px-6 flex items-center text-sm cursor-pointer font-semibold"
            style={{ borderRight: 'var(--border)', backgroundColor: 'rgba(0,0,0,0.05)' }}
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

      {/* Map Section */}
      <main 
        className="grid"
        style={{ 
          height: 'calc(100vh - 74px)',
          gridTemplateColumns: '320px 1fr 320px',
          backgroundColor: 'var(--forest)'
        }}
      >
        {/* Left Panel - Node List */}
        <aside 
          className="flex flex-col overflow-y-auto"
          style={{ backgroundColor: 'var(--paper)', borderRight: 'var(--heavy-border)' }}
        >
          <div className="p-6" style={{ borderBottom: 'var(--border)', backgroundColor: '#E8E6E1' }}>
            <div className="font-mono text-xs mb-2" style={{ color: 'var(--forest)' }}>
              Active Validators
            </div>
            <h3 className="font-serif text-xl">Network Participants</h3>
          </div>

          {nodes.map((node, i) => (
            <div 
              key={i}
              className="px-6 py-4 cursor-pointer transition-colors hover:bg-white"
              style={{ borderBottom: 'var(--border)' }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-xs font-bold">{node.name}</span>
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ 
                    backgroundColor: 'var(--highlight)',
                    boxShadow: '0 0 10px var(--highlight)'
                  }}
                />
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {node.location} • {node.address}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] font-mono">Latency: {node.latency}</span>
                <span className="text-[10px] font-mono text-emerald-600">{node.status}</span>
              </div>
            </div>
          ))}

          <div className="p-6 mt-auto" style={{ borderTop: 'var(--border)' }}>
            <button 
              className="w-full py-3 font-mono text-xs transition-all hover:bg-[var(--ink)] hover:text-white"
              style={{ border: '1px solid var(--ink)' }}
            >
              View All 1,482 Nodes
            </button>
          </div>
        </aside>

        {/* Map Viewport */}
        <div 
          className="relative overflow-hidden flex items-center justify-center"
          style={{ background: 'radial-gradient(circle at center, #1e3a4a 0%, #0d1a21 100%)' }}
        >
          {/* Map SVG (simplified representation) */}
          <svg 
            className="w-[90%] h-[80%] opacity-20"
            viewBox="0 0 1000 500"
            style={{ stroke: 'var(--highlight)', strokeWidth: 0.5, fill: 'none' }}
          >
            <path d="M150,150 Q200,100 300,150 T500,150" />
            <path d="M600,200 Q700,150 800,250" />
            <circle cx="200" cy="200" r="2" fill="currentColor" />
            <circle cx="450" cy="180" r="2" fill="currentColor" />
            <circle cx="750" cy="300" r="2" fill="currentColor" />
          </svg>

          {/* Node Points */}
          {mapNodes.map((node) => (
            <div 
              key={node.id}
              className="absolute w-3 h-3 rounded-full cursor-pointer animate-pulse-node"
              style={{ 
                top: node.top, 
                left: node.left,
                backgroundColor: 'var(--highlight)',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div 
                className="absolute top-5 left-1/2 -translate-x-1/2 px-2 py-1 font-mono text-[10px] whitespace-nowrap pointer-events-none"
                style={{ backgroundColor: 'var(--ink)', color: 'var(--highlight)' }}
              >
                {node.id}
              </div>
            </div>
          ))}

          {/* Live Feed Overlay */}
          <div 
            className="absolute top-8 left-8 p-4 backdrop-blur"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div className="font-mono text-[10px] text-white/60">Live Feed</div>
            <div className="font-mono text-xs text-white mt-1">Block #8,124,002 Propagated</div>
            <div className="font-mono text-[10px] text-emerald-400 mt-2">Consensus Time: 1.4s</div>
          </div>

          {/* Ticker Bar */}
          <div 
            className="absolute bottom-0 w-full py-2.5 px-5 font-mono text-xs text-white flex justify-between"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(5px)',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div>BYZANTINE FAULT TOLERANCE: <span className="text-emerald-400">OPTIMAL</span></div>
            <div>GLOBAL SYNC: <span className="text-emerald-400">99.98%</span></div>
            <div>TPS: <span className="text-emerald-400">14,209</span></div>
          </div>
        </div>

        {/* Right Panel - Metrics */}
        <aside 
          className="flex flex-col"
          style={{ backgroundColor: 'var(--paper)', borderLeft: 'var(--heavy-border)' }}
        >
          <div className="p-6" style={{ borderBottom: 'var(--border)', backgroundColor: '#E8E6E1' }}>
            <div className="font-mono text-xs mb-2" style={{ color: 'var(--forest)' }}>
              Network Health
            </div>
            <h3 className="font-serif text-xl">System Performance</h3>
          </div>

          <div className="p-6" style={{ borderBottom: 'var(--border)' }}>
            <div className="font-mono text-[10px] text-gray-500">Total Staked Value</div>
            <div className="font-serif text-3xl mt-2">
              4.8B <span className="text-sm font-sans text-gray-400">HLX</span>
            </div>
            <div className="h-0.5 bg-black/10 mt-2.5 relative">
              <div className="h-full" style={{ width: '82%', backgroundColor: 'var(--forest)' }} />
            </div>
          </div>

          <div className="p-6" style={{ borderBottom: 'var(--border)' }}>
            <div className="font-mono text-[10px] text-gray-500">Healthcare Providers</div>
            <div className="font-serif text-3xl mt-2">842</div>
            <div className="font-mono text-[10px] text-emerald-600 mt-2">+12 New this week</div>
          </div>

          <div className="p-6" style={{ borderBottom: 'var(--border)' }}>
            <div className="font-mono text-[10px] text-gray-500">Data Availability Gap</div>
            <div className="font-serif text-3xl mt-2">
              0.02<span className="text-sm font-sans text-gray-400">%</span>
            </div>
            <div className="font-mono text-[10px] text-gray-400 mt-2">Calculated over 24h</div>
          </div>

          {/* Geographic Distribution */}
          <div className="p-6 mt-auto" style={{ backgroundColor: '#f1f5f9' }}>
            <div className="font-mono text-[10px] mb-2">Geographic Distribution</div>
            <div className="flex gap-1 h-8">
              <div style={{ width: '45%', backgroundColor: '#1e293b' }} />
              <div style={{ width: '30%', backgroundColor: '#475569' }} />
              <div style={{ width: '15%', backgroundColor: '#94a3b8' }} />
              <div style={{ width: '10%', backgroundColor: '#cbd5e1' }} />
            </div>
            <div className="flex justify-between font-mono text-[8px] mt-2">
              <span>NA</span>
              <span>EU</span>
              <span>AS</span>
              <span>OTH</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
