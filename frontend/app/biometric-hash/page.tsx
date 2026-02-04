"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function BiometricHashPage() {
  // Generate random dots for the hash visualization
  const hashDots = useMemo(() => {
    return Array.from({ length: 400 }, (_, i) => ({
      id: i,
      active: Math.random() > 0.85
    }));
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}>
      {/* Navigation */}
      <nav 
        className="flex justify-between items-stretch sticky top-0 z-50 h-20"
        style={{ borderBottom: 'var(--heavy-border)', backgroundColor: 'var(--paper)' }}
      >
        <Link 
          href="/"
          className="px-6 font-serif text-2xl font-semibold flex items-center"
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
            className="px-6 flex items-center text-sm cursor-pointer font-semibold"
            style={{ borderRight: 'var(--border)', backgroundColor: 'rgba(0,0,0,0.05)' }}
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

      {/* Identity Hero */}
      <header 
        className="grid grid-cols-2 min-h-[500px]"
        style={{ borderBottom: 'var(--heavy-border)' }}
      >
        <div 
          className="p-16 flex flex-col justify-center"
          style={{ borderRight: 'var(--heavy-border)' }}
        >
          <div className="font-mono text-xs mb-4" style={{ color: 'var(--clay)' }}>
            ✦ Secure Identity Layer
          </div>
          <h1 className="font-serif text-6xl leading-tight mb-8">
            The Biometric<br />
            <em>Anonymizer</em>.
          </h1>
          <p className="text-xl text-gray-600 max-w-[500px]">
            APX converts unique physiological markers into non-reversible cryptographic hashes. 
            We verify the person, without ever storing the persona.
          </p>
          <div className="mt-8">
            <Link 
              href="#"
              className="inline-flex items-center px-6 py-3 font-mono text-xs transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              style={{ border: '1px solid var(--ink)' }}
            >
              GENERATE PROTOCOL KEY →
            </Link>
          </div>
        </div>

        <div 
          className="flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: 'var(--forest)' }}
        >
          {/* Hash Visualization Grid */}
          <div 
            className="w-[400px] h-[400px] grid p-2.5 relative"
            style={{ 
              gridTemplateColumns: 'repeat(20, 1fr)',
              gridTemplateRows: 'repeat(20, 1fr)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {hashDots.map((dot) => (
              <div 
                key={dot.id}
                className="w-1 h-1 rounded-full m-auto"
                style={{
                  backgroundColor: dot.active ? 'var(--highlight)' : 'rgba(255,255,255,0.2)',
                  boxShadow: dot.active ? '0 0 10px var(--highlight)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Bottom Label */}
          <div className="absolute bottom-8 left-8 font-mono text-xs text-white opacity-40">
            ENCRYPTION_LAYER: SALTED_KECCAK_256<br />
            STATE: ISOLATED_ENCLAVE_ACTIVE
          </div>
        </div>
      </header>

      {/* Workflow Section */}
      <section 
        className="py-24 px-16"
        style={{ borderBottom: 'var(--heavy-border)' }}
      >
        <div className="text-center">
          <div className="font-mono text-xs" style={{ color: 'var(--clay)' }}>
            Sequence of Verification
          </div>
          <h2 className="font-serif text-5xl mt-4 mb-16">From Tissue to Token</h2>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {[
            {
              step: 'Step 01',
              title: 'Edge Capture',
              desc: 'Raw biometric data is scanned at the local node. No image data is ever transmitted or saved; features are instantly converted to vector sets within a secure enclave.'
            },
            {
              step: 'Step 02',
              title: 'The Blind Hash',
              desc: 'Vectors are passed through a homomorphic hashing function. This creates a unique identifier that cannot be reverse-engineered to reconstruct the original biometric profile.'
            },
            {
              step: 'Step 03',
              title: 'Global Anchoring',
              desc: "The resulting hash is signed by the patient's private key and anchored to the APX Ledger, creating a permanent, private clinical identity."
            }
          ].map((card, i) => (
            <div 
              key={i}
              className="p-10 bg-white relative"
              style={{ border: 'var(--border)' }}
            >
              {/* Top accent bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: 'var(--ink)' }}
              />
              <div className="font-mono text-xs text-gray-400 mb-4">{card.step}</div>
              <h3 className="font-serif text-2xl mb-4">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ZKP Section */}
      <section 
        className="grid grid-cols-[40%_60%]"
        style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)' }}
      >
        <div 
          className="p-24"
          style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="font-mono text-xs mb-4" style={{ color: 'var(--highlight)' }}>
            Zero-Knowledge Proofs
          </div>
          <h2 className="font-serif text-5xl leading-tight mb-8">
            Prove you are you, without showing who.
          </h2>
          <p className="opacity-70 mb-8">
            Using zk-SNARKs, APX allows patients to authenticate clinical records or prescriptions 
            without revealing their name, age, or specific biometric data to the verifier.
          </p>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="mr-4" style={{ color: 'var(--highlight)' }}>✦</span>
              <div>
                <strong>Selective Disclosure:</strong> Only reveal &quot;Patient is over 18&quot; rather than full birth date.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-4" style={{ color: 'var(--highlight)' }}>✦</span>
              <div>
                <strong>Stateless Verification:</strong> Authenticate across different hospital systems without a central ID database.
              </div>
            </li>
          </ul>
        </div>

        <div className="p-24 flex flex-col justify-center">
          {/* Proof Window */}
          <div 
            className="p-8 font-mono"
            style={{ backgroundColor: '#2a2a2a', border: '1px solid #444' }}
          >
            <div className="text-gray-500 text-xs mb-4">
              // APX_PROOF_GENERATOR_V1.0.4
            </div>
            <div className="text-white text-sm space-y-2">
              <div>&gt; Initializing witness... <span style={{ color: 'var(--highlight)' }}>[OK]</span></div>
              <div>&gt; Computing biometric constraints... <span style={{ color: 'var(--highlight)' }}>[OK]</span></div>
              <div>&gt; Generating proof (A, B, C)...</div>
            </div>
            <div 
              className="h-5 my-4 animate-shimmer"
              style={{ backgroundColor: '#333' }}
            />
            <div 
              className="text-xs break-all"
              style={{ color: 'var(--highlight)' }}
            >
              PROOF_HEX: 0x4f128e...a83c21d8990b723f1e56721098823cc10a...
            </div>
            <div 
              className="mt-6 pt-4 text-xs text-gray-500"
              style={{ borderTop: '1px solid #444' }}
            >
              VERIFICATION CONFIDENCE: 100.00%
            </div>
          </div>
        </div>
      </section>

      {/* Encryption Matrix */}
      <section 
        className="grid grid-cols-4"
        style={{ borderBottom: 'var(--heavy-border)' }}
      >
        {[
          {
            label: 'Entropy source',
            title: 'Iris Texture',
            desc: '256 bits of structural randomness mapped to a unique lattice.'
          },
          {
            label: 'Encryption standard',
            title: 'AES-GCM-256',
            desc: 'Authenticated encryption for all clinical data packages.'
          },
          {
            label: 'Identity storage',
            title: 'Merkle Root',
            desc: 'Lightweight verification for mobile-first clinical nodes.'
          },
          {
            label: 'Privacy protocol',
            title: 'Blind Signatures',
            desc: 'Signers verify authenticity without seeing the cleartext data.'
          }
        ].map((cell, i) => (
          <div 
            key={i}
            className="p-12"
            style={{ borderRight: i < 3 ? 'var(--border)' : 'none' }}
          >
            <div className="font-mono text-xs mb-4" style={{ color: 'var(--clay)' }}>
              {cell.label}
            </div>
            <h4 className="font-serif text-xl mb-2">{cell.title}</h4>
            <p className="text-sm text-gray-600">{cell.desc}</p>
          </div>
        ))}
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
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm mb-6" style={{ color: 'var(--clay)' }}>DOCUMENTATION</h4>
          <ul className="space-y-3">
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Whitepaper</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Smart Contracts</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">API Reference</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm mb-6" style={{ color: 'var(--clay)' }}>FOUNDATION</h4>
          <ul className="space-y-3">
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">DAO Governance</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Ecosystem</li>
            <li className="text-sm cursor-pointer opacity-80 hover:opacity-100 hover:underline">Grants</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
