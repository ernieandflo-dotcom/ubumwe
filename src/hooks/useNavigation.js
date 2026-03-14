// ============================================================
// useNavigation — page routing + history stack
//
// Provides:
//   page        — current page id
//   navigate()  — push a new page (records history)
//   goBack()    — pop to previous page
//   canGoBack   — boolean, false on first page
//   historyStack— for debugging
//
// selectedEvent is co-managed here because event detail is a
// sub-view of both 'home' and 'calendar', not a separate page.
// ============================================================
import { useState, useCallback } from 'react'

export function useNavigation(initialPage = 'home') {
  const [stack, setStack]         = useState([initialPage])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const page     = stack[stack.length - 1]
  const canGoBack = stack.length > 1

  const navigate = useCallback((newPage, event = null) => {
    setStack(prev => [...prev, newPage])
    setSelectedEvent(event)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goBack = useCallback(() => {
    setStack(prev => {
      if (prev.length <= 1) return prev
      return prev.slice(0, -1)
    })
    // Clear selected event when going back unless previous page needs it
    setSelectedEvent(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Used by nav links — replaces the whole stack (no back-button trail)
  const navigateRoot = useCallback((newPage) => {
    setStack([newPage])
    setSelectedEvent(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return {
    page,
    canGoBack,
    historyStack: stack,
    selectedEvent,
    setSelectedEvent,
    navigate,
    goBack,
    navigateRoot,
  }
}
