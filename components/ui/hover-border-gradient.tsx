"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Tag
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-white/10 hover:border-white/20 content-center transition-all duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit shadow-[0_0_20px_rgba(102,163,255,0.1)] hover:shadow-[0_0_30px_rgba(102,163,255,0.2)]",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background: `conic-gradient(from var(--rotation-angle, 0deg) at 50% 50%,
              transparent 0deg,
              #66A3FF 20deg,
              rgba(102, 163, 255, 0.6) 60deg,
              transparent 90deg,
              transparent 180deg,
              #66A3FF 200deg,
              rgba(102, 163, 255, 0.6) 240deg,
              transparent 270deg,
              transparent 360deg)`,
            animation: clockwise
              ? `spin ${duration}s linear infinite reverse`
              : `spin ${duration}s linear infinite`,
            filter: "blur(1px)",
            opacity: hovered ? 0.8 : 0.6,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
      <div className="bg-obsidian-base absolute z-1 flex-none inset-[1px] rounded-[100px]" />
    </Tag>
  );
}
