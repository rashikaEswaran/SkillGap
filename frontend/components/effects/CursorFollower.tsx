"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// CURSOR FOLLOWER - Custom cursor with glow orb
// ============================================
export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastMousePos = useRef<{ x: number; y: number; timestamp?: number }>({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateCursor = (e: MouseEvent) => {
      // Hide cursor when not moving
      if (isVisible) {
        const timeSinceLastMove = Date.now() - (lastMousePos.current.timestamp || Date.now());
        if (timeSinceLastMove > 100) {
          setIsVisible(false);
        }
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY, timestamp: Date.now() };
      setIsVisible(true);

      // Immediate cursor dot movement
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }

      // Smooth outline movement
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Reset visibility timeout
    let visibilityTimeout: NodeJS.Timeout;
    const resetVisibility = () => {
      clearTimeout(visibilityTimeout);
      visibilityTimeout = setTimeout(() => setIsVisible(false), 2000);
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", resetVisibility);

    // Check for hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hoverable]");

      setIsHovering(!!isHoverable);
    };

    window.addEventListener("mouseover", handleElementHover);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", resetVisibility);
      window.removeEventListener("mouseover", handleElementHover);
      clearTimeout(visibilityTimeout);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* Cursor Dot */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={cursorRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovering ? 2 : 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="cursor-dot"
            style={{
              background: isHovering
                ? "rgba(255, 0, 51, 0.8)"
                : "rgba(255, 0, 51, 1)",
              boxShadow: isHovering
                ? "0 0 20px rgba(255, 0, 51, 0.8)"
                : "0 0 10px rgba(255, 0, 51, 0.5)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Cursor Outline */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={outlineRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovering ? 1.5 : 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.02 }}
            className="cursor-dot-outline"
            style={{
              borderColor: isHovering
                ? "rgba(255, 0, 51, 0.8)"
                : "rgba(255, 0, 51, 0.5)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Ripple Effect on Click */}
      <ClickRipple />
    </>
  );
}

// ============================================
// CLICK RIPPLE - Visual feedback on click
// ============================================
export function ClickRipple() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50,
            borderRadius: "50%",
            border: "2px solid rgba(255, 0, 51, 0.6)",
            background: "radial-gradient(circle, rgba(255,0,51,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 9997,
          }}
        />
      ))}
    </>
  );
}

// ============================================
// PARTICLE TRAIL - Particles follow cursor
// ============================================
export function ParticleTrail() {
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const lastPosition = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only create particles when mouse moves enough
      if (distance > 20) {
        const newParticle = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
        };

        setParticles((prev) => [...prev.slice(-15), newParticle]);
        lastPosition.current = { x: e.clientX, y: e.clientY };

        // Remove particle after animation
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 800);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          initial={{ scale: 0, opacity: 1, x: particle.x, y: particle.y }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "fixed",
            width: 4 + index * 0.5,
            height: 4 + index * 0.5,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255, 0, 51, ${0.6 - index * 0.03}) 0%, transparent 70%)`,
            pointerEvents: "none",
            zIndex: 9996,
          }}
        />
      ))}
    </>
  );
}

// ============================================
// SPOTLIGHT OVERLAY - Mouse-following gradient
// ============================================
export function SpotlightOverlay() {
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: `${e.clientX}px`,
        y: `${e.clientY}px`,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9995]"
      style={{
        background: `radial-gradient(600px circle at ${position.x} ${position.y}, rgba(255, 0, 51, 0.06), transparent 40%)`,
      }}
    />
  );
}