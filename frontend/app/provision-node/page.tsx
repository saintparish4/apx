"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProvisionNodePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [nodeIdentifier, setNodeIdentifier] = useState("");
  const [region, setRegion] = useState("EU-Central (GDPR Compliant)");

  const steps = [
    { num: '01', title: 'Hardware & Requirements' },
    { num: '02', title: 'Stake & Bond Allocation' },
    { num: '03', title: 'Configuration & Keys' },
    { num: '04', title: 'Network Synchronization' }
  ];

  const requirements = [
    { label: 'Compute', value: '16 vCPU / 64GB RAM', note: 'Dedicated Intel SGX preferred' },
    { label: 'Storage', value: '2TB NVMe SSD', note: 'IOPS > 15,000 required' },
    { label: 'Network', value: '1 Gbps Symmetric', note: 'Stateless P2P Latency < 50ms' },
    { label: 'OS', value: 'APXOS v4.2+ / Linux', note: 'Kernel 5.15 LTS (minimum)' }
  ];

  const bottomLinks = [
    { category: 'Documentation', title: 'Setup Guide', desc: 'Full CLI walkthrough for manual head-less installation on server farms.' },
    { category: 'Compliance', title: 'Security Audit', desc: 'View the latest Trail of Bits report on node isolation protocols.' },
    { category: 'Support', title: 'Node Operator DAO', desc: 'Join the Discord for 24/7 technical assistance and peer coordination.' }
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
            className="px-6 flex items-center text-sm cursor-pointer transition-colors hover:bg-black/[0.03]"
            style={{ borderRight: 'var(--border)' }}
          >
            Node Map
          </Link>
        </div>
        <div 
          className="flex items-center px-8"
          style={{ borderLeft: 'var(--heavy-border)' }}
        >
          <span className="font-mono text-xs">Network: Mainnet v4.2</span>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className="p-8 flex flex-col"
          style={{ 
            width: '320px',
            borderRight: 'var(--heavy-border)',
            height: 'calc(100vh - 73px)',
            position: 'sticky',
            top: '73px'
          }}
        >
          <div className="font-mono text-xs mb-8" style={{ color: 'var(--clay)' }}>
            Provisioning Wizard v1.0
          </div>

          {steps.map((step, i) => (
            <div 
              key={i}
              className={`relative pl-8 mb-10 cursor-pointer ${activeStep === i + 1 ? 'font-semibold' : ''}`}
              style={{ color: activeStep === i + 1 ? 'var(--forest)' : 'inherit' }}
              onClick={() => setActiveStep(i + 1)}
            >
              {/* Vertical line */}
              {i < steps.length - 1 && (
                <div 
                  className="absolute left-0 top-0 w-px h-full"
                  style={{ 
                    backgroundColor: activeStep > i + 1 ? 'var(--forest)' : 'rgba(28, 28, 27, 0.15)',
                    bottom: '-2.5rem'
                  }}
                />
              )}
              {/* Active dot */}
              {activeStep === i + 1 && (
                <div 
                  className="absolute w-2 h-2 rounded-full"
                  style={{ 
                    left: '-3px',
                    top: '5px',
                    backgroundColor: 'var(--forest)'
                  }}
                />
              )}
              <div className="font-mono text-[10px] mb-1">Step {step.num}</div>
              <div>{step.title}</div>
            </div>
          ))}

          <div className="mt-auto pt-8" style={{ borderTop: 'var(--border)' }}>
            <p className="text-xs text-gray-500 italic">
              Nodes contribute to the global clinical state and earn $HLX rewards for ZK-Proof verification.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-16" style={{ backgroundColor: '#E8E6E1' }}>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="font-serif text-5xl mb-4">Join the Ledger.</h1>
              <p className="text-lg text-gray-600">
                Provisioning a node allows you to validate HL7-FHIR transactions and secure the decentralized health record network.
              </p>
            </div>

            {/* Hardware Requirements Card */}
            <div 
              className="p-10 mb-8"
              style={{ 
                backgroundColor: 'var(--paper)',
                border: 'var(--heavy-border)',
                boxShadow: '4px 4px 0px var(--ink)'
              }}
            >
              <span 
                className="inline-block px-2 py-1 font-mono text-xs mb-2"
                style={{ backgroundColor: 'var(--highlight)', color: 'var(--ink)' }}
              >
                MINIMUM SPECIFICATIONS
              </span>
              <h3 className="font-serif text-2xl mb-6">Environmental Requirements</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {requirements.map((req, i) => (
                  <div 
                    key={i}
                    className="p-6"
                    style={{ border: 'var(--border)', backgroundColor: 'rgba(255,255,255,0.5)' }}
                  >
                    <div className="font-mono text-xs text-gray-500 mb-2">{req.label}</div>
                    <div className="font-medium">{req.value}</div>
                    <div className="font-mono text-xs mt-2" style={{ color: 'var(--clay)' }}>{req.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Registration Card */}
            <div 
              className="p-10 mb-8"
              style={{ 
                backgroundColor: 'var(--paper)',
                border: 'var(--heavy-border)',
                boxShadow: '4px 4px 0px var(--ink)'
              }}
            >
              <h3 className="font-serif text-2xl mb-6">Node Registration</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-mono text-xs text-gray-500 mb-2">
                    NODE IDENTIFIER (ALIAS)
                  </label>
                  <input 
                    type="text"
                    value={nodeIdentifier}
                    onChange={(e) => setNodeIdentifier(e.target.value)}
                    placeholder="e.g. Zurich_Clinic_Primary"
                    className="w-full px-3 py-3 font-mono text-sm bg-transparent"
                    style={{ border: '1px solid var(--ink)' }}
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-gray-500 mb-2">
                    REGION / JURISDICTION
                  </label>
                  <select 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-3 font-mono text-sm bg-transparent"
                    style={{ border: '1px solid var(--ink)' }}
                  >
                    <option>EU-Central (GDPR Compliant)</option>
                    <option>US-East (HIPAA Compliant)</option>
                    <option>Asia-Pacific</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-mono text-xs text-gray-500 mb-2">
                  PUBLIC ED25519 KEY
                </label>
                <input 
                  type="text"
                  readOnly
                  value="7f82b3a1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7"
                  placeholder="0x..."
                  className="w-full px-3 py-3 font-mono text-sm bg-transparent"
                  style={{ border: '1px solid var(--ink)' }}
                />
              </div>

              {/* Stake Info */}
              <div 
                className="p-8 mt-8"
                style={{ backgroundColor: 'var(--forest)', color: 'var(--paper)' }}
              >
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="font-mono text-xs opacity-70">REQUIRED STAKE</div>
                    <div className="font-serif text-4xl">50,000 HLX</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs opacity-70">EST. APY</div>
                    <div className="font-mono text-3xl" style={{ color: 'var(--highlight)' }}>14.2%</div>
                  </div>
                </div>
                <p className="text-sm opacity-80">
                  Bonding tokens ensures protocol honesty. Malicious validation of clinical records results in a permanent stake slash of 15%.
                </p>
              </div>

              <button 
                className="w-full py-4 font-mono text-sm mt-8 transition-colors hover:bg-[var(--forest)]"
                style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)' }}
              >
                CONFIRM HARDWARE & INITIALIZE BOND
              </button>
              <div className="text-center mt-4">
                <span className="font-mono text-[10px] text-gray-500">
                  BY CONTINUING YOU AGREE TO THE APX GOVERNANCE BYLAWS
                </span>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="grid grid-cols-3 gap-8 mb-20">
              {bottomLinks.map((link, i) => (
                <div key={i}>
                  <div className="font-mono text-[10px] mb-2" style={{ color: 'var(--clay)' }}>
                    {link.category}
                  </div>
                  <h4 className="font-semibold mb-2">{link.title}</h4>
                  <p className="text-xs text-gray-600">{link.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer 
        className="p-12 grid grid-cols-4 gap-8"
        style={{ backgroundColor: 'var(--forest)', color: 'var(--paper)' }}
      >
        <div>
          <div className="font-serif text-2xl mb-4">APX.</div>
          <div className="font-mono text-[10px] opacity-50">© 2024 APX FOUNDATION</div>
        </div>
        
        <div>
          <h4 className="font-mono text-xs mb-4" style={{ color: 'var(--clay)' }}>Network Status</h4>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Active Nodes</span>
              <span className="font-mono">1,482</span>
            </div>
            <div className="flex justify-between">
              <span>Total Stake</span>
              <span className="font-mono">74.1M HLX</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs mb-4" style={{ color: 'var(--clay)' }}>Developers</h4>
          <ul className="text-sm space-y-1 opacity-70">
            <li className="cursor-pointer hover:opacity-100">GitHub Repository</li>
            <li className="cursor-pointer hover:opacity-100">API Explorer</li>
            <li className="cursor-pointer hover:opacity-100">ZKP Proof Specs</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs mb-4" style={{ color: 'var(--clay)' }}>Legal</h4>
          <ul className="text-sm space-y-1 opacity-70">
            <li className="cursor-pointer hover:opacity-100">Privacy Policy</li>
            <li className="cursor-pointer hover:opacity-100">Terms of Service</li>
            <li className="cursor-pointer hover:opacity-100">Governance DAO</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
