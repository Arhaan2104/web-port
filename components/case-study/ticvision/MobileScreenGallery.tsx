'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

interface Screen {
  src: string;
  label: string;
}

interface MobileScreenGalleryProps {
  screens: Screen[];
  size?: 'default' | 'hero';
  desktopScreen?: Screen;
}

const PhoneFrame: React.FC<{ screen: Screen; size: 'default' | 'hero' }> = ({
  screen,
  size,
}) => {
  const widthClass =
    size === 'hero'
      ? 'w-[180px] sm:w-[221px] md:w-[255px]'
      : 'w-[180px] sm:w-[220px] md:w-[260px]';

  return (
    <div className="flex flex-col items-center">
      {/* Device shell */}
      <div
        className={`
          ${widthClass} relative
          rounded-[2.5rem] bg-[#1A1A1C] p-[6px]
          ring-1 ring-white/[0.08]
          shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)]
        `}
      >
        {/* Notch */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-10">
          <div className="w-[80px] h-[22px] bg-[#1A1A1C] rounded-full" />
        </div>

        {/* Screen */}
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-black">
          <Image
            src={screen.src}
            alt={screen.label}
            fill
            className="object-cover brightness-[0.94]"
            sizes={size === 'hero' ? '(max-width: 640px) 180px, 300px' : '(max-width: 640px) 180px, 260px'}
            priority={size === 'hero'}
          />
        </div>
      </div>

      {/* Caption */}
      <p className="text-[11px] text-white/[0.45] font-urbanist text-center mt-4 tracking-wide">
        {screen.label}
      </p>
    </div>
  );
};

const MacFrame: React.FC<{ screen: Screen }> = ({ screen }) => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Window shell */}
      <div
        className="w-full relative rounded-xl bg-[#1A1A1C] ring-1 ring-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden"
      >
        {/* Toolbar */}
        <div className="flex items-center gap-[6px] px-3.5 h-8 bg-[#1A1A1C] border-b border-white/[0.04]">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]/70" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]/70" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]/70" />
        </div>

        {/* Screen */}
        <div className="relative aspect-[16/9] bg-black">
          <Image
            src={screen.src}
            alt={screen.label}
            fill
            className="object-contain brightness-[0.94]"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        </div>
      </div>

      {/* Caption */}
      <p className="text-[11px] text-white/[0.45] font-urbanist text-center mt-4 tracking-wide">
        {screen.label}
      </p>
    </div>
  );
};

const MobileScreenGallery: React.FC<MobileScreenGalleryProps> = ({
  screens,
  size = 'default',
  desktopScreen,
}) => {
  if (desktopScreen) {
    return (
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 md:grid-cols-[auto_0.7fr] items-end justify-center gap-8 md:gap-10 py-4"
      >
        <div className="flex justify-center">
          {screens.map((screen) => (
            <PhoneFrame key={screen.label} screen={screen} size={size} />
          ))}
        </div>
        <div className="hidden md:block">
          <MacFrame screen={desktopScreen} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-wrap items-end justify-center gap-6 md:gap-10 py-4"
    >
      {screens.map((screen) => (
        <PhoneFrame key={screen.label} screen={screen} size={size} />
      ))}
    </motion.div>
  );
};

export default MobileScreenGallery;
