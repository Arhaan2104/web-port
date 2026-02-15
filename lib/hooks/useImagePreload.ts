'use client';

import { useCallback, useRef } from 'react';

export function useImagePreload() {
  const preloaded = useRef(new Set<string>());

  const preloadImage = useCallback((src: string) => {
    if (preloaded.current.has(src)) return;
    preloaded.current.add(src);
    const img = new Image();
    img.src = src;
  }, []);

  return { preloadImage };
}
