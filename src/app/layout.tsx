import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientEffects from '@/components/ClientEffects';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://krishidhi.com'),
  title: {
    default: 'Krishidhi Fgen Private Limited | Autonomous Agronomy & F2C Marketplace',
    template: '%s | Krishidhi Fgen',
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: '/logo.svg',
  },
  description: 'Designing agricultural AI models and visual cognitive flow grids to power krishivigyanai.com, connecting farmers directly to consumers.',
  keywords: [
    'agritech',
    'autonomous agronomy',
    'agriculture AI',
    'F2C marketplace',
    'Krishi Vigyan AI',
    'Indian agriculture',
    'crop disease detection',
    'crop advisory',
    'farmer marketplace'
  ],
  authors: [{ name: 'Deep Patel', url: 'https://krishidhi.com' }],
  creator: 'Krishidhi Fgen Private Limited',
  publisher: 'Krishidhi Fgen Private Limited',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://krishidhi.com',
    title: 'Krishidhi Fgen Private Limited | Autonomous Agronomy & F2C Marketplace',
    description: 'Designing agricultural AI models and visual cognitive flow grids to power krishivigyanai.com, connecting farmers directly to consumers.',
    siteName: 'Krishidhi Fgen',
    images: [
      {
        url: '/hero_dashboard.png',
        width: 1200,
        height: 630,
        alt: 'Krishidhi Fgen Autonomous Agronomy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishidhi Fgen Private Limited | Autonomous Agronomy & F2C Marketplace',
    description: 'Designing agricultural AI models and visual cognitive flow grids to power krishivigyanai.com, connecting farmers directly to consumers.',
    images: ['/hero_dashboard.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable}`}
      style={{ scrollBehavior: 'smooth' }}
      suppressHydrationWarning={true}
    >
      <body style={{ position: 'relative', overflowX: 'hidden' }} suppressHydrationWarning={true}>
        {/* Dynamic Background Effects */}
        <div className="fine-grid-overlay" id="grid-overlay"></div>
        <div className="ambient-glow bg-glow-1"></div>
        <div className="ambient-glow bg-glow-2"></div>
        <div className="ambient-glow bg-glow-3"></div>
        <div id="cursor-glow" className="custom-cursor-glow"></div>

        {/* Global Client Side Observers and Event Handlers */}
        <ClientEffects />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
