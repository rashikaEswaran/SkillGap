"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Scene3DProps {
  particleCount?: number;
  showShapes?: boolean;
  intensity?: "low" | "medium" | "high";
}

export function Scene3D({ particleCount = 5000, intensity = "medium" }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    shapes: THREE.Mesh[];
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a0f");
    scene.fog = new THREE.Fog("#0a0a0f", 3, 10);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const r = 2 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 0.2;
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 0.6;
      } else {
        colors[i * 3] = 0.4; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 1;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.015,
      transparent: true,
      vertexColors: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create floating shapes
    const shapes: THREE.Mesh[] = [];
    const shapeConfigs = [
      { position: [-2, 1, -3] as [number, number, number], color: 0xff0033, scale: 0.5, speed: 0.02 },
      { position: [2, -1, -4] as [number, number, number], color: 0x6496ff, scale: 0.7, speed: 0.015 },
      { position: [0, 2, -5] as [number, number, number], color: 0xb464ff, scale: 0.4, speed: 0.025 },
    ];

    const intensityMultiplier = intensity === "high" ? 1.5 : intensity === "low" ? 0.5 : 1;

    shapeConfigs.forEach((config) => {
      const shapeGeometry = new THREE.IcosahedronGeometry(1, 0);
      const shapeMaterial = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.1 * intensityMultiplier,
        side: THREE.DoubleSide,
      });
      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
      shape.position.set(...config.position);
      shape.scale.setScalar(config.scale * intensityMultiplier);
      (shape as any).rotationSpeed = config.speed;
      scene.add(shape);
      shapes.push(shape);
    });

    // Animation
    let animationId: number = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      particles.rotation.x -= 0.0005;
      particles.rotation.y -= 0.0003;

      shapes.forEach((shape) => {
        shape.rotation.x += (shape as any).rotationSpeed;
        shape.rotation.y += (shape as any).rotationSpeed * 0.5;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Store refs
    sceneRef.current = { scene, camera, renderer, particles, shapes, animationId };

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [particleCount, intensity]);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" />;
}

// Dashboard Scene
export function DashboardScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a0a0f");

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Simple particles
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xff0033,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 opacity-50" />;
}