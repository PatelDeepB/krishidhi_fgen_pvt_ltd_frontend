'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function HologramScanner() {
  const [accuracy, setAccuracy] = useState(0);
  const [farms, setFarms] = useState(0);
  const [nodes, setNodes] = useState(0);

  const [isScanning, setIsScanning] = useState(false);
  const [btnText, setBtnText] = useState('Execute Crop Scan');
  const [bannerText, setBannerText] = useState('SYNCING BIOTIC INDEX...');

  const scrollRef = useRef<HTMLDivElement>(null);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const runGlitchText = (targetText: string, setter: (val: string) => void) => {
    const chars = '!@#$%^&*()_+{}:"<>?,./;[]\\=-~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let iterations = 0;
    if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);

    glitchIntervalRef.current = setInterval(() => {
      const text = targetText
        .split('')
        .map((letter, index) => {
          if (letter === ' ') return ' ';
          if (index < iterations) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setter(text);

      if (iterations >= targetText.length) {
        if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
      }
      iterations += 1 / 1.5;
    }, 25);
  };

  const animateValue = (start: number, end: number, duration: number, setter: (val: number) => void) => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setter(progress * (end - start) + start);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const triggerScan = () => {
    setIsScanning(true);
    setBtnText('Scanning Cell Grid...');
    
    // Scramble status overlay banner text
    runGlitchText('SYNCING BIOTIC INDEX...', setBannerText);

    // Reset and animate stats numbers
    animateValue(0, 98.4, 1500, setAccuracy);
    animateValue(0, 12400, 1500, setFarms);
    animateValue(0, 84, 1500, setNodes);

    setTimeout(() => {
      setIsScanning(false);
      setBtnText('Execute Crop Scan');
    }, 2000);
  };

  useEffect(() => {
    // Initial reveal animation trigger
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger the initial numbers counting up
          animateValue(0, 98.4, 1500, setAccuracy);
          animateValue(0, 12400, 1500, setFarms);
          animateValue(0, 84, 1500, setNodes);
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    if (scrollRef.current) observer.observe(scrollRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-layout" ref={scrollRef}>
      <div className="about-content">
        <span className="sup-title">Agronomy Intelligence</span>
        <h2>Computational Botanical Engine</h2>
        <p>
          We design premium agronomic software interfaces that process crop diagnostics data (leaf anomalies, soil metrics, local parameters) into actionable alerts. By combining LLM-RAG pipelines with human trust systems, we verify crop diagnostics at their origin.
        </p>
        
        <div className="about-stats-row" id="stats-section">
          <div className="stat-box">
            <span className="stat-num" id="stat-accuracy">{accuracy.toFixed(1)}%</span>
            <span className="stat-label">Model Accuracy</span>
          </div>
          <div className="stat-box">
            <span className="stat-num" id="stat-farms">{Math.floor(farms).toLocaleString()}</span>
            <span className="stat-label">Verified Farms</span>
          </div>
          <div className="stat-box">
            <span className="stat-num" id="stat-nodes">{Math.floor(nodes)}</span>
            <span className="stat-label">Regional Nodes</span>
          </div>
        </div>

        <button 
          className="btn btn-secondary" 
          id="scan-hologram-btn" 
          style={{ marginTop: '24px' }}
          onClick={triggerScan}
          disabled={isScanning}
        >
          {btnText}
        </button>
      </div>
      
      <div className="about-visual">
        <div className="about-graphic-frame tilt-card" id="hologram-frame">
          <div className="spinning-radial-disk"></div>
          <div className="inner-cyber-rings"></div>
          
          {/* Scan status banner overlay */}
          {isScanning && (
            <div className="hologram-scan-banner" id="hologram-banner">
              <span className="hologram-banner-text">{bannerText}</span>
            </div>
          )}
          
          {/* Holographic Crop mesh SVG */}
          <svg className="hologram-mesh-svg" viewBox="0 0 200 200" width="100%" height="100%">
            {/* Dynamic mesh curves */}
            <path className="svg-trace-active" d="M 20,100 Q 100,20 180,100 T 20,100" fill="none" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.2" strokeDasharray="2 2"/>
            <path className="svg-trace-active" d="M 20,100 Q 100,60 180,100 T 20,100" fill="none" stroke="var(--accent-primary)" strokeWidth="1" opacity="0.3"/>
            <path className="svg-trace-active" d="M 20,100 Q 100,140 180,100 T 20,100" fill="none" stroke="var(--accent-secondary)" strokeWidth="1" opacity="0.3"/>
            <path className="svg-trace-active" d="M 20,100 Q 100,180 180,100 T 20,100" fill="none" stroke="var(--accent-secondary)" strokeWidth="1" opacity="0.2" strokeDasharray="2 2"/>
            
            {/* Laser scan line indicator */}
            <line 
              id="hologram-scan-line" 
              x1="10" 
              y1="20" 
              x2="190" 
              y2="20" 
              stroke="var(--accent-primary)" 
              strokeWidth="1.5" 
              opacity="0.8" 
              style={{ animationDuration: isScanning ? '0.8s' : '4s' }}
            />
            
            {/* Graphic pins */}
            <circle cx="100" cy="60" r="3" fill="#ffffff" />
            <line x1="100" y1="60" x2="148" y2="35" stroke="#ffffff" strokeWidth="0.75" opacity="0.5" />
            <text x="152" y="38" fill="#ffffff" fontSize="6" fontFamily="var(--font-mono)" opacity="0.8">RAG: 98.4%</text>
            
            <circle cx="90" cy="140" r="3" fill="var(--accent-secondary)" />
            <line x1="90" y1="140" x2="60" y2="175" stroke="var(--accent-secondary)" strokeWidth="0.75" opacity="0.5" />
            <text x="35" y="180" fill="var(--accent-secondary)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.8">pH: 6.8 [OK]</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
