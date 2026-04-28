import { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router'
import { getRoomById } from '../data/rooms'

function todayPlus(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function BookingPage() {
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const room = getRoomById(roomId)

  const checkIn = searchParams.get('checkIn') || todayPlus(7)
  const checkOut = searchParams.get('checkOut') || todayPlus(8)
  const guests = Number(searchParams.get('guests') || 2)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!room) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-ink">Chambre introuvable</h1>
        <Link to="/" className="mt-4 inline-block text-gold underline">
          Retour à l'accueil
        </Link>
      </div>
    )
  }

  const nights = Math.max(
    Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000),
    1
  )
  const total = nights * room.pricePerNight

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      const reservation = {
        roomId: room.id,
        roomName: room.name,
        firstName,
        lastName,
        email,
        phone,
        checkIn,
        checkOut,
        guests,
        nights,
        total,
        reference: 'WS-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      }
      navigate('/confirmation', { state: reservation })
    }, 600)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-ink">
          Accueil
        </Link>{' '}
        /{' '}
        <Link to={`/rooms/${room.id}`} className="hover:text-ink">
          {room.name}
        </Link>{' '}
        / <span className="text-ink">Réservation</span>
      </nav>

      <h1 className="mt-4 text-3xl font-semibold text-ink">Finaliser votre réservation</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="rounded-2xl border border-slate-200 p-6">
            <legend className="px-2 text-sm font-semibold text-ink">Vos coordonnées</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Prénom" value={firstName} onChange={setFirstName} required />
              <Field label="Nom" value={lastName} onChange={setLastName} required />
              <Field
                label="Email"
                value={email}
                onChange={setEmail}
                type="email"
                required
                full
              />
              <Field label="Téléphone" value={phone} onChange={setPhone} type="tel" full />
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-slate-200 p-6">
            <legend className="px-2 text-sm font-semibold text-ink">Paiement</legend>
            <p className="text-sm text-slate-600">
              Aucun paiement n'est demandé à la réservation. Le règlement s'effectue sur place
              à votre arrivée.
            </p>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
          >
            {submitting ? 'Confirmation en cours…' : `Confirmer la réservation · ${total}€`}
          </button>
        </form>

        <aside className="rounded-2xl border border-slate-200 bg-cream p-6">
          <img
            src={room.images[0]}
            alt={room.name}
            className="aspect-[16/10] w-full rounded-lg object-cover"
          />
          <h3 className="mt-4 text-lg font-semibold text-ink">{room.name}</h3>
          <p className="mt-1 text-sm text-slate-600">
            {room.surface} m² · {room.bedType}
          </p>

          <dl className="mt-5 space-y-2 border-t border-slate-200 pt-5 text-sm">
            <Row label="Arrivée" value={formatDate(checkIn)} />
            <Row label="Départ" value={formatDate(checkOut)} />
            <Row label="Voyageurs" value={`${guests} personne${guests > 1 ? 's' : ''}`} />
            <Row label="Nuits" value={nights} />
            <Row label={`${room.pricePerNight}€ × ${nights}`} value={`${total}€`} />
          </dl>

          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-base font-semibold text-ink">
            <span>Total</span>
            <span>{total}€</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required = false, full = false }) {
  return (
    <label className={`flex flex-col gap-1 ${full ? 'sm:col-span-2' : ''}`}>
      <span className="text-xs font-medium text-slate-500">
        {label}
        {required && ' *'}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink focus:border-gold focus:outline-none"
      />
    </label>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-slate-600">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
