import { useState, useEffect, useRef, useCallback } from 'react';
import './InteractionTracker.css';

/**
 * InteractionTracker - Floating panel that logs user interactions.
 * Demonstrates: useState, useEffect, useRef, useCallback, event handling,
 * conditional rendering, array mapping, DOM events, Canvas API.
 *
 * Toggle with Ctrl+I
 */

/* ─── Helper: timestamp ─── */
const timestamp = () =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

/* ─── Helper: describe element ─── */
const describeElement = (el) => {
  if (!el || el === document) return 'document';
  if (el === window) return 'window';
  const tag = el.tagName?.toLowerCase() || '?';
  const id = el.id ? `.id-${el.id}` : '';
  const cls = el.className && typeof el.className === 'string'
    ? '.' + el.className.split(' ').filter(Boolean).slice(0, 2).join('.')
    : '';
  return `<${tag}${id}${cls}>`;
};

/* ─── Event type → icon ─── */
const ICONS = {
  click:    '🖱️',
  dblclick: '🖱️',
  keydown:  '⌨️',
  scroll:   '📜',
  focus:    '🖥️',
  blur:     '🖥️',
  resize:   '📐',
  mousemove:'➡️',
  drag:     '✋',
  touch:    '👆',
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const InteractionTracker = () => {
  /* ── State ── */
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('log');   // log | stats | capture
  const [events, setEvents] = useState([]);
  const [heatmapOn, setHeatmapOn] = useState(false);
  const [trailOn, setTrailOn] = useState(false);
  const [isLive, setIsLive] = useState(true);

  /* ── Refs ── */
  const heatmapCanvasRef = useRef(null);
  const trailCanvasRef   = useRef(null);
  const trailPoints      = useRef([]);
  const clickPoints      = useRef([]);
  const idCounter        = useRef(0);
  const panelRef         = useRef(null);

  /* ── Stats counters ── */
  const statsRef = useRef({
    clicks: 0, keys: 0, scrolls: 0, focusEvents: 0, totalMoves: 0,
  });

  /* ─── Push event ─── */
  const pushEvent = useCallback((type, detail) => {
    if (!isLive) return;
    const entry = {
      id: ++idCounter.current,
      type,
      detail,
      time: timestamp(),
    };
    setEvents((prev) => [entry, ...prev].slice(0, 200));
  }, [isLive]);

  /* ── Clear ── */
  const clearEvents = () => {
    setEvents([]);
    clickPoints.current = [];
    trailPoints.current = [];
    statsRef.current = { clicks: 0, keys: 0, scrolls: 0, focusEvents: 0, totalMoves: 0 };
    clearCanvas(heatmapCanvasRef);
    clearCanvas(trailCanvasRef);
  };

  /* ═══════════ EVENT LISTENERS ═══════════ */
  useEffect(() => {
    /* ── Toggle shortcut ── */
    const onKey = (e) => {
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        setVisible((v) => !v);
        return;
      }
      const combo = [
        e.ctrlKey && 'Ctrl',
        e.altKey && 'Alt',
        e.shiftKey && 'Shift',
        e.key,
      ].filter(Boolean).join('+');
      pushEvent('keydown', `Key: ${combo}`);
      statsRef.current.keys++;
    };

    /* ── Click ── */
    const onClick = (e) => {
      // Ignore clicks inside the tracker panel itself
      if (panelRef.current && panelRef.current.contains(e.target)) return;
      const desc = describeElement(e.target);
      pushEvent('click', `(${e.clientX}, ${e.clientY}) on ${desc}`);
      statsRef.current.clicks++;
      clickPoints.current.push({ x: e.clientX, y: e.clientY });
      if (heatmapOn) drawHeatmap();
    };

    /* ── Mouse move (trail) ── */
    let moveThrottle = 0;
    const onMove = (e) => {
      const now = Date.now();
      if (now - moveThrottle < 50) return; // 20fps max
      moveThrottle = now;
      statsRef.current.totalMoves++;
      trailPoints.current.push({ x: e.clientX, y: e.clientY });
      if (trailPoints.current.length > 300) trailPoints.current.shift();
      if (trailOn) drawTrail();
    };

    /* ── Focus / Blur ── */
    const onFocus = () => { pushEvent('focus', 'Window focused'); statsRef.current.focusEvents++; };
    const onBlur  = () => { pushEvent('blur',  'Window blurred'); statsRef.current.focusEvents++; };

    /* ── Scroll ── */
    let scrollThrottle = 0;
    const onScroll = () => {
      const now = Date.now();
      if (now - scrollThrottle < 300) return;
      scrollThrottle = now;
      pushEvent('scroll', `Scrolled to Y=${Math.round(window.scrollY)}`);
      statsRef.current.scrolls++;
    };

    /* ── Resize ── */
    let resizeThrottle = 0;
    const onResize = () => {
      const now = Date.now();
      if (now - resizeThrottle < 500) return;
      resizeThrottle = now;
      pushEvent('resize', `Resized to ${window.innerWidth}x${window.innerHeight}`);
    };

    /* Register */
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick, true);
    document.addEventListener('mousemove', onMove);
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [pushEvent, heatmapOn, trailOn]);

  /* ═══════════ CANVAS: Heatmap ═══════════ */
  const drawHeatmap = useCallback(() => {
    const canvas = heatmapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clickPoints.current.forEach((pt) => {
      const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 30);
      grad.addColorStop(0, 'rgba(255, 80, 80, 0.6)');
      grad.addColorStop(1, 'rgba(255, 80, 80, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 30, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  /* ═══════════ CANVAS: Trail ═══════════ */
  const drawTrail = useCallback(() => {
    const canvas = trailCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pts = trailPoints.current;
    if (pts.length < 2) return;
    ctx.strokeStyle = 'rgba(130, 100, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
  }, []);

  const clearCanvas = (ref) => {
    const c = ref.current;
    if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
  };

  /* ── Toggle heatmap ── */
  useEffect(() => {
    if (heatmapOn) drawHeatmap();
    else clearCanvas(heatmapCanvasRef);
  }, [heatmapOn, drawHeatmap]);

  /* ── Toggle trail ── */
  useEffect(() => {
    if (trailOn) drawTrail();
    else clearCanvas(trailCanvasRef);
  }, [trailOn, drawTrail]);

  /* ═══════════ CAPTURE: Screenshot ═══════════ */
  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ preferredDisplaySurface: 'browser' });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.onloadedmetadata = async () => {
        await video.play();
        setTimeout(() => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `MathSense-Interaction-${new Date().toISOString().slice(0, 10)}.png`;
          link.click();
          stream.getTracks().forEach((t) => t.stop());
          pushEvent('click', 'Screen captured & saved');
        }, 500);
      };
    } catch (err) {
      console.error('Capture failed:', err);
    }
  };

  /* ═══════════ RENDER ═══════════ */
  if (!visible) return (
    <>
      {heatmapOn && <canvas ref={heatmapCanvasRef} className="it-overlay-canvas" />}
      {trailOn   && <canvas ref={trailCanvasRef}   className="it-overlay-canvas" />}
    </>
  );

  const stats = statsRef.current;

  return (
    <>
      {/* Overlay canvases */}
      {heatmapOn && <canvas ref={heatmapCanvasRef} className="it-overlay-canvas" />}
      {trailOn   && <canvas ref={trailCanvasRef}   className="it-overlay-canvas" />}

      {/* ─── Panel ─── */}
      <div className="it-panel" ref={panelRef}>
        {/* Header */}
        <div className="it-header">
          <div className="it-header-left">
            <span className="it-logo">📊</span>
            <span className="it-title">Interaction Tracker</span>
          </div>
          <div className="it-header-right">
            <button
              className={`it-live-badge ${isLive ? 'live' : 'paused'}`}
              onClick={() => setIsLive((l) => !l)}
              title={isLive ? 'Pause tracking' : 'Resume tracking'}
            >
              <span className="it-live-dot" />
              {isLive ? 'Live' : 'Paused'}
            </button>
            <button className="it-close" onClick={() => setVisible(false)} title="Close (Ctrl+I)">
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="it-tabs">
          {[
            { id: 'log',     icon: '📋', label: 'Log' },
            { id: 'stats',   icon: '📈', label: 'Stats' },
            { id: 'capture', icon: '📸', label: 'Capture' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`it-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="it-tab-icon">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Toolbar (visible in Log tab) */}
        {activeTab === 'log' && (
          <div className="it-toolbar">
            <label className="it-toggle">
              <input type="checkbox" checked={heatmapOn} onChange={(e) => setHeatmapOn(e.target.checked)} />
              <span className="it-toggle-dot heatmap" /> Heatmap
            </label>
            <label className="it-toggle">
              <input type="checkbox" checked={trailOn} onChange={(e) => setTrailOn(e.target.checked)} />
              <span className="it-toggle-dot trail" /> Trail
            </label>
          </div>
        )}

        {/* ─── TAB: Log ─── */}
        {activeTab === 'log' && (
          <div className="it-body">
            <div className="it-event-header">
              <span className="it-event-count">{events.length} events</span>
              <button className="it-clear-btn" onClick={clearEvents}>Clear</button>
            </div>
            <div className="it-event-list">
              {events.length === 0 && (
                <div className="it-empty">No events yet. Interact with the page!</div>
              )}
              {events.map((ev) => (
                <div key={ev.id} className="it-event-row">
                  <span className="it-event-icon">{ICONS[ev.type] || '📌'}</span>
                  <span className="it-event-detail">{ev.detail}</span>
                  <span className="it-event-time">{ev.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB: Stats ─── */}
        {activeTab === 'stats' && (
          <div className="it-body">
            <div className="it-stats-grid">
              <div className="it-stat-card">
                <span className="it-stat-icon">🖱️</span>
                <span className="it-stat-value">{stats.clicks}</span>
                <span className="it-stat-label">Clicks</span>
              </div>
              <div className="it-stat-card">
                <span className="it-stat-icon">⌨️</span>
                <span className="it-stat-value">{stats.keys}</span>
                <span className="it-stat-label">Key Presses</span>
              </div>
              <div className="it-stat-card">
                <span className="it-stat-icon">📜</span>
                <span className="it-stat-value">{stats.scrolls}</span>
                <span className="it-stat-label">Scrolls</span>
              </div>
              <div className="it-stat-card">
                <span className="it-stat-icon">🖥️</span>
                <span className="it-stat-value">{stats.focusEvents}</span>
                <span className="it-stat-label">Focus Events</span>
              </div>
              <div className="it-stat-card full-width">
                <span className="it-stat-icon">➡️</span>
                <span className="it-stat-value">{stats.totalMoves}</span>
                <span className="it-stat-label">Mouse Moves</span>
              </div>
            </div>
            <div className="it-stats-summary">
              <p>Total interactions: <strong>{stats.clicks + stats.keys + stats.scrolls + stats.focusEvents}</strong></p>
              <p>Session time: <strong>{new Date().toLocaleTimeString()}</strong></p>
            </div>
          </div>
        )}

        {/* ─── TAB: Capture ─── */}
        {activeTab === 'capture' && (
          <div className="it-body">
            <div className="it-capture-section">
              <div className="it-capture-icon">📸</div>
              <h3>Screen Capture</h3>
              <p>Capture the current browser tab as a PNG screenshot with all overlays visible.</p>
              <button className="it-capture-btn" onClick={handleCapture}>
                Take Screenshot
              </button>
              <div className="it-capture-info">
                <p><strong>Overlays:</strong></p>
                <p>Heatmap: <span className={heatmapOn ? 'it-on' : 'it-off'}>{heatmapOn ? 'ON' : 'OFF'}</span> | Trail: <span className={trailOn ? 'it-on' : 'it-off'}>{trailOn ? 'ON' : 'OFF'}</span></p>
                <p className="it-capture-hint">The screenshot will include any active heatmap or trail overlays.</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="it-footer">
          <span className="it-shortcut">Ctrl+I toggle</span>
          <span className="it-module-link">See module for shortcuts</span>
        </div>
      </div>
    </>
  );
};

export default InteractionTracker;
