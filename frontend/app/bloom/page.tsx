"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Download,
  Wand2,
  BookOpen,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  Plus,
} from "lucide-react";

export default function BloomLandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-60"
          poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
            type="video/mp4"
          />
        </video>
        {/* Neon overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-red-950/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="relative flex w-full flex-col lg:w-[52%]">
          {/* Glass Overlay */}
          <div className="absolute inset-4 lg:inset-6 rounded-3xl liquid-glass-strong" />

          {/* Navigation */}
          <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-8 lg:py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/50">
                <span className="text-lg font-bold text-white">B</span>
              </div>
              <span className="text-2xl font-semibold tracking-tighter text-white">
                bloom
              </span>
            </div>
            <button className="liquid-glass rounded-full px-4 py-2 text-sm text-white/80 transition-transform hover:scale-105">
              <Menu className="h-4 w-4" />
            </button>
          </nav>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center lg:px-8">
            {/* Logo */}
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 shadow-2xl shadow-red-500/30 backdrop-blur-xl">
              <span className="text-4xl font-bold text-white">B</span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 max-w-2xl text-5xl font-medium leading-tight tracking-[-0.05em] text-white lg:text-7xl">
              Innovating the{" "}
              <span className="font-serif italic text-white/70">spirit</span> of{" "}
              <span className="font-serif italic text-white/70">bloom</span> AI
            </h1>

            {/* CTA Button */}
            <button className="liquid-glass-strong group mb-8 flex items-center gap-3 rounded-full px-8 py-4 text-white transition-all duration-300 hover:scale-105 active:scale-95">
              <span className="text-sm font-medium tracking-wide">
                Explore Now
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
                <Download className="h-3.5 w-3.5" />
              </div>
            </button>

            {/* Feature Pills */}
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {[
                { name: "Artistic Gallery", icon: "🎨" },
                { name: "AI Generation", icon: "✨" },
                { name: "3D Structures", icon: "🌿" },
              ].map((pill) => (
                <div
                  key={pill.name}
                  className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/80"
                >
                  <span>{pill.icon}</span>
                  <span>{pill.name}</span>
                </div>
              ))}
            </div>

            {/* Quote Section */}
            <div className="liquid-glass-strong rounded-2xl px-6 py-4 text-center">
              <p className="mb-2 text-xs font-medium tracking-[0.2em] text-white/50">
                VISIONARY DESIGN
              </p>
              <blockquote className="mb-3 font-serif text-lg text-white/70">
                <span className="italic">"We imagined</span> a realm with no
                ending<span className="italic">."</span>
              </blockquote>
              <div className="flex items-center justify-center gap-3 text-xs text-white/50">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/30" />
                <span className="font-medium tracking-wider">
                  MARCUS AURELIO
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel (Desktop Only) */}
        <div className="hidden lg:flex lg:w-[48%] lg:flex-col lg:px-6 lg:py-6">
          {/* Top Bar */}
          <div className="mb-6 flex items-center justify-between">
            {/* Social Links */}
            <div className="liquid-glass flex items-center gap-1 rounded-full px-4 py-2">
              <a
                href="#"
                className="text-white/70 transition-colors hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-white/70 transition-colors hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-white/70 transition-colors hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <div className="ml-2 h-4 w-px bg-white/20" />
              <button className="ml-2 text-white/70 transition-colors hover:text-white">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Account Button */}
            <button className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 transition-transform hover:scale-105">
              <Sparkles className="h-4 w-4 text-red-400" />
              <span className="text-sm text-white/80">Account</span>
            </button>
          </div>

          {/* Community Card */}
          <div className="liquid-glass mb-6 w-56 rounded-2xl p-4">
            <h3 className="mb-1 text-sm font-medium text-white">
              Enter our ecosystem
            </h3>
            <p className="text-xs text-white/50">
              Join 50,000+ designers shaping the future
            </p>
          </div>

          {/* Feature Section */}
          <div className="mt-auto space-y-4">
            {/* Outer Container */}
            <div className="liquid-glass-strong rounded-[2.5rem] p-4">
              {/* Processing & Growth Archive */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="liquid-glass rounded-3xl p-4 transition-transform hover:scale-[1.02]">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 shadow-lg shadow-red-500/20">
                    <Wand2 className="h-5 w-5 text-red-400" />
                  </div>
                  <h4 className="text-sm font-medium text-white">
                    Processing
                  </h4>
                  <p className="mt-1 text-xs text-white/50">
                    AI-powered transformations
                  </p>
                </div>

                <div className="liquid-glass rounded-3xl p-4 transition-transform hover:scale-[1.02]">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 shadow-lg shadow-red-500/20">
                    <BookOpen className="h-5 w-5 text-red-400" />
                  </div>
                  <h4 className="text-sm font-medium text-white">
                    Growth Archive
                  </h4>
                  <p className="mt-1 text-xs text-white/50">
                    Historical data & insights
                  </p>
                </div>
              </div>

              {/* Bottom Card with Image */}
              <div className="liquid-glass flex items-center justify-between rounded-3xl p-4 transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="relative flex h-16 w-24 overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/30 to-black/50 shadow-inner">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl">🌺</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      Advanced Plant Sculpting
                    </h4>
                    <p className="mt-1 text-xs text-white/50">
                      Generate organic forms with AI
                    </p>
                  </div>
                </div>

                {/* Add Button */}
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/50 transition-transform hover:scale-110">
                  <Plus className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden">
        <div className="liquid-glass-strong fixed bottom-4 left-4 right-4 z-20 flex items-center justify-around rounded-2xl px-4 py-3">
          <button className="flex flex-col items-center gap-1 text-red-400">
            <Sparkles className="h-5 w-5" />
            <span className="text-[10px]">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/60 transition-colors hover:text-white/80">
            <Wand2 className="h-5 w-5" />
            <span className="text-[10px]">Create</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/60 transition-colors hover:text-white/80">
            <BookOpen className="h-5 w-5" />
            <span className="text-[10px]">Gallery</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/60 transition-colors hover:text-white/80">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20">
              <span className="text-xs">+</span>
            </div>
            <span className="text-[10px]">New</span>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600&display=swap");

        :root {
          --radius: 1rem;
        }

        * {
          font-family: "Poppins", sans-serif;
        }

        .font-serif {
          font-family: "Source Serif 4", serif;
        }

        @layer components {
          /* Liquid Glass - Light */
          .liquid-glass {
            background: rgba(0, 0, 0, 0.4);
            background-blend-mode: luminosity;
            backdrop-filter: blur(4px);
            border: none;
            box-shadow:
              inset 0 1px 1px rgba(255, 255, 255, 0.1),
              0 4px 24px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
          }

          .liquid-glass::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.05) 20%,
              transparent 40%,
              transparent 60%,
              rgba(255, 255, 255, 0.05) 80%,
              rgba(255, 255, 255, 0.15) 100%
            );
            padding: 1.4px;
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            pointer-events: none;
          }

          /* Liquid Glass - Strong (for CTA/panels) */
          .liquid-glass-strong {
            background: rgba(0, 0, 0, 0.6);
            background-blend-mode: luminosity;
            backdrop-filter: blur(50px);
            border: none;
            box-shadow:
              4px 4px 4px rgba(0, 0, 0, 0.1),
              inset 0 1px 1px rgba(255, 255, 255, 0.15),
              0 0 40px rgba(255, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
          }

          .liquid-glass-strong::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(255, 80, 80, 0.2) 0%,
              rgba(255, 80, 80, 0.08) 20%,
              transparent 40%,
              transparent 60%,
              rgba(255, 80, 80, 0.08) 80%,
              rgba(255, 80, 80, 0.2) 100%
            );
            padding: 1.4px;
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            pointer-events: none;
          }
        }

        /* Smooth entrance animation */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .liquid-glass-strong,
        h1,
        .liquid-glass {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        h1 {
          animation-delay: 0.1s;
        }

        .liquid-glass-strong {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}