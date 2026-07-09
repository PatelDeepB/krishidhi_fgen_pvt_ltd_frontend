import React from 'react';

export default function NotFound() {
  return (
    <div className="wrapper" style={{ paddingTop: '180px', paddingBottom: '140px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="editor-sidebar tilt-card reveal-fade" style={{ padding: '60px 40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', border: '1px solid var(--border-color)' }}>
        <div className="platform-version" style={{ margin: '0 auto 24px', display: 'inline-flex' }}>
          <span className="pulse-indicator" style={{ backgroundColor: '#ef4444' }}></span>
          <span style={{ color: '#ef4444' }}>ERROR 404</span>
        </div>
        
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Node Not Found
        </h1>
        
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: '1.8' }}>
          The coordinate grid path you are searching for does not resolve in the Krishidhi Cognitive Engine. It might have been re-routed or decompiled.
        </p>

        <div className="cta-btns" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="/" className="btn btn-primary">
            Return Home
          </a>
          <a href="/console" className="btn btn-secondary">
            Diagnostics Console
          </a>
        </div>
      </div>
    </div>
  );
}
