import { EVENT_COMMITTEE, EVENT_PROJECTS } from '../data/content.js'

export default function EventDetail({ event, t, tl, lang, showToast }) {
  if (!event) return null

  const isUpcoming = event.type === 'upcoming'

  return (
    <>
      <style>{CSS}</style>
      <article>
        {/* Hero banner */}
        <div className="ed-hero">
          <div className="ed-flag-stripe" aria-hidden="true" />
          <div className="ed-hero-inner">
            <span className="ed-badge">
              {isUpcoming ? t('event_badge_upcoming') : t('event_badge_past')}
            </span>
            <h1 className="ed-title">{tl(event, 'title')}</h1>
            <div className="ed-meta">
              <span>📅 <strong>{event.day} {tl(event, 'month')} 2025</strong></span>
              <span>📍 <strong>{tl(event, 'loc')}</strong></span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="page-content">
          <div className="ed-layout">
            {/* Main column */}
            <div className="ed-main">
              {/* Description */}
              <section className="ed-section">
                <h2 className="ed-section-title">{t('event_desc')}</h2>
                <p className="ed-body-text">{t('event_desc_body_a')}</p>
                <p className="ed-body-text" style={{ marginTop: 12 }}>{t('event_desc_body_b')}</p>
              </section>

              {/* Committee */}
              <section className="ed-section">
                <h2 className="ed-section-title">{t('event_committee')}</h2>
                <ul className="committee-list" aria-label={t('event_committee')}>
                  {EVENT_COMMITTEE.map((m, i) => (
                    <li key={i} className="committee-member">
                      <div
                        className="member-avatar"
                        style={{ background: m.color }}
                        aria-hidden="true"
                      >
                        {m.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="member-name">{m.name}</p>
                        <p className="member-role">{tl(m, 'role')}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Projects */}
              <section className="ed-section">
                <h2 className="ed-section-title">{t('event_projects')}</h2>
                <div className="projects-grid">
                  {EVENT_PROJECTS.map((p, i) => (
                    <div key={i} className="project-card">
                      <h4 className="project-name">{tl(p, 'name')}</h4>
                      <p className="project-desc">{tl(p, 'desc')}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              <section className="ed-section">
                <h2 className="ed-section-title">{t('event_gallery')}</h2>
                <div className="ed-gallery-grid" role="list">
                  {['g1','g2','g3','g1','g2','g3'].map((c, i) => (
                    <button
                      key={i}
                      className={`ed-gallery-item gal-${c}`}
                      onClick={() => showToast(t('toast_photo'))}
                      role="listitem"
                      aria-label="Photo"
                    >
                      <span aria-hidden="true" style={{ opacity: 0.28, fontSize: '1.8rem' }}>📷</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="ed-sidebar">
              {/* Info card */}
              <div className="card ed-info-card">
                <h3 className="sidebar-card-title">{t('event_info')}</h3>
                <dl className="info-list">
                  {[
                    ['🗓', t('event_date'),      `${event.day} ${tl(event, 'month')} 2025`],
                    ['⏰', t('event_time'),      t('event_time_val')],
                    ['📍', t('event_venue'),     tl(event, 'loc')],
                    ['💰', t('event_admission'), t('event_admit_val')],
                    ['🎟', t('event_capacity'),  t('event_cap_val')],
                  ].map(([icon, label, value]) => (
                    <div key={label} className="info-row">
                      <span aria-hidden="true">{icon}</span>
                      <div>
                        <dt className="info-label">{label}</dt>
                        <dd className="info-value">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                {isUpcoming && (
                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: 18 }}
                    onClick={() => showToast(t('toast_registered'))}
                  >
                    {t('event_register')}
                  </button>
                )}
              </div>

              {/* Share card */}
              <div className="card ed-share-card">
                <h3 className="sidebar-card-title">{t('event_share')}</h3>
                <div className="share-list">
                  {['📘 Facebook', '📸 Instagram', '💬 WhatsApp', `🔗 ${lang === 'fr' ? 'Copier le lien' : 'Copy link'}`].map(s => (
                    <button
                      key={s}
                      className="share-row-btn"
                      onClick={() => showToast(t('toast_shared'))}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}

const CSS = `
  /* ── EVENT HERO ── */
  .ed-hero {
    background: linear-gradient(135deg, var(--green) 0%, #0a1f15 100%);
    padding: 52px 32px 52px;
    position: relative; overflow: hidden;
  }
  .ed-flag-stripe {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--red) 33.3%, #fff 33.3% 66.6%, var(--green-light) 66.6%);
  }
  .ed-hero-inner { max-width: var(--max-width); margin: 0 auto; }
  .ed-badge {
    display: inline-block;
    background: rgba(212,175,55,0.18);
    border: 1px solid rgba(212,175,55,0.3);
    border-radius: var(--radius-pill);
    padding: 4px 16px;
    color: var(--gold); font-size: 0.72rem;
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;
  }
  .ed-title {
    font-family: var(--font-display); color: #fff;
    font-size: clamp(1.7rem, 3.5vw, 2.7rem); font-weight: 800;
    line-height: 1.12; margin-bottom: 18px;
  }
  .ed-meta {
    display: flex; gap: 24px; flex-wrap: wrap;
  }
  .ed-meta span { color: rgba(255,255,255,0.62); font-size: 0.88rem; }
  .ed-meta strong { color: var(--gold); }

  /* ── LAYOUT ── */
  .ed-layout {
    display: grid; grid-template-columns: 1fr 320px; gap: 48px; align-items: start;
  }
  .ed-main { display: flex; flex-direction: column; gap: 0; }
  .ed-section { margin-bottom: 40px; }
  .ed-section-title {
    font-family: var(--font-display);
    font-size: 1.35rem; font-weight: 700; color: var(--text-dark);
    margin-bottom: 16px; padding-bottom: 12px;
    border-bottom: 2px solid var(--cream-dark);
  }
  .ed-body-text { color: var(--text-soft); line-height: 1.82; font-size: 0.93rem; }

  /* Committee */
  .committee-list { display: flex; flex-direction: column; gap: 10px; list-style: none; }
  .committee-member {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px;
    background: var(--cream-dark); border-radius: var(--radius-sm);
  }
  .member-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.82rem; color: #fff; flex-shrink: 0;
  }
  .member-name { font-size: 0.88rem; font-weight: 600; color: var(--text-dark); }
  .member-role { font-size: 0.75rem; color: var(--text-soft); margin-top: 1px; }

  /* Projects */
  .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .project-card {
    background: var(--cream-dark); border-radius: var(--radius-sm);
    padding: 16px; border-left: 3px solid var(--green);
  }
  .project-name { font-size: 0.88rem; font-weight: 600; color: var(--text-dark); margin-bottom: 4px; }
  .project-desc { font-size: 0.78rem; color: var(--text-soft); }

  /* Gallery */
  .ed-gallery-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
  .ed-gallery-item {
    aspect-ratio: 1; border-radius: var(--radius-sm);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s, opacity 0.2s;
  }
  .ed-gallery-item:hover { transform: scale(1.04); opacity: 0.85; }
  .gal-g1 { background: linear-gradient(135deg, #1B4332, #2D6A4F); }
  .gal-g2 { background: linear-gradient(135deg, #9B1D20, #C0392B); }
  .gal-g3 { background: linear-gradient(135deg, #8B6914, #D4AF37); }

  /* Sidebar */
  .ed-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 90px; }
  .ed-info-card,
  .ed-share-card { padding: 24px; }
  .sidebar-card-title {
    font-family: var(--font-display);
    font-size: 1rem; font-weight: 700; color: var(--text-dark);
    margin-bottom: 16px; padding-bottom: 10px;
    border-bottom: 1px solid var(--cream-dark);
  }
  .info-list { display: flex; flex-direction: column; gap: 0; }
  .info-row {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 10px 0; border-bottom: 1px solid var(--cream-dark);
  }
  .info-label {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--text-soft); margin-bottom: 2px;
  }
  .info-value { font-size: 0.86rem; color: var(--text-dark); font-weight: 500; }
  .share-list { display: flex; flex-direction: column; gap: 8px; }
  .share-row-btn {
    background: var(--cream-dark); border: none;
    border-radius: var(--radius-sm); padding: 10px 14px;
    text-align: left; cursor: pointer;
    font-size: 0.85rem; color: var(--text-mid);
    font-family: var(--font-body); font-weight: 500;
    transition: background 0.18s, color 0.18s;
    width: 100%;
  }
  .share-row-btn:hover { background: var(--green); color: #fff; }

  /* Responsive */
  @media (max-width: 900px) {
    .ed-layout { grid-template-columns: 1fr; }
    .ed-sidebar { position: static; }
    .projects-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .ed-hero { padding: 40px 20px; }
    .ed-gallery-grid { grid-template-columns: repeat(2,1fr); }
  }
`
