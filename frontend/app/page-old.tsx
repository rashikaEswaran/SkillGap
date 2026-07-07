"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, TrendingUp, Zap, Shield, ArrowRight, Play, Users, Briefcase, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { Scene3D } from "@/components/3d/Scene3D";
import { CursorFollower, SpotlightOverlay } from "@/components/effects/CursorFollower";
import { useScrollParallax } from "@/hooks/useSpatial";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Floating Skill Badge
function SkillBadge({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 400, damping: 15 }}
      whileHover={{ scale: 1.1, rotate: -5 }}
      className="px-4 py-2 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-full text-sm font-medium text-text-secondary hover:text-white hover:border-[#ff0033]/40 cursor-pointer transition-all"
    >
      {skill}
    </motion.div>
  );
}

// Feature Card
function FeatureCard({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.6 }} whileHover={{ y: -8, scale: 1.02 }} className="group">
      <Card variant="glass-pro" className="h-full p-8 cursor-pointer" glow>
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff0033] to-[#ff6699] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,0,51,0.4)] group-hover:shadow-[0_0_50px_rgba(255,0,51,0.6)] transition-shadow">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ff6699] transition-colors">{title}</h3>
          <p className="text-text-secondary leading-relaxed">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
}

// Stat Card
function StatCard({ number, label, icon: Icon, delay }: { number: number; label: string; icon: any; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }} whileHover={{ y: -4 }}>
      <Card variant="glass-pro" className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#ff0033]/10 border border-[#ff0033]/30 flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#ff0033]" />
          </div>
          <span className="text-xs text-glass-border font-mono">VERIFIED</span>
        </div>
        <div className="text-4xl font-bold text-white mb-2">
          <AnimatedCounter end={number} suffix={number >= 1000 ? "+" : "%"} />
        </div>
        <p className="text-sm text-text-secondary uppercase tracking-wider font-medium">{label}</p>
      </Card>
    </motion.div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const parallaxY = useScrollParallax(0.3);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills = ["GenAI", "MLOps", "DSA", "Cloud", "Azure", "Prompt Engineering", "LLM Engineering", "Data Engineering"];

  const features = [
    { icon: Brain, title: "AI-Powered Analysis", description: "Upload your curriculum and get instant AI-driven insights with proof-backed recommendations." },
    { icon: TrendingUp, title: "Industry Intelligence", description: "Real-time skill demand tracking from LinkedIn, AICTE, NASSCOM, and top tech companies." },
    { icon: Zap, title: "Gap Detection", description: "Identify missing skills and weak areas with precise industry benchmarking." },
    { icon: Shield, title: "Career Roadmap", description: "Get a personalized month-by-month action plan to bridge your skill gaps." },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-14 h-14 border-4 border-[#ff0033]/30 border-t-[#ff0033] rounded-full mx-auto mb-4" />
          <p className="text-text-secondary text-sm uppercase tracking-widest">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <CursorFollower />
      <SpotlightOverlay />
      <Scene3D particleCount={3000} intensity="high" />

      {/* Hero Section */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-screen flex items-center justify-center px-4 pt-32">
        <div className="max-w-6xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff0033] to-[#ff6699] flex items-center justify-center shadow-[0_0_60px_rgba(255,0,51,0.5)]">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
            <span className="text-white">Know Your </span>
            <span className="gradient-text-glow">Industry Readiness</span>
            <br />
            <span className="text-white">Before </span>
            <span className="gradient-text-glow">Companies Do</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto mb-10">
            Upload your Resume, Projects, Certificates and Curriculum to discover real workforce demand, skill gaps and your career readiness using industry intelligence.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} onClick={() => router.push("/dashboard")} glow>
              Start Analysis
            </Button>
            <Button variant="vision" size="lg" leftIcon={<Play className="w-5 h-5 text-[#ff0033]" />} onClick={() => router.push("/industry")}>
              Explore Trends
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="flex flex-wrap items-center justify-center gap-3">
            {skills.map((skill, i) => (<SkillBadge key={skill} skill={skill} delay={i * 0.05} />))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-8 h-12 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <motion.div className="w-2 h-2 bg-[#ff0033] rounded-full" animate={{ y: [0, 16, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs text-[#ff0033] uppercase tracking-[0.3em] font-bold">Live Network Scale</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">Our Impact by the <span className="gradient-text">Numbers</span></h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard number={50000} label="Students Analyzed" icon={Users} delay={0.1} />
            <StatCard number={500} label="Companies Tracked" icon={Briefcase} delay={0.2} />
            <StatCard number={95} label="Success Rate" icon={Target} delay={0.3} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 relative bg-gradient-to-b from-transparent via-[#ff0033]/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs text-[#ff0033] uppercase tracking-[0.3em] font-bold">Subsystem Architecture</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">Everything You <span className="gradient-text">Need</span></h2>
            <p className="text-text-secondary text-base mt-4 max-w-xl mx-auto">Four core integrated systems parsing credentials, analyzing live job markets, profiling requirements, and mapping actionable learning routes.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} delay={idx * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ff0033]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-8">
            <span className="text-xs text-[#ff0033] uppercase tracking-[0.4em] font-bold">Engine Deployment</span>
            <h2 className="text-5xl md:text-7xl font-bold text-white">Ready to <span className="gradient-text-glow">Start</span>?</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">Secure an unfair data advantage. Build a curriculum calibrated precisely onto standard hire requirements.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="primary" size="xl" onClick={() => router.push("/signup")} glow>
                Sign Up Free
              </Button>
              <Button variant="vision" size="xl" onClick={() => router.push("/contact")}>
                Contact Enterprise
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-glass-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff0033] to-[#ff6699] flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Curriculum<span className="text-[#ff0033]">IQ</span></span>
          </div>
          <p className="text-sm text-text-tertiary">© 2026 CurriculumIQ Inc. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}