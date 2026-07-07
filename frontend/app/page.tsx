"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Brain, ArrowRight, BarChart3, ShieldCheck, Sparkles,
  BookOpen, Target, ChevronRight, Star, Quote, Menu, X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>(Array(6).fill(null));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    /* ── Override body styles for light theme ── */
    const body = document.body;
    const origBg = body.style.backgroundColor;
    const origColor = body.style.color;
    body.style.backgroundColor = "#F8F8F6";
    body.style.color = "#111111";

    /* ── Lenis smooth scroll ── */
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 4)),
      wheelMultiplier: 1.1,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ── Nav shrink ── */
    ScrollTrigger.create({
      start: "top -60px",
      onUpdate: (self) => {
        if (!navRef.current) return;
        gsap.to(navRef.current, {
          height: self.progress > 0 ? 56 : 72,
          backgroundColor: self.progress > 0 ? "rgba(248,248,246,0.9)" : "rgba(248,248,246,0)",
          backdropFilter: self.progress > 0 ? "blur(16px)" : "blur(0px)",
          borderBottomWidth: self.progress > 0 ? 1 : 0,
          duration: 0.4,
          ease: "power2.out",
        });
      },
    });

    /* ── Hero stagger ── */
    const heroEls = heroRef.current?.querySelectorAll("[data-anim]");
    if (heroEls) {
      gsap.from(heroEls, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });
    }

    /* ── Section reveals ── */
    sectionsRef.current.forEach((sec) => {
      if (!sec) return;
      const items = sec.querySelectorAll("[data-reveal]");
      if (items.length) {
        gsap.from(items, {
          y: 60,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return () => {
      body.style.backgroundColor = origBg;
      body.style.color = origColor;
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => { sectionsRef.current[i] = el; };

  const features = [
    { icon: <Brain className="w-5 h-5" />, title: "AI-Powered Analysis", desc: "Gemini AI analyzes industry trends, extracts key skills, and predicts future demand with explainable results." },
    { icon: <BarChart3 className="w-5 h-5" />, title: "Real-Time Data", desc: "Live web search keeps you current with the latest industry requirements and hiring trends." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Explainable AI", desc: "No black boxes. Every recommendation comes with clear reasoning and citations you can verify." },
  ];

  const steps = [
    { num: "01", title: "Upload Syllabus", desc: "Drop your syllabus or curriculum file. We support PDF, DOCX, and Excel.", icon: <BookOpen className="w-5 h-5" /> },
    { num: "02", title: "AI Analysis", desc: "Our AI scans the content, extracts skills, and compares them against live industry data.", icon: <Brain className="w-5 h-5" /> },
    { num: "03", title: "Get Insights", desc: "Receive a detailed gap analysis with proof-backed recommendations and citations.", icon: <Target className="w-5 h-5" /> },
  ];

  return (
    <div ref={mainRef} className="min-h-screen bg-[#F8F8F6]" style={{ color: "#111111" }}>

      {/* ── NAV ── */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center border-b border-transparent" style={{ borderBottomColor: "transparent" }}>
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0F62FE]/10 flex items-center justify-center">
              <Brain className="w-4 h-4" style={{ color: "#0F62FE" }} />
            </div>
            <span className="font-semibold tracking-tight text-lg" style={{ color: "#111111" }}>Curriculum<span style={{ color: "#0F62FE" }}>IQ</span></span>
          </button>
          <div className="hidden md:flex items-center gap-10">
            {["Features", "Services", "Testimonials", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm transition-colors relative group" style={{ color: "#888888" }}>
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] group-hover:w-full transition-all duration-300" style={{ backgroundColor: "#0F62FE" }} />
              </a>
            ))}
            <button onClick={() => router.push("/login")} className="text-sm transition-colors" style={{ color: "#888888" }}>Sign In</button>
            <button onClick={() => router.push("/register")} className="text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all hover:scale-[1.02]" style={{ backgroundColor: "#111111" }}>Get Started</button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#111111" }}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="min-h-screen flex items-center px-6 md:px-8 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="w-full max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div data-anim className="inline-flex items-center gap-2 bg-white border rounded-full px-4 py-1.5 mb-8 shadow-sm" style={{ borderColor: "#E8E8E8" }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#0F62FE" }} />
              <span className="text-sm font-medium" style={{ color: "#666666" }}>AI-Powered Workforce Intelligence</span>
            </div>
            <h1 data-anim className="font-bold leading-[0.92] tracking-[-0.04em] mb-8" style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", color: "#111111" }}>
              Know Your
              <br />
              <span style={{ color: "#0F62FE" }}>Industry</span>
              <br />
              Readiness
            </h1>
            <p data-anim className="text-lg max-w-md leading-relaxed mb-10" style={{ color: "#666666" }}>
              Analyze your curriculum against real-time industry demand.
              Identify skill gaps and close them before companies even ask.
            </p>
            <div data-anim className="flex flex-col sm:flex-row items-start gap-4">
              <button onClick={() => router.push("/register")} className="text-white font-medium px-8 py-3.5 rounded-xl text-[15px] transition-all flex items-center gap-2 group hover:scale-[1.02]" style={{ backgroundColor: "#111111" }}>
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => router.push("/dashboard")} className="font-medium px-8 py-3.5 rounded-xl text-[15px] transition-colors border" style={{ color: "#666666", borderColor: "#E8E8E8" }}>
                View Dashboard
              </button>
            </div>
          </div>
          <div data-anim className="hidden lg:block aspect-[4/3] rounded-2xl border relative overflow-hidden" style={{ backgroundColor: "#F0F0F0", borderColor: "#E8E8E8" }}>
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #111 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative h-full flex flex-col items-center justify-center">
              <Brain className="w-24 h-24" style={{ color: "#0F62FE", opacity: 0.15 }} />
              <p className="text-sm mt-4" style={{ color: "#999999" }}>Editorial Visual</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" ref={setRef(0)} className="py-28 md:py-36 px-6 md:px-8">
        <div className="w-full max-w-[1200px] mx-auto">
          <div data-reveal className="mb-16">
            <span className="text-sm font-mono tracking-[0.15em] uppercase" style={{ color: "#0F62FE" }}>/01</span>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.03em] mt-4 mb-4" style={{ color: "#111111" }}>
              Everything you need to stay ahead
            </h2>
            <p className="max-w-lg" style={{ color: "#666666" }}>
              Comprehensive tools to analyze, track, and improve your industry readiness.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} data-reveal className="bg-white rounded-2xl border p-8 hover:shadow-sm transition-all" style={{ borderColor: "#E8E8E8" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(15,98,254,0.08)" }}>
                  <span style={{ color: "#0F62FE" }}>{f.icon}</span>
                </div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "#111111" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="services" ref={setRef(1)} className="py-28 md:py-36 px-6 md:px-8" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="w-full max-w-[1200px] mx-auto">
          <div data-reveal className="mb-16">
            <span className="text-sm font-mono tracking-[0.15em] uppercase" style={{ color: "#0F62FE" }}>/02</span>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.03em] mt-4 mb-4" style={{ color: "#111111" }}>
              How it works
            </h2>
            <p className="max-w-lg" style={{ color: "#666666" }}>
              From upload to insights in three simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} data-reveal className="relative">
                <span className="text-[120px] font-bold leading-none absolute top-0 right-4 select-none" style={{ color: "#F4F4F4" }}>{s.num}</span>
                <div className="relative rounded-2xl border p-8" style={{ backgroundColor: "#F8F8F6", borderColor: "#E8E8E8" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(15,98,254,0.08)" }}>
                    <span style={{ color: "#0F62FE" }}>{s.icon}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3" style={{ color: "#111111" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={setRef(2)} className="py-28 md:py-36 px-6 md:px-8">
        <div className="w-full max-w-[1200px] mx-auto">
          <div data-reveal className="mb-16">
            <span className="text-sm font-mono tracking-[0.15em] uppercase" style={{ color: "#0F62FE" }}>/03</span>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.03em] mt-4 mb-4" style={{ color: "#111111" }}>
              Trusted by students & institutions
            </h2>
            <p className="max-w-lg" style={{ color: "#666666" }}>Real data. Real impact.</p>
          </div>
          <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 md:p-14 bg-white rounded-2xl border" style={{ borderColor: "#E8E8E8" }}>
            {[
              { value: "50K+", label: "Students Analyzed" },
              { value: "120+", label: "Universities" },
              { value: "500+", label: "Companies Hiring" },
              { value: "98%", label: "Accuracy Rate" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight" style={{ color: "#111111" }}>{s.value}</div>
                <div className="text-sm" style={{ color: "#888888" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section ref={setRef(3)} className="py-28 md:py-36 px-6 md:px-8" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="w-full max-w-[800px] mx-auto text-center">
          <div data-reveal>
            <Quote className="w-10 h-10 mx-auto mb-8" style={{ color: "rgba(15,98,254,0.15)" }} />
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 tracking-tight" style={{ color: "#111111" }}>
              &ldquo;CurriculumIQ transformed how we understand skill gaps.
              The proof-backed recommendations give our students a real edge.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#0F62FE" }} />
              ))}
            </div>
            <p className="font-semibold" style={{ color: "#111111" }}>Dr. Ananya Sharma</p>
            <p className="text-sm" style={{ color: "#888888" }}>Dean of Engineering, MIT Bangalore</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" ref={setRef(4)} className="py-28 md:py-36 px-6 md:px-8">
        <div className="w-full max-w-[800px] mx-auto text-center">
          <div data-reveal className="rounded-3xl p-12 md:p-16 relative overflow-hidden" style={{ backgroundColor: "#111111" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,98,254,0.08) 0%, transparent 50%)" }} />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Ready to close the gap?
              </h2>
              <p className="mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                Join thousands of students who already know what companies want before they even graduate.
              </p>
              <button onClick={() => router.push("/register")} className="text-[#111111] font-medium px-8 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2 mx-auto group hover:scale-[1.02]" style={{ backgroundColor: "#FFFFFF" }}>
                Start for Free
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer ref={setRef(5)} className="py-12 px-6 md:px-8 border-t" style={{ borderColor: "#E8E8E8" }}>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(15,98,254,0.1)" }}>
              <Brain className="w-3.5 h-3.5" style={{ color: "#0F62FE" }} />
            </div>
            <span className="font-medium tracking-tight" style={{ color: "#111111" }}>Curriculum<span style={{ color: "#0F62FE" }}>IQ</span></span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs" style={{ color: "rgba(102,102,102,0.6)" }}>AI-Powered Workforce Intelligence</span>
            <span className="text-xs" style={{ color: "rgba(102,102,102,0.4)" }}>&copy; 2026</span>
          </div>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: auto; }
        :root { --background: #F8F8F6 !important; }
      `}</style>
    </div>
  );
}
