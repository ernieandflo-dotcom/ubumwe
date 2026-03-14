import { useState } from 'react'

export default function WelcomeModal({ t, lang, onEnter }) {
  const [videoPlayed, setVideoPlayed] = useState(false)

  return (
    <>
      <style>{CSS}</style>
      <div className="welcome-overlay" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
        <div className="welcome-modal">
          {/* Header */}
          <div className="welcome-header">
            <div className="welcome-flag" aria-hidden="true">
              <div className="flag-stripe red" />
              <div className="flag-stripe white" />
              <div className="flag-stripe green" />
            </div>
            <div>
              <h1 id="welcome-title">{t('welcome_title')}</h1>
              <p>{t('welcome_sub')}</p>
            </div>
          </div>

          {/* Video area */}
          <div className="welcome-video">
            {!videoPlayed ? (
              <button className="video-placeholder" onClick={() => setVideoPlayed(true)} aria-label={t('welcome_video_label')}>
                <div className="play-btn" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--green)">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
                <p className="video-label">{t('welcome_video_label')}</p>
              </button>
            ) : (
              <div className="video-playing">
                <div className="video-playing-icon">📽️</div>
                <p>{t('welcome_playing')}</p>
                <p className="video-playing-sub">{t('welcome_playing_sub')}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="welcome-footer">
            <p className="welcome-note">{t('welcome_note')}</p>
            <button className="btn-enter" onClick={onEnter}>
              {t('welcome_enter')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const CSS = `
  .welcome-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(10,20,12,0.97);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: fadeIn 0.6s ease;
  }
  .welcome-modal {
    background: var(--green);
    border: 1px solid var(--gold);
    border-radius: var(--radius-md);
    max-width: 680px; width: 100%;
    box-shadow: 0 40px 120px rgba(0,0,0,0.7);
    overflow: hidden;
    animation: slideUpFade 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .welcome-header {
    background: linear-gradient(135deg, var(--red) 0%, #6B0F12 100%);
    padding: 24px 32px;
    display: flex; align-items: center; gap: 16px;
    border-bottom: 2px solid var(--gold);
  }
  .welcome-flag {
    display: flex; flex-direction: column; gap: 3px; flex-shrink: 0;
  }
  .flag-stripe { height: 8px; width: 44px; border-radius: 1px; }
  .flag-stripe.red   { background: var(--red-warm); }
  .flag-stripe.white { background: #fff; }
  .flag-stripe.green { background: var(--green-light); }
  .welcome-header h1 {
    font-family: var(--font-display);
    color: #fff; font-size: clamp(1.2rem, 3vw, 1.6rem); font-weight: 800;
  }
  .welcome-header p { color: rgba(255,255,255,0.65); font-size: 0.82rem; margin-top: 4px; }

  .welcome-video {
    background: #000;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }
  .video-placeholder {
    width: 100%; height: 100%; border: none; cursor: pointer;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px;
    background: linear-gradient(160deg, #0a1a0e 0%, #1b4332 100%);
    transition: background 0.3s;
  }
  .video-placeholder:hover { background: linear-gradient(160deg, #0d2218 0%, #23563f 100%); }
  .play-btn {
    width: 72px; height: 72px; border-radius: 50%;
    background: var(--gold);
    display: flex; align-items: center; justify-content: center;
    animation: pulse 2s infinite;
    transition: transform 0.2s;
  }
  .video-placeholder:hover .play-btn { transform: scale(1.08); }
  .video-label {
    font-family: var(--font-display);
    color: var(--gold); font-size: 0.9rem;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0 24px; text-align: center;
  }
  .video-playing {
    width: 100%; height: 100%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 12px;
    background: linear-gradient(135deg, #0a1f15, #1b4332);
  }
  .video-playing-icon { font-size: 3rem; }
  .video-playing p { color: rgba(255,255,255,0.7); font-size: 0.9rem; }
  .video-playing-sub {
    font-family: var(--font-display);
    color: var(--gold); font-size: 0.8rem; font-style: italic;
    padding: 0 24px; text-align: center;
  }

  .welcome-footer {
    padding: 18px 32px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    background: rgba(0,0,0,0.25);
    flex-wrap: wrap;
  }
  .welcome-note { color: rgba(255,255,255,0.5); font-size: 0.8rem; }
  .btn-enter {
    background: var(--gold); color: var(--green);
    border: none; cursor: pointer;
    padding: 12px 28px; border-radius: var(--radius-sm);
    font-family: var(--font-body);
    font-weight: 700; font-size: 0.9rem;
    letter-spacing: 0.06em; text-transform: uppercase;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .btn-enter:hover { background: var(--gold-light); transform: translateY(-1px); }

  @media (max-width: 480px) {
    .welcome-header { padding: 20px; gap: 12px; }
    .welcome-footer { padding: 16px 20px; }
    .welcome-footer { justify-content: center; }
  }
`
