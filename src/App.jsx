// ============================================================
// UBUMWE — App.jsx
// Root component. Owns global state, routes between pages,
// composes Header / Footer / pages.
// ============================================================
import { useLang }       from './hooks/useLang.js'
import { useNavigation } from './hooks/useNavigation.js'
import { useToast }      from './hooks/useToast.js'
import { useState }      from 'react'

import Header       from './components/Header.jsx'
import Footer       from './components/Footer.jsx'
import WelcomeModal from './components/WelcomeModal.jsx'

import Home         from './pages/Home.jsx'
import Calendar     from './pages/Calendar.jsx'
import EventDetail  from './pages/EventDetail.jsx'
import Gallery      from './pages/Gallery.jsx'
import Business     from './pages/Business.jsx'
import Contact      from './pages/Contact.jsx'

export default function App() {
  const { lang, setLang, t, tl }                                    = useLang()
  const { page, canGoBack, selectedEvent, navigate, goBack,
          navigateRoot, setSelectedEvent }                           = useNavigation('home')
  const { toast, showToast }                                        = useToast()
  const [welcomed, setWelcomed]                                     = useState(false)

  // ── render ──────────────────────────────────────────────────
  return (
    <>
      {/* Welcome gate — shown once per session */}
      {!welcomed && (
        <WelcomeModal t={t} lang={lang} onEnter={() => setWelcomed(true)} />
      )}

      {/* Sticky header */}
      <Header
        page={page}
        canGoBack={canGoBack}
        navigateRoot={navigateRoot}
        goBack={goBack}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* Page router */}
      <PageRouter
        page={page}
        selectedEvent={selectedEvent}
        t={t} tl={tl} lang={lang}
        navigate={navigate}
        navigateRoot={navigateRoot}
        showToast={showToast}
        setSelectedEvent={setSelectedEvent}
      />

      {/* Footer */}
      <Footer t={t} navigateRoot={navigateRoot} showToast={showToast} />

      {/* Global toast */}
      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </>
  )
}

// ── PAGE ROUTER ───────────────────────────────────────────────
function PageRouter({ page, selectedEvent, t, tl, lang, navigate, navigateRoot, showToast }) {
  switch (page) {
    case 'home':
      return (
        <Home
          t={t} tl={tl} lang={lang}
          navigate={navigate}
          navigateRoot={navigateRoot}
        />
      )

    case 'calendar':
      return (
        <Calendar
          t={t} tl={tl} lang={lang}
          navigate={navigate}
        />
      )

    case 'event-detail':
      return (
        <EventDetail
          event={selectedEvent}
          t={t} tl={tl} lang={lang}
          showToast={showToast}
        />
      )

    case 'gallery':
      return (
        <Gallery
          t={t} tl={tl} lang={lang}
          showToast={showToast}
        />
      )

    case 'business':
      return (
        <Business
          t={t} tl={tl} lang={lang}
          showToast={showToast}
        />
      )

    case 'contact':
      return (
        <Contact
          t={t} lang={lang}
          showToast={showToast}
        />
      )

    default:
      return (
        <Home
          t={t} tl={tl} lang={lang}
          navigate={navigate}
          navigateRoot={navigateRoot}
        />
      )
  }
}
