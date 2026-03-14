// ============================================================
// useLang — language selection
//
// Persists the chosen language in localStorage so users don't
// need to re-select every visit.
// When a real auth system is added, the user's preferred language
// can be stored in their profile and override this.
// ============================================================
import { useState, useCallback } from 'react'
import { T } from '../data/translations.js'

const STORAGE_KEY = 'ubumwe_lang'

function getInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && T[stored]) return stored
  } catch (_) { /* localStorage unavailable (private browsing) */ }
  // Attempt to match browser locale
  const browser = navigator.language?.split('-')[0]
  if (browser && T[browser]) return browser
  return 'fr' // default
}

export function useLang() {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((code) => {
    setLangState(code)
    try { localStorage.setItem(STORAGE_KEY, code) } catch (_) {}
  }, [])

  // t(key) — translates a key, falls back to French, then key itself
  const t = useCallback((key) => {
    return T[lang]?.[key] ?? T['fr']?.[key] ?? key
  }, [lang])

  // tl(obj, field) — picks obj[field_lang] or obj[field_fr] from bilingual objects
  const tl = useCallback((obj, field) => {
    return obj[`${field}_${lang}`] ?? obj[`${field}_fr`] ?? ''
  }, [lang])

  return { lang, setLang, t, tl }
}
