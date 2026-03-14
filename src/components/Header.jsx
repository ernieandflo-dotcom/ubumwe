// ============================================================
// Header — Sticky top bar
//
// Desktop: logo | nav links | lang toggle | user chip
// Mobile:  logo | back button (if not home) | hamburger
//
// The hamburger opens a full-screen drawer nav with all pages,
// language toggle, and user info.
// ============================================================
import { useState, useEffect, useRef } from 'react'
import { LANGUAGES } from '../data/translations.js'
import { CURRENT_USER } from '../data/roles.js'

const NAV_IDS = ['home', 'calendar', 'gallery', 'business', 'contact']

export default function Header({ page, canGoBack, navigateRoot, goBack, lang, setLang, t }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef(null)

  // Close drawer on page change
  useEffect(() => { setDrawerOpen(false) }, [page])

  // Trap focus + close on Escape
  useEffect(() => {
    if (!drawerOpen) return
    const handler = (e) => { if (e.key === 'Escape') setDrawerOpen(false) }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const NAV_KEYS = {
    home: 'nav_home', calendar: 'nav_calendar',
    gallery: 'nav_gallery', business: 'nav_business', contact: 'nav_contact',
  }

  return (
    <>
      <style>{HEADER_CSS}</style>

      <header className="header">
        <div className="header-inner">
          {/* Logo */}
          <button className="logo-btn" onClick={() => navigateRoot('home')} aria-label="Ubumwe — Accueil">
            <div className="logo-emblem" aria-hidden="true">U</div>
            <div className="logo-text">
              <span className="logo-title">Ubumwe</span>
              <span className="logo-sub">
                {lang === 'fr' ? 'Communauté Burundaise de Québec' : 'Burundian Community of Quebec City'}
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="desktop-nav" aria-label="Navigation principale">
            {NAV_IDS.map(id => (
              <button
                key={id}
                className={`nav-link ${page === id ? 'active' : ''}`}
                onClick={() => navigateRoot(id)}
                aria-current={page === id ? 'page' : undefined}
              >
                {t(NAV_KEYS[id])}
              </button>
            ))}
          </nav>

          {/* Header right actions */}
          <div className="header-actions">
            {/* Language toggle — desktop */}
            <div className="lang-toggle" role="group" aria-label={t('lang_label')}>
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  className={`lang-btn ${lang === l.code ? 'active' : ''} ${!l.available ? 'soon' : ''}`}
                  onClick={() => l.available && setLang(l.code)}
                  disabled={!l.available}
                  aria-pressed={lang === l.code}
                  title={l.available ? l.name : `${l.name} — ${t('lang_soon')}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* User chip */}
            <div className="user-chip" aria-label={`${CURRENT_USER.name} — ${t(`role_${CURRENT_USER.role}`)}`}>
              <div className="user-avatar" aria-hidden="true">{CURRENT_USER.initials}</div>
              <span className="user-name">{CURRENT_USER.name}</span>
              <div className={`role-dot role-${CURRENT_USER.role}`} title={t(`role_${CURRENT_USER.role}`)} aria-hidden="true" />
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="hamburger"
              onClick={() => setDrawerOpen(true)}
              aria-label={t('menu_open')}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile back button — shown on all pages except home, only on mobile */}
        {canGoBack && page !== 'home' && (
          <div className="mobile-back-bar">
            <button className="btn-back" onClick={goBack}>
              ← {t('nav_back')}
            </button>
          </div>
        )}
      </header>

      {/* ── MOBILE DRAWER ── */}
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`drawer ${drawerOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('menu_open')}
      >
        {/* Drawer header */}
        <div className="drawer-header">
          <div className="drawer-logo">
            <div className="logo-emblem small" aria-hidden="true">U</div>
            <span className="logo-title">Ubumwe</span>
          </div>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label={t('menu_close')}>
            ✕
          </button>
        </div>

        {/* User info in drawer */}
        <div className="drawer-user">
          <div className="user-avatar large">{CURRENT_USER.initials}</div>
          <div>
            <div className="drawer-user-name">{CURRENT_USER.name}</div>
            <div className="drawer-user-role">{t(`role_${CURRENT_USER.role}`)}</div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="drawer-nav" aria-label="Navigation mobile">
          {NAV_IDS.map(id => (
            <button
              key={id}
              className={`drawer-link ${page === id ? 'active' : ''}`}
              onClick={() => { navigateRoot(id); setDrawerOpen(false) }}
              aria-current={page === id ? 'page' : undefined}
            >
              <span className="drawer-link-icon">{NAV_ICONS[id]}</span>
              {t(NAV_KEYS[id])}
            </button>
          ))}
        </nav>

        {/* Language selector in drawer */}
        <div className="drawer-lang">
          <p className="drawer-section-label">{t('lang_label')}</p>
          <div className="drawer-lang-buttons">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                className={`drawer-lang-btn ${lang === l.code ? 'active' : ''} ${!l.available ? 'soon' : ''}`}
                onClick={() => { if (l.available) { setLang(l.code); setDrawerOpen(false) } }}
                disabled={!l.available}
                title={!l.available ? t('lang_soon') : l.name}
              >
                <span className="drawer-lang-code">{l.label}</span>
                <span className="drawer-lang-name">{l.name}</span>
                {!l.available && <span className="drawer-lang-soon">{t('lang_soon')}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Burundian flag stripe at bottom */}
        <div className="drawer-flag">
          <div style={{ background: 'var(--red-warm)' }} />
          <div style={{ background: '#fff' }} />
          <div style={{ background: 'var(--green-light)' }} />
        </div>
      </div>
    </>
  )
}

const NAV_ICONS = {
  home:     '🏠',
  calendar: '📅',
  gallery:  '🖼️',
  business: '🏢',
  contact:  '✉️',
}

const HEADER_CSS = `
  /* ── HEADER SHELL ── */
  .header {
    position: sticky;
    top: 0;
    z-index: 200;
    background: var(--green);
    border-bottom: 2px solid var(--gold);
    box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  }
  .header-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 32px;
    height: var(--header-h);
    gap: 24px;
  }

  /* ── LOGO ── */
  .logo-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    text-decoration: none;
  }
  .logo-emblem {
    width: 42px; height: 42px;
    border-radius: 50%;
    background: var(--gold);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display);
    font-weight: 800; color: var(--green); font-size: 1.2rem;
    box-shadow: 0 2px 12px rgba(212,175,55,0.4);
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .logo-emblem.small { width: 34px; height: 34px; font-size: 1rem; }
  .logo-btn:hover .logo-emblem { transform: scale(1.06); }
  .logo-text { display: flex; flex-direction: column; line-height: 1.2; }
  .logo-title {
    font-family: var(--font-display);
    color: var(--gold); font-size: 1.2rem; font-weight: 800; letter-spacing: 0.03em;
  }
  .logo-sub {
    color: rgba(255,255,255,0.5);
    font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
  }

  /* ── DESKTOP NAV ── */
  .desktop-nav {
    display: flex; align-items: center; gap: 4px; flex: 1;
  }
  .nav-link {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.72);
    font-family: var(--font-body);
    font-size: 0.82rem; font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
    padding: 8px 12px; border-radius: var(--radius-sm);
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .nav-link:hover { color: var(--gold); background: rgba(212,175,55,0.1); }
  .nav-link.active { color: var(--gold); background: rgba(212,175,55,0.15); }

  /* ── HEADER ACTIONS ── */
  .header-actions {
    margin-left: auto;
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }

  /* ── LANGUAGE TOGGLE ── */
  .lang-toggle {
    display: flex; align-items: center; gap: 2px;
    background: rgba(0,0,0,0.2);
    border-radius: var(--radius-sm);
    padding: 3px;
    border: 1px solid rgba(212,175,55,0.15);
  }
  .lang-btn {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-body);
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em;
    padding: 5px 10px; border-radius: 1px;
    transition: all 0.18s;
    color: rgba(255,255,255,0.45);
  }
  .lang-btn.active { background: var(--gold); color: var(--green); }
  .lang-btn:hover:not(.active):not(.soon) { color: rgba(255,255,255,0.8); }
  .lang-btn.soon { cursor: default; opacity: 0.3; }
  .lang-btn:disabled { cursor: default; }

  /* ── USER CHIP ── */
  .user-chip {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.08);
    border-radius: var(--radius-pill);
    padding: 6px 14px 6px 6px;
    border: 1px solid rgba(212,175,55,0.2);
  }
  .user-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: var(--red); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
  }
  .user-avatar.large { width: 44px; height: 44px; font-size: 1rem; }
  .user-name { color: rgba(255,255,255,0.85); font-size: 0.8rem; }
  .role-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  .role-dot.role-member { background: var(--gold); }
  .role-dot.role-editor { background: #4fc3f7; }
  .role-dot.role-admin  { background: #ef5350; }

  /* ── HAMBURGER ── */
  .hamburger {
    display: none;
    flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer;
    padding: 8px; border-radius: var(--radius-sm);
    transition: background 0.2s;
  }
  .hamburger:hover { background: rgba(255,255,255,0.1); }
  .hamburger span {
    width: 22px; height: 2px;
    background: var(--gold); border-radius: 1px; display: block;
    transition: transform 0.2s;
  }

  /* ── MOBILE BACK BAR ── */
  .mobile-back-bar {
    display: none;
    padding: 8px 20px;
    border-top: 1px solid rgba(255,255,255,0.08);
    background: rgba(0,0,0,0.12);
  }
  .mobile-back-bar .btn-back {
    display: inline-flex;
    font-size: 0.8rem;
    padding: 7px 14px;
  }

  /* ── DRAWER BACKDROP ── */
  .drawer-backdrop {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(0,0,0,0.6);
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s;
  }
  .drawer-backdrop.open { opacity: 1; pointer-events: auto; }

  /* ── DRAWER PANEL ── */
  .drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(320px, 90vw);
    z-index: 400;
    background: var(--green);
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex; flex-direction: column;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    border-left: 2px solid var(--gold);
  }
  .drawer.open { transform: translateX(0); }

  .drawer-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 20px 16px;
    border-bottom: 1px solid rgba(212,175,55,0.2);
    flex-shrink: 0;
  }
  .drawer-logo { display: flex; align-items: center; gap: 10px; }
  .drawer-close {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.6); font-size: 1.1rem;
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .drawer-close:hover { background: rgba(255,255,255,0.1); color: #fff; }

  .drawer-user {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
  }
  .drawer-user-name { color: #fff; font-weight: 600; font-size: 0.95rem; }
  .drawer-user-role { color: var(--gold); font-size: 0.75rem; letter-spacing: 0.06em; margin-top: 2px; }

  .drawer-nav {
    display: flex; flex-direction: column;
    padding: 12px 12px;
    flex: 1;
  }
  .drawer-link {
    display: flex; align-items: center; gap: 14px;
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.75);
    font-family: var(--font-body);
    font-size: 1rem; font-weight: 500;
    padding: 14px 12px; border-radius: var(--radius-sm);
    transition: all 0.18s;
    text-align: left;
  }
  .drawer-link:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .drawer-link.active {
    background: rgba(212,175,55,0.15);
    color: var(--gold); font-weight: 600;
  }
  .drawer-link-icon { font-size: 1.2rem; width: 28px; text-align: center; }

  .drawer-lang {
    padding: 16px 20px;
    border-top: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
  }
  .drawer-section-label {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.4); margin-bottom: 10px;
  }
  .drawer-lang-buttons { display: flex; flex-direction: column; gap: 6px; }
  .drawer-lang-btn {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-sm);
    padding: 10px 14px; cursor: pointer;
    transition: all 0.18s; text-align: left;
    opacity: 1;
  }
  .drawer-lang-btn.active {
    background: rgba(212,175,55,0.2);
    border-color: var(--gold);
  }
  .drawer-lang-btn.soon { opacity: 0.45; cursor: default; }
  .drawer-lang-btn:disabled { cursor: default; }
  .drawer-lang-code {
    background: rgba(255,255,255,0.1);
    color: var(--gold); border-radius: 2px;
    padding: 2px 8px; font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.08em; flex-shrink: 0;
  }
  .drawer-lang-btn.active .drawer-lang-code { background: var(--gold); color: var(--green); }
  .drawer-lang-name { color: rgba(255,255,255,0.8); font-size: 0.88rem; flex: 1; }
  .drawer-lang-soon {
    font-size: 0.68rem; color: rgba(255,255,255,0.35);
    font-style: italic; margin-left: auto;
  }

  .drawer-flag {
    display: flex; gap: 0; flex-shrink: 0;
  }
  .drawer-flag div { height: 5px; flex: 1; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .header-inner { padding: 0 16px; gap: 12px; }
    .desktop-nav  { display: none; }
    .lang-toggle  { display: none; }
    .user-chip    { display: none; }
    .hamburger    { display: flex; }
    .mobile-back-bar { display: block; }

    .logo-sub { display: none; } /* too long on small screens */
    .logo-title { font-size: 1.1rem; }
  }

  @media (max-width: 380px) {
    .logo-emblem { width: 36px; height: 36px; font-size: 1rem; }
  }
`
