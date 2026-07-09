import React from 'react';

export default function ProductsPage() {
  return (
    <div className="wrapper" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="center-header reveal-fade" style={{ maxWidth: '800px', margin: '0 auto 64px' }}>
        <span className="sup-title">Product Catalog</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>Our Products & Consoles</h1>
        <p className="hero-subtext">
          Explore the software products and visual consoles engineered by Krishidhi Fgen Private Limited.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Flagship Product: krishivigyanai.com */}
        <section id="krishivigyan" className="editor-sidebar tilt-card reveal-fade" style={{ padding: '40px', border: '1px solid var(--accent-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <span className="info-type" style={{ color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>FLAGSHIP PRODUCT</span>
              <h2 style={{ fontSize: '2rem', marginTop: '6px' }}>Krishi Vigyan AI</h2>
            </div>
            <a href="https://krishivigyanai.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit krishivigyanai.com ↗
            </a>
          </div>
          
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Krishi Vigyan AI is our first product — a free AI assistant that gives Indian farmers expert crop advice, disease detection, and weather insights, delivered over WhatsApp. Live today, built for farmers who need answers in their own language, on the device they already have.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ display: 'block', color: 'var(--accent-primary)', fontSize: '0.95rem', marginBottom: '6px' }}>
                Multilingual AI Assistant
              </strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Delivers voice and text responses in regional languages like Gujarati, Hindi, and English directly over WhatsApp.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ display: 'block', color: 'var(--accent-secondary)', fontSize: '0.95rem', marginBottom: '6px' }}>
                Direct F2C Produce listings
              </strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                A verified marketplace linking buyers directly to nearest growers, saving commission margins.
              </p>
            </div>
          </div>
        </section>

        {/* Product 2: Diagnostics Console */}
        <section id="flowgrids" className="editor-sidebar tilt-card reveal-fade" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <span className="info-type" style={{ color: 'var(--accent-secondary)', letterSpacing: '0.1em' }}>DIAGNOSTICS SYSTEMS</span>
              <h2 style={{ fontSize: '2rem', marginTop: '6px' }}>Diagnostics Console</h2>
            </div>
            <a href="/console" className="btn btn-secondary">
              Launch Console
            </a>
          </div>
          
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            The visual diagnostic simulator used to customize agronomic settings and verify parameter connections. It models leaf stress uploads, soil parameters range queries, and triggers RAG database matches.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '6px' }}>
                Interactive Compiler
              </strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Adjust crop parameters on a unified visual editor canvas, compiling diagnostic routes in real-time.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
