"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const ASMRBackground = dynamic(() => import('@/components/hero/ASMRBackground'), { ssr: false });

interface GoogleGeminiEffectDemoProps {
  enableHero3D?: boolean;
  hero3DIntensity?: 'low' | 'medium' | 'high';
}

export default function GoogleGeminiEffectDemo({
  enableHero3D = true,
  hero3DIntensity = 'medium',
}: GoogleGeminiEffectDemoProps) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0.04, 0.46], [0.22, 1.08]);
  const pathLengthSecond = useTransform(scrollYProgress, [0.06, 0.48], [0.18, 1.05]);
  const pathLengthThird = useTransform(scrollYProgress, [0.08, 0.5], [0.14, 1.02]);
  const pathLengthFourth = useTransform(scrollYProgress, [0.1, 0.52], [0.1, 1]);
  const pathLengthFifth = useTransform(scrollYProgress, [0.12, 0.54], [0.04, 0.97]);
  const ambianceOpacity = useTransform(scrollYProgress, [0, 0.16, 0.46, 0.8], [0.72, 0.8, 0.4, 0.06]);
  const ambianceIntensity = hero3DIntensity === 'low'
    ? 'subtle'
    : hero3DIntensity === 'high'
      ? 'intense'
      : 'medium';

  return (
    <div
      className="bg-obsidian-base w-full relative overflow-hidden"
      ref={ref}
    >
      {enableHero3D && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
          style={{ opacity: ambianceOpacity }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                'radial-gradient(circle at 50% 34%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 52%, rgba(0,0,0,0.32) 82%, rgba(0,0,0,0) 100%)',
              maskImage:
                'radial-gradient(circle at 50% 34%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 52%, rgba(0,0,0,0.32) 82%, rgba(0,0,0,0) 100%)',
            }}
          >
            <ASMRBackground
              particleCount={380}
              magneticRadius={250}
              intensity={ambianceIntensity}
              accentColor="102, 163, 255"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(102,163,255,0.14),rgba(102,163,255,0.05)_36%,transparent_74%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-base/[0.02] to-obsidian-base/[0.35]" />
        </motion.div>
      )}

      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title={
          <>
            <span className="inline-block">
              <EncryptedText
                text="I'm "
                encryptedClassName="text-electric/40"
                revealedClassName="text-ink"
                revealDelayMs={88}
                flipDelayMs={45}
              />
              <EncryptedText
                text="Arhaan"
                encryptedClassName="text-electric/40"
                revealedClassName="gradient-text"
                revealDelayMs={94}
                flipDelayMs={45}
              />
              <EncryptedText
                text="."
                encryptedClassName="text-electric/40"
                revealedClassName="text-ink"
                revealDelayMs={99}
                flipDelayMs={45}
              />
            </span>
            <br className="hidden md:block" />
            <span className="block mt-2">
              <EncryptedText
                text="I "
                encryptedClassName="text-electric/40"
                revealedClassName="text-ink"
                revealDelayMs={105}
                flipDelayMs={45}
              />
              <EncryptedText
                text="design"
                encryptedClassName="text-electric/40"
                revealedClassName="gradient-text"
                revealDelayMs={110}
                flipDelayMs={45}
              />
              <span className="sr-only">and</span>
              <span aria-hidden="true" className="text-ink mx-3">&</span>
              <EncryptedText
                text="build"
                encryptedClassName="text-electric/40"
                revealedClassName="gradient-text"
                revealDelayMs={116}
                flipDelayMs={45}
              />
            </span>
            <span className="block mt-2">
              <EncryptedText
                text="human-centred"
                className="whitespace-nowrap"
                encryptedClassName="text-electric/40"
                revealedClassName="gradient-text"
                revealDelayMs={121}
                flipDelayMs={45}
              />
              <EncryptedText
                text=" products."
                encryptedClassName="text-electric/40"
                revealedClassName="text-ink"
                revealDelayMs={127}
                flipDelayMs={45}
              />
            </span>
          </>
        }
        description={
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="div"
            className="bg-obsidian-base text-ink text-sm md:text-base px-4 py-1.5 font-medium"
            duration={3}
            clockwise={false}
          >
            <span className="font-urbanist">Design × Psychology × AI</span>
          </HoverBorderGradient>
        }
      />
    </div>
  );
}
