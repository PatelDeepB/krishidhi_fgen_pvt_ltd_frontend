'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Log {
  text: string;
  type: 'info' | 'success' | 'err';
}

export default function FlowOrchestrator() {
  const [currentInfectionStress, setCurrentInfectionStress] = useState(0);
  const [soilMoisture, setSoilMoisture] = useState(60);
  const [soilPh, setSoilPh] = useState(6.8);
  const [storeRadius, setStoreRadius] = useState(15);

  const [threat, setThreat] = useState('Nominal');
  const [threatClass, setThreatClass] = useState('badge-green');
  const [ragOutput, setRagOutput] = useState('Context matched: Healthy cotton. Standard organic nitrogen treatment recommended.');
  const [storeOutput, setStoreOutput] = useState('Found 2 verified input shops within Anand.');
  const [waMsg, setWaMsg] = useState('Alert sent: Healthy cotton crop spotted. Buy Organic Bio-Nutrients at local shop.');
  const [waStatus, setWaStatus] = useState('Ready');
  const [waStatusClass, setWaStatusClass] = useState('status-badge');

  const [logs, setLogs] = useState<Log[]>([
    { text: '[System Initialized] Diagnostics Console loaded. Adjust node properties and run diagnostics.', type: 'info' }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('COMPILING_NODE_GRAPH...');
  const [isScanning, setIsScanning] = useState(false);

  // Refs for node elements to draw SVG connections
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const flowLinesRef = useRef<(SVGPathElement | null)[]>([]);

  // Glitch text decoder animation utility
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

  const logAction = (text: string, type: 'info' | 'success' | 'err' = 'info') => {
    setLogs(prev => [...prev, { text, type }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Recalculate logic when inputs change
  useEffect(() => {
    // 1. Calculate threat levels
    if (currentInfectionStress < 25) {
      setThreat('Nominal');
      setThreatClass('badge-green');
      setRagOutput('Context matched: Healthy cotton. Standard organic nitrogen treatment recommended.');
    } else if (currentInfectionStress >= 25 && currentInfectionStress <= 60) {
      setThreat('Moderate');
      setThreatClass('badge-blue');
      setRagOutput('Context matched: Bacterial blight spots. Recommended: Copper oxychloride mixture.');
    } else {
      setThreat('Critical');
      setThreatClass('badge-red');
      setRagOutput('Context matched: Severe Leaf Blight. High risk. Recommended: Immediate copper dose + quarantine.');
    }

    // 2. Local shops discovery count math
    const baseShops = currentInfectionStress > 20 ? 3 : 2;
    const radiusFactor = Math.floor(storeRadius / 10);
    const matchedShops = baseShops + radiusFactor;
    setStoreOutput(`Found ${matchedShops} verified input shops within Anand.`);

    // 3. Trigger SVG path updates dynamically
    setTimeout(updateConnections, 50);
  }, [currentInfectionStress, soilMoisture, soilPh, storeRadius]);

  const updateConnections = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();

    const connectionData = [
      { fromId: 'node-camera', toId: 'node-rag', inPortIndex: 0 },
      { fromId: 'node-soil', toId: 'node-rag', inPortIndex: 1 },
      { fromId: 'node-rag', toId: 'node-store', inPortIndex: 0 },
      { fromId: 'node-rag', toId: 'node-whatsapp', inPortIndex: 0 }
    ];

    connectionData.forEach((conn, index) => {
      const fromEl = document.getElementById(conn.fromId);
      const toEl = document.getElementById(conn.toId);
      if (!fromEl || !toEl) return;

      const outPort = fromEl.querySelector('.node-port-out');
      const inPorts = toEl.querySelectorAll('.node-port-in');
      const inPort = inPorts[conn.inPortIndex];
      if (!outPort || !inPort) return;

      const outRect = outPort.getBoundingClientRect();
      const inRect = inPort.getBoundingClientRect();

      const x1 = outRect.left - canvasRect.left + outRect.width / 2;
      const y1 = outRect.top - canvasRect.top + outRect.height / 2;
      const x2 = inRect.left - canvasRect.left + inRect.width / 2;
      const y2 = inRect.top - canvasRect.top + inRect.height / 2;

      const controlOffset = Math.abs(x2 - x1) * 0.5;
      const pathData = `M ${x1},${y1} C ${x1 + controlOffset},${y1} ${x2 - controlOffset},${y2} ${x2},${y2}`;

      const baseLine = document.getElementById(`base-line-${index + 1}`);
      const flowLine = document.getElementById(`flow-line-${index + 1}`);

      if (baseLine) baseLine.setAttribute('d', pathData);
      if (flowLine) flowLine.setAttribute('d', pathData);
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updateConnections);
    return () => window.removeEventListener('resize', updateConnections);
  }, []);

  const triggerPipeline = () => {
    setLoaderText('COMPILING_NODE_GRAPH...');
    setIsLoading(true);
    setWaStatus('Compiling...');
    setWaStatusClass('status-badge status-compiling');

    logAction('>>> Compiling Agronomy Pipeline...', 'info');
    logAction('Retrieving node parameter states...', 'info');
    logAction(`Parameters: leaf_infection_idx=${currentInfectionStress}%, pH=${soilPh}, moisture=${soilMoisture}%, radius=${storeRadius}km`, 'info');

    // Scramble effect middle phase transition
    setTimeout(() => {
      runGlitchText('SYNCING_WHATSAPP_WEBHOOK...', setLoaderText);
    }, 700);

    // Scanner beam sweep animation
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1500);

    setTimeout(() => {
      setIsLoading(false);
      
      logAction('Context grounding matched to active agricultural vector indices.', 'success');
      
      let diagnosisMsg = '';
      let treatmentInput = '';
      if (currentInfectionStress < 25) {
        diagnosisMsg = 'Healthy cotton crop';
        treatmentInput = 'Organic Bio-Nutrients';
      } else if (currentInfectionStress >= 25 && currentInfectionStress <= 60) {
        diagnosisMsg = 'Bacterial Blight Leaf-Spots';
        treatmentInput = 'Copper Oxychloride Compound';
      } else {
        diagnosisMsg = 'Severe Foliar Blight Pathogen';
        treatmentInput = 'Copper Oxychloride + Quarantine Trigger';
      }

      logAction(`[DIAGNOSIS] ${diagnosisMsg} identified (RAG match)`, 'success');

      const baseShops = currentInfectionStress > 20 ? 3 : 2;
      const radiusFactor = Math.floor(storeRadius / 10);
      const matchedShops = baseShops + radiusFactor;
      logAction(`[STORE_LOCATOR] Verified ${matchedShops} local store inventories with stock: ${treatmentInput}`, 'info');

      setWaStatus('Dispatched');
      setWaStatusClass('badge-green');
      setWaMsg(`Alert sent: ${diagnosisMsg} spotted. Buy ${treatmentInput} at local shop.`);

      logAction('[WhatsApp API] Message payload dispatched to farmer terminal. Status: Delivered.', 'success');

      // Speed up flow lines animations on success
      flowLinesRef.current.forEach(line => {
        if (line) line.style.animation = 'dash-flow 1.2s linear infinite';
      });
    }, 1500);
  };

  return (
    <div className="node-editor-workspace">
      {/* Workspace Sidebar / Property Panel */}
      <div className="editor-sidebar tilt-card">
        <div className="sidebar-header">
          <h3>Flow Properties</h3>
          <span className={waStatusClass}>{waStatus}</span>
        </div>

        <div className="sidebar-body">
          <div className="selected-node-info" id="node-info-panel">
            <div className="info-node-card">
              <span className="info-type">COMPILING PIPELINE CONFIGURATION</span>
              <h4 style={{ margin: '4px 0' }}>Agronomy Engine Settings</h4>
              <p className="muted-text">Change sliders or image tabs on the workspace nodes, then click the pipeline trigger to route diagnostic reports.</p>
              
              <div className="sidebar-metrics" style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <div className="metric-row">
                  <span>Soil pH Level:</span>
                  <span className="value-highlight">{soilPh}</span>
                </div>
                <div className="metric-row">
                  <span>Leaf Stress Level:</span>
                  <span className="value-highlight" style={{ color: currentInfectionStress > 50 ? '#ef4444' : '#10b981' }}>
                    {currentInfectionStress}%
                  </span>
                </div>
                <div className="metric-row">
                  <span>Store Radius:</span>
                  <span className="value-highlight">{storeRadius} km</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="global-actions" style={{ marginTop: '24px' }}>
            <button className="btn btn-primary btn-full" id="run-pipeline-btn" onClick={triggerPipeline}>
              Run Diagnostics Pipeline
            </button>
          </div>
        </div>
      </div>

      {/* Flow Canvas */}
      <div className="editor-canvas-container">
        <div className="canvas-scroll-wrapper" style={{ position: 'relative' }}>
          {/* Inline Canvas Loading Overlay (Cyber HUD Interface) */}
          {isLoading && (
            <div className="canvas-loader-overlay" id="canvas-loader">
              <div className="hud-loader-wrapper">
                <div className="hud-target-cross"></div>
                <div className="hud-ring-outer"></div>
                <div className="hud-ring-inner"></div>
                <div className="hud-radar-sweep"></div>
              </div>
              <span className="hud-loader-text" id="canvas-loader-text">{loaderText}</span>
              <span className="hud-loader-subtext" id="canvas-loader-subtext">CORE_ENGINE // STABLE</span>
            </div>
          )}
          
          <div className="editor-canvas" id="canvas" ref={canvasRef}>
            {/* Laser Scanner Sweep Overlay */}
            <div className={`canvas-scanner ${isScanning ? 'scanning-active' : ''}`} id="canvas-scanner"></div>

            {/* Particle Background Layer */}
            <div className="canvas-particles" id="canvas-particles"></div>

            {/* SVG Connector Wires */}
            <svg className="canvas-svg-overlay" id="svg-connections" ref={svgRef}>
              {/* Base inactive lines */}
              <path className="connection-line svg-trace-active" id="base-line-1" d="" />
              <path className="connection-line svg-trace-active" id="base-line-2" d="" />
              <path className="connection-line svg-trace-active" id="base-line-3" d="" />
              <path className="connection-line svg-trace-active" id="base-line-4" d="" />

              {/* Active flowing glow highlights */}
              <path className="flowing-line" id="flow-line-1" d="" stroke="var(--accent-primary)" ref={el => { flowLinesRef.current[0] = el; }} />
              <path className="flowing-line" id="flow-line-2" d="" stroke="var(--accent-primary)" ref={el => { flowLinesRef.current[1] = el; }} />
              <path className="flowing-line" id="flow-line-3" d="" stroke="var(--accent-secondary)" ref={el => { flowLinesRef.current[2] = el; }} />
              <path className="flowing-line" id="flow-line-4" d="" stroke="var(--accent-secondary)" ref={el => { flowLinesRef.current[3] = el; }} />
            </svg>

            {/* ================= NODE A: CAMERA INPUT ================= */}
            <article className="node-panel node-input tilt-card" id="node-camera" style={{ left: '40px', top: '30px' }}>
              <div className="node-port-out" style={{ top: '50%', right: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">INPUT</span>
                <h4>Foliage Image</h4>
              </div>
              <div className="node-body">
                <p className="node-meta-lbl">Select Sample Upload:</p>
                <div className="sample-images-grid">
                  <button 
                    className={`sample-img-btn ${currentInfectionStress === 0 ? 'active-img' : ''}`} 
                    onClick={() => setCurrentInfectionStress(0)}
                  >
                    <span>Leaf_Healthy.png</span>
                  </button>
                  <button 
                    className={`sample-img-btn ${currentInfectionStress === 45 ? 'active-img' : ''}`} 
                    onClick={() => setCurrentInfectionStress(45)}
                  >
                    <span>Leaf_Rust_Spot.png</span>
                  </button>
                  <button 
                    className={`sample-img-btn ${currentInfectionStress === 90 ? 'active-img' : ''}`} 
                    onClick={() => setCurrentInfectionStress(90)}
                  >
                    <span>Leaf_Severe_Blight.png</span>
                  </button>
                </div>
              </div>
            </article>

            {/* ================= NODE B: CHEMICAL TELEMETRY ================= */}
            <article className="node-panel node-input tilt-card" id="node-soil" style={{ left: '40px', top: '290px' }}>
              <div className="node-port-out" style={{ top: '50%', right: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">INPUT</span>
                <h4>Soil Parameters</h4>
              </div>
              <div className="node-body">
                <div className="node-slider-box">
                  <div className="slider-lbl-row">
                    <span>Soil Moisture</span>
                    <span>{soilMoisture}%</span>
                  </div>
                  <input 
                    type="range" 
                    className="premium-slider" 
                    min="10" 
                    max="100" 
                    value={soilMoisture} 
                    onChange={e => setSoilMoisture(parseInt(e.target.value))}
                  />
                </div>
                <div className="node-slider-box" style={{ marginTop: '10px' }}>
                  <div className="slider-lbl-row">
                    <span>Soil pH</span>
                    <span>{soilPh}</span>
                  </div>
                  <input 
                    type="range" 
                    className="premium-slider" 
                    min="3" 
                    max="11" 
                    step="0.1" 
                    value={soilPh} 
                    onChange={e => setSoilPh(parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </article>

            {/* ================= NODE C: RAG INTERPRETATION ================= */}
            <article className="node-panel node-processor tilt-card" id="node-rag" style={{ left: '340px', top: '150px' }}>
              <div className="node-port-in" style={{ top: '30%', left: '-6px' }}></div>
              <div className="node-port-in" style={{ top: '70%', left: '-6px' }}></div>
              <div className="node-port-out" style={{ top: '50%', right: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">COGNITIVE ENGINE</span>
                <h4>RAG Parser</h4>
              </div>
              <div className="node-body">
                <div className="indicator-row">
                  <span>Threat Index:</span>
                  <span className={threatClass}>{threat}</span>
                </div>
                <p className="node-desc-text" style={{ marginTop: '10px' }}>{ragOutput}</p>
              </div>
            </article>

            {/* ================= NODE D: INPUT STORE LOCATOR ================= */}
            <article className="node-panel node-processor tilt-card" id="node-store" style={{ left: '640px', top: '30px' }}>
              <div className="node-port-in" style={{ top: '50%', left: '-6px' }}></div>
              <div className="node-port-out" style={{ top: '50%', right: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">DIRECTORY ROUTE</span>
                <h4>Shop Search</h4>
              </div>
              <div className="node-body">
                <div className="node-slider-box">
                  <div className="slider-lbl-row">
                    <span>Search Radius</span>
                    <span>{storeRadius} km</span>
                  </div>
                  <input 
                    type="range" 
                    className="premium-slider" 
                    min="5" 
                    max="50" 
                    value={storeRadius} 
                    onChange={e => setStoreRadius(parseInt(e.target.value))}
                  />
                </div>
                <p className="node-desc-text" style={{ marginTop: '10px' }}>{storeOutput}</p>
              </div>
            </article>

            {/* ================= NODE E: WHATSAPP BOT OUT ================= */}
            <article className="node-panel node-output tilt-card" id="node-whatsapp" style={{ left: '640px', top: '290px' }}>
              <div className="node-port-in" style={{ top: '50%', left: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">ACTUATOR</span>
                <h4>WhatsApp Out</h4>
              </div>
              <div className="node-body">
                <div className="indicator-row">
                  <span>Delivery Route:</span>
                  <span className="badge-green">Active</span>
                </div>
                <p className="node-desc-text" style={{ marginTop: '10px' }}>{waMsg}</p>
              </div>
            </article>
          </div>
        </div>

        {/* Terminal Output Log */}
        <div className="canvas-terminal tilt-card">
          <div className="terminal-header">
            <span>RAG_COMPILATION_OUTPUT</span>
            <button className="terminal-clear-btn" onClick={clearLogs}>Clear Console</button>
          </div>
          <div className="terminal-body" id="console-logs">
            {logs.map((log, index) => {
              let logClass = '';
              if (log.type === 'success') logClass = 'log-success';
              else if (log.type === 'err') logClass = 'log-err';
              else logClass = 'text-muted';

              return (
                <div key={index} className={`log-line ${logClass}`}>
                  {log.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
