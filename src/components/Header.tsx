'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('krishidhi-theme-pref') || 'dark';
    setTheme(storedTheme);
    if (storedTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('krishidhi-theme-pref', newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  return (
    <header className="header-navigation" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="nav-container">
        <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img 
            src="/logo_KV_nobg.png" 
            alt="Krishidhi Logo" 
            width={32}
            height={32}
            style={{ height: '32px', width: 'auto', objectFit: 'contain' }} 
          />
          <span style={{ fontSize: '1.05rem', fontWeight: 900, letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
            KRISHIDHI <span className="fgen-text">FGEN</span>
          </span>
        </a>
        
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <a href="/about" className="nav-link">About Us</a>
          <a href="/products" className="nav-link">Our Products</a>
          <a href="/pillars" className="nav-link">Pillars & Systems</a>
          <a href="/console" className="nav-link">Diagnostics Console</a>
          <a href="/careers" className="nav-link">Careers</a>
        </nav>
        
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button className="theme-toggle" id="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            <span className="toggle-dot"></span>
          </button>
          <a href="/console" className="btn btn-primary">Launch Console</a>
        </div>
      </div>
    </header>
  );
}
