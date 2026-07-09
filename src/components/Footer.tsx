'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="wrapper">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '16px' }}>
              <img 
                src="/logo_KV_nobg.png" 
                alt="Krishidhi Logo" 
                width={28}
                height={28}
                style={{ height: '28px', width: 'auto', objectFit: 'contain' }} 
              />
              <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                KRISHIDHI <span className="fgen-text">FGEN</span>
              </span>
            </a>
            <p className="brand-bio">Building visual cognitive flow systems and agricultural AI models to optimize Indian food security.</p>
          </div>

          <div className="footer-links-col">
            <span className="col-title">Company</span>
            <a href="/about" className="footer-link">About Us</a>
            <a href="/careers" className="footer-link">Careers</a>
          </div>

          <div className="footer-links-col">
            <span className="col-title">Products</span>
            <a href="/products" className="footer-link">Our Products</a>
            <a href="https://krishivigyanai.com" target="_blank" rel="noopener noreferrer" className="footer-link">krishivigyanai.com ↗</a>
          </div>

          <div className="footer-links-col">
            <span className="col-title">Systems</span>
            <a href="/pillars" className="footer-link">Pillars & Systems</a>
          </div>
        </div>

        <div className="footer-corporate-info" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-color)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
          <p style={{ margin: 0 }}><strong>Krishidhi Fgen Private Limited</strong></p>
          <p style={{ margin: 0 }}>CIN: U62099GJ2026PTC179174</p>
          <p style={{ margin: 0 }}>Registered Office: House No 768, Kanchan Faliya, Dharasana, Valsad, Gujarat - 396375</p>
          <p style={{ margin: 0 }}>Email: founder@krishivigyanai.com | Contact: +91 92136 46732</p>
        </div>

        <div className="footer-bottom">
          <span className="copy-text">© 2026 Krishidhi Fgen Private Limited. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
