'use client';

import { useEffect, useRef, useState } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function useKonamiCode(): boolean {
  const [triggered, setTriggered] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI_SEQUENCE[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI_SEQUENCE.length) {
          setTriggered(true);
          indexRef.current = 0;
          // Auto-reset after 3 seconds
          setTimeout(() => setTriggered(false), 3000);
        }
      } else {
        indexRef.current = 0;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return triggered;
}
