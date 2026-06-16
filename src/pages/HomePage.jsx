import { useState } from 'react'
import { getRooms } from '../data/rooms'
import RoomCard from '../components/RoomCard'
import { useI18n } from '../i18n/index.jsx'

function todayPlus(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function HomePage() {
  const { t, lang } = useI18n()
  const [checkIn, setCheckIn] = useState(todayPlus(7))
  const [checkOut, setCheckOut] = useState(todayPlus(8))
  const [guests, setGuests] = useState(2)

  const rooms = getRooms(lang)

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=2000&q=80"
            alt="Paris"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">{t('home.location')}</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            {t('home.heroSubtitle')}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              const el = document.getElementById('rooms')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="mt-10 grid w-full max-w-3xl gap-3 rounded-2xl bg-white p-3 shadow-xl sm:grid-cols-[1fr_1fr_auto_auto]"
          >
            <label className="flex flex-col rounded-lg px-4 py-2 hover:bg-cream">
              <span className="text-xs font-medium text-slate-500">{t('home.checkIn')}</span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-sm text-ink focus:outline-none"
              />
            </label>
            <label className="flex flex-col rounded-lg px-4 py-2 hover:bg-cream">
              <span className="text-xs font-medium text-slate-500">{t('home.checkOut')}</span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn}
                className="bg-transparent text-sm text-ink focus:outline-none"
              />
            </label>
            <label className="flex flex-col rounded-lg px-4 py-2 hover:bg-cream">
              <span className="text-xs font-medium text-slate-500">{t('home.guests')}</span>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent text-sm text-ink focus:outline-none"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n > 1 ? t('home.persons') : t('home.person')}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              {t('home.search')}
            </button>
          </form>
        </div>
      </section>

      <section id="rooms" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gold">{t('home.sectionLabel')}</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">
              {t('home.roomsCount', { count: rooms.length })}
            </h2>
          </div>
          <p className="hidden text-sm text-slate-500 sm:block">
            {guests > 1
              ? `${guests} ${t('home.persons')}`
              : `${guests} ${t('home.person')}`}{' '}
            · 1 {t('home.ratesSuffix')}
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </>
  )
}
