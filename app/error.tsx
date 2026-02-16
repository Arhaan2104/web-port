'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { RotateCcw, ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="text-4xl md:text-5xl font-urbanist font-bold text-ink mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-white/60 font-urbanist mb-8">
          An unexpected error occurred. Try again or head back home.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="glass" magnetic onClick={reset}>
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="secondary" magnetic>
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
