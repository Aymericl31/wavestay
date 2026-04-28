import { useState } from 'react'

export default function RoomGallery({ images, alt }) {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-3">
      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={images[active]}
          alt={`${alt} — vue ${active + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`aspect-[4/3] overflow-hidden rounded-lg transition-opacity ${
              i === active ? 'ring-2 ring-gold' : 'opacity-70 hover:opacity-100'
            }`}
            aria-label={`Voir la photo ${i + 1}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
