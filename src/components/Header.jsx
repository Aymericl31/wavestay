import { Link, NavLink } from 'react-router'
import { useI18n } from '../i18n/index.jsx'

export default function Header() {
  const { t, lang, setLang } = useI18n()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold tracking-tight text-ink">Wave</span>
          <span className="text-2xl font-semibold tracking-tight text-gold">Stay</span>
        </Link>
        <nav className="flex items-center gap-8 text-sm font-medium text-slate-600">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'text-ink' : 'transition-colors hover:text-ink'
            }
          >
            {t('nav.rooms')}
          </NavLink>
          <a href="#contact" className="transition-colors hover:text-ink">
            {t('nav.contact')}
          </a>
          <Link
            to="/"
            className="rounded-full bg-ink px-5 py-2 text-white transition-colors hover:bg-slate-700"
          >
            {t('nav.book')}
          </Link>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <button
              onClick={() => setLang('fr')}
              className={`px-1 transition-colors hover:text-ink ${lang === 'fr' ? 'text-ink' : ''}`}
              aria-pressed={lang === 'fr'}
            >
              FR
            </button>
            <span aria-hidden>|</span>
            <button
              onClick={() => setLang('en')}
              className={`px-1 transition-colors hover:text-ink ${lang === 'en' ? 'text-ink' : ''}`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
