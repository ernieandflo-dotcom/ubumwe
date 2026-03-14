import { useState } from 'react'
import { GALLERY_ITEMS } from '../data/content.js'

export default function Gallery({ t, tl, lang, showToast }) {
  const [activeTab, setActiveTab]   = useState('all')
  const [linkModal, setLinkModal]   = useState(null)

  const filtered = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.type === activeTab)

  function genLink(item) {
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)
    return {
      url:     `https://ubumwe-quebec.community/media/${item.id}-${Math.random().toString(36).slice(2, 8)}`,
      expires: expires.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA'),
      title:   tl(item, 'title'),
    }
  }

  function copyLink(url) {
    navigator.clipboard?.writeText(url).catch(() => {})
    showToast(t('toast_link_copied'))
    setLinkModal(null)
  }

  const TABS = [
    ['all',   t('gallery_tab_all')],
    ['event', t('gallery_tab_event')],
    ['promo', t('gallery_tab_promo')],
  ]

  return (
    <>
      <style>{CSS}</style>
      <main className="page-content">
        <header className="section-header">
          <p className="section-label">{t('gallery_label')}</p>
          <h2 className="section-title">
            {t('gallery_title_a')} <em>{t('gallery_title_em')}</em>{t('gallery_title_b')}
          </h2>
        </header>

        {/* Share note */}
        <div className="gallery-note" role="note">
          <span aria-hidden="true">🔗</span>
          <span>{t('gallery_share_note')}</span>
        </div>

        {/* Tabs */}
        <div className="gallery-tabs" role="tablist">
          {TABS.map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              className={`gallery-tab ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid" role="list">
          {filtered.map(item => (
            <div key={item.id} className="gallery-card card" role="listitem">
              <div className={`gallery-card-img gimg-${item.colorClass}`}>
                <span aria-hidden="true" style={{ fontSize: '3.5rem', opacity: 0.4 }}>{item.emoji}</span>
                <button
                  className="share-hover-btn"
                  onClick={e => { e.stopPropagation(); setLinkModal(genLink(item)) }}
                  aria-label={`${t('share_btn')} — ${tl(item, 'title')}`}
                >
                  {t('share_btn')}
                </button>
              </div>
              <div className="gallery-card-foot">
                <div>
                  <p className="gallery-item-title">{tl(item, 'title')}</p>
                  <p className="gallery-item-date">{tl(item, 'date')}</p>
                </div>
                <button
                  className="link-text-btn"
                  onClick={() => setLinkModal(genLink(item))}
                  aria-label={`${t('link_label')} — ${tl(item, 'title')}`}
                >
                  ↓ {t('link_label')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Link modal */}
      {linkModal && (
        <div className="modal-overlay" onClick={() => setLinkModal(null)} role="dialog" aria-modal="true">
          <div className="modal-box link-modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="link-modal-title">🔗 {t('share_link_title')}</h3>
            <p className="link-modal-sub">{linkModal.title}</p>
            <div className="link-field" aria-label="URL de partage">{linkModal.url}</div>
            <div className="link-modal-actions">
              <button className="btn-primary btn-sm" onClick={() => copyLink(linkModal.url)}>
                {t('share_copy')}
              </button>
              <button className="btn-ghost btn-sm" onClick={() => setLinkModal(null)}>
                {t('close')}
              </button>
            </div>
            <p className="link-expire">
              ⏱ {t('link_expire_a')} <strong>{linkModal.expires}</strong> {t('link_expire_b')}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

const CSS = `
  .gallery-note {
    display: flex; align-items: flex-start; gap: 10px;
    background: rgba(27,67,50,0.07); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 14px 18px;
    margin-bottom: 28px; font-size: 0.84rem; color: var(--text-mid);
    line-height: 1.6;
  }

  /* Tabs */
  .gallery-tabs {
    display: flex; gap: 0;
    border-bottom: 2px solid var(--cream-dark);
    margin-bottom: 28px; overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .gallery-tab {
    background: none; border: none; cursor: pointer;
    padding: 10px 22px; white-space: nowrap;
    font-family: var(--font-body);
    font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--text-soft);
    border-bottom: 2px solid transparent; margin-bottom: -2px;
    transition: color 0.2s, border-color 0.2s;
  }
  .gallery-tab.active  { color: var(--green); border-bottom-color: var(--green); }
  .gallery-tab:hover:not(.active) { color: var(--text-dark); }

  /* Grid */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 18px;
  }
  .gallery-card { overflow: hidden; }
  .gallery-card-img {
    height: 200px;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    transition: transform 0.3s;
  }
  .gallery-card:hover .gallery-card-img { transform: scale(1.02); }
  .gimg-g1 { background: linear-gradient(160deg, var(--green), var(--green-mid)); }
  .gimg-g2 { background: linear-gradient(160deg, var(--red), #8B1010); }
  .gimg-g3 { background: linear-gradient(160deg, #5C4010, var(--gold)); }
  .gimg-g4 { background: linear-gradient(160deg, #1a3a5c, #2a6a9c); }

  .share-hover-btn {
    position: absolute; top: 10px; right: 10px;
    background: rgba(0,0,0,0.55); border: none;
    border-radius: var(--radius-sm); color: #fff;
    padding: 6px 12px; font-size: 0.72rem;
    font-weight: 600; letter-spacing: 0.06em;
    cursor: pointer; opacity: 0;
    transition: opacity 0.2s;
    font-family: var(--font-body);
  }
  .gallery-card:hover .share-hover-btn,
  .gallery-card:focus-within .share-hover-btn { opacity: 1; }

  .gallery-card-foot {
    padding: 14px 16px;
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }
  .gallery-item-title {
    font-size: 0.86rem; font-weight: 600; color: var(--text-dark);
    margin-bottom: 3px; line-height: 1.3;
  }
  .gallery-item-date { font-size: 0.75rem; color: var(--text-soft); }
  .link-text-btn {
    background: none; border: none; cursor: pointer;
    color: var(--green); font-size: 0.78rem; font-weight: 600;
    font-family: var(--font-body); white-space: nowrap;
    padding: 0; transition: color 0.2s;
  }
  .link-text-btn:hover { color: var(--green-mid); }

  /* Link modal */
  .link-modal-box { max-width: 440px; }
  .link-modal-title {
    font-family: var(--font-display);
    font-size: 1.2rem; color: var(--text-dark); margin-bottom: 8px;
  }
  .link-modal-sub {
    font-size: 0.83rem; color: var(--text-soft);
    margin-bottom: 14px; font-weight: 600;
  }
  .link-field {
    background: var(--cream-dark); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 12px 14px;
    font-family: monospace; font-size: 0.8rem; color: var(--text-mid);
    word-break: break-all; line-height: 1.55; margin-bottom: 14px;
    user-select: all;
  }
  .link-modal-actions { display: flex; gap: 10px; margin-bottom: 12px; }
  .btn-sm { padding: 10px 20px; font-size: 0.82rem; flex: 1; }
  .btn-ghost {
    background: var(--cream-dark); border: none; cursor: pointer;
    border-radius: var(--radius-sm); padding: 10px 20px;
    font-family: var(--font-body); font-size: 0.82rem; font-weight: 600;
    color: var(--text-mid); transition: background 0.2s;
  }
  .btn-ghost:hover { background: var(--cream); }
  .link-expire { font-size: 0.75rem; color: var(--text-soft); line-height: 1.5; }

  @media (max-width: 600px) {
    .gallery-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 380px) {
    .gallery-grid { grid-template-columns: 1fr; }
  }
`
