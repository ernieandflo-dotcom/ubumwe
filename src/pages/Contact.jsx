import { useState } from 'react'

export default function Contact({ t, lang, showToast }) {
  const [form, setForm] = useState({ name: '', email: '', type: 0, message: '' })

  function handleSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast(lang === 'fr' ? '⚠️ Veuillez remplir tous les champs.' : '⚠️ Please fill in all fields.')
      return
    }
    showToast(t('toast_submitted'))
    setForm({ name: '', email: '', type: 0, message: '' })
  }

  const contactOptions = t('contact_options')

  const SOCIAL = [
    { icon: '📘', platform: 'Facebook',  handle: '@UbumweQuebec' },
    { icon: '📸', platform: 'Instagram', handle: '@ubumwe_qc' },
    { icon: '📺', platform: 'YouTube',   handle: 'Ubumwe Québec' },
    { icon: '💬', platform: 'WhatsApp',  handle: lang === 'fr' ? 'Lien sur demande' : 'Link on request' },
  ]

  return (
    <>
      <style>{CSS}</style>
      <main className="page-content">
        <header className="section-header">
          <p className="section-label">{t('contact_label')}</p>
          <h2 className="section-title">
            {t('contact_title_a')} <em>{t('contact_title_em')}</em> {t('contact_title_b')}
          </h2>
        </header>

        <div className="contact-grid">
          {/* Left — info */}
          <div className="contact-info-col">
            <section className="contact-block">
              <h3 className="contact-block-title">{t('contact_coords')}</h3>
              {[
                ['📧', t('contact_email_lbl'), 'contact@ubumwe-quebec.community'],
                ['📱', t('contact_phone_lbl'), '+1 (418) 555-0192'],
                ['📍', t('contact_addr_lbl'),  t('contact_addr_val')],
                ['🕐', t('contact_hours_lbl'), t('contact_hours_val')],
              ].map(([icon, label, value]) => (
                <div key={label} className="contact-row">
                  <span className="contact-icon" aria-hidden="true">{icon}</span>
                  <div>
                    <p className="contact-row-label">{label}</p>
                    <p className="contact-row-value">{value}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="contact-block">
              <h3 className="contact-block-title">{t('contact_social')}</h3>
              {SOCIAL.map(({ icon, platform, handle }) => (
                <div key={platform} className="contact-row">
                  <span className="contact-icon" aria-hidden="true">{icon}</span>
                  <div>
                    <p className="contact-row-label">{platform}</p>
                    <p className="contact-row-value">{handle}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Map placeholder */}
            <div className="map-placeholder card" aria-label="Carte de localisation">
              <div className="map-inner">
                <span aria-hidden="true" style={{ fontSize: '3rem', opacity: 0.3 }}>🗺️</span>
                <p>{lang === 'fr' ? 'Carte interactive — bientôt disponible' : 'Interactive map — coming soon'}</p>
                <p className="map-addr">455 Rue de la Couronne, Québec</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-form-col">
            <div className="card contact-form-card">
              <h3 className="form-card-title">{t('contact_form_title')}</h3>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">{t('contact_name')}</label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-input"
                  placeholder={t('contact_ph_name')}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">{t('contact_email')}</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-input"
                  placeholder={t('contact_ph_email')}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-type">{t('contact_type')}</label>
                <select
                  id="contact-type"
                  className="form-input form-select"
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: Number(e.target.value) }))}
                >
                  {contactOptions.map((opt, i) => (
                    <option key={i} value={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-msg">{t('contact_msg')}</label>
                <textarea
                  id="contact-msg"
                  className="form-input form-textarea"
                  placeholder={t('contact_ph_msg')}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5}
                />
              </div>

              <button className="btn-primary" style={{ width: '100%' }} onClick={handleSubmit}>
                {t('contact_send')}
              </button>

              <p className="form-privacy">
                {lang === 'fr'
                  ? '🔒 Vos informations restent confidentielles et ne sont jamais partagées.'
                  : '🔒 Your information remains private and is never shared.'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

const CSS = `
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
  }
  .contact-info-col { display: flex; flex-direction: column; gap: 32px; }
  .contact-block { }
  .contact-block-title {
    font-family: var(--font-display);
    font-size: 1.1rem; font-weight: 700; color: var(--text-dark);
    margin-bottom: 16px; padding-bottom: 10px;
    border-bottom: 1px solid var(--cream-dark);
  }
  .contact-row {
    display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px;
  }
  .contact-icon { font-size: 1.15rem; flex-shrink: 0; margin-top: 1px; line-height: 1.4; }
  .contact-row-label {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--text-soft); margin-bottom: 2px;
  }
  .contact-row-value { font-size: 0.88rem; color: var(--text-dark); line-height: 1.5; }

  /* Map placeholder */
  .map-placeholder {
    overflow: hidden; border-radius: var(--radius-md);
  }
  .map-inner {
    height: 180px;
    background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 8px;
    border: 1px dashed var(--border);
    border-radius: var(--radius-md);
  }
  .map-inner p { color: var(--text-soft); font-size: 0.82rem; }
  .map-addr { font-weight: 600; color: var(--text-mid) !important; }

  /* Form card */
  .contact-form-card { padding: 32px; }
  .form-card-title {
    font-family: var(--font-display);
    font-size: 1.25rem; font-weight: 700; color: var(--text-dark);
    margin-bottom: 24px;
  }
  .form-privacy {
    margin-top: 14px; font-size: 0.75rem; color: var(--text-soft); text-align: center;
    line-height: 1.5;
  }

  @media (max-width: 900px) {
    .contact-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .contact-form-card { padding: 24px 20px; }
  }
`
