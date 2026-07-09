'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function SpecVisualizer() {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('SYNCING_TELEMETRY_...');
  const [loaderSub, setLoaderSub] = useState('INDEXING_RAG_VECTORS //');

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

  const handleTabChange = (index: number) => {
    let loadingText = 'SYNCING TELEMETRY DATA...';
    let loadingSub = 'INDEXING_RAG_VECTORS //';
    
    if (index === 1) {
      loadingText = 'GROUNDING SEMANTIC COORDINATES...';
      loadingSub = 'FAISS_VECTOR_DB // CONTEXT_SYNC';
    } else if (index === 2) {
      loadingText = 'CALCULATING GEOSPATIAL RADII...';
      loadingSub = 'GPS_PROXIMITY_SCORING // SCANNING';
    } else if (index === 3) {
      loadingText = 'RE-INDEXING DECENTRALIZED BLOCKS...';
      loadingSub = 'TRUST_LEDGER_CHAIN // VERIFYING';
    }

    setIsLoading(true);
    runGlitchText(loadingText, setLoaderText);
    runGlitchText(loadingSub, setLoaderSub);

    setTimeout(() => {
      setIsLoading(false);
      setActiveTab(index);
    }, 700);
  };

  return (
    <div className="spec-interactive-layout">
      {/* Interactive Selector Tabs (Left) */}
      <div className="spec-selectors">
        <button 
          className={`spec-selector tilt-card ${activeTab === 1 ? 'active-spec' : ''}`} 
          onClick={() => handleTabChange(1)}
        >
          <span className="spec-num">01</span>
          <div className="spec-sel-content">
            <h3>Vector-Grounded Diagnostics</h3>
            <p>Farmers submit prompts or leaf photos. The RAG engine matches queries to verified agricultural databases.</p>
          </div>
        </button>

        <button 
          className={`spec-selector tilt-card ${activeTab === 2 ? 'active-spec' : ''}`} 
          onClick={() => handleTabChange(2)}
        >
          <span className="spec-num">02</span>
          <div className="spec-sel-content">
            <h3>Geospatial Input Matching</h3>
            <p>Connects farmers to nearby sellers. Pulls live stock metrics, falling back to Google Maps crawling boundaries.</p>
          </div>
        </button>

        <button 
          className={`spec-selector tilt-card ${activeTab === 3 ? 'active-spec' : ''}`} 
          onClick={() => handleTabChange(3)}
        >
          <span className="spec-num">03</span>
          <div className="spec-sel-content">
            <h3>Direct F2C Produce Marketplace</h3>
            <p>Empowers growers to list crop yields directly to consumers. Direct farmer trade certified by village heads, bypassing brokers.</p>
          </div>
        </button>
      </div>

      {/* Dynamic Visual Display Panel (Right) */}
      <div className="spec-visualizer-pane">
        {/* Inline Spec Tab Switch Loader Overlay */}
        {isLoading && (
          <div className="spec-loader-overlay" id="spec-pane-loader">
            <div className="hud-loader-wrapper">
              <div className="hud-target-cross"></div>
              <div className="hud-ring-outer"></div>
              <div className="hud-ring-inner"></div>
              <div className="hud-radar-sweep"></div>
            </div>
            <span className="hud-loader-text" id="spec-pane-loader-text">{loaderText}</span>
            <span className="hud-loader-subtext" id="spec-pane-loader-subtext">{loaderSub}</span>
          </div>
        )}
        
        {/* View 1: RAG Vector Cloud */}
        {activeTab === 1 && (
          <div className="spec-visual-view active-view" id="spec-view-1">
            <div className="vector-grid-box">
              <div className="vector-node query-node">q_leaf_spot</div>
              <div className="vector-node match-node-1">urea_remedy</div>
              <div className="vector-node match-node-2">blight_quarantine</div>
              <div className="vector-node match-node-3">pest_compound_12</div>
              <div className="vector-node match-node-4">organic_compost</div>
              <svg className="vector-svg-lines" viewBox="0 0 300 200" width="100%" height="100%">
                <line className="vector-connect-line" x1="150" y1="100" x2="80" y2="40" strokeDasharray="3 3"/>
                <line className="vector-connect-line" x1="150" y1="100" x2="220" y2="50" strokeDasharray="3 3"/>
                <line className="vector-connect-line" x1="150" y1="100" x2="60" y2="140" strokeDasharray="3 3"/>
                <line className="vector-connect-line" x1="150" y1="100" x2="240" y2="150" strokeDasharray="3 3"/>
              </svg>
              <div className="vector-grid-lines"></div>
            </div>
          </div>
        )}

        {/* View 2: Sonar Maps Crawler */}
        {activeTab === 2 && (
          <div className="spec-visual-view active-view" id="spec-view-2">
            <div className="radar-scan-box">
              <div className="radar-sweep-line"></div>
              <div className="radar-ping-node ping-1" style={{ top: '30%', left: '15%' }}>Store_A: 2.4km</div>
              <div className="radar-ping-node ping-2" style={{ top: '65%', left: '60%' }}>Store_B: 5.1km</div>
              <div className="radar-ping-node ping-3" style={{ top: '20%', left: '70%' }}>Store_C: 9.2km</div>
            </div>
          </div>
        )}

        {/* View 3: Trust Ledger Listings */}
        {activeTab === 3 && (
          <div className="spec-visual-view active-view" id="spec-view-3">
            <div className="ledger-block-stream">
              <div className="ledger-block block-verified">
                <div className="ledger-status-dot"></div>
                <div className="ledger-block-content">
                  <h4>BLOCK #42901 - VERIFIED</h4>
                  <p>Farmer: Deep_Patel // Produce: Cotton // Pincode: 388001 Anand // Verified by: Village_Head</p>
                </div>
              </div>
              
              <div className="ledger-block block-verified" style={{ animationDelay: '0.2s' }}>
                <div className="ledger-status-dot"></div>
                <div className="ledger-block-content">
                  <h4>BLOCK #42900 - VERIFIED</h4>
                  <p>Farmer: Rajesh_K // Produce: Wheat // Pincode: 388011 Anand // Verified by: Taluka_Head</p>
                </div>
              </div>

              <div className="ledger-block block-pending" style={{ animationDelay: '0.4s' }}>
                <div className="ledger-status-dot"></div>
                <div className="ledger-block-content">
                  <h4>BLOCK #42902 - PENDING</h4>
                  <p>Farmer: Anil_B // Produce: Groundnut // Pincode: 388002 Anand // Status: Cascading Auth</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
