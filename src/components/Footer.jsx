export default function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-slate-200 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-semibold tracking-tight text-ink">Wave</span>
            <span className="text-xl font-semibold tracking-tight text-gold">Stay</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            L'art du séjour parisien. Une sélection de chambres pensées pour les voyageurs exigeants.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>12 rue de la Paix, 75002 Paris</li>
            <li>+33 1 23 45 67 89</li>
            <li>contact@wavestay.fr</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">Informations</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Mentions légales</li>
            <li>CGV</li>
            <li>Politique de confidentialité</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} WaveStay — Démo Wavestone
      </div>
    </footer>
  )
}
