'use client';

import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues with mouse tracking / canvas
const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop'), { ssr: false });
const EasterEgg = dynamic(() => import('@/components/ui/EasterEgg'), { ssr: false });

const ClientOverlays: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <EasterEgg />
    </>
  );
};

export default ClientOverlays;
