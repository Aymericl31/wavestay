import { Link, useParams } from 'react-router'
import { getRoomById } from '../data/rooms'
import RoomGallery from '../components/RoomGallery'
import BookingWidget from '../components/BookingWidget'
import { useI18n } from '../i18n/index.jsx'

export default function RoomDetailPage() {
  const { id } = useParams()
  const { t, lang } = useI18n()
  const room = getRoomById(id, lang)

  if (!room) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-ink">{t('room.notFound')}</h1>
        <p className="mt-3 text-slate-600">{t('room.notFoundDesc')}</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-2 text-sm font-medium text-white"
        >
          {t('room.backToRooms')}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-ink">
          {t('room.home')}
        </Link>{' '}
        / <span className="text-ink">{room.name}</span>
      </nav>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{room.name}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {room.surface} m² · {room.bedType} · {t('room.upTo')} {room.maxGuests}{' '}
            {room.maxGuests > 1 ? t('room.persons') : t('room.person')}
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <RoomGallery images={room.images} alt={room.name} />

          <section>
            <h2 className="text-xl font-semibold text-ink">{t('room.about')}</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{room.longDescription}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">{t('room.amenities')}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-slate-700">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-cream p-6">
            <h2 className="text-xl font-semibold text-ink">{t('room.cancellation')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {t('room.cancellationText')}
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookingWidget room={room} />
        </aside>
      </div>
    </div>
  )
}
