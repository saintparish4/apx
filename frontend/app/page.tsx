"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/" className="text-2xl font-semibold tracking-tight">
                APX
              </Link>
              <div className="hidden gap-8 lg:flex">
                <a href="#how-it-works" className="text-sm text-zinc-400 transition-colors hover:text-white">
                  How It Works
                </a>
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
              <Link href="/dashboard" className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:block">
                Sign In
              </Link>
              <Link href="/dashboard" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700">
                Get Started
              </Link>
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-white/5"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-white/5 py-4">
              <div className="flex flex-col gap-4">
                <a href="#how-it-works" className="text-sm text-zinc-400 transition-colors hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  How It Works
                </a>
                <a href="#platform" className="text-sm text-zinc-400 transition-colors hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  Platform
                </a>
                <a href="#features" className="text-sm text-zinc-400 transition-colors hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  Features
                </a>
                <a href="#pricing" className="text-sm text-zinc-400 transition-colors hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  Pricing
                </a>
                <a href="#docs" className="text-sm text-zinc-400 transition-colors hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  Docs
                </a>
                <Link href="/dashboard" className="text-sm text-zinc-400 transition-colors hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl pt-12">
          <div className="text-center">
            <h1 className="text-6xl font-medium leading-[1.1] tracking-tight lg:text-7xl xl:text-8xl">
              Healthcare claims verification
              <br />
              that takes hours, not weeks.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400 lg:text-xl">
              A decentralized blockchain network that verifies healthcare claims through distributed consensus, 
              reducing processing time from weeks to hours while eliminating fraud and reducing costs.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/dashboard" className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-700">
                Try Demo
              </Link>
              <a href="#how-it-works" className="rounded-full border border-white/10 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-white/5">
                Learn How It Works
              </a>
            </div>

            {/* Key Metrics */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-semibold text-blue-500 sm:text-5xl">1-2hr</div>
                <div className="mt-2 text-sm text-zinc-400">Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-semibold text-green-500 sm:text-5xl">60-80%</div>
                <div className="mt-2 text-sm text-zinc-400">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-semibold text-purple-500 sm:text-5xl">99.9%</div>
                <div className="mt-2 text-sm text-zinc-400">Fraud Prevention</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-semibold text-amber-500 sm:text-5xl">100%</div>
                <div className="mt-2 text-sm text-zinc-400">Transparency</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>AES-256 Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>99.9% Uptime SLA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="border-y border-white/5 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
                The Problem
              </h2>
              <p className="mt-6 text-lg text-zinc-400">
                Healthcare claims processing is broken. Here&apos;s what providers face today:
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Slow Processing</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Claims take 2-4 weeks to process, creating cash flow problems for providers and uncertainty for patients.
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">High Costs</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Billions spent annually on administrative overhead. Manual verification processes are expensive and error-prone.
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Fraud Risk</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Centralized systems are vulnerable. Fraudulent claims slip through, costing insurers and patients billions.
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                  <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.736m0 0L21 21" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Lack of Transparency</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Providers can&apos;t track claim status. Patients don&apos;t know what&apos;s happening. Insurers operate in silos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="border-b border-white/5 bg-black py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
                The Solution
              </h2>
              <p className="mt-6 text-lg text-zinc-400">
                APX uses blockchain technology to create a decentralized claims verification network:
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Hours, Not Weeks</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Multi-node consensus verification processes claims in 1-2 hours instead of weeks, improving cash flow dramatically.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Fraud Prevention</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Distributed consensus requires multiple validators to approve claims, making fraud nearly impossible.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Lower Costs</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Automated validation eliminates manual review. Smart contracts handle verification logic, reducing administrative overhead by 60-80%.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Full Transparency</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Every claim is tracked on-chain. Providers, insurers, and patients can see status in real-time with an immutable audit trail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="border-y border-white/5 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              A simple 7-step process that transforms healthcare claims verification
            </p>
          </div>

          <div className="mt-20">
            {/* Workflow Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl font-semibold text-blue-500">
                    1
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-black p-8">
                  <h3 className="text-xl font-semibold">Provider Submits Claim</h3>
                  <p className="mt-3 text-zinc-400">
                    Healthcare provider submits claim with medical codes (CPT, ICD-10), NPI number, service date, amount, and supporting documents.
                  </p>
                </div>
                <div className="hidden md:block">
                  <svg className="h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl font-semibold text-blue-500">
                    2
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-black p-8">
                  <h3 className="text-xl font-semibold">Automated Code Validation</h3>
                  <p className="mt-3 text-zinc-400">
                    System automatically validates CPT procedure codes, ICD-10 diagnosis codes, and NPI provider identifiers against industry standards.
                  </p>
                </div>
                <div className="hidden md:block">
                  <svg className="h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl font-semibold text-blue-500">
                    3
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-black p-8">
                  <h3 className="text-xl font-semibold">Encrypted Storage on IPFS</h3>
                  <p className="mt-3 text-zinc-400">
                    Sensitive claim data and documents are encrypted (AES-256-GCM) and stored on IPFS (InterPlanetary File System) for decentralized, secure storage.
                  </p>
                </div>
                <div className="hidden md:block">
                  <svg className="h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl font-semibold text-blue-500">
                    4
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-black p-8">
                  <h3 className="text-xl font-semibold">Hash Submitted to Blockchain</h3>
                  <p className="mt-3 text-zinc-400">
                    A Keccak256 hash of the claim data is submitted to the blockchain. Patient data never touches the blockchain—only the hash for verification.
                  </p>
                </div>
                <div className="hidden md:block">
                  <svg className="h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl font-semibold text-blue-500">
                    5
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-black p-8">
                  <h3 className="text-xl font-semibold">Multi-Node Consensus</h3>
                  <p className="mt-3 text-zinc-400">
                    Multiple validator nodes independently review the claim. They reach consensus through a distributed voting mechanism (typically requiring 4 out of 5 approvals).
                  </p>
                </div>
                <div className="hidden md:block">
                  <svg className="h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl font-semibold text-blue-500">
                    6
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-black p-8">
                  <h3 className="text-xl font-semibold">Claim Verified</h3>
                  <p className="mt-3 text-zinc-400">
                    Once consensus threshold is met, the claim is marked as verified on-chain. Status is immediately visible to all parties.
                  </p>
                </div>
                <div className="hidden md:block">
                  <svg className="h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-2xl font-semibold text-green-500">
                    7
                  </div>
                </div>
                <div className="flex-1 rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
                  <h3 className="text-xl font-semibold">Payment & Audit Trail</h3>
                  <p className="mt-3 text-zinc-400">
                    Provider receives payment. All parties have access to a transparent, immutable audit trail of the entire verification process.
                  </p>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="mt-20 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                <h3 className="text-xl font-semibold">Traditional System</h3>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-zinc-400">2-4 weeks processing time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-zinc-400">Manual verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-zinc-400">High fraud risk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-zinc-400">No transparency</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
                <h3 className="text-xl font-semibold">APX Network</h3>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">1-2 hours processing time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Automated validation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Consensus prevents fraud</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-400">Full transparency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="border-b border-white/5 bg-black py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              See It In Action
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Experience the APX dashboard with our interactive demo
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-950 p-8 lg:p-12">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-black">
              {/* Dashboard Preview Mockup */}
              <div className="aspect-video bg-gradient-to-br from-zinc-900 to-black p-8">
                <div className="mx-auto max-w-4xl space-y-6">
                  {/* Mock Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="text-xl font-semibold">APX Dashboard</div>
                    <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs text-green-500">Connected</span>
                    </div>
                  </div>
                  
                  {/* Mock Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                      <div className="text-xs text-zinc-500">Reputation</div>
                      <div className="mt-1 text-2xl font-semibold text-green-500">98.4</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                      <div className="text-xs text-zinc-500">Verified</div>
                      <div className="mt-1 text-2xl font-semibold">142</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                      <div className="text-xs text-zinc-500">Pending</div>
                      <div className="mt-1 text-2xl font-semibold text-blue-500">14</div>
                    </div>
                  </div>

                  {/* Mock Claim Card */}
                  <div className="rounded-xl border border-white/10 bg-zinc-950 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">CLM-2024-001</span>
                          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">Verified</span>
                        </div>
                        <div className="mt-2 text-sm text-zinc-400">Patient: PT-8472 • Procedure: 99213</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold">$245.00</div>
                        <div className="text-xs text-zinc-500">1.2 hrs ago</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                      <span>Consensus:</span>
                      <span className="text-green-500">4/5 nodes approved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-700">
                Try Interactive Demo
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-b border-white/5 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              Trusted by Healthcare Providers
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              See what providers are saying about APX
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black p-8">
              <div className="mb-4 flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 text-zinc-300">
                &quot;APX cut our claims processing time from 3 weeks to under 2 hours. The transparency and real-time tracking have been game-changers for our practice.&quot;
              </p>
              <div>
                <div className="font-semibold text-white">Dr. Sarah Chen</div>
                <div className="text-sm text-zinc-500">Family Medicine Practice, San Francisco</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-8">
              <div className="mb-4 flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 text-zinc-300">
                &quot;The automated validation and consensus mechanism eliminated our fraud concerns. We&apos;ve seen a 70% reduction in administrative costs since switching to APX.&quot;
              </p>
              <div>
                <div className="font-semibold text-white">Michael Rodriguez</div>
                <div className="text-sm text-zinc-500">Chief Financial Officer, Metro Health Network</div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-8">
              <div className="mb-4 flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 text-zinc-300">
                &quot;Integration was seamless with our existing EHR system. The API documentation is excellent, and we were up and running in less than a day.&quot;
              </p>
              <div>
                <div className="font-semibold text-white">Jennifer Park</div>
                <div className="text-sm text-zinc-500">IT Director, Regional Medical Center</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-white/5 bg-black py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Everything you need to know about APX
            </p>
          </div>

          <div className="mt-16 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
              <h3 className="text-xl font-semibold">How does blockchain improve claims processing?</h3>
              <p className="mt-4 text-zinc-400">
                Blockchain enables distributed consensus verification, meaning multiple independent validators review each claim. This eliminates single points of failure, prevents fraud through cryptographic verification, and creates an immutable audit trail. Patient data is encrypted and stored off-chain on IPFS, with only hashes stored on the blockchain for verification.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
              <h3 className="text-xl font-semibold">Is patient data stored on the blockchain?</h3>
              <p className="mt-4 text-zinc-400">
                No. Patient data is encrypted using AES-256-GCM encryption and stored on IPFS (InterPlanetary File System), a decentralized storage network. Only cryptographic hashes of the claim data are stored on the blockchain for verification purposes. This ensures HIPAA compliance while maintaining data integrity.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
              <h3 className="text-xl font-semibold">How long does verification take?</h3>
              <p className="mt-4 text-zinc-400">
                Most claims are verified within 1-2 hours through our multi-node consensus mechanism. This compares to traditional systems that take 2-4 weeks. The exact time depends on network activity and the number of validators participating in consensus.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
              <h3 className="text-xl font-semibold">What happens if validators disagree?</h3>
              <p className="mt-4 text-zinc-400">
                Our consensus mechanism requires a minimum threshold (typically 4 out of 5 validators) to approve a claim. If validators disagree, the claim is flagged for manual review. Validators have economic incentives (staking) to act honestly, and their reputation scores are tracked on-chain.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
              <h3 className="text-xl font-semibold">Can I integrate APX with my existing EHR system?</h3>
              <p className="mt-4 text-zinc-400">
                Yes. APX provides a RESTful API that integrates with any EHR or practice management system. We support standard healthcare protocols including HL7 FHIR, X12 EDI, and NCPDP. Our API documentation includes code examples in multiple languages, and most integrations can be completed in under a day.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8">
              <h3 className="text-xl font-semibold">What are the costs?</h3>
              <p className="mt-4 text-zinc-400">
                APX uses a pay-per-claim pricing model starting at $0.10 per verified claim. There are no subscription fees, setup costs, or hidden charges. Providers with higher reputation scores may qualify for lower rates. Enterprise plans with custom pricing are available for large networks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Providers Section */}
      <section className="border-b border-white/5 bg-black py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h2 className="text-4xl font-medium tracking-tight lg:text-5xl">
              Built for Healthcare Providers
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              See how APX makes your practice more efficient and profitable
            </p>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Faster Payments</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Claims verified in hours instead of weeks means faster cash flow. Get paid for your services without waiting months.
              </p>
              <div className="mt-6 rounded-xl border border-white/5 bg-black p-4">
                <div className="text-xs text-zinc-500">Average Processing Time</div>
                <div className="mt-2 text-2xl font-semibold text-green-500">1.2 hours</div>
                <div className="mt-1 text-xs text-zinc-500">vs. 2-4 weeks traditional</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/10">
                <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Reduced Admin Costs</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Automated validation eliminates manual review. No more hiring staff to chase claims or handle paperwork.
              </p>
              <div className="mt-6 rounded-xl border border-white/5 bg-black p-4">
                <div className="text-xs text-zinc-500">Cost Reduction</div>
                <div className="mt-2 text-2xl font-semibold text-green-500">60-80%</div>
                <div className="mt-1 text-xs text-zinc-500">less administrative overhead</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600/10">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Fraud Protection</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Consensus mechanism prevents fraudulent claims from being processed. Your legitimate claims are protected.
              </p>
              <div className="mt-6 rounded-xl border border-white/5 bg-black p-4">
                <div className="text-xs text-zinc-500">Fraud Prevention</div>
                <div className="mt-2 text-2xl font-semibold text-green-500">99.9%</div>
                <div className="mt-1 text-xs text-zinc-500">fraud detection rate</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600/10">
                <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Real-Time Transparency</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Track every claim status in real-time. See exactly where your claims are in the verification process.
              </p>
              <div className="mt-6 rounded-xl border border-white/5 bg-black p-4">
                <div className="text-xs text-zinc-500">Visibility</div>
                <div className="mt-2 text-2xl font-semibold text-blue-500">100%</div>
                <div className="mt-1 text-xs text-zinc-500">real-time status tracking</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Reputation System</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Build on-chain reputation through accurate claims. Higher reputation scores mean faster processing and lower fees.
              </p>
              <div className="mt-6 rounded-xl border border-white/5 bg-black p-4">
                <div className="text-xs text-zinc-500">Reputation Score</div>
                <div className="mt-2 text-2xl font-semibold text-green-500">98.4/100</div>
                <div className="mt-1 text-xs text-zinc-500">average provider score</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600/10">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Easy Integration</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Works with your existing EHR and practice management systems. Simple API integration takes minutes, not months.
              </p>
              <div className="mt-6 rounded-xl border border-white/5 bg-black p-4">
                <div className="text-xs text-zinc-500">Setup Time</div>
                <div className="mt-2 text-2xl font-semibold text-blue-500">&lt;5 min</div>
                <div className="mt-1 text-xs text-zinc-500">to get started</div>
              </div>
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
              <Link href="/dashboard" className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-blue-700">
                Open Account
              </Link>
              <Link href="/how-it-works" className="rounded-full border border-white/10 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-white/5">
                View Documentation
              </Link>
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
                <li><Link href="/how-it-works" className="text-zinc-400 transition-colors hover:text-white">How It Works</Link></li>
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
