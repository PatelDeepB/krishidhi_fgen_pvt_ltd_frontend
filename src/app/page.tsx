import React from 'react';

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Krishidhi Fgen Private Limited',
    'alternateName': 'Krishidhi Fgen',
    'url': 'https://krishidhi.com',
    'logo': 'https://krishidhi.com/logo_KV_nobg.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-92136-46732',
      'contactType': 'customer service',
      'email': 'founder@krishivigyanai.com',
      'areaServed': 'IN',
      'availableLanguage': ['en', 'gu', 'hi']
    },
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
    },
    'foundingDate': '2026-06-16'
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Krishidhi Fgen',
    'url': 'https://krishidhi.com',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://krishidhi.com/products?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-layout-minimal">
          <div className="platform-version reveal-delay-1">
            <span className="pulse-indicator"></span>
            <span>KRISHIDHI FGEN PRIVATE LIMITED</span>
          </div>
          <h1 className="hero-reveal-title">
            <span className="reveal-line"><span>Autonomous Agronomy.</span></span>
            <span className="reveal-line"><span className="gradient-headline">Synthesized by AI.</span></span>
          </h1>
          <p className="hero-subtext reveal-delay-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
            To build the software and AI infrastructure that Indian agriculture runs on - starting with farmer advisory, and expanding into every layer where intelligence can replace guesswork.
          </p>
        </div>
      </section>

      {/* Vision & Mission Core Focus Card */}
      <section className="spec-section reveal-fade" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <div className="wrapper">
          <div className="editor-sidebar tilt-card" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <span className="info-type" style={{ color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>VISION & MISSION</span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '10px', marginBottom: '20px' }}>Built for Reality</h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              We build practical, accessible technology for Indian farmers and the businesses around them - software and AI only, no hardware, no assumptions about what device or data plan someone has.
            </p>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <strong>What we are not:</strong> We don't build or sell farm equipment, sensors, or hardware. Everything Krishidhi Fgen builds is software and AI - reachable the moment someone sends a message.
            </div>
          </div>
        </div>
      </section>

      {/* Main Corporate Overview / Three Pillars */}
      <section className="spec-section reveal-fade" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="wrapper">
          <div className="center-header">
            <span className="sup-title">Corporate Pillars</span>
            <h2>How We Build</h2>
            <p>Our solutions are designed specifically for the unique conditions of rural India.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '48px' }}>
            {/* Pillar 1 */}
            <div className="editor-sidebar tilt-card" style={{ padding: '32px' }}>
              <span className="info-type" style={{ color: 'var(--accent-primary)' }}>01 // SOFTWARE</span>
              <h3 style={{ margin: '8px 0 12px', fontSize: '1.4rem' }}>Multilingual by Default</h3>
              <p className="muted-text" style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
                We build for the country we're building for - low-bandwidth, WhatsApp-first, multilingual by default. Not adapted from a Western template.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="editor-sidebar tilt-card" style={{ padding: '32px' }}>
              <span className="info-type" style={{ color: 'var(--accent-secondary)' }}>02 // ARTIFICIAL INTELLIGENCE</span>
              <h3 style={{ margin: '8px 0 12px', fontSize: '1.4rem' }}>Practical Grounded Models</h3>
              <p className="muted-text" style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
                Our models are trained on Indian cropping patterns, languages, and conditions. Practical intelligence, not a demo.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="editor-sidebar tilt-card" style={{ padding: '32px' }}>
              <span className="info-type" style={{ color: 'var(--accent-purple)' }}>03 // AGRITECH, NO HARDWARE</span>
              <h3 style={{ margin: '8px 0 12px', fontSize: '1.4rem' }}>Zero Device Footprint</h3>
              <p className="muted-text" style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
                No sensors, no devices to install or maintain. Every product we ship is accessible instantly, over a channel people already use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Product Spotlight */}
      <section className="spec-section reveal-fade" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="wrapper" style={{ maxWidth: '900px' }}>
          <div className="editor-sidebar tilt-card" style={{ padding: '40px', border: '1px solid var(--accent-primary)' }}>
            <span className="info-type" style={{ color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>FLAGSHIP PRODUCT</span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '10px', marginBottom: '20px' }}>Krishi Vigyan AI</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Krishi Vigyan AI is our first product - a free AI assistant that gives Indian farmers expert crop advice, disease detection, and weather insights, delivered over WhatsApp. Live today, built for farmers who need answers in their own language, on the device they already have.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://krishivigyanai.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Visit krishivigyanai.com ↗
              </a>
              <a href="/products" className="btn btn-secondary">
                View Specifications
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Console and Systems Quick Portals */}
      <section className="spec-section reveal-fade" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="wrapper">
          <div className="center-header">
            <span className="sup-title">Explore Core Systems</span>
            <h2>Systems & Corporate Portals</h2>
            <p>Access our structural system specifications and company insights.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '48px' }}>
            <a href="/pillars" className="editor-sidebar tilt-card" style={{ padding: '28px', textDecoration: 'none', transition: 'transform 0.2s' }}>
              <span className="info-type">INFRASTRUCTURE</span>
              <h3 style={{ margin: '8px 0' }}>Pillars & Architecture</h3>
              <p className="muted-text" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>Review the semantic grounding vector structures, Sonar retail search maps, and trust blocks ledgers.</p>
            </a>

            <a href="/about" className="editor-sidebar tilt-card" style={{ padding: '28px', textDecoration: 'none', transition: 'transform 0.2s' }}>
              <span className="info-type">CORPORATE</span>
              <h3 style={{ margin: '8px 0' }}>Company Hub</h3>
              <p className="muted-text" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>Review legal entity credentials, incorporated timelines, registered office locations, and state grants.</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Portal */}
      <section className="cta-section reveal-fade">
        <div className="wrapper">
          <div className="cta-portal-frame">
            <div className="cta-portal-rings">
              <span className="portal-ring ring-1"></span>
              <span className="portal-ring ring-2"></span>
            </div>
            <div className="cta-content">
              <h2>Accelerate Agricultural Intelligence</h2>
              <p>Connect your diagnostic streams to the Krishidhi Fgen Cognitive Engine. Standardize yield diagnostics.</p>
              <div className="cta-btns" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <a href="https://krishivigyanai.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Launch Console</a>
                <a href="/about" className="btn btn-secondary">About the Company</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
