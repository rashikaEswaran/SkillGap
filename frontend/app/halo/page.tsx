"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

// Custom Logo Icon Component
function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
    </svg>
  );
}

// Brand data for hero marquee
const heroBrands = [
  { name: "Stripe", style: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.02em", fontSize: "15px" } },
  { name: "Coinbase", style: { fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: "13px", textTransform: "uppercase" as const } },
  { name: "Uniswap", style: { fontFamily: "Trebuchet MS, sans-serif", fontWeight: 600, letterSpacing: "0.01em", fontSize: "15px", fontStyle: "italic" } },
  { name: "Aave", style: { fontFamily: "Courier New, monospace", fontWeight: 700, letterSpacing: "0.12em", fontSize: "13px", textTransform: "uppercase" as const } },
  { name: "Compound", style: { fontFamily: "Palatino, Book Antiqua, serif", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "16px" } },
  { name: "MakerDAO", style: { fontFamily: "Impact, Arial Narrow, sans-serif", fontWeight: 400, letterSpacing: "0.04em", fontSize: "14px" } },
  { name: "Chainlink", style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "-0.03em", fontSize: "13px" } },
];

// Backers data
const backers = [
  { name: "Fundamental Labs", style: { fontFamily: "Times New Roman, serif", fontWeight: 400, letterSpacing: "0.02em", fontSize: "14px" } },
  { name: "KUCOIN", style: { fontFamily: "Arial Black, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: "16px" } },
  { name: "NGC", style: { fontFamily: "Impact, sans-serif", fontWeight: 700, letterSpacing: "0.05em", fontSize: "18px" } },
  { name: "NxGen", style: { fontFamily: "Georgia, serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: "17px" } },
  { name: "Matter Labs", style: { fontFamily: "Helvetica, sans-serif", fontWeight: 700, letterSpacing: "-0.01em", fontSize: "15px" } },
  { name: "DEXTools", style: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "0.06em", fontSize: "14px", textTransform: "uppercase" as const } },
  { name: "NGRAVE", style: { fontFamily: "Courier New, monospace", fontWeight: 700, letterSpacing: "0.18em", fontSize: "14px" } },
  { name: "Polychain", style: { fontFamily: "Palatino, serif", fontWeight: 500, letterSpacing: "0.03em", fontSize: "15px" } },
];

// Nav links
const navLinks = ["Network", "Ecosystem", "Rewards", "Help", "News"];

export default function HaloLandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F5]">
      {/* Inject Fonts & Keyframes */}
      <style>{`
        @font-face {
          font-family: 'TT Norms Pro';
          src: url('/fonts/tt-norms-pro-regular.woff2') format('woff2');
          font-weight: 400;
          font-display: swap;
        }
        @font-face {
          font-family: 'TT Norms Pro';
          src: url('/fonts/tt-norms-pro-semibold.woff2') format('woff2');
          font-weight: 600;
          font-display: swap;
        }

        * {
          font-family: 'TT Norms Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes backers-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }

        .backers-track {
          display: flex;
          width: max-content;
          animation: backers-marquee 30s linear infinite;
        }
      `}</style>

      {/* Hero Section Wrapper (h-screen) */}
      <div className="relative flex h-screen flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="absolute left-0 right-0 top-0 z-20 px-6 py-5">
          <div className="mx-auto flex max-w-[88rem] items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <LogoIcon className="h-7 w-7 text-black" />
              <span className="text-2xl font-medium tracking-tight text-black">
                Halo
              </span>
            </div>

            {/* Nav Links (hidden on mobile) */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-base font-medium text-gray-700 transition-colors duration-200 hover:text-black"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button className="rounded-full bg-black px-7 py-2.5 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800">
              Open Wallet
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-1 items-end px-6 pt-20 pb-6">
          {/* Hero Card */}
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ height: "calc(100vh - 96px)" }}
          >
            {/* Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
                type="video/mp4"
              />
            </video>

            {/* Content Overlay */}
            <div className="relative z-10 flex h-full flex-col items-start justify-start p-12 pt-36">
              <h1
                className="mb-4 max-w-xl text-5xl font-medium leading-tight text-black md:text-6xl"
                style={{ letterSpacing: "-0.04em" }}
              >
                Your Wealth
                <br />
                Works
              </h1>

              <p
                className="mb-8 max-w-md text-base text-black/70 md:text-lg"
                style={{
                  fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
                  lineHeight: "1.6",
                }}
              >
                An automated, reward-powered digital dollar built for native
                passive earnings and effortless connection into DeFi.
              </p>

              {/* CTA Button */}
              <button className="inline-flex items-center gap-3 rounded-full bg-black px-8 py-2 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800 md:text-lg">
                Join us
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white p-2 transition-colors hover:bg-white/90">
                  <ArrowRight className="h-5 w-5 text-black" />
                </div>
              </button>

              {/* Brand Marquee */}
              <div className="mt-24 w-full max-w-md overflow-hidden">
                <style>{`
                  @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marquee 22s linear infinite;
                  }
                `}</style>
                <div className="marquee-track">
                  {/* Render twice for seamless loop */}
                  {[...heroBrands, ...heroBrands].map((brand, i) => (
                    <span
                      key={i}
                      className="mx-7 shrink-0 whitespace-nowrap text-black/60"
                      style={brand.style}
                    >
                      {brand.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section - Meet USD Halo */}
      <section className="bg-[#F5F5F5] px-6 py-24">
        <div className="mx-auto max-w-[88rem]">
          {/* Row 1: 2-col grid */}
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
            {/* Left */}
            <div>
              <h2
                className="mb-8 text-4xl font-medium leading-tight text-black md:text-5xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Meet USD Halo.
              </h2>
              <button className="inline-flex items-center gap-3 rounded-full bg-black px-8 py-2 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-800">
                Discover it
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white p-2 transition-colors hover:bg-white/90">
                  <ArrowRight className="h-5 w-5 text-black" />
                </div>
              </button>
            </div>

            {/* Right */}
            <p className="text-2xl leading-relaxed text-black/70 md:text-3xl">
              USD Halo is a reward-earning dollar coin that lets your savings
              grow while remaining tied to the U.S. dollar.
            </p>
          </div>

          {/* Row 2: 4-col card grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 - spans 2 cols, image background */}
            <div
              className="relative lg:col-span-2 min-h-80 overflow-hidden rounded-2xl p-7"
              style={{
                backgroundImage:
                  "url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="relative z-10 flex h-full flex-col justify-between">
                <h3
                  className="max-w-xs text-2xl font-medium leading-snug text-black"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Savings that bloom
                </h3>
                <p className="max-w-xs text-base text-black/70">
                  Gain steady returns as your dollar tokens are routed into
                  top-performing DeFi strategies.
                </p>
              </div>
            </div>

            {/* Card 2 - solid color */}
            <div
              className="min-h-80 rounded-2xl p-7"
              style={{ backgroundColor: "#2B2644" }}
            >
              <div className="flex h-full flex-col justify-between">
                <h3 className="text-2xl font-medium leading-snug text-white">
                  Always fluid,
                  <br />
                  always pegged.
                </h3>
                <p className="text-base text-white/60">
                  Keep fully dollar-anchored with on-demand access to funds — no
                  lockups or waits.
                </p>
              </div>
            </div>

            {/* Card 3 - solid color */}
            <div
              className="min-h-80 rounded-2xl p-7"
              style={{ backgroundColor: "#2B2644" }}
            >
              <div className="flex h-full flex-col justify-between">
                <h3 className="text-2xl font-medium leading-snug text-white">
                  Fully
                  <br />
                  automated
                </h3>
                <p className="text-base text-white/60">
                  Skip the task of tuning positions yourself. USD Halo runs in
                  the background for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backed By Section */}
      <section className="bg-[#F5F5F5] px-6 py-16">
        <div className="mx-auto max-w-[88rem] grid grid-cols-1 gap-8 md:grid-cols-4 md:items-center">
          {/* Left col */}
          <div className="md:col-span-1">
            <p className="text-base leading-relaxed text-black/70">
              Funded by premier partners
              <br />
              and forward-thinking leaders.
            </p>
          </div>

          {/* Right col - Marquee */}
          <div className="md:col-span-3 overflow-hidden">
            <style>{`
              @keyframes backers-marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .backers-track {
                display: flex;
                width: max-content;
                animation: backers-marquee 30s linear infinite;
              }
            `}</style>
            <div className="backers-track">
              {[...backers, ...backers].map((backer, i) => (
                <span
                  key={i}
                  className="mx-10 shrink-0 whitespace-nowrap text-black/50"
                  style={backer.style}
                >
                  {backer.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-[#F5F5F5] px-6 py-24">
        <div className="mx-auto max-w-[88rem] grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
          {/* Left Column */}
          <div className="md:pr-12 md:pt-2">
            <p className="mb-2 text-sm text-black/60">USD Halo in Practice</p>
            <h2
              className="mb-6 text-5xl font-medium leading-none text-black md:text-6xl"
              style={{ letterSpacing: "-0.04em" }}
            >
              Use modes
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-black/60">
              USD Halo powers a wide range of modes for builders, companies and
              treasuries wanting safe and rewarding stablecoin integrations plus
              more
            </p>
          </div>

          {/* Right Column - Video Card */}
          <div className="relative min-h-[720px] overflow-hidden rounded-3xl">
            {/* Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4"
                type="video/mp4"
              />
            </video>

            {/* Overlay Content */}
            <div className="relative z-10 p-10 md:p-12">
              <h3
                className="mb-5 text-4xl font-medium leading-tight text-black md:text-5xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Commerce
              </h3>
              <p className="mb-8 max-w-md text-base text-black/70">
                Lift customer retention by offering USD Halo, a trusted
                dollar-backed stablecoin with strong yields, letting your
                patrons earn with zero effort on your platform.
              </p>

              {/* Link Button */}
              <a
                href="#"
                className="group inline-flex items-center gap-3 text-base font-medium text-black transition-colors"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur transition-colors group-hover:bg-white">
                  <ArrowRight className="h-4 w-4 text-black" />
                </div>
                Know more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="bg-[#F5F5F5] px-6 py-24">
        <div className="mx-auto max-w-[88rem]">
          <div className="rounded-3xl bg-black px-8 py-16 text-center md:px-16 md:py-24">
            <h2 className="mb-4 text-4xl font-medium text-white md:text-5xl">
              Start earning with USD Halo
            </h2>
            <p className="mb-8 text-lg text-white/70">
              Join thousands already earning passive rewards on their digital
              dollars
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-3 text-base font-medium text-black transition-colors hover:bg-white/90">
                Sign Up
                <ChevronRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center gap-3 rounded-full bg-white/10 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-white/20">
                Log In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-[#F5F5F5] px-6 py-12">
        <div className="mx-auto max-w-[88rem]">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <LogoIcon className="h-6 w-6 text-black" />
              <span className="text-xl font-medium tracking-tight text-black">
                Halo
              </span>
            </div>

            {/* Copyright */}
            <p className="text-sm text-black/50">
              © 2026 Halo. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-black/50 transition-colors hover:text-black">
                Twitter
              </a>
              <a href="#" className="text-black/50 transition-colors hover:text-black">
                Discord
              </a>
              <a href="#" className="text-black/50 transition-colors hover:text-black">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}