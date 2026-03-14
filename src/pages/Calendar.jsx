import { useState } from 'react'
import { EVENTS, CAL_EVENT_DAYS } from '../data/content.js'

function buildCalendar(year, month) {
  const first = new Date(year, month, 1).getDay()
  const days  = new Date(year, month + 1, 0).getDate()
  const prev  = new Date(year, month, 0).getDate()
  const cells = []
  for (let i = first - 1; i >= 0; i--) cells.push({ day: prev - i, other: true })
  for (let i = 1; i <= days; i++)        cells.push({ day: i,       other: false })
  while (cells.length < 42)              cells.push({ day: cells.length - days - first + 2, other: true })
  return cells
}

const CAL_YEAR    = 2025
const MOCK_TODAY  = 10 // March 10, 2025

export default function Calendar({ t, tl, lang, navigate }) {
  const [month, setMonth] = useState(2) // March (0-indexed)
  const months  = t('months')
  const dowKeys = t('days_short')
  const cells   = buildCalendar(CAL_YEAR, month)

  const upcoming = EVENTS.filter(e => e.type === 'upcoming')
  const past     = EVENTS.filter(e => e.type === 'past')

  return (
    <>
      <style>{CSS}</style>
      <main className="page-content">
        <header className="section-header">
          <p className="section-label">{t('cal_label')}</p>
          <h2 className="section-title">
            {t('cal_title_a')} <em>{t('cal_title_em')}</em>
          </h2>
        </header>

        <div className="cal-layout">
          {/* Calendar widget */}
          <aside className="cal-widget card">
            <div className="cal-widget-header">
              <button className="cal-nav" onClick={() => setMonth(m => (m - 1 + 12) % 12)} aria-label="Mois précédent">‹</button>
              <h3 className="cal-month-label">{months[month]} {CAL_YEAR}</h3>
              <button className="cal-nav" onClick={() => setMonth(m => (m + 1) % 12)} aria-label="Mois suivant">›</button>
            </div>
            <div className="cal-body">
              <div className="cal-dow" role="row">
                {dowKeys.map(d => <span key={d} role="columnheader">{d}</span>)}
              </div>
              <div className="cal-days" role="grid">
                {cells.map((c, i) => {
                  const isToday    = !c.other && c.day === MOCK_TODAY && month === 2
                  const hasEvent   = !c.other && CAL_EVENT_DAYS.includes(c.day)
                  return (
                    <div
                      key={i}
                      className={`cal-day ${c.other ? 'other' : ''} ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`}
                      role="gridcell"
                      aria-current={isToday ? 'date' : undefined}
                    >
                      {c.day}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="cal-legend">
              <div className="cal-legend-item">
                <div className="cal-dot dot-today" />{t('cal_today')}
              </div>
              <div className="cal-legend-item">
                <div className="cal-dot dot-event" />{t('cal_event')}
              </div>
            </div>
          </aside>

          {/* Event lists */}
          <div className="events-col">
            <EventGroup
              label={t('cal_upcoming')}
              events={upcoming}
              tagClass="tag-upcoming"
              tagLabel={t('cal_confirmed')}
              dimmed={false}
              tl={tl}
              navigate={navigate}
            />
            <EventGroup
              label={t('cal_past')}
              events={past}
              tagClass="tag-past"
              tagLabel={t('cal_ended')}
              dimmed
              tl={tl}
              navigate={navigate}
            />
          </div>
        </div>
      </main>
    </>
  )
}

function EventGroup({ label, events, tagClass, tagLabel, dimmed, tl, navigate }) {
  return (
    <section className="event-group">
      <h3 className="event-group-label">{label}</h3>
      {events.map(ev => (
        <article
          key={ev.id}
          className={`event-card card card-hover-gold ${dimmed ? 'dimmed' : ''}`}
          onClick={() => navigate('event-detail', ev)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && navigate('event-detail', ev)}
          aria-label={tl(ev, 'title')}
        >
          <div className={`event-date-box ${dimmed ? 'box-dimmed' : ''}`} aria-hidden="true">
            <span className="event-day">{ev.day}</span>
            <span className="event-mon">{tl(ev, 'month')}</span>
          </div>
          <div className="event-info">
            <h4 className="event-title">{tl(ev, 'title')}</h4>
            <p className="event-loc">📍 {tl(ev, 'loc')}</p>
            <div className="event-tags">
              <span className={`event-tag ${tagClass}`}>{tagLabel}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

const CSS = `
  .cal-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 32px;
    align-items: start;
  }
  .cal-widget { overflow: hidden; }
  .cal-widget-header {
    background: var(--green);
    padding: 18px 22px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .cal-month-label {
    font-family: var(--font-display);
    color: #fff; font-size: 1.05rem; font-weight: 700;
  }
  .cal-nav {
    background: none; border: none;
    color: rgba(255,255,255,0.6);
    cursor: pointer; font-size: 1.2rem;
    padding: 4px 10px; border-radius: var(--radius-sm);
    transition: color 0.2s, background 0.2s;
  }
  .cal-nav:hover { color: var(--gold); background: rgba(255,255,255,0.08); }
  .cal-body { padding: 14px; }
  .cal-dow {
    display: grid; grid-template-columns: repeat(7,1fr);
    text-align: center; margin-bottom: 6px;
  }
  .cal-dow span {
    color: var(--text-soft); font-size: 0.68rem;
    font-weight: 600; letter-spacing: 0.06em; padding: 4px 0;
  }
  .cal-days { display: grid; grid-template-columns: repeat(7,1fr); gap: 2px; }
  .cal-day {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; border-radius: var(--radius-sm);
    cursor: pointer; transition: background 0.15s; color: var(--text-dark);
  }
  .cal-day:hover { background: var(--cream-dark); }
  .cal-day.other  { color: var(--text-soft); opacity: 0.38; cursor: default; }
  .cal-day.today  { background: var(--gold); color: var(--green); font-weight: 700; }
  .cal-day.has-event { font-weight: 600; color: var(--green); position: relative; }
  .cal-day.has-event::after {
    content: ''; position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%);
    width: 4px; height: 4px; border-radius: 50%; background: var(--red);
  }
  .cal-legend {
    padding: 14px 20px; border-top: 1px solid var(--cream-dark);
    display: flex; flex-direction: column; gap: 6px;
  }
  .cal-legend-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.76rem; color: var(--text-soft);
  }
  .cal-dot { width: 8px; height: 8px; border-radius: 50%; }
  .dot-today { background: var(--gold); }
  .dot-event { background: var(--red); }

  .events-col { display: flex; flex-direction: column; gap: 32px; }
  .event-group { display: flex; flex-direction: column; gap: 14px; }
  .event-group-label {
    font-family: var(--font-display);
    font-size: 1rem; font-weight: 700; color: var(--text-mid);
    padding-bottom: 8px; border-bottom: 1px solid var(--cream-dark);
  }

  .event-card {
    display: grid; grid-template-columns: 68px 1fr; gap: 18px;
    padding: 20px; cursor: pointer;
  }
  .event-card.dimmed { opacity: 0.75; }
  .event-date-box {
    background: var(--green);
    border-radius: var(--radius-sm);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    flex-shrink: 0; padding: 10px 6px;
  }
  .event-date-box.box-dimmed { background: var(--text-soft); }
  .event-day {
    font-family: var(--font-display);
    color: var(--gold); font-size: 1.7rem; font-weight: 800; line-height: 1;
  }
  .event-mon {
    color: rgba(255,255,255,0.65);
    font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px;
  }
  .event-info { display: flex; flex-direction: column; gap: 4px; }
  .event-title {
    font-family: var(--font-display);
    font-size: 1.05rem; font-weight: 700; color: var(--text-dark); line-height: 1.3;
  }
  .event-loc { color: var(--text-soft); font-size: 0.83rem; }
  .event-tags { display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap; }
  .event-tag {
    border-radius: var(--radius-sm); padding: 2px 10px;
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .tag-upcoming { background: rgba(27,67,50,0.1); color: var(--green); }
  .tag-past     { background: var(--cream-dark);  color: var(--text-soft); }

  @media (max-width: 900px) {
    .cal-layout { grid-template-columns: 1fr; }
    .cal-widget { max-width: 360px; }
  }
  @media (max-width: 520px) {
    .event-card { grid-template-columns: 56px 1fr; gap: 14px; padding: 16px; }
    .event-day  { font-size: 1.4rem; }
  }
`
