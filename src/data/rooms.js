import fr from '../i18n/fr.json'
import en from '../i18n/en.json'

const roomsBase = [
  {
    id: 'classique',
    pricePerNight: 189,
    surface: 22,
    maxGuests: 2,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
    ],
  },
  {
    id: 'executive',
    pricePerNight: 289,
    surface: 38,
    maxGuests: 2,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
    ],
  },
  {
    id: 'presidentielle',
    pricePerNight: 689,
    surface: 75,
    maxGuests: 4,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
      'https://images.unsplash.com/photo-1551776235-dde6d482980b?w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    ],
  },
]

function mergeTranslations(lang) {
  const dict = lang === 'en' ? en : fr
  return roomsBase.map((room) => {
    const t = dict.rooms[room.id] || fr.rooms[room.id]
    return {
      ...room,
      name: t.name,
      shortDescription: t.shortDescription,
      longDescription: t.longDescription,
      bedType: t.bedType,
      amenities: t.amenities,
    }
  })
}

export function getRooms(lang = 'fr') {
  return mergeTranslations(lang)
}

export function getRoomById(id, lang = 'fr') {
  return mergeTranslations(lang).find((room) => room.id === id)
}

// Keep a default export for backward compatibility
export const rooms = mergeTranslations('fr')
