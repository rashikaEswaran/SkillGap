"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ============================================
// USE MOUSE POSITION - Normalized mouse coords
// ============================================
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({
        x: ev.clientX / window.innerWidth,
        y: ev.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}

// ============================================
// USE SCROLL PARALLAX - Scroll-based Y offset
// ============================================
export function useScrollParallax(speed: number = 1) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
}

// ============================================
// USE MOUSE PARALLAX - Mouse-based XY offset
// ============================================
export function useMouseParallax(speed: number = 10) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (ev: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      targetOffset.current = {
        x: ((ev.clientX - centerX) / centerX) * speed,
        y: ((ev.clientY - centerY) / centerY) * speed,
      };
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => ({
        x: prev.x + (targetOffset.current.x - prev.x) * 0.1,
        y: prev.y + (targetOffset.current.y - prev.y) * 0.1,
      }));
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return offset;
}

// ============================================
// USE TILT - 3D tilt effect on mouse move
// ============================================
export function useTilt(
  ref: React.RefObject<HTMLElement | null>,
  intensity: number = 15
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = ((e.clientY - centerY) / rect.height) * intensity;
      const rotateY = ((e.clientX - centerX) / rect.width) * (-intensity);

      element.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, intensity]);
}

// ============================================
// USE SPOTLIGHT - Gradient follows mouse
// ============================================
export function useSpotlight(
  ref?: React.RefObject<HTMLElement | null>
): { x: string; y: string } {
  const [position, setPosition] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
        y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    return () => element.removeEventListener("mousemove", handleMouseMove);
  }, [ref]);

  return position;
}

// ============================================
// USE FLOAT - Floating animation value
// ============================================
export function useFloat(
  speed: number = 1,
  amplitude: number = 10
): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.016 * speed;
      setOffset(Math.sin(time) * amplitude);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, amplitude]);

  return offset;
}

// ============================================
// USE HOVER - Detect hover state with delay
// ============================================
export function useHover(delay: number = 0) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsHovered(true), delay);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  }, []);

  return { isHovered, handleMouseEnter, handleMouseLeave };
}

// ============================================
// VIEWPORT - Check if element is in viewport
// ============================================
export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}

// ============================================
// USE SCROLL VELOCITY - Detect scroll speed
// ============================================
export function useScrollVelocity(threshold: number = 10) {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const updateVelocity = () => {
      const now = Date.now();
      const deltaY = window.scrollY - lastScrollY.current;
      const deltaTime = now - lastTime.current;

      if (deltaTime > 0) {
        setVelocity(deltaY / deltaTime * 16); // Normalize to ~60fps
      }

      lastScrollY.current = window.scrollY;
      lastTime.current = now;
    };

    window.addEventListener("scroll", updateVelocity, { passive: true });
    return () => window.removeEventListener("scroll", updateVelocity);
  }, []);

  return Math.abs(velocity) > threshold ? velocity : 0;
}