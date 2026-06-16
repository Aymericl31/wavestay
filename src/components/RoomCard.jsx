import { Link } from 'react-router'
import { useI18n } from '../i18n/index.jsx'

export default function RoomCard({ room }) {
  const { t } = useI18n()

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link to={`/rooms/${room.id}`} className="aspect-[16/10] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-semibold text-ink">{room.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {room.surface} m² · {room.bedType} · {t('room.upTo')} {room.maxGuests}{' '}
            {room.maxGuests > 1 ? t('room.persons') : t('room.person')}
          </p>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{room.shortDescription}</p>
        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">{t('room.fromPrice')}</p>
            <p className="text-2xl font-semibold text-ink">
              {room.pricePerNight}€<span className="text-sm font-normal text-slate-500"> {t('room.perNight')}</span>
            </p>
          </div>
          <Link
            to={`/rooms/${room.id}`}
            className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
          >
            {t('room.viewRoom')}
          </Link>
        </div>
      </div>
    </article>
  )
}
