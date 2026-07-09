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
  title: 'Krishidhi Fgen Private Limited | Autonomous Agronomy & F2C Marketplace',
  description: 'Designing agricultural AI models and visual cognitive flow grids to power krishivigyanai.com, connecting farmers directly to consumers.',
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
