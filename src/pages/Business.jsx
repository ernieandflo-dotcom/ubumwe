import { useState } from 'react'
import {
  BUSINESSES, TRAVEL_RESOURCES, PARTNERS, CONTRIBUTORS
} from '../data/content.js'

const FILTER_KEYS_FR = ['Tous',    'Restaurant', 'Voyage',   'Beauté',    'Finance',  'Immobilier', 'Tech']
const FILTER_KEYS_EN = ['All',     'Restaurant', 'Travel',   'Beauty',    'Finance',  'Real Estate','Tech']

export default function Business({ t, tl, lang, showToast }) {
  const [activeFilter, setActiveFilter] = useState(0)

  const filterLabels = lang === 'fr' ? FILTER_KEYS_FR : FILTER_KEYS_EN

  const filtered = activeFilter === 0
    ? BUSINESSES
    : BUSINESSES.filter(b => {
        const type = (lang === 'fr' ? b.type_fr : b.type_en).toLowerCase()
        const key  = filterLabels[activeFilter].toLowerCase()
        return type.includes(key)
      })

  return (
    <>
      <style>{CSS}</style>
      <main className="page-content">
        {/* Section header */}
        <header className="section-header">
          <p className="section-label">{t('biz_label')}</p>
          <h2 className="section-title">
            {t('biz_title_a')} <em>{t('biz_title_em')}</em> {t('biz_title_b')}
          </h2>
        </header>

        {/* Filter bar */}
        <div className="biz-filter" role="group" aria-label="Filtrer par catégorie">
          {filterLabels.map((label, i) => (
            <button
              key={label}
              className={`filter-pill ${activeFilter === i ? 'active' : ''}`}
              onClick={() => setActiveFilter(i)}
              aria-pressed={activeFilter === i}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Business cards */}
        <div className="biz-grid">
          {filtered.map(b => (
            <article key={b.id} className="biz-card card card-hover-gold">
              <div className={`biz-icon-wrap ic-${b.iconColor}`} aria-hidden="true">
                {b.icon}
              </div>
              <p className="biz-type">{tl(b, 'type')}</p>
              <h3 className="biz-name">{tl(b, 'name')}</h3>
              <p className="biz-desc">{tl(b, 'desc')}</p>
              <div className="biz-card-foot">
                <span>📍 {tl(b, 'location')}</span>
                <span>👤 {b.owner}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Travel resources */}
        <SectionDivider title={t('travel_title')} />
        <div className="travel-grid">
          {TRAVEL_RESOURCES.map((tr, i) => (
            <div key={i} className="travel-card card card-hover-gold">
              <span className="travel-icon" aria-hidden="true">{tr.icon}</span>
              <div>
                <h4 className="travel-name">{tl(tr, 'name')}</h4>
                <p className="travel-desc">{tl(tr, 'desc')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <SectionDivider title={t('partners_title')} />
        <div className="partners-row">
          {PARTNERS.map(p => (
            <div key={p} className="partner-chip">{p}</div>
          ))}
        </div>

        {/* Contributors */}
        <SectionDivider title={t('contrib_title')} />
        <div className="table-wrap card">
          <table className="contrib-table" aria-label={t('contrib_title')}>
            <thead>
              <tr>
                <th>{t('contrib_name')}</th>
                <th>{t('contrib_role')}</th>
                <th>{t('contrib_badge')}</th>
              </tr>
            </thead>
            <tbody>
              {CONTRIBUTORS.map((c, i) => (
                <tr key={i}>
                  <td className="contrib-name">{tl(c, 'name')}</td>
                  <td className="contrib-role">{tl(c, 'role')}</td>
                  <td><span className="contrib-badge-chip">{c.badge}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

function SectionDivider({ title }) {
  return (
    <h3 className="sub-section-title">
      {title}
    </h3>
  )
}

const CSS = `
  /* Filter */
  .biz-filter {
    display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;
  }
  .filter-pill {
    background: var(--cream-dark); border: 1px solid var(--border);
    border-radius: var(--radius-pill); padding: 7px 18px;
    font-family: var(--font-body); font-size: 0.8rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; color: var(--text-mid);
    white-space: nowrap;
  }
  .filter-pill.active { background: var(--green); color: #fff; border-color: var(--green); }
  .filter-pill:hover:not(.active) { border-color: var(--green); color: var(--green); }

  /* Biz grid */
  .biz-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px; margin-bottom: 52px;
  }
  .biz-card { padding: 24px; }
  .biz-icon-wrap {
    width: 48px; height: 48px; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; margin-bottom: 14px;
  }
  .ic-green { background: rgba(27,67,50,0.1); }
  .ic-red   { background: rgba(155,29,32,0.1); }
  .ic-gold  { background: rgba(212,175,55,0.15); }
  .biz-type {
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--red-warm); margin-bottom: 8px;
  }
  .biz-name {
    font-family: var(--font-display);
    font-size: 1.1rem; font-weight: 700; color: var(--text-dark); margin-bottom: 8px;
  }
  .biz-desc { color: var(--text-soft); font-size: 0.83rem; line-height: 1.68; }
  .biz-card-foot {
    margin-top: 16px; padding-top: 14px;
    border-top: 1px solid var(--cream-dark);
    font-size: 0.77rem; color: var(--text-soft);
    display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap;
  }

  /* Sub-section divider */
  .sub-section-title {
    font-family: var(--font-display);
    font-size: 1.35rem; font-weight: 700; color: var(--text-dark);
    margin-bottom: 20px; margin-top: 4px;
    display: flex; align-items: center; gap: 14px;
  }
  .sub-section-title::after {
    content: ''; flex: 1; height: 1px; background: var(--cream-dark);
  }

  /* Travel */
  .travel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px; margin-bottom: 48px;
  }
  .travel-card {
    padding: 18px; display: flex; gap: 14px; align-items: flex-start;
  }
  .travel-icon { font-size: 1.7rem; flex-shrink: 0; line-height: 1; margin-top: 2px; }
  .travel-name { font-size: 0.9rem; font-weight: 600; color: var(--text-dark); margin-bottom: 4px; }
  .travel-desc { font-size: 0.78rem; color: var(--text-soft); line-height: 1.6; }

  /* Partners */
  .partners-row {
    display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 48px;
  }
  .partner-chip {
    background: #fff; border: 2px solid var(--border);
    border-radius: var(--radius-sm); padding: 12px 22px;
    font-family: var(--font-display); font-size: 0.88rem; font-weight: 700;
    color: var(--text-mid); transition: all 0.2s; cursor: default;
  }
  .partner-chip:hover { border-color: var(--gold); color: var(--green); }

  /* Contributors table */
  .table-wrap { overflow: hidden; overflow-x: auto; margin-bottom: 20px; }
  .contrib-table {
    width: 100%; border-collapse: collapse; min-width: 400px;
  }
  .contrib-table th {
    text-align: left; padding: 10px 16px;
    background: var(--green);
    color: rgba(255,255,255,0.8);
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .contrib-table td {
    padding: 12px 16px; border-bottom: 1px solid var(--cream-dark);
    font-size: 0.85rem; color: var(--text-dark);
  }
  .contrib-table tr:last-child td { border-bottom: none; }
  .contrib-table tr:hover td { background: var(--cream-dark); }
  .contrib-name { font-weight: 600; }
  .contrib-role { color: var(--text-soft) !important; }
  .contrib-badge-chip {
    background: rgba(27,67,50,0.1); color: var(--green);
    border-radius: var(--radius-sm); padding: 2px 10px;
    font-size: 0.7rem; font-weight: 600;
  }

  @media (max-width: 600px) {
    .biz-grid { grid-template-columns: 1fr; }
    .travel-grid { grid-template-columns: 1fr; }
  }
`
