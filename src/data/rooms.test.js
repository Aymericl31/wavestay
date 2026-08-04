import { describe, it, expect } from 'vitest'
import { rooms, getRoomById } from './rooms.js'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Vérifie qu'une URL Unsplash est bien formée avec les paramètres attendus */
function isValidUnsplashUrl(url) {
  return (
    typeof url === 'string' &&
    url.startsWith('https://images.unsplash.com/photo-') &&
    url.includes('w=1200') &&
    url.includes('q=80')
  )
}

// ---------------------------------------------------------------------------
// Structure du catalogue
// ---------------------------------------------------------------------------

describe('rooms — structure du catalogue', () => {
  it('exporte un tableau non vide', () => {
    expect(Array.isArray(rooms)).toBe(true)
    expect(rooms.length).toBeGreaterThan(0)
  })

  it('contient exactement 4 chambres', () => {
    expect(rooms).toHaveLength(4)
  })

  it('les ids sont uniques dans le tableau', () => {
    const ids = rooms.map((r) => r.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('les ids sont en kebab-case (pas de majuscules ni d\'espaces)', () => {
    rooms.forEach((room) => {
      expect(room.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    })
  })

  it('contient les quatre chambres attendues dans l\'ordre tarifaire croissant', () => {
    const ids = rooms.map((r) => r.id)
    expect(ids).toEqual(['classique', 'executive', 'familiale-6', 'presidentielle'])
  })

  it('les prix sont triés par ordre croissant (ordre d\'affichage HomePage)', () => {
    const prices = rooms.map((r) => r.pricePerNight)
    const sorted = [...prices].sort((a, b) => a - b)
    expect(prices).toEqual(sorted)
  })
})

// ---------------------------------------------------------------------------
// Conformité de chaque chambre au type Room
// ---------------------------------------------------------------------------

describe('rooms — conformité au type Room', () => {
  rooms.forEach((room) => {
    describe(`chambre "${room.id}"`, () => {
      it('a un id non vide (string)', () => {
        expect(typeof room.id).toBe('string')
        expect(room.id.trim()).not.toBe('')
      })

      it('a un name non vide (string)', () => {
        expect(typeof room.name).toBe('string')
        expect(room.name.trim()).not.toBe('')
      })

      it('a une shortDescription non vide (string)', () => {
        expect(typeof room.shortDescription).toBe('string')
        expect(room.shortDescription.trim()).not.toBe('')
      })

      it('a une longDescription non vide (string)', () => {
        expect(typeof room.longDescription).toBe('string')
        expect(room.longDescription.trim()).not.toBe('')
      })

      it('a un pricePerNight entier positif', () => {
        expect(typeof room.pricePerNight).toBe('number')
        expect(Number.isInteger(room.pricePerNight)).toBe(true)
        expect(room.pricePerNight).toBeGreaterThan(0)
      })

      it('a une surface entière positive', () => {
        expect(typeof room.surface).toBe('number')
        expect(Number.isInteger(room.surface)).toBe(true)
        expect(room.surface).toBeGreaterThan(0)
      })

      it('a un bedType non vide (string)', () => {
        expect(typeof room.bedType).toBe('string')
        expect(room.bedType.trim()).not.toBe('')
      })

      it('a un maxGuests entier ≥ 1', () => {
        expect(typeof room.maxGuests).toBe('number')
        expect(Number.isInteger(room.maxGuests)).toBe(true)
        expect(room.maxGuests).toBeGreaterThanOrEqual(1)
      })

      it('a exactement 4 images', () => {
        expect(Array.isArray(room.images)).toBe(true)
        expect(room.images).toHaveLength(4)
      })

      it('chaque image est une URL Unsplash valide (w=1200&q=80)', () => {
        room.images.forEach((url) => {
          expect(isValidUnsplashUrl(url)).toBe(true)
        })
      })

      it('a au moins 5 amenities', () => {
        expect(Array.isArray(room.amenities)).toBe(true)
        expect(room.amenities.length).toBeGreaterThanOrEqual(5)
      })

      it('chaque amenity est une string non vide sans trailing whitespace', () => {
        room.amenities.forEach((amenity) => {
          expect(typeof amenity).toBe('string')
          expect(amenity.trim()).not.toBe('')
          expect(amenity).toBe(amenity.trimEnd())
        })
      })

      it('ne contient pas de balises HTML dans les descriptions', () => {
        expect(room.shortDescription).not.toMatch(/<[^>]+>/)
        expect(room.longDescription).not.toMatch(/<[^>]+>/)
      })
    })
  })
})

// ---------------------------------------------------------------------------
// Chambre familiale-6 — règles métier spécifiques (issue #5)
// ---------------------------------------------------------------------------

describe('chambre familiale-6 — règles métier (issue #5)', () => {
  const room = rooms.find((r) => r.id === 'familiale-6')

  it('existe dans le catalogue', () => {
    expect(room).toBeDefined()
  })

  it('est positionnée à l\'index 2 (après executive, avant presidentielle)', () => {
    const index = rooms.findIndex((r) => r.id === 'familiale-6')
    expect(index).toBe(2)
  })

  it('a un pricePerNight de 489 €', () => {
    expect(room.pricePerNight).toBe(489)
  })

  it('a une surface de 55 m²', () => {
    expect(room.surface).toBe(55)
  })

  it('a un maxGuests de 6', () => {
    expect(room.maxGuests).toBe(6)
  })

  it('a maxGuests strictement supérieur à celui de la Suite Exécutive (2)', () => {
    const executive = rooms.find((r) => r.id === 'executive')
    expect(room.maxGuests).toBeGreaterThan(executive.maxGuests)
  })

  it('a maxGuests supérieur à celui de la Suite Présidentielle (4)', () => {
    const presidentielle = rooms.find((r) => r.id === 'presidentielle')
    expect(room.maxGuests).toBeGreaterThan(presidentielle.maxGuests)
  })

  it('a un pricePerNight entre executive (289) et presidentielle (689)', () => {
    const executive = rooms.find((r) => r.id === 'executive')
    const presidentielle = rooms.find((r) => r.id === 'presidentielle')
    expect(room.pricePerNight).toBeGreaterThan(executive.pricePerNight)
    expect(room.pricePerNight).toBeLessThan(presidentielle.pricePerNight)
  })
})

// ---------------------------------------------------------------------------
// getRoomById — logique métier
// ---------------------------------------------------------------------------

describe('getRoomById', () => {
  it('retourne la chambre correspondante pour un id valide', () => {
    const room = getRoomById('classique')
    expect(room).toBeDefined()
    expect(room.id).toBe('classique')
  })

  it('retourne la chambre familiale-6 par son id', () => {
    const room = getRoomById('familiale-6')
    expect(room).toBeDefined()
    expect(room.id).toBe('familiale-6')
  })

  it('retourne undefined pour un id inconnu', () => {
    expect(getRoomById('inexistante')).toBeUndefined()
  })

  it('retourne undefined pour une string vide', () => {
    expect(getRoomById('')).toBeUndefined()
  })

  it('retourne undefined pour undefined en entrée', () => {
    expect(getRoomById(undefined)).toBeUndefined()
  })

  it('retourne undefined pour null en entrée', () => {
    expect(getRoomById(null)).toBeUndefined()
  })

  it('est sensible à la casse (Classique ≠ classique)', () => {
    expect(getRoomById('Classique')).toBeUndefined()
  })

  it('est sensible aux tirets (familiale6 ≠ familiale-6)', () => {
    expect(getRoomById('familiale6')).toBeUndefined()
  })

  it('retourne l\'objet par référence (même instance que rooms[])', () => {
    const room = getRoomById('executive')
    expect(room).toBe(rooms.find((r) => r.id === 'executive'))
  })

  it('retourne toutes les chambres du catalogue sans erreur', () => {
    rooms.forEach((r) => {
      expect(getRoomById(r.id)).toBeDefined()
    })
  })
})
