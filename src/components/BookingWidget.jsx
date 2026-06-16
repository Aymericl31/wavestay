import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useI18n } from '../i18n/index.jsx'

function todayPlus(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function BookingWidget({ room }) {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [checkIn, setCheckIn] = useState(todayPlus(7))
  const [checkOut, setCheckOut] = useState(todayPlus(8))
  const [guests, setGuests] = useState(2)

  const nights = useMemo(() => {
    const a = new Date(checkIn)
    const b = new Date(checkOut)
    const diff = Math.round((b - a) / (1000 * 60 * 60 * 24))
    return Math.max(diff, 1)
  }, [checkIn, checkOut])

  const total = nights * room.pricePerNight

  function handleSubmit(e) {
    e.preventDefault()
    const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests) })
    navigate(`/booking/${room.id}?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-ink">
          {room.pricePerNight}€<span className="text-sm font-normal text-slate-500"> {t('room.perNight')}</span>
        </p>
        <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-gold-dark">
          {t('widget.freeCancellation')}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 rounded-lg border border-slate-200 p-3 focus-within:border-gold">
          <span className="text-xs font-medium text-slate-500">{t('widget.checkIn')}</span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-transparent text-sm text-ink focus:outline-none"
            required
          />
        </label>
        <label className="flex flex-col gap-1 rounded-lg border border-slate-200 p-3 focus-within:border-gold">
          <span className="text-xs font-medium text-slate-500">{t('widget.checkOut')}</span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn}
            className="bg-transparent text-sm text-ink focus:outline-none"
            required
          />
        </label>
      </div>

      <label className="mt-3 flex flex-col gap-1 rounded-lg border border-slate-200 p-3 focus-within:border-gold">
        <span className="text-xs font-medium text-slate-500">{t('widget.guests')}</span>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="bg-transparent text-sm text-ink focus:outline-none"
        >
          {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n > 1 ? t('widget.persons') : t('widget.person')}
            </option>
          ))}
        </select>
      </label>

      <dl className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm">
        <div className="flex justify-between text-slate-600">
          <dt>
            {room.pricePerNight}€ × {nights} {nights > 1 ? t('widget.nights') : t('widget.night')}
          </dt>
          <dd>{total}€</dd>
        </div>
        <div className="flex justify-between text-slate-600">
          <dt>{t('widget.taxes')}</dt>
          <dd>{t('widget.taxesIncluded')}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-ink">
          <dt>{t('widget.total')}</dt>
          <dd>{total}€</dd>
        </div>
      </dl>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-gold py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
      >
        {t('widget.book')}
      </button>
    </form>
  )
}
