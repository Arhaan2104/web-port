"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0.1, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0.15, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0.2, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0.25, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0.3, 0.8], [0, 1.2]);

  return (
    <div
      className="bg-obsidian-base w-full relative"
      ref={ref}
    >
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
              <span aria-hidden="true" className="text-muted mx-3">&</span>
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
            Design × Psychology × AI
          </HoverBorderGradient>
        }
      />
    </div>
  );
}