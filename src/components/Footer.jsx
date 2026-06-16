import { useI18n } from '../i18n/index.jsx'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer id="contact" className="mt-24 border-t border-slate-200 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-semibold tracking-tight text-ink">Wave</span>
            <span className="text-xl font-semibold tracking-tight text-gold">Stay</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">{t('footer.tagline')}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">{t('footer.contact')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>{t('footer.address')}</li>
            <li>{t('footer.phone')}</li>
            <li>{t('footer.email')}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink">{t('footer.info')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>{t('footer.legalNotice')}</li>
            <li>{t('footer.terms')}</li>
            <li>{t('footer.privacy')}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} WaveStay — {t('footer.demo')}
      </div>
    </footer>
  )
}
