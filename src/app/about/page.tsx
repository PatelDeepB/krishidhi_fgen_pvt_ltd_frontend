import React from 'react';
import type { Metadata } from 'next';
import HologramScanner from '@/components/HologramScanner';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the mission, beliefs, legal registration parameters, and leadership of Krishidhi Fgen Private Limited, a registered MSME agritech enterprise driving agricultural AI systems in Valsad, Gujarat.',
  keywords: ['About Krishidhi Fgen', 'Krishidhi team', 'Deep Patel founder', 'agritech company Valsad', 'Krishidhi Fgen registry CIN'],
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'About Us | Krishidhi Fgen',
    'description': 'Learn about the mission, values, and legal credentials of Krishidhi Fgen Private Limited.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Krishidhi Fgen Private Limited',
      'url': 'https://krishidhi.com'
    },
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Krishidhi Fgen Private Limited',
      'foundingDate': '2026-06-16',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'House No 768, Kanchan Faliya, Dharasana',
        'addressLocality': 'Valsad',
        'addressRegion': 'Gujarat',
        'postalCode': '396375',
        'addressCountry': 'IN'
      },
      'founder': {
        '@type': 'Person',
        'name': 'Deep Patel'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

    <div className="wrapper" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="center-header reveal-fade" style={{ maxWidth: '800px', margin: '0 auto 64px' }}>
        <span className="sup-title">Company Profile</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>Krishidhi Fgen Private Limited</h1>
        <p className="hero-subtext">
          Registered MSME agritech enterprise driving agricultural AI models and visual diagnostics systems.
        </p>
      </div>

      {/* Hologram Scanner Visual Section */}
      <section className="about-section reveal-fade" id="about" style={{ marginBottom: '80px' }}>
        <HologramScanner />
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Core Narrative / Company Story */}
        <div className="editor-sidebar tilt-card reveal-fade" style={{ padding: '40px' }}>
          <span className="info-type" style={{ color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>OUR NARRATIVE</span>
          <h2 style={{ fontSize: '1.75rem', marginTop: '8px', marginBottom: '20px' }}>The Product Came First</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            Krishi Vigyan AI started as one founder's product - built, shipped, and put in front of real farmers before there was ever a company behind it. Krishidhi Fgen Private Limited was incorporated in June 2026 to formalize that work and build beyond it: not just one product, but a company dedicated to software and AI for Indian agriculture.
          </p>
        </div>

        {/* Company Values */}
        <div className="editor-sidebar tilt-card reveal-fade" style={{ padding: '40px' }}>
          <span className="info-type" style={{ color: 'var(--accent-secondary)', letterSpacing: '0.1em' }}>VALUES BLOCK</span>
          <h2 style={{ fontSize: '1.75rem', marginTop: '8px', marginBottom: '24px' }}>Core Beliefs</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ display: 'block', color: 'var(--accent-primary)', fontSize: '1rem', marginBottom: '8px' }}>
                Farmer-First, Always
              </strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                If a decision benefits the company at the farmer's expense, we don't make it. Period.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ display: 'block', color: 'var(--accent-secondary)', fontSize: '1rem', marginBottom: '8px' }}>
                Built for Reality
              </strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Low bandwidth, regional language, low digital literacy - designed for actual field conditions, not ideal-case demos.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ display: 'block', color: 'var(--accent-purple)', fontSize: '1rem', marginBottom: '8px' }}>
                Software and AI Only
              </strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                We stay in our lane - no hardware, no equipment sales, no scope creep away from what we're actually good at.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Spotlights */}
        <div className="editor-sidebar tilt-card reveal-fade" style={{ padding: '40px' }}>
          <span className="info-type" style={{ color: 'var(--accent-purple)', letterSpacing: '0.1em' }}>FOUNDERSHIP</span>
          <h2 style={{ fontSize: '1.75rem', marginTop: '8px', marginBottom: '20px' }}>Deep Patel, Founder</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
            Deep Patel combines hands-on experience building AI systems with a personal connection to farming life in Gujarat. Krishi Vigyan AI was built and shipped solo before Krishidhi Fgen existed as a company; the entity was formed to carry that work further.
          </p>
        </div>



      </div>
    </div>
    </>
  );
}
