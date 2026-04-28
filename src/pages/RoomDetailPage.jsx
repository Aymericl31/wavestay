import { Link, useParams } from 'react-router'
import { getRoomById } from '../data/rooms'
import RoomGallery from '../components/RoomGallery'
import BookingWidget from '../components/BookingWidget'

export default function RoomDetailPage() {
  const { id } = useParams()
  const room = getRoomById(id)

  if (!room) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-ink">Chambre introuvable</h1>
        <p className="mt-3 text-slate-600">
          Cette chambre n'existe pas ou n'est plus disponible.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-2 text-sm font-medium text-white"
        >
          Retour aux chambres
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-ink">
          Accueil
        </Link>{' '}
        / <span className="text-ink">{room.name}</span>
      </nav>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">{room.name}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {room.surface} m² · {room.bedType} · jusqu'à {room.maxGuests} personne{room.maxGuests > 1 ? 's' : ''}
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <RoomGallery images={room.images} alt={room.name} />

          <section>
            <h2 className="text-xl font-semibold text-ink">À propos de cette chambre</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{room.longDescription}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">Équipements</h2>
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
            <h2 className="text-xl font-semibold text-ink">Politique d'annulation</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Annulation gratuite jusqu'à 24h avant l'arrivée. Au-delà, première nuit
              facturée. Aucun acompte demandé à la réservation.
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
