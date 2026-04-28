import React, { useState, useCallback } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const GROQ_KEY = process.env.REACT_APP_GROQ_KEY || '';
const TRIP_STYLES = ['Adventure', 'Relaxed', 'Cultural', 'Foodie'];
const ACTIVITY_ICONS = { transport: '✈️', food: '🍽️', attraction: '🏛️', outdoor: '🌿', shopping: '🛍️', default: '📍' };

const SYSTEM_PROMPT = `You are a travel itinerary expert. Given a destination, dates, budget, and trip style, return ONLY valid JSON in this exact shape with no markdown or commentary:
{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "label": "Day 1 – Arrival",
      "activities": [
        { "time": "09:00", "name": "Activity Name", "description": "Short description", "cost": 1500, "type": "attraction", "mapQuery": "Eiffel Tower, Paris" }
      ]
    }
  ],
  "totalCost": 75000,
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}
Types must be one of: transport, food, attraction, outdoor, shopping. All costs must be in Indian Rupees (INR ₹). Keep costs realistic for Indian travellers. Return 3-4 activities per day.`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function mapsUrl(query) {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function daysBetween(start, end) {
  if (!start || !end) return 0;
  return Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="skeleton-wrap">
      {[1, 2, 3].map(i => (
        <div key={i} className="skeleton-card">
          <div className="sk sk-title" />
          <div className="sk sk-line" />
          <div className="sk sk-line sk-short" />
          <div className="sk sk-line" />
          <div className="sk sk-line sk-short" />
        </div>
      ))}
    </div>
  );
}

