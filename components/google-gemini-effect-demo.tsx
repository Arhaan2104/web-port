"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

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
            I'm <span className="gradient-text">Arhaan</span>.
            <br className="hidden md:block" />
            <span className="block mt-2">
              I <span className="gradient-text">design</span>
              <span className="sr-only">and</span>
              <span aria-hidden="true" className="text-muted mx-3">&</span>
              <span className="gradient-text">build</span>
            </span>
            <span className="block mt-2">
              <span className="gradient-text">human-centred</span> products.
            </span>
          </>
        }
        description="Design × Psychology × AI"
      />
    </div>
  );
}