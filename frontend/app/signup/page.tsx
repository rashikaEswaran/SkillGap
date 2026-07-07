"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User, ChevronRight, Brain, Sparkles, Zap, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUp } from "@/services/auth";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "@/lib/firebase";

// Inject styles on client side only
if (typeof window !== 'undefined') {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    :root { --font-sans: 'Inter', sans-serif; }
    body { background-color: #000000; color: #ffffff; font-family: var(--font-sans); overflow-x: hidden; }
    @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(5deg); } }
    @keyframes pulse-glow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
    @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    .animate-shimmer { animation: shimmer 3s linear infinite; }
    .glass-gradient { background: linear-gradient(135deg, rgba(255, 0, 51, 0.1) 0%, rgba(255, 51, 102, 0.05) 50%, rgba(255, 102, 153, 0.1) 100%); }
    .grid-pattern { background-size: 60px 60px; background-image: linear-gradient(to right, rgba(255, 0, 51, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 51, 0.05) 1px, transparent 1px); }
  `;
  document.head.appendChild(styleElement);
}

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        color: ['#ff0033', '#ff3366', '#ff6699', '#ffffff'][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, 'rgba(255, 0, 51, 0.08)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connecting lines
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 0, 51, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
}

// Floating 3D decorative elements
function FloatingElements() {
  return (
    <>
      {/* Left side floating brain icon */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute left-20 top-1/4 z-10 animate-float"
      >
        <div className="w-24 h-24 rounded-full glass-gradient backdrop-blur-xl border border-red-500/20 flex items-center justify-center shadow-lg shadow-red-500/20">
          <Brain className="w-12 h-12 text-red-500" />
        </div>
      </motion.div>

      {/* Right side floating sparkles */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute right-20 top-1/3 z-10 animate-float"
        style={{ animationDelay: '1s' }}
      >
        <div className="w-16 h-16 rounded-full glass-gradient backdrop-blur-xl border border-red-500/20 flex items-center justify-center shadow-lg shadow-red-500/20">
          <Sparkles className="w-8 h-8 text-red-400" />
        </div>
      </motion.div>

      {/* Bottom left zap */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="absolute left-32 bottom-32 z-10 animate-float"
        style={{ animationDelay: '2s' }}
      >
        <div className="w-14 h-14 rounded-full glass-gradient backdrop-blur-xl border border-red-500/20 flex items-center justify-center shadow-lg shadow-red-500/20">
          <Zap className="w-7 h-7 text-red-300" />
        </div>
      </motion.div>

      {/* Bottom right shield */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute right-32 bottom-40 z-10 animate-float"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="w-20 h-20 rounded-full glass-gradient backdrop-blur-xl border border-red-500/20 flex items-center justify-center shadow-lg shadow-red-500/20">
          <Shield className="w-10 h-10 text-red-400" />
        </div>
      </motion.div>

      {/* Animated rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
        <motion.div
          className="absolute inset-0 rounded-full border border-red-500/10"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-red-500/5"
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-16 rounded-full border border-red-500/5"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        setIsCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await signUp({ email, password, displayName: name });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-14 h-14 border-4 border-red-500/30 border-t-red-500 rounded-full mx-auto mb-4 shadow-lg shadow-red-500/30"
          />
          <p className="text-gray-400 text-sm uppercase tracking-widest">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <FloatingElements />

      {/* Animated background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-red-600/20 via-red-500/10 to-pink-600/20 rounded-full blur-[150px] animate-pulse-glow pointer-events-none" />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push('/login')}
        whileHover={{ x: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs uppercase tracking-widest">Back</span>
      </motion.button>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3"
      >
        <motion.div
          className="w-10 h-10 rounded-full bg-[#111111] border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-500/20"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="w-5 h-5 text-red-500" />
        </motion.div>
        <span className="text-sm font-bold tracking-tight text-white font-mono">Curriculum<span className="text-red-500">IQ</span></span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-lg"
        >
          {/* Signup box */}
          <div className="relative rounded-3xl bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/10 p-10 shadow-[0_0_100px_rgba(255,0,51,0.2)]">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-red-600/30 via-red-500/10 to-pink-600/30 blur-xl -z-10" />

            {/* Header with icon */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-pink-600 flex items-center justify-center mb-5 shadow-2xl shadow-red-500/40"
              >
                <User className="w-9 h-9 text-white" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold tracking-tight text-white mb-2"
              >
                Create Account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-sm"
              >
                Join CurriculumIQ and unlock AI-powered insights
              </motion.p>
            </div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4 text-red-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Zap className="w-4 h-4 text-red-500" />
                <span>Free</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Brain className="w-4 h-4 text-red-500" />
                <span>AI Powered</span>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mb-6 p-4 bg-red-900/30 border border-red-500/50 text-red-300 rounded-xl text-sm backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_30px_rgba(255,0,51,0.3)] transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-4 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_30px_rgba(255,0,51,0.3)] transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_30px_rgba(255,0,51,0.3)] transition-all backdrop-blur-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-[#0f0f0f]/80 border border-white/10 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_30px_rgba(255,0,51,0.3)] transition-all backdrop-blur-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Submit button */}
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white font-semibold text-xs uppercase tracking-widest hover:shadow-[0_0_40px_rgba(255,0,51,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-white/10 to-red-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Create Account
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="relative my-8"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-[#0a0a0a] text-gray-500 uppercase tracking-wider">Or sign up with</span>
              </div>
            </motion.div>

            {/* Social signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="py-3.5 rounded-xl bg-[#0f0f0f]/80 border border-white/10 hover:border-white/20 hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xs text-gray-300 font-medium">Google</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="py-3.5 rounded-xl bg-[#0f0f0f]/80 border border-white/10 hover:border-white/20 hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.8-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.5 1.3 0 2.52.88 3.33.88.78 0 2.26-1.09 3.8-1.09 1.45 0 2.96.75 3.83 1.98-3.4 1.7-2.85 6.57.48 7.96-.47 1.25-1.11 2.49-1.63 3.28zM13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.72-3.06 1.61-.69.8-1.27 1.95-1.11 3.07 1.17.09 2.37-.73 3.1-1.57z"/>
                </svg>
                <span className="text-xs text-gray-300 font-medium">Apple</span>
              </motion.button>
            </motion.div>

            {/* Login link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors hover:underline"
                >
                  Sign In
                </button>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}