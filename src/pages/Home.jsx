import { FEATURED_POST, SECONDARY_POSTS } from '../data/content.js'
import { canView, CURRENT_USER } from '../data/roles.js'

export default function Home({ t, tl, lang, navigate, navigateRoot }) {
  const feat = FEATURED_POST

  return (
    <>
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-ring r1" aria-hidden="true" />
        <div className="hero-ring r2" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            {t('hero_badge')}
          </div>
          <h1 className="hero-h1">
            {t('hero_h1_a')} <em>{t('hero_h1_em')}</em>
            <br />{t('hero_h1_b')}
            <br />{t('hero_h1_c')}
          </h1>
          <p className="hero-sub">{t('hero_sub')}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigateRoot('calendar')}>
              {t('hero_cta1')}
            </button>
            <button className="btn-outline" onClick={() => navigateRoot('business')}>
              {t('hero_cta2')}
            </button>
          </div>
          <div className="hero-stats" role="list">
            {[
              ['180+', t('stat_members')],
              ['10',   t('stat_events')],
              ['30+',  t('stat_biz')],
              ['2020', t('stat_founded')],
            ].map(([num, label]) => (
              <div key={label} className="hero-stat" role="listitem">
                <span className="hero-stat-num">{num}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS GRID ── */}
      <main className="page-content">
        <header className="section-header">
          <p className="section-label">{t('news_label')}</p>
          <h2 className="section-title">
            {t('news_title_a')} <em>{t('news_title_em')}</em>
          </h2>
        </header>

        {/* Featured post */}
        <article
          className="post-featured card card-hover-gold"
          onClick={() => navigate('event-detail', { id: feat.id })}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && navigate('event-detail', { id: feat.id })}
          aria-label={tl(feat, 'title')}
        >
          <div className="post-feat-img" aria-hidden="true">
            <span className="post-feat-watermark">{feat.imgText}</span>
            <span className="post-feat-badge">{t('featured_badge')}</span>
          </div>
          <div className="post-feat-body">
            <p className="post-category">{t(feat.category)}</p>
            <h3 className="post-feat-title">{tl(feat, 'title')}</h3>
            <p className="post-excerpt">{tl(feat, 'excerpt')}</p>
            <div className="post-meta">
              <span><strong>{t('published_by')}</strong> {tl(feat, 'date')}</span>
              <span><strong>{t('by')}</strong> {tl(feat, 'author')}</span>
            </div>
          </div>
        </article>

        {/* Secondary posts */}
        <div className="posts-grid">
          {SECONDARY_POSTS.map(post => {
            const locked = !canView(post.minRole, CURRENT_USER.role)
            return (
              <article
                key={post.id}
                className={`post-card card card-hover-gold ${locked ? 'post-locked' : ''}`}
                aria-label={locked ? t('role_restricted') : tl(post, 'title')}
              >
                {locked && (
                  <div className="post-lock-overlay">
                    <span aria-hidden="true">🔒</span>
                    <p>{t('role_restricted')}</p>
                  </div>
                )}
                <div className={`post-card-img color-${post.color}`} aria-hidden="true">
                  <span className="post-card-emoji">{post.emoji}</span>
                  <span className="post-card-tag">{t(post.category)}</span>
                </div>
                <div className="post-card-body">
                  <h3 className="post-card-title">{tl(post, 'title')}</h3>
                  <p className="post-card-excerpt">{tl(post, 'excerpt')}</p>
                </div>
                <div className="post-card-foot">
                  <span>{tl(post, 'date')}</span>
                  {!locked && (
                    <span className="read-more">{t('read_more')}</span>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </main>
    </>
  )
}

const CSS = `
  /* ── HERO ── */
  .hero {
    background: linear-gradient(160deg, var(--green) 0%, #0d2b1e 58%, #3d0c0e 130%);
    padding: 80px 32px 100px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 72% 50%, rgba(212,175,55,0.06) 0%, transparent 58%),
      radial-gradient(ellipse at 18% 80%, rgba(155,29,32,0.1) 0%, transparent 48%);
    pointer-events: none;
  }
  .hero-ring {
    position: absolute; border-radius: 50%; pointer-events: none;
    border: 1px solid rgba(212,175,55,0.06);
  }
  .hero-ring.r1 { width: 600px; height: 600px; right: -120px; top: -120px; }
  .hero-ring.r2 { width: 360px; height: 360px; right: 40px; top: 40px; }
  .hero-inner {
    max-width: var(--max-width); margin: 0 auto; position: relative;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(212,175,55,0.14);
    border: 1px solid rgba(212,175,55,0.32);
    border-radius: var(--radius-pill);
    padding: 6px 16px;
    color: var(--gold); font-size: 0.73rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 24px;
  }
  .hero-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold);
    animation: pulseDot 2s ease-in-out infinite;
  }
  .hero-h1 {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5.5vw, 4.4rem);
    font-weight: 800; color: #fff;
    line-height: 1.06; letter-spacing: -0.015em;
    max-width: 640px; margin-bottom: 22px;
  }
  .hero-h1 em { color: var(--gold); font-style: italic; }
  .hero-sub {
    color: rgba(255,255,255,0.58);
    font-size: clamp(0.95rem, 1.5vw, 1.08rem);
    max-width: 480px; line-height: 1.75; margin-bottom: 40px;
  }
  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .hero-stats {
    display: flex; gap: 40px; flex-wrap: wrap;
    margin-top: 56px; padding-top: 40px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .hero-stat { display: flex; flex-direction: column; }
  .hero-stat-num {
    font-family: var(--font-display);
    color: var(--gold); font-size: 2rem; font-weight: 800; line-height: 1;
  }
  .hero-stat-label {
    color: rgba(255,255,255,0.45);
    font-size: 0.73rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px;
  }

  /* ── SECTION HEADER ── */
  .section-header { margin-bottom: 36px; }

  /* ── FEATURED POST ── */
  .post-featured {
    display: grid; grid-template-columns: 1fr 1fr;
    cursor: pointer; margin-bottom: 24px;
  }
  .post-feat-img {
    background: linear-gradient(135deg, var(--green) 0%, var(--green-mid) 100%);
    min-height: 320px;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .post-feat-watermark {
    font-family: var(--font-display);
    color: rgba(255,255,255,0.1);
    font-size: clamp(4rem, 8vw, 7rem);
    font-weight: 800; letter-spacing: -0.02em;
    user-select: none; line-height: 1;
  }
  .post-feat-badge {
    position: absolute; top: 20px; left: 20px;
    background: var(--red); color: #fff;
    border-radius: var(--radius-sm);
    padding: 4px 12px; font-size: 0.7rem;
    font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
  }
  .post-feat-body {
    padding: 40px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .post-category {
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--red-warm); margin-bottom: 12px;
    display: flex; align-items: center; gap: 10px;
  }
  .post-category::after { content: ''; flex: 1; height: 1px; background: var(--cream-dark); }
  .post-feat-title {
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 2vw, 1.65rem);
    font-weight: 800; color: var(--text-dark);
    line-height: 1.25; margin-bottom: 14px;
  }
  .post-excerpt {
    color: var(--text-soft); line-height: 1.78; font-size: 0.92rem; margin-bottom: 20px;
  }
  .post-meta {
    color: var(--text-soft); font-size: 0.78rem;
    display: flex; gap: 16px; flex-wrap: wrap;
  }
  .post-meta strong { color: var(--text-mid); }

  /* ── POST CARDS GRID ── */
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
  .post-card { cursor: pointer; position: relative; }
  .post-locked { cursor: default; }
  .post-card-img {
    height: 160px; position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .post-card-img.color-green { background: linear-gradient(135deg, var(--green-mid), var(--green-light)); }
  .post-card-img.color-red   { background: linear-gradient(135deg, var(--red), #C0392B); }
  .post-card-img.color-gold  { background: linear-gradient(135deg, #8B6914, var(--gold)); }
  .post-card-img.color-teal  { background: linear-gradient(135deg, #006064, #00acc1); }
  .post-card-emoji { font-size: 2.8rem; opacity: 0.38; }
  .post-card-tag {
    position: absolute; bottom: 12px; left: 12px;
    background: rgba(0,0,0,0.52); color: #fff;
    border-radius: var(--radius-sm);
    padding: 3px 10px; font-size: 0.67rem;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .post-card-body { padding: 18px 18px 12px; }
  .post-card-title {
    font-family: var(--font-display);
    font-size: 1rem; font-weight: 700; color: var(--text-dark);
    line-height: 1.35; margin-bottom: 8px;
  }
  .post-card-excerpt { color: var(--text-soft); font-size: 0.82rem; line-height: 1.65; }
  .post-card-foot {
    padding: 10px 18px 14px;
    border-top: 1px solid var(--cream-dark);
    color: var(--text-soft); font-size: 0.75rem;
    display: flex; justify-content: space-between; align-items: center;
  }
  .read-more { color: var(--green); font-weight: 600; cursor: pointer; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .post-featured { grid-template-columns: 1fr; }
    .post-feat-img { min-height: 220px; }
  }
  @media (max-width: 768px) {
    .hero { padding: 60px 20px 80px; }
    .hero-stats { gap: 28px; }
    .hero-stat-num { font-size: 1.7rem; }
    .posts-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 520px) {
    .posts-grid { grid-template-columns: 1fr; }
    .post-feat-body { padding: 24px 20px; }
  }
`