// ─── Donut ────────────────────────────────────────────────────────────────────
function DonutChart({ days, budget }) {
  if (!days || days.length === 0) return null;
  const totals = {};
  days.forEach(d => d.activities.forEach(a => {
    totals[a.type] = (totals[a.type] || 0) + (a.cost || 0);
  }));
  const entries = Object.entries(totals);
  const grand = entries.reduce((s, [, v]) => s + v, 0) || 1;
  const colors = ['#0ea5e9', '#f97316', '#22c55e', '#a855f7', '#eab308'];
  let offset = 0;
  const R = 40, C = 2 * Math.PI * R;

  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 100 100" width="120" height="120">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#f1f5f9" strokeWidth="16" />
        {entries.map(([type, val], i) => {
          const pct = val / grand;
          const dash = pct * C;
          const gap = C - dash;
          const el = (
            <circle key={type} cx="50" cy="50" r={R} fill="none"
              stroke={colors[i % colors.length]} strokeWidth="16"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 50 50)"
            />
          );
          offset += dash;
          return el;
        })}
        <text x="50" y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0f172a">
          ₹{grand.toLocaleString('en-IN')}
        </text>
      </svg>
      <div className="donut-legend">
        {entries.map(([type, val], i) => (
          <div key={type} className="legend-row">
            <span className="legend-dot" style={{ background: colors[i % colors.length] }} />
            <span className="legend-label">{type}</span>
            <span className="legend-val">₹{val.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Activity Card ────────────────────────────────────────────────────────────
function ActivityCard({ activity }) {
  const icon = ACTIVITY_ICONS[activity.type] || ACTIVITY_ICONS.default;
  return (
    <div className="activity-card">
      <div className="activity-header">
        <span className="activity-time">{activity.time}</span>
        <span className="activity-icon">{icon}</span>
      </div>
      <div className="activity-name">{activity.name}</div>
      <div className="activity-desc">{activity.description}</div>
      <div className="activity-footer">
        <span className="activity-cost">₹{(activity.cost || 0).toLocaleString('en-IN')}</span>
        <a className="maps-link" href={mapsUrl(activity.mapQuery)} target="_blank" rel="noreferrer">
          📍 View on Maps
        </a>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(100000);
  const [style, setStyle] = useState('Cultural');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const [activeDay, setActiveDay] = useState(0);

  const numDays = daysBetween(startDate, endDate);
  const totalActivities = itinerary ? itinerary.days.reduce((s, d) => s + d.activities.length, 0) : 0;

  const generate = useCallback(async () => {
    if (!destination.trim()) { setError('Please enter a destination.'); return; }
    if (!startDate || !endDate) { setError('Please select travel dates.'); return; }
    if (!GROQ_KEY) { setError('Groq API key not set. Add REACT_APP_GROQ_KEY to your .env file.'); return; }
    setError('');
    setLoading(true);
    setItinerary(null);

    const userMsg = `Plan a ${numDays}-day ${style} trip to ${destination} from ${startDate} to ${endDate} with a total budget of ₹${budget.toLocaleString('en-IN')} INR. All activity costs must be in Indian Rupees (INR). Return the JSON itinerary.`;

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          temperature: 0.7,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userMsg },
          ],
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || '';
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Could not parse itinerary from response.');
      const parsed = JSON.parse(jsonMatch[0]);
      setItinerary(parsed);
      setActiveDay(0);
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [destination, startDate, endDate, budget, style, numDays]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-brand">
            <span className="brand-icon">✈</span>
            <span className="brand-name">AtlasMind</span>
          </div>
          <span className="nav-tagline">AI Travel Planner</span>
        </div>
      </nav>

      {/* ── Hero Search Bar ── */}
      <header className="hero">
        <h1 className="hero-title">Plan your perfect trip</h1>
        <p className="hero-sub">Powered by AI — get a full itinerary in seconds</p>

        <div className="search-bar">
          {/* Destination */}
          <div className="field-group">
            <label className="field-label">Destination</label>
            <input
              id="destination-input"
              className="field-input"
              type="text"
              placeholder="Paris, Tokyo, Bali…"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
            />
          </div>

          {/* Dates */}
          <div className="field-group field-group--sm">
            <label className="field-label">From</label>
            <input id="start-date" className="field-input" type="date" min={today} value={startDate}
              onChange={e => { setStartDate(e.target.value); if (endDate && e.target.value > endDate) setEndDate(''); }} />
          </div>
          <div className="field-group field-group--sm">
            <label className="field-label">To</label>
            <input id="end-date" className="field-input" type="date" min={startDate || today} value={endDate}
              onChange={e => setEndDate(e.target.value)} />
          </div>

          {/* Budget */}
          <div className="field-group field-group--sm">
            <label className="field-label">Budget — <strong>₹{budget.toLocaleString('en-IN')}</strong></label>
            <input id="budget-slider" className="budget-slider" type="range" min="5000" max="500000" step="5000"
              value={budget} onChange={e => setBudget(Number(e.target.value))} />
          </div>

          {/* Style */}
          <div className="field-group field-group--sm">
            <label className="field-label">Style</label>
            <div className="style-pills">
              {TRIP_STYLES.map(s => (
                <button key={s} id={`style-${s.toLowerCase()}`}
                  className={`style-pill ${style === s ? 'style-pill--active' : ''}`}
                  onClick={() => setStyle(s)}>{s}</button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button id="generate-btn" className="cta-btn" onClick={generate} disabled={loading}>
            {loading ? <span className="spinner" /> : '→'} Plan Trip
          </button>
        </div>

        {error && <div className="error-banner" role="alert">{error}</div>}
      </header>

      {/* ── Results ── */}
      {(loading || itinerary) && (
        <main className="results">
          {loading && <Skeleton />}

          {itinerary && (
            <div className="results-layout">
              {/* Left — Day tabs + cards */}
              <section className="itinerary-section">
                {/* Day tabs */}
                <div className="day-tabs" role="tablist">
                  {itinerary.days.map((day, i) => (
                    <button key={i} role="tab" aria-selected={activeDay === i}
                      id={`day-tab-${i}`} className={`day-tab ${activeDay === i ? 'day-tab--active' : ''}`}
                      onClick={() => setActiveDay(i)}>
                      <span className="tab-day">Day {i + 1}</span>
                      <span className="tab-date">{formatDate(day.date)}</span>
                    </button>
                  ))}
                </div>

                {/* Active day label */}
                <div className="day-label">{itinerary.days[activeDay]?.label}</div>

                {/* Activity cards — horizontal scroll */}
                <div className="cards-scroll">
                  {itinerary.days[activeDay]?.activities.map((act, j) => (
                    <ActivityCard key={j} activity={act} />
                  ))}
                </div>

                {/* Tips */}
                {itinerary.tips?.length > 0 && (
                  <div className="tips-section">
                    <div className="tips-title">💡 Local Tips</div>
                    <ul className="tips-list">
                      {itinerary.tips.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>
                )}
              </section>

              {/* Right — Sidebar */}
              <aside className="sidebar">
                <div className="sidebar-card">
                  <div className="sidebar-title">Trip Summary</div>
                  <div className="stats-grid">
                    <div className="stat">
                      <div className="stat-val">{numDays}</div>
                      <div className="stat-lbl">Days</div>
                    </div>
                    <div className="stat">
                      <div className="stat-val">{totalActivities}</div>
                      <div className="stat-lbl">Activities</div>
                    </div>
                    <div className="stat">
                      <div className="stat-val">₹{itinerary.totalCost?.toLocaleString('en-IN')}</div>
                      <div className="stat-lbl">Est. Cost</div>
                    </div>
                    <div className="stat">
                      <div className="stat-val">{style}</div>
                      <div className="stat-lbl">Style</div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-card">
                  <div className="sidebar-title">Spend Breakdown</div>
                  <DonutChart days={itinerary.days} budget={budget} />
                </div>
              </aside>
            </div>
          )}
        </main>
      )}

      {/* ── Footer ── */}
      <footer className="footer">
        {itinerary && (
          <button id="export-pdf-btn" className="export-btn" onClick={() => window.print()}>
            🖨️ Export PDF
          </button>
        )}
        <p className="footer-copy">© {new Date().getFullYear()} AtlasMind — AI-Powered Travel Planning</p>
      </footer>
    </>
  );
}
