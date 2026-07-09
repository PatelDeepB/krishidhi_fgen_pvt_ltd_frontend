import React from 'react';
import type { Metadata } from 'next';
import SpecVisualizer from '@/components/SpecVisualizer';

export const metadata: Metadata = {
  title: 'Pillars & Systems',
  description: 'Review the technical pillars and decentralization architecture connecting agronomic models, vector search indexes, and trust ledgers.',
  keywords: ['system pillars', 'agrotech architecture', 'decentralized agriculture ledger', 'agronomic vector indexes'],
  alternates: {
    canonical: '/pillars',
  },
};

export default function PillarsPage() {
  return (
    <div className="wrapper" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="center-header reveal-fade" style={{ maxWidth: '800px', margin: '0 auto 48px' }}>
        <span className="sup-title">System Infrastructure</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Pillars & Architecture</h1>
        <p className="hero-subtext">
          Decentralized software systems linking crop diagnostic feeds, vector database indexes, and direct grower markets.
        </p>
      </div>

      <section className="spec-section reveal-fade" id="spec">
        <SpecVisualizer />
      </section>
    </div>
  );
}
