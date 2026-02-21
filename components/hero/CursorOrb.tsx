'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

type IntensityLevel = 'low' | 'medium' | 'high';

interface CursorOrbProps {
  intensity?: IntensityLevel;
  opacity?: number;
  interactive?: boolean;
  disableOnMobile?: boolean;
  className?: string;
}

interface IntensityConfig {
  distort: number;
  floatSpeed: number;
  rotationIntensity: number;
  floatIntensity: number;
  emberCount: number;
  mouseInfluence: number;
  pulseStrength: number;
}

const INTENSITY_CONFIG: Record<IntensityLevel, IntensityConfig> = {
  low: {
    distort: 0.14,
    floatSpeed: 1.2,
    rotationIntensity: 0.2,
    floatIntensity: 0.3,
    emberCount: 10,
    mouseInfluence: 0.18,
    pulseStrength: 0.01,
  },
  medium: {
    distort: 0.24,
    floatSpeed: 1.8,
    rotationIntensity: 0.36,
    floatIntensity: 0.46,
    emberCount: 16,
    mouseInfluence: 0.24,
    pulseStrength: 0.015,
  },
  high: {
    distort: 0.3,
    floatSpeed: 2.2,
    rotationIntensity: 0.5,
    floatIntensity: 0.58,
    emberCount: 24,
    mouseInfluence: 0.3,
    pulseStrength: 0.02,
  },
};

// Main orb component
const Orb: React.FC<{
  config: IntensityConfig;
  reducedMotion: boolean;
  interactive: boolean;
}> = ({ config, reducedMotion, interactive }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const smoothedPosition = useRef({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (!reducedMotion && interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [reducedMotion, interactive]);

  // Animate orb based on cursor with inertia
  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    if (interactive) {
      const lerpFactor = 0.05;
      smoothedPosition.current.x += (mousePosition.current.x - smoothedPosition.current.x) * lerpFactor;
      smoothedPosition.current.y += (mousePosition.current.y - smoothedPosition.current.y) * lerpFactor;
    } else {
      smoothedPosition.current.x *= 0.95;
      smoothedPosition.current.y *= 0.95;
    }

    meshRef.current.position.x = smoothedPosition.current.x * config.mouseInfluence;
    meshRef.current.position.y = smoothedPosition.current.y * config.mouseInfluence;

    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * config.pulseStrength;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float
      speed={reducedMotion ? 0 : config.floatSpeed}
      rotationIntensity={reducedMotion ? 0 : config.rotationIntensity}
      floatIntensity={reducedMotion ? 0 : config.floatIntensity}
    >
      <mesh ref={meshRef} scale={2.35}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#66A3FF"
          emissive="#4DA8FF"
          emissiveIntensity={0.42}
          roughness={0.2}
          metalness={0.78}
          distort={reducedMotion ? 0 : config.distort}
          speed={reducedMotion ? 0 : config.floatSpeed}
          transparent
          opacity={0.78}
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
const Embers: React.FC<{ count: number; reducedMotion: boolean }> = ({ count, reducedMotion }) => {

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

  if (reducedMotion || count <= 0) return null;

  return (
    <>
      {particles.map((particle, i) => (
        <Ember key={i} {...particle} />
      ))}
    </>
  );
};

// Main CursorOrb component
const CursorOrb: React.FC<CursorOrbProps> = ({
  intensity = 'medium',
  opacity = 0.65,
  interactive = true,
  disableOnMobile = true,
  className,
}) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [supportsWebGL, setSupportsWebGL] = useState(true);
  const config = INTENSITY_CONFIG[intensity];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const updatePrefs = () => {
      setIsReducedMotion(reduceMotionQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    updatePrefs();

    if (reduceMotionQuery.addEventListener) {
      reduceMotionQuery.addEventListener('change', updatePrefs);
      mobileQuery.addEventListener('change', updatePrefs);
      return () => {
        reduceMotionQuery.removeEventListener('change', updatePrefs);
        mobileQuery.removeEventListener('change', updatePrefs);
      };
    }

    reduceMotionQuery.addListener(updatePrefs);
    mobileQuery.addListener(updatePrefs);
    return () => {
      reduceMotionQuery.removeListener(updatePrefs);
      mobileQuery.removeListener(updatePrefs);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setSupportsWebGL(Boolean(gl));
  }, []);

  const disableCanvas = isReducedMotion || (disableOnMobile && isMobile) || !supportsWebGL;

  if (disableCanvas) {
    return (
      <div
        className={cn('relative w-full h-full pointer-events-none', className)}
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(102,163,255,0.16),rgba(102,163,255,0.06)_35%,transparent_72%)] blur-3xl" />
      </div>
    );
  }

  return (
    <div
      className={cn('relative w-full h-full pointer-events-none', className)}
      style={{ mixBlendMode: 'screen', opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="!absolute inset-0"
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[10, 10, 5]} intensity={0.85} color="#66A3FF" />
        <pointLight position={[-10, -10, -5]} intensity={0.45} color="#7EC7FF" />

        {/* Main orb */}
        <Orb
          config={config}
          reducedMotion={isReducedMotion}
          interactive={interactive}
        />

        {/* Ember particles */}
        <Embers count={config.emberCount} reducedMotion={isReducedMotion} />
      </Canvas>
    </div>
  );
};

export default CursorOrb;
