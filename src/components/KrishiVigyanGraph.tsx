'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Log {
  text: string;
  type: 'info' | 'success' | 'err';
}

export default function KrishiVigyanGraph() {
  // Simulator states
  const [selectedInputType, setSelectedInputType] = useState<'guj_voice' | 'hin_voice' | 'text_query'>('guj_voice');
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'pro'>('free');
  const [intent, setIntent] = useState<'advice' | 'marketplace'>('advice');

  // Node details text states
  const [translationOutput, setTranslationOutput] = useState('');
  const [ragOutput, setRagOutput] = useState('');
  const [llmOutput, setLlmOutput] = useState('');
  const [waMsg, setWaMsg] = useState('');
  const [waStatus, setWaStatus] = useState('Idle');
  const [waStatusClass, setWaStatusClass] = useState('status-badge');

  // Terminal logs
  const [logs, setLogs] = useState<Log[]>([
    { text: '[System Initialized] Krishi Vigyan AI flow graph loaded. Adjust simulator parameters and click Run.', type: 'info' }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('INITIALIZING_PIPELINE...');
  const [isScanning, setIsScanning] = useState(false);

  // Refs for drawing SVG lines between nodes
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const flowLinesRef = useRef<(SVGPathElement | null)[]>([]);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Text decoder glitch animation helper
  const runGlitchText = (targetText: string, setter: (val: string) => void) => {
    const chars = '!@#$%^&*()_+{}:"<>?,./;[]\\=-~`0123456789';
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
    }, 20);
  };

  const logAction = (text: string, type: 'info' | 'success' | 'err' = 'info') => {
    setLogs(prev => [...prev, { text, type }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Recalculate content based on inputs
  useEffect(() => {
    // 1. Translation / Speech node output
    if (selectedInputType === 'guj_voice') {
      setTranslationOutput('Speech: "કપાસમાં ઈયળ આવી ગઈ છે..."\nIntent: ' + intent.toUpperCase() + '\nParsed: "Bollworm infestation in Cotton"');
    } else if (selectedInputType === 'hin_voice') {
      setTranslationOutput('Speech: "गेहूं के पत्ते पीले हो रहे हैं..."\nIntent: ' + intent.toUpperCase() + '\nParsed: "Wheat leaves turning yellow"');
    } else {
      setTranslationOutput('Text: "Best organic fertilizer near me"\nIntent: ' + intent.toUpperCase() + '\nParsed: "Organic fertilizer query"');
    }

    // 2. RAG / Marketplace database node output
    if (intent === 'advice') {
      if (selectedInputType === 'guj_voice') {
        setRagOutput('FAISS Match: Grounded organic spray recipe for bollworm.\nConfidence: 98.4%');
      } else if (selectedInputType === 'hin_voice') {
        setRagOutput('FAISS Match: Nitrogen deficiency detection & organic feed.\nConfidence: 96.1%');
      } else {
        setRagOutput('FAISS Match: General bio-fertilizer guidance.\nConfidence: 94.5%');
      }
    } else {
      setRagOutput('Marketplace DB: Searched nearest organic shops & grower listings.\nFound: 3 growers near Anand.');
    }

    // 3. LLM Node output
    if (intent === 'advice') {
      setLlmOutput('Response: "Suggested Neem oil compound spray."\nBilingual: English + Gujarati/Hindi');
    } else {
      setLlmOutput('Response: "Verified listings found."\nFormat: Product cards with contact number');
    }

    // 4. WhatsApp Output
    if (intent === 'advice') {
      setWaMsg('Message: Neem oil advice sent via voice note & text.');
    } else {
      setWaMsg('Message: 3 nearest organic grower shop contacts shared.');
    }

    // Trigger wire repaint
    setTimeout(updateConnections, 50);
  }, [selectedInputType, subscriptionTier, intent]);

  // Recalculate line layout coordinates
  const updateConnections = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();

    // Multi-tier curved wire routes between columns
    const connectionData = [
      { fromId: 'node-input-farmer', toId: 'node-stt-trans', inPortIndex: 0 },
      { fromId: 'node-stt-trans', toId: 'node-rag-engine', inPortIndex: 0 },
      { fromId: 'node-soil-params', toId: 'node-rag-engine', inPortIndex: 1 },
      { fromId: 'node-rag-engine', toId: 'node-llm-optimizer', inPortIndex: 0 },
      { fromId: 'node-llm-optimizer', toId: 'node-whatsapp-out', inPortIndex: 0 }
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

      // Draw elegant horizontal/vertical curves between nodes
      const controlOffset = Math.abs(x2 - x1) * 0.45;
      const pathData = `M ${x1},${y1} C ${x1 + controlOffset},${y1} ${x2 - controlOffset},${y2} ${x2},${y2}`;

      const baseLine = document.getElementById(`kv-base-line-${index + 1}`);
      const flowLine = document.getElementById(`kv-flow-line-${index + 1}`);

      if (baseLine) baseLine.setAttribute('d', pathData);
      if (flowLine) flowLine.setAttribute('d', pathData);
    });
  };

  // Run recalculations at scheduled intervals post-hydration,
  // and set up a ResizeObserver to dynamically update on canvas size changes.
  useEffect(() => {
    // Periodic layout checks as browser renders elements and loads fonts
    const timerIds: NodeJS.Timeout[] = [];
    const delays = [50, 150, 300, 600, 1200, 2000];
    delays.forEach(delay => {
      timerIds.push(setTimeout(updateConnections, delay));
    });

    // ResizeObserver watches the container bounds directly
    const canvas = canvasRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (canvas && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateConnections();
      });
      resizeObserver.observe(canvas);
    }

    window.addEventListener('resize', updateConnections);

    return () => {
      timerIds.forEach(clearTimeout);
      if (resizeObserver && canvas) {
        resizeObserver.unobserve(canvas);
      }
      window.removeEventListener('resize', updateConnections);
    };
  }, []);

  const triggerSimulation = () => {
    setLoaderText('VERIFYING_JWT_AND_TIER...');
    setIsLoading(true);
    setWaStatus('Compiling...');
    setWaStatusClass('status-badge status-compiling');

    logAction('>>> Incoming payload received at FastAPI Gateway...', 'info');
    logAction(`User Role: Farmer | Subscription Tier: ${subscriptionTier.toUpperCase()}`, 'info');

    // Step 1: JWT & Subscription limits verification
    setTimeout(() => {
      if (subscriptionTier === 'free') {
        logAction('[Auth Gateway] Daily query limit verified: OK (4/5 daily tokens consumed).', 'success');
      } else {
        logAction('[Auth Gateway] Pro Tier subscription verified: OK (unlimited query pool).', 'success');
      }
      runGlitchText('TRANSLATING_DIALECT_SPEECH...', setLoaderText);
    }, 400);

    // Step 2: Speech STT / translation
    setTimeout(() => {
      logAction(`[STT Speech] Transcribed query from ${selectedInputType === 'guj_voice' ? 'Gujarati voice' : selectedInputType === 'hin_voice' ? 'Hindi voice' : 'text source'} successfully.`, 'success');
      logAction(`[Intent Classifier] Intent resolved: ${intent.toUpperCase()}`, 'info');
      runGlitchText('RETRIEVING_DATABASE_CONTEXT...', setLoaderText);
    }, 850);

    // Scanner beam sweeps
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);

    // Step 3: RAG lookup or Marketplace search
    setTimeout(() => {
      if (intent === 'advice') {
        logAction('[Knowledge RAG] Searched FAISS crop database chunks. Context retrieved successfully.', 'success');
      } else {
        logAction('[Marketplace Directory] Queried PostgreSQL near farmer location coordinates.', 'success');
      }
      runGlitchText('OPTIMIZING_LLM_RESPONSE...', setLoaderText);
    }, 1300);

    // Step 4: Final LLM generation & WhatsApp webhook Actuator
    setTimeout(() => {
      setIsLoading(false);
      logAction('[LLM Generative] Grounded response response generated in bilingual schema.', 'success');

      if (intent === 'advice') {
        logAction(`[Actuator Response] Formatted voice instructions & text advise.`, 'success');
      } else {
        logAction(`[Actuator Response] Injected local grower store card lists via Categorical Fallback.`, 'success');
      }

      setWaStatus('Delivered');
      setWaStatusClass('badge-green');

      logAction('[WhatsApp Webhook] Message payload dispatched via Meta Cloud API. Status: Sent.', 'success');

      // Update flow wire animation speed on success
      flowLinesRef.current.forEach(line => {
        if (line) line.style.animation = 'dash-flow 1.1s linear infinite';
      });
    }, 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      {/* Property Selector Header Panel (Horizontal Layout) */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', backdropFilter: 'var(--card-blur)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Simulation Control Panel</h3>
            <span className={waStatusClass}>{waStatus}</span>
          </div>
          <button className="btn btn-primary" id="run-krishi-btn" onClick={triggerSimulation} style={{ padding: '8px 20px', fontSize: '0.8rem' }}>
            Run Pipeline Simulation
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {/* 1. Farmer Input Type */}
          <div style={{ flex: '1 1 240px' }}>
            <label className="node-meta-lbl" style={{ display: 'block', marginBottom: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Input Format:</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                className={`sample-img-btn ${selectedInputType === 'guj_voice' ? 'active-img' : ''}`}
                onClick={() => setSelectedInputType('guj_voice')}
                style={{ fontSize: '0.72rem', padding: '6px 10px', flex: 1 }}
              >
                🎙️ Gujarati Voice
              </button>
              <button 
                className={`sample-img-btn ${selectedInputType === 'hin_voice' ? 'active-img' : ''}`}
                onClick={() => setSelectedInputType('hin_voice')}
                style={{ fontSize: '0.72rem', padding: '6px 10px', flex: 1 }}
              >
                🎙️ Hindi Voice
              </button>
              <button 
                className={`sample-img-btn ${selectedInputType === 'text_query' ? 'active-img' : ''}`}
                onClick={() => setSelectedInputType('text_query')}
                style={{ fontSize: '0.72rem', padding: '6px 10px', flex: 1 }}
              >
                📝 Text Query
              </button>
            </div>
          </div>

          {/* 2. Intent Select */}
          <div style={{ flex: '1 1 200px' }}>
            <label className="node-meta-lbl" style={{ display: 'block', marginBottom: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Intent Category:</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                className={`sample-img-btn ${intent === 'advice' ? 'active-img' : ''}`}
                onClick={() => setIntent('advice')}
                style={{ fontSize: '0.72rem', padding: '6px 10px', flex: 1 }}
              >
                🌾 Farming Advice
              </button>
              <button 
                className={`sample-img-btn ${intent === 'marketplace' ? 'active-img' : ''}`}
                onClick={() => setIntent('marketplace')}
                style={{ fontSize: '0.72rem', padding: '6px 10px', flex: 1 }}
              >
                🛒 Buy Produce
              </button>
            </div>
          </div>

          {/* 3. Subscription Tier Select */}
          <div style={{ flex: '1 1 180px' }}>
            <label className="node-meta-lbl" style={{ display: 'block', marginBottom: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Access Tier:</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                className={`sample-img-btn ${subscriptionTier === 'free' ? 'active-img' : ''}`}
                onClick={() => setSubscriptionTier('free')}
                style={{ fontSize: '0.72rem', padding: '6px 10px', flex: 1 }}
              >
                🔒 Free Plan
              </button>
              <button 
                className={`sample-img-btn ${subscriptionTier === 'pro' ? 'active-img' : ''}`}
                onClick={() => setSubscriptionTier('pro')}
                style={{ fontSize: '0.72rem', padding: '6px 10px', flex: 1 }}
              >
                ⭐ Pro Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Workspace Canvas */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <div className="canvas-scroll-wrapper" style={{ position: 'relative', width: '100%', overflowX: 'auto', borderRadius: '16px' }}>
          {/* Overlay loading sweep */}
          {isLoading && (
            <div className="canvas-loader-overlay">
              <div className="hud-loader-wrapper">
                <div className="hud-target-cross"></div>
                <div className="hud-ring-outer"></div>
                <div className="hud-ring-inner"></div>
                <div className="hud-radar-sweep"></div>
              </div>
              <span className="hud-loader-text">{loaderText}</span>
              <span className="hud-loader-subtext">COGNITIVE_PIPELINE // RUNNING</span>
            </div>
          )}
          
          <div className="editor-canvas" id="canvas-kv" ref={canvasRef} style={{ height: '460px', width: '920px', position: 'relative', overflow: 'hidden' }}>
            <div className={`canvas-scanner ${isScanning ? 'scanning-active' : ''}`}></div>
            <div className="canvas-particles"></div>

            {/* SVG threads layer */}
            <svg className="canvas-svg-overlay" id="svg-connections-kv" ref={svgRef}>
              <path className="connection-line svg-trace-active" id="kv-base-line-1" d="" />
              <path className="connection-line svg-trace-active" id="kv-base-line-2" d="" />
              <path className="connection-line svg-trace-active" id="kv-base-line-3" d="" />
              <path className="connection-line svg-trace-active" id="kv-base-line-4" d="" />
              <path className="connection-line svg-trace-active" id="kv-base-line-5" d="" />

              <path className="flowing-line" id="kv-flow-line-1" d="" stroke="var(--accent-primary)" ref={el => { flowLinesRef.current[0] = el; }} />
              <path className="flowing-line" id="kv-flow-line-2" d="" stroke="var(--accent-primary)" ref={el => { flowLinesRef.current[1] = el; }} />
              <path className="flowing-line" id="kv-flow-line-3" d="" stroke="var(--accent-primary)" ref={el => { flowLinesRef.current[2] = el; }} />
              <path className="flowing-line" id="kv-flow-line-4" d="" stroke="var(--accent-secondary)" ref={el => { flowLinesRef.current[3] = el; }} />
              <path className="flowing-line" id="kv-flow-line-5" d="" stroke="var(--accent-purple)" ref={el => { flowLinesRef.current[4] = el; }} />
            </svg>

            {/* ================= COLUMN 1 ================= */}
            {/* Farmer Input (Top Left) */}
            <article className="node-panel node-input tilt-card" id="node-input-farmer" style={{ left: '40px', top: '30px', width: '240px' }}>
              <div className="node-port-out" style={{ top: '50%', right: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">INPUT</span>
                <h4 style={{ fontSize: '0.85rem' }}>Farmer Message</h4>
              </div>
              <div className="node-body">
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {selectedInputType === 'guj_voice' ? '🎙️ Gujarati Voice note' : selectedInputType === 'hin_voice' ? '🎙️ Hindi Voice note' : '📝 Text query'}
                </p>
              </div>
            </article>

            {/* User Context Metadata (Bottom Left) */}
            <article className="node-panel node-input tilt-card" id="node-soil-params" style={{ left: '40px', top: '250px', width: '240px' }}>
              <div className="node-port-out" style={{ top: '50%', right: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">METADATA CONTEXT</span>
                <h4 style={{ fontSize: '0.85rem' }}>User Context</h4>
              </div>
              <div className="node-body">
                <p style={{ fontSize: '0.70rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Tier: <strong>{subscriptionTier.toUpperCase()}</strong><br />
                  Location: Anand, Gujarat<br />
                  Session: PG-Active
                </p>
              </div>
            </article>

            {/* ================= COLUMN 2 ================= */}
            {/* STT & Translation (Top Middle) */}
            <article className="node-panel node-processor tilt-card" id="node-stt-trans" style={{ left: '340px', top: '30px', width: '240px' }}>
              <div className="node-port-in" style={{ top: '50%', left: '-6px' }}></div>
              <div className="node-port-out" style={{ top: '50%', right: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">PROCESSING</span>
                <h4 style={{ fontSize: '0.85rem' }}>Speech & Intent</h4>
              </div>
              <div className="node-body">
                <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                  {translationOutput}
                </p>
              </div>
            </article>

            {/* Knowledge RAG Base (Bottom Middle) */}
            <article className="node-panel node-processor tilt-card" id="node-rag-engine" style={{ left: '340px', top: '250px', width: '240px' }}>
              <div className="node-port-in" style={{ top: '25%', left: '-6px' }}></div>
              <div className="node-port-in" style={{ top: '75%', left: '-6px' }}></div>
              <div className="node-port-out" style={{ top: '50%', right: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">KNOWLEDGE SEARCH</span>
                <h4 style={{ fontSize: '0.85rem' }}>{intent === 'advice' ? 'RAG Database' : 'Marketplace Directory'}</h4>
              </div>
              <div className="node-body">
                <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                  {ragOutput}
                </p>
              </div>
            </article>

            {/* ================= COLUMN 3 ================= */}
            {/* LLM Cognitive Engine (Top Right) */}
            <article className="node-panel node-processor tilt-card" id="node-llm-optimizer" style={{ left: '640px', top: '30px', width: '240px' }}>
              <div className="node-port-in" style={{ top: '50%', left: '-6px' }}></div>
              <div className="node-port-out" style={{ top: '50%', right: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">GENERATIVE AI</span>
                <h4 style={{ fontSize: '0.85rem' }}>GPT-4o-mini</h4>
              </div>
              <div className="node-body">
                <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                  {llmOutput}
                </p>
              </div>
            </article>

            {/* WhatsApp Actuator Out (Bottom Right) */}
            <article className="node-panel node-output tilt-card" id="node-whatsapp-out" style={{ left: '640px', top: '250px', width: '240px' }}>
              <div className="node-port-in" style={{ top: '50%', left: '-6px' }}></div>
              <div className="node-header">
                <span className="node-type">DELIVERY Gateway</span>
                <h4 style={{ fontSize: '0.85rem' }}>WhatsApp Out</h4>
              </div>
              <div className="node-body">
                <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                  {waMsg}
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* Terminal Logs */}
        <div className="canvas-terminal tilt-card" style={{ marginTop: '16px' }}>
          <div className="terminal-header">
            <span>PIPELINE_LOGS</span>
            <button className="terminal-clear-btn" onClick={clearLogs}>Clear Logs</button>
          </div>
          <div className="terminal-body" id="console-logs-kv">
            {logs.map((log, index) => {
              let logClass = '';
              if (log.type === 'success') logClass = 'log-success';
              else if (log.type === 'err') logClass = 'log-err';
              else logClass = 'text-muted';

              return (
                <div key={index} className={`log-line ${logClass}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', margin: '4px 0' }}>
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
