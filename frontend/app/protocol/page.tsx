"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProtocolPage() {
  const [activeSection, setActiveSection] = useState("consensus");

  const sideNavItems = [
    { id: "consensus", label: "0.1 CONSENSUS ENGINE" },
    { id: "schemas", label: "0.2 DATA SCHEMAS" },
    { id: "zkp", label: "0.3 ZERO-KNOWLEDGE" },
    { id: "topology", label: "0.4 NODE TOPOLOGY" },
    { id: "hl7", label: "0.5 HL7 WRAPPERS" },
    { id: "gas", label: "0.6 GAS OPTIMIZATION" },
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
            className="px-6 flex items-center text-sm cursor-pointer transition-colors font-semibold"
            style={{ borderRight: 'var(--border)', backgroundColor: 'rgba(0,0,0,0.05)' }}
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

      {/* Protocol Header */}
      <div 
        className="py-16 px-16 pr-[280px]"
        style={{ borderBottom: 'var(--heavy-border)' }}
      >
        <div className="font-mono text-xs mb-4" style={{ color: 'var(--clay)' }}>
          00 // CORE SPECIFICATION
        </div>
        <h1 className="font-serif text-6xl max-w-[800px]">
          The architecture of <span className="italic">clinical proof.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-[600px] mt-6">
          A detailed guide to the APX consensus engine, cryptographic primitives, and the HL7-FHIR on-chain implementation.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Side Navigation */}
        <aside 
          className="py-8 shrink-0"
          style={{ 
            width: '280px', 
            borderRight: 'var(--heavy-border)',
            height: 'calc(100vh - 73px)',
            position: 'sticky',
            top: '73px'
          }}
        >
          {sideNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`block w-full text-left py-3 px-8 font-mono text-xs transition-colors ${
                activeSection === item.id 
                  ? 'text-[var(--ink)] border-l-4'
                  : 'text-gray-500 hover:text-[var(--ink)]'
              }`}
              style={{
                borderLeftColor: activeSection === item.id ? 'var(--clay)' : 'transparent',
                paddingLeft: activeSection === item.id ? 'calc(2rem - 4px)' : '2rem'
              }}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-16 max-w-[900px]">
          {/* Consensus Section */}
          <section id="consensus">
            <h2 className="font-serif text-4xl mb-6">Distributed Byzantine Medical Consensus</h2>
            <p className="text-gray-700 leading-relaxed">
              APX utilizes a modified Proof-of-Authority (PoA) mechanism merged with Byzantine Fault Tolerance (BFT) 
              to ensure that only verified clinical providers can commit to the ledger, while maintaining sub-second finality.
            </p>

            {/* Spec Grid */}
            <div className="grid grid-cols-2 gap-8 my-12">
              <div className="p-6" style={{ border: 'var(--border)' }}>
                <div className="font-mono text-xs mb-2" style={{ color: 'var(--clay)' }}>ALGORITHM</div>
                <div className="font-serif text-xl">Quorum-based BFT</div>
              </div>
              <div className="p-6" style={{ border: 'var(--border)' }}>
                <div className="font-mono text-xs mb-2" style={{ color: 'var(--clay)' }}>BLOCK TIME</div>
                <div className="font-serif text-xl">~500ms Fixed</div>
              </div>
            </div>

            <h3 className="font-mono text-sm font-bold mt-12 mb-4">Implementing a Clinical Commit</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nodes must wrap medical data in a{' '}
              <code className="font-mono text-sm bg-gray-200 px-1 py-0.5">APXEnvelope</code>{' '}
              before broadcasting to the validator set.
            </p>

            {/* Code Block */}
            <div className="relative rounded my-8 overflow-x-auto" style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4' }}>
              <div className="absolute top-0 right-0 px-4 py-2 text-xs text-gray-500" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                APXCommit.rs
              </div>
              <pre className="p-8 font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-[#569cd6]">pub struct</span> <span className="text-[#dcdcaa]">ClinicalProof</span> {'{'}
                  {'\n'}    <span className="text-[#569cd6]">pub</span> sequence_id: <span className="text-[#569cd6]">u64</span>,
                  {'\n'}    <span className="text-[#569cd6]">pub</span> provider_sig: Signature,
                  {'\n'}    <span className="text-[#569cd6]">pub</span> patient_root: [u8; 32], <span className="text-[#6a9955]">// Merkle root of FHIR records</span>
                  {'\n'}    <span className="text-[#569cd6]">pub</span> zk_proof: <span className="text-[#569cd6]">Vec</span>&lt;<span className="text-[#569cd6]">u8</span>&gt;,    <span className="text-[#6a9955]">// Groth16 proof data</span>
                  {'\n'}{'}'}
                  {'\n'}
                  {'\n'}<span className="text-[#569cd6]">fn</span> <span className="text-[#dcdcaa]">verify_commit</span>(proof: ClinicalProof) -&gt; <span className="text-[#569cd6]">bool</span> {'{'}
                  {'\n'}    <span className="text-[#6a9955]">// Validate biometric signature against identity registry</span>
                  {'\n'}    <span className="text-[#569cd6]">let</span> is_valid_identity = Identity::<span className="text-[#dcdcaa]">verify</span>(&amp;proof.provider_sig);
                  {'\n'}    
                  {'\n'}    <span className="text-[#6a9955]">// Verify zero-knowledge proof of record validity</span>
                  {'\n'}    <span className="text-[#569cd6]">let</span> is_zkp_valid = ZKVerifier::<span className="text-[#dcdcaa]">verify_groth16</span>(&amp;proof.zk_proof);
                  {'\n'}    
                  {'\n'}    is_valid_identity &amp;&amp; is_zkp_valid
                  {'\n'}{'}'}
                </code>
              </pre>
            </div>
          </section>

          {/* Architecture Section */}
          <section id="architecture" className="mt-20">
            <h2 className="font-serif text-4xl mb-6">Ledger Architecture</h2>
            <p className="text-gray-700 leading-relaxed">
              The APX ledger is partitioned into three layers: the Identity Layer (biometrics), 
              the Storage Layer (IPFS/CIDs), and the Consensus Layer (ordering).
            </p>

            {/* Architecture Diagram */}
            <div className="my-8 p-8 bg-white" style={{ border: 'var(--border)' }}>
              <div className="flex justify-around items-center text-center">
                <div className="w-32">
                  <div 
                    className="h-16 flex items-center justify-center mb-2 font-mono text-xs"
                    style={{ border: '1px solid var(--ink)' }}
                  >
                    HL7 INPUT
                  </div>
                  <div className="text-xs text-gray-500">Standard Medical Formats</div>
                </div>
                
                <div className="text-2xl text-gray-400">→</div>
                
                <div className="w-32">
                  <div 
                    className="h-16 flex items-center justify-center mb-2 font-mono text-xs"
                    style={{ border: '1px solid var(--clay)', backgroundColor: '#f9faf8' }}
                  >
                    HASH ENGINE
                  </div>
                  <div className="text-xs text-gray-500">Blake3 Obfuscation</div>
                </div>
                
                <div className="text-2xl text-gray-400">→</div>
                
                <div className="w-32">
                  <div 
                    className="h-16 flex items-center justify-center mb-2 font-mono text-xs text-white"
                    style={{ border: '2px solid var(--forest)', backgroundColor: 'var(--forest)' }}
                  >
                    GENESIS LEDGER
                  </div>
                  <div className="text-xs text-gray-500">Immutable Block Anchor</div>
                </div>
              </div>
            </div>

            <h3 className="font-mono text-sm font-bold mt-12 mb-4">Data Obfuscation Standards</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              APX employs <span className="font-semibold">Pedersen Commitments</span> to ensure that sensitive 
              phenotypic data is hidden while still allowing for mathematical verification by authorized researchers.
            </p>

            {/* GraphQL Code Block */}
            <div className="relative rounded my-8 overflow-x-auto" style={{ backgroundColor: '#252526', color: '#d4d4d4' }}>
              <div className="absolute top-0 right-0 px-4 py-2 text-xs text-gray-500" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                Schema.graphql
              </div>
              <pre className="p-8 font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-[#569cd6]">type</span> <span className="text-[#dcdcaa]">PatientRecord</span> {'{'}
                  {'\n'}  id: ID!
                  {'\n'}  identityCommitment: <span className="text-[#ce9178]">&quot;0x...&quot;</span>
                  {'\n'}  encryptedPayload: String! <span className="text-[#6a9955]"># AES-256-GCM</span>
                  {'\n'}  accessPolicy: [Address!]!
                  {'\n'}  timestamp: Int!
                  {'\n'}  zkProofRef: CID!
                  {'\n'}{'}'}
                </code>
              </pre>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer 
        className="py-16 px-8 grid grid-cols-4 gap-8 text-gray-300"
        style={{ backgroundColor: 'var(--forest)', borderTop: 'var(--heavy-border)' }}
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
