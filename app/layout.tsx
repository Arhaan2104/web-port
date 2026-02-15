import type { Metadata, Viewport } from 'next';
import { Inter, Urbanist } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import Topbar from '@/components/nav/Topbar';
import LenisProvider from '@/components/providers/LenisProvider';
import ClientOverlays from '@/components/providers/ClientOverlays';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arhaangupta.com'),
  title: 'Arhaan Gupta | Product Designer',
  description:
    'Product Designer from Delhi, India. Specializing in human-centered design solutions that blend psychology, technology, and thoughtful craft.',
  keywords: [
    'Product Designer',
    'UX Designer',
    'UI Designer',
    'Delhi',
    'India',
    'Design',
    'Psychology',
    'AI',
    'Healthcare Design',
  ],
  authors: [{ name: 'Arhaan Gupta' }],
  creator: 'Arhaan Gupta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arhaangupta.com',
    siteName: 'Arhaan Gupta',
    title: 'Arhaan Gupta | Product Designer',
    description:
      'Product Designer from Delhi, India. Creating human-centered products at the intersection of Design × Psychology × AI.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arhaan Gupta - Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arhaan Gupta | Product Designer',
    description: 'Design × Psychology × AI',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${urbanist.variable} ${GeistSans.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon — uncomment when files are added to public/ */}
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        {/* <link rel="icon" href="/favicon.svg" type="image/svg+xml" /> */}
        {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}

        {/* Theme color */}
        <meta name="theme-color" content="#0B0B0C" />
      </head>
      <body className={`${inter.className} antialiased bg-obsidian-base text-ink`} style={{ backgroundColor: '#0B0B0C', color: '#EDEDED' }}>
        {/* Smooth scroll provider */}
        <LenisProvider>
          {/* Background grid texture */}
          <div className="grid-bg" aria-hidden="true" />

          {/* Global navigation */}
          <Topbar />

          {/* Global overlays: custom cursor, scroll-to-top, easter egg */}
          <ClientOverlays />

          {/* Main content */}
          <main className="relative z-10">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}