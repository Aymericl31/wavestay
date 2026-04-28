import { Link, NavLink } from 'react-router'

export default function Header() {
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
            Nos chambres
          </NavLink>
          <a href="#contact" className="transition-colors hover:text-ink">
            Contact
          </a>
          <Link
            to="/"
            className="rounded-full bg-ink px-5 py-2 text-white transition-colors hover:bg-slate-700"
          >
            Réserver
          </Link>
        </nav>
      </div>
    </header>
  )
}
