'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [theme, setTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
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
            <a href="/careers" className="nav-link">Careers</a>
          </nav>
          
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button className="theme-toggle" id="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              <span className="toggle-dot"></span>
            </button>
            <a href="https://krishivigyanai.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary desktop-only-btn">Launch Console</a>
            
            <button className="hamburger-btn md-hidden" onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
              <span className="hamburger-line" style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span className="hamburger-line" style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
              <span className="hamburger-line" style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu-overlay md-hidden ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <a href="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>About Us</a>
        <a href="/products" className="mobile-nav-link" onClick={toggleMobileMenu}>Our Products</a>
        <a href="/pillars" className="mobile-nav-link" onClick={toggleMobileMenu}>Pillars & Systems</a>
        <a href="/careers" className="mobile-nav-link" onClick={toggleMobileMenu}>Careers</a>
        <a href="https://krishivigyanai.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '12px' }}>Launch Console</a>
      </div>
    </>
  );
}
