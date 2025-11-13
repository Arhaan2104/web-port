'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Main orb component
const Orb: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const smoothedPosition = useRef({ x: 0, y: 0 });
  const isReducedMotion = prefersReducedMotion();

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (!isReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isReducedMotion]);

  // Animate orb based on cursor with inertia
  useFrame((state, delta) => {
    if (!meshRef.current || isReducedMotion) return;

    // Smooth interpolation for cursor following
    const lerpFactor = 0.05;
    smoothedPosition.current.x += (mousePosition.current.x - smoothedPosition.current.x) * lerpFactor;
    smoothedPosition.current.y += (mousePosition.current.y - smoothedPosition.current.y) * lerpFactor;

    // Apply position with subtle offset
    meshRef.current.position.x = smoothedPosition.current.x * 0.3;
    meshRef.current.position.y = smoothedPosition.current.y * 0.3;

    // Gentle rotation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    // Subtle scale pulsing
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float
      speed={isReducedMotion ? 0 : 2}
      rotationIntensity={isReducedMotion ? 0 : 0.5}
      floatIntensity={isReducedMotion ? 0 : 0.5}
    >
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#66A3FF"
          emissive="#4DA8FF"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={isReducedMotion ? 0 : 0.3}
          speed={isReducedMotion ? 0 : 2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
};

// Individual ember particle
const Ember: React.FC<{
  position: [number, number, number];
  scale: number;
  speed: number;
}> = ({ position, scale, speed }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    // Upward drift animation
    const time = state.clock.elapsedTime;
    const y = ((position[1] + time * speed) % 6) - 3;

    ref.current.position.set(
      position[0] + Math.sin(time * speed * 10) * 0.1,
      y,
      position[2] + Math.cos(time * speed * 10) * 0.1
    );

    // Fade out as it rises
    const opacity = Math.max(0, 1 - (y + 3) / 6);
    ref.current.scale.setScalar(scale * opacity);
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#7EC7FF" transparent opacity={0.6} />
    </mesh>
  );
};

// Ember particles component
const Embers: React.FC = () => {
  const count = 28;
  const isReducedMotion = prefersReducedMotion();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 4,
          Math.random() * 2 - 4,
          (Math.random() - 0.5) * 4,
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return temp;
  }, [count]);

  if (isReducedMotion) return null;

  return (
    <>
      {particles.map((particle, i) => (
        <Ember key={i} {...particle} />
      ))}
    </>
  );
};

// Main CursorOrb component
const CursorOrb: React.FC = () => {
  return (
    <div
      className="relative w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="!absolute inset-0"
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#66A3FF" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7EC7FF" />

        {/* Main orb */}
        <Orb />

        {/* Ember particles */}
        <Embers />
      </Canvas>
    </div>
  );
};

export default CursorOrb;