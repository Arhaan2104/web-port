"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) => {
  const [mounted, setMounted] = useState(false);
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef<any>(null);

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset clicked cell after animation completes
  useEffect(() => {
    if (clickedCell) {
      const maxDistance = Math.max(rows, cols);
      const animationDuration = 150 + maxDistance * 50 + 300; // Max duration + buffer (updated to match new timings)
      const timer = setTimeout(() => {
        setClickedCell(null);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [clickedCell, rows, cols]);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={cn(
          "absolute inset-0 h-full w-full",
          // Subtle background effect - YC-style minimal
          "[--cell-border-color:rgba(102,163,255,0.12)] [--cell-fill-color:rgba(102,163,255,0.025)] [--cell-shadow-color:rgba(102,163,255,0.04)]",
        )}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        // Subtle background effect - YC-style minimal
        "[--cell-border-color:rgba(102,163,255,0.12)] [--cell-fill-color:rgba(102,163,255,0.025)] [--cell-shadow-color:rgba(102,163,255,0.04)]",
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <DivGrid
          key={`base-${rippleKey}`}
          className="opacity-35"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "rgba(102,163,255,0.12)",
  fillColor = "rgba(102,163,255,0.025)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
    contain: "layout style paint",
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 40) : 0; // ms - reduced for smoother animation
        const duration = 150 + distance * 50; // ms - faster animation

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-25 transition-opacity duration-150 hover:opacity-35",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none] will-change-[opacity,background-color]",
              !interactive && "pointer-events-none",
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
