import React from 'react';

export default function CareersPage() {
  return (
    <div className="wrapper" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="center-header reveal-fade" style={{ maxWidth: '800px', margin: '0 auto 64px' }}>
        <span className="sup-title">Join Our Team</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>Build the Future of Agritech</h1>
        <p className="hero-subtext">
          Help us design software and AI systems that solve real challenges for millions of Indian growers.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="editor-sidebar tilt-card reveal-fade" style={{ padding: '48px', textAlign: 'center' }}>
          <span className="info-type" style={{ color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>CAREER STATEMENT</span>
          <h2 style={{ fontSize: '2rem', margin: '16px 0' }}>We are building for reality</h2>
          
          <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'left' }}>
            We are a small team building for a huge, underserved problem. If you care about Indian agriculture, AI, or both, get in touch. We are not always actively hiring, but we always want to hear from people who care about this.
          </p>

          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', textAlign: 'left', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Our Core Values:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--accent-primary)' }}>✓</span>
                <strong>Farmer-first, always:</strong> If a decision benefits the company at the farmer's expense, we don't make it.
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--accent-primary)' }}>✓</span>
                <strong>Built for reality, not a demo:</strong> Low bandwidth, regional language, low digital literacy — designed for actual field conditions.
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--accent-primary)' }}>✓</span>
                <strong>Software and AI only:</strong> We stay in our lane — no hardware, no equipment sales, no scope creep.
              </li>
            </ul>
          </div>

          <div className="cta-btns" style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <a href="mailto:founder@krishivigyanai.com" className="btn btn-primary">founder@krishivigyanai.com</a>
            <a href="tel:+919213646732" className="btn btn-secondary">Call Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
