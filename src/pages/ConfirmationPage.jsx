import { Link, Navigate, useLocation } from 'react-router'
import { useI18n } from '../i18n/index.jsx'

export default function ConfirmationPage() {
  const { state } = useLocation()
  const { t, lang } = useI18n()

  if (!state) {
    return <Navigate to="/" replace />
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const nightsPlural = state.nights > 1 ? 's' : ''

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
          <svg
            className="h-8 w-8 text-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-ink">{t('confirmation.title')}</h1>
        <p className="mt-3 text-slate-600">
          {t('confirmation.thanks', { firstName: state.firstName })}{' '}
          <span className="font-medium text-ink">{state.email}</span>.
        </p>

        <div className="mt-8 rounded-xl bg-cream p-6 text-left">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {t('confirmation.reservationNumber')}
          </p>
          <p className="mt-1 text-2xl font-semibold text-ink">{state.reference}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-500">{t('confirmation.room')}</dt>
              <dd className="mt-1 font-medium text-ink">{state.roomName}</dd>
            </div>
            <div>
              <dt className="text-slate-500">{t('confirmation.travelers')}</dt>
              <dd className="mt-1 font-medium text-ink">
                {state.guests} {state.guests > 1 ? t('confirmation.persons') : t('confirmation.person')}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">{t('confirmation.checkIn')}</dt>
              <dd className="mt-1 font-medium text-ink">{formatDate(state.checkIn)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">{t('confirmation.checkOut')}</dt>
              <dd className="mt-1 font-medium text-ink">{formatDate(state.checkOut)}</dd>
            </div>
            <div className="col-span-2 border-t border-slate-200 pt-4">
              <dt className="text-slate-500">
                {t('confirmation.total', { count: state.nights, plural: nightsPlural })}
              </dt>
              <dd className="mt-1 text-xl font-semibold text-ink">{state.total}€</dd>
            </div>
          </dl>
        </div>

        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          {t('confirmation.backHome')}
        </Link>
      </div>
    </div>
  )
}
