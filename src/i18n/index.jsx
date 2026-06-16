import { createContext, useContext, useState, useCallback } from 'react'
import fr from './fr.json'
import en from './en.json'

const translations = { fr, en }

const STORAGE_KEY = 'wavestay-lang'

function getInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'fr' || stored === 'en') return stored
  } catch (_) {}
  const browserLang = navigator.language?.slice(0, 2)
  return browserLang === 'fr' ? 'fr' : 'en'
}

function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

function interpolate(str, params) {
  if (!params || typeof str !== 'string') return str
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => (params[key] !== undefined ? params[key] : `{{${key}}}`))
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((newLang) => {
    if (newLang !== 'fr' && newLang !== 'en') return
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
    } catch (_) {}
    setLangState(newLang)
  }, [])

  const t = useCallback(
    (key, params) => {
      const dict = translations[lang] || translations.fr
      const value = resolve(dict, key)
      if (value === undefined) {
        // fallback to french
        const fallback = resolve(translations.fr, key)
        return interpolate(fallback ?? key, params)
      }
      return interpolate(value, params)
    },
    [lang],
  )

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
