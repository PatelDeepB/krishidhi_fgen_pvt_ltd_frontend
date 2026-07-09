import React from 'react';
import type { Metadata } from 'next';
import FlowOrchestrator from '@/components/FlowOrchestrator';

export const metadata: Metadata = {
  title: 'Diagnostics Console',
  description: 'Access the interactive diagnostics console. Adjust parameter inputs, simulate crop diagnostics, and run compiler tests.',
  keywords: ['diagnostics console', 'agrotech compiler', 'sensor parameters simulation', 'agronomy dashboard sandbox'],
  alternates: {
    canonical: '/console',
  },
};

export default function ConsolePage() {
  return (
    <div className="wrapper" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="center-header reveal-fade" style={{ maxWidth: '800px', margin: '0 auto 48px' }}>
        <span className="sup-title">Diagnostics Engine</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Diagnostics Console</h1>
        <p className="hero-subtext">
          Adjust node parameters, simulate diagnostic inputs, and run diagnostics compilation pipelines.
        </p>
      </div>

      <section className="sandbox-section reveal-fade" id="sandbox">
        <FlowOrchestrator />
      </section>
    </div>
  );
}
