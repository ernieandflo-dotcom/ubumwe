export default function Footer({ t, navigateRoot, showToast }) {
  const NAV_IDS = ['home', 'calendar', 'gallery', 'business', 'contact']
  const NAV_KEYS = {
    home: 'nav_home', calendar: 'nav_calendar',
    gallery: 'nav_gallery', business: 'nav_business', contact: 'nav_contact',
  }

  return (
    <>
      <style>{CSS}</style>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <p className="footer-logo-title">Ubumwe</p>
              <p className="footer-tagline">{t('footer_tagline')}</p>
              <div className="footer-flag" aria-label="Drapeau du Burundi">
                <div style={{ background: 'var(--red-warm)' }} />
                <div style={{ background: '#fff' }} />
                <div style={{ background: 'var(--green-light)' }} />
              </div>
            </div>

            {/* Nav */}
            <div className="footer-col">
              <h4>{t('footer_nav')}</h4>
              {NAV_IDS.map(id => (
                <button key={id} className="footer-link" onClick={() => navigateRoot(id)}>
                  {t(NAV_KEYS[id])}
                </button>
              ))}
            </div>

            {/* Community */}
            <div className="footer-col">
              <h4>{t('footer_community')}</h4>
              {t('footer_community_links').map(label => (
                <button key={label} className="footer-link" onClick={() => showToast(t('toast_soon'))}>
                  {label}
                </button>
              ))}
            </div>

            {/* Contact quick */}
            <div className="footer-col">
              <h4>{t('footer_contact')}</h4>
              <address className="footer-address">
                <p>📧 contact@ubumwe-quebec.community</p>
                <p>📱 +1 (418) 555-0192</p>
                <br />
                <p className="footer-hours">{t('footer_hours_a')}</p>
                <p className="footer-hours">{t('footer_hours_b')}</p>
              </address>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{t('footer_copy')}</p>
            <p className="footer-proverb">{t('footer_proverb')}</p>
          </div>
        </div>
      </footer>
    </>
  )
}

const CSS = `
  .footer {
    background: var(--green);
    border-top: 3px solid var(--gold);
    padding: 56px 32px 32px;
  }
  .footer-inner { max-width: var(--max-width); margin: 0 auto; }
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 48px;
  }
  .footer-logo-title {
    font-family: var(--font-display);
    color: var(--gold); font-size: 1.4rem; font-weight: 800; margin-bottom: 10px;
  }
  .footer-tagline {
    color: rgba(255,255,255,0.5);
    font-size: 0.85rem; line-height: 1.7; max-width: 280px;
  }
  .footer-flag {
    display: flex; gap: 4px; margin-top: 18px;
  }
  .footer-flag div { height: 4px; width: 36px; border-radius: 1px; }
  .footer-col h4 {
    color: rgba(255,255,255,0.9);
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; margin-bottom: 16px;
  }
  .footer-link {
    display: block;
    color: rgba(255,255,255,0.5); font-size: 0.85rem;
    margin-bottom: 8px; cursor: pointer;
    transition: color 0.2s;
    background: none; border: none;
    font-family: var(--font-body); text-align: left; padding: 0;
  }
  .footer-link:hover { color: var(--gold); }
  .footer-address {
    font-style: normal;
    color: rgba(255,255,255,0.5); font-size: 0.82rem; line-height: 1.8;
  }
  .footer-hours { color: rgba(255,255,255,0.3); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 24px;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 12px;
  }
  .footer-bottom p { color: rgba(255,255,255,0.3); font-size: 0.78rem; }
  .footer-proverb {
    font-family: var(--font-accent);
    font-style: italic; font-size: 0.92rem !important;
    color: rgba(255,255,255,0.22) !important;
  }

  @media (max-width: 1024px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .footer-brand { grid-column: 1 / -1; }
  }
  @media (max-width: 600px) {
    .footer { padding: 40px 20px 28px; }
    .footer-grid { grid-template-columns: 1fr; gap: 28px; }
    .footer-brand { grid-column: auto; }
    .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
  }
`
