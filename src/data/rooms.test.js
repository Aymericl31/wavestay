import { describe, it, expect } from 'vitest'
import { rooms, getRoomById } from './rooms.js'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Vérifie qu'une URL Unsplash est bien formée selon les contraintes du projet :
 * - Préfixe  : https://images.unsplash.com/photo-
 * - Contient : w=1200
 * - Contient : q=80
 *
 * @param {string} url
 * @returns {boolean}
 */
function isValidUnsplashUrl(url) {
  return (
    typeof url === 'string' &&
    url.startsWith('https://images.unsplash.com/photo-') &&
    url.includes('w=1200') &&
    url.includes('q=80')
  )
}

/**
 * Vérifie qu'une chaîne ne contient aucune balise HTML.
 *
 * @param {string} text
 * @returns {boolean}
 */
function hasNoHtmlTags(text) {
  return !/<[^>]+>/.test(text)
}

// ---------------------------------------------------------------------------
// Suite principale — catalogue rooms[]
// ---------------------------------------------------------------------------

describe('rooms — catalogue statique', () => {
  // -------------------------------------------------------------------------
  // Structure du catalogue
  // -------------------------------------------------------------------------

  it('contient exactement 4 chambres', () => {
    expect(rooms).toHaveLength(4)
  })

  it("les ids sont dans l'ordre attendu", () => {
    expect(rooms.map((r) => r.id)).toEqual([
      'classique',
      'executive',
      'familiale-6',
      'presidentielle',
    ])
  })

  it('les prix sont triés en ordre croissant', () => {
    const prices = rooms.map((r) => r.pricePerNight)
    expect(prices).toEqual([189, 289, 489, 689])
  })

  // -------------------------------------------------------------------------
  // Invariants communs à toutes les chambres
  // -------------------------------------------------------------------------

  describe.each(rooms)('chambre "$id" — invariants communs', (room) => {
    it('id est en kebab-case', () => {
      expect(room.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    })

    it('name est une chaîne non vide', () => {
      expect(typeof room.name).toBe('string')
      expect(room.name.length).toBeGreaterThan(0)
    })

    it('shortDescription sans balise HTML', () => {
      expect(hasNoHtmlTags(room.shortDescription)).toBe(true)
    })

    it('longDescription sans balise HTML', () => {
      expect(hasNoHtmlTags(room.longDescription)).toBe(true)
    })

    it('pricePerNight est un entier positif', () => {
      expect(Number.isInteger(room.pricePerNight)).toBe(true)
      expect(room.pricePerNight).toBeGreaterThan(0)
    })

    it('surface est un entier positif', () => {
      expect(Number.isInteger(room.surface)).toBe(true)
      expect(room.surface).toBeGreaterThan(0)
    })

    it('maxGuests est un entier >= 1', () => {
      expect(Number.isInteger(room.maxGuests)).toBe(true)
      expect(room.maxGuests).toBeGreaterThanOrEqual(1)
    })

    it('images contient exactement 4 URLs', () => {
      expect(room.images).toHaveLength(4)
    })

    it('chaque image est une URL Unsplash valide', () => {
      for (const url of room.images) {
        expect(isValidUnsplashUrl(url)).toBe(true)
      }
    })

    it('amenities contient au moins 5 items', () => {
      expect(room.amenities.length).toBeGreaterThanOrEqual(5)
    })

    it('aucune amenity ne contient de trailing whitespace', () => {
      for (const amenity of room.amenities) {
        expect(amenity).toBe(amenity.trimEnd())
      }
    })
  })

  // -------------------------------------------------------------------------
  // Chambre familiale-6 — contrats spécifiques (issue #5)
  // -------------------------------------------------------------------------

  describe("chambre 'familiale-6' — contrats spécifiques", () => {
    const familiale = rooms[2]

    it("est positionnée à l'index 2", () => {
      expect(familiale.id).toBe('familiale-6')
    })

    it('pricePerNight === 489', () => {
      expect(familiale.pricePerNight).toBe(489)
    })

    it('surface === 55', () => {
      expect(familiale.surface).toBe(55)
    })

    it('maxGuests === 6', () => {
      expect(familiale.maxGuests).toBe(6)
    })

    it('maxGuests > executive.maxGuests (2)', () => {
      const executive = rooms.find((r) => r.id === 'executive')
      expect(familiale.maxGuests).toBeGreaterThan(executive.maxGuests)
    })

    it('maxGuests > presidentielle.maxGuests (4)', () => {
      const presidentielle = rooms.find((r) => r.id === 'presidentielle')
      expect(familiale.maxGuests).toBeGreaterThan(presidentielle.maxGuests)
    })

    it('prix > executive.pricePerNight (289)', () => {
      const executive = rooms.find((r) => r.id === 'executive')
      expect(familiale.pricePerNight).toBeGreaterThan(executive.pricePerNight)
    })

    it('prix < presidentielle.pricePerNight (689)', () => {
      const presidentielle = rooms.find((r) => r.id === 'presidentielle')
      expect(familiale.pricePerNight).toBeLessThan(presidentielle.pricePerNight)
    })

    it('images contient exactement 4 URLs Unsplash valides', () => {
      expect(familiale.images).toHaveLength(4)
      for (const url of familiale.images) {
        expect(isValidUnsplashUrl(url)).toBe(true)
      }
    })

    it('amenities contient au moins 5 items sans trailing whitespace', () => {
      expect(familiale.amenities.length).toBeGreaterThanOrEqual(5)
      for (const amenity of familiale.amenities) {
        expect(amenity).toBe(amenity.trimEnd())
      }
    })

    it('shortDescription sans balise HTML', () => {
      expect(hasNoHtmlTags(familiale.shortDescription)).toBe(true)
    })

    it('longDescription sans balise HTML', () => {
      expect(hasNoHtmlTags(familiale.longDescription)).toBe(true)
    })
  })
})

// ---------------------------------------------------------------------------
// Suite principale — getRoomById()
// ---------------------------------------------------------------------------

describe('getRoomById', () => {
  // -------------------------------------------------------------------------
  // Cas nominaux
  // -------------------------------------------------------------------------

  it("retourne la chambre 'classique'", () => {
    const room = getRoomById('classique')
    expect(room).toBeDefined()
    expect(room.id).toBe('classique')
  })

  it("retourne la chambre 'executive'", () => {
    const room = getRoomById('executive')
    expect(room).toBeDefined()
    expect(room.id).toBe('executive')
  })

  it("retourne la chambre 'familiale-6'", () => {
    const room = getRoomById('familiale-6')
    expect(room).toBeDefined()
    expect(room.id).toBe('familiale-6')
  })

  it("retourne la même référence que rooms[2] pour 'familiale-6'", () => {
    expect(getRoomById('familiale-6')).toBe(rooms[2])
  })

  it("retourne la chambre 'presidentielle'", () => {
    const room = getRoomById('presidentielle')
    expect(room).toBeDefined()
    expect(room.id).toBe('presidentielle')
  })

  it("retourne la même référence que rooms[3] pour 'presidentielle' (index post-insertion)", () => {
    expect(getRoomById('presidentielle')).toBe(rooms[3])
  })

  // -------------------------------------------------------------------------
  // Cas limites et types incorrects
  // -------------------------------------------------------------------------

  it('retourne undefined pour un id inexistant', () => {
    expect(getRoomById('inexistant')).toBeUndefined()
  })

  it('retourne undefined pour une chaîne vide', () => {
    expect(getRoomById('')).toBeUndefined()
  })

  it('retourne undefined pour undefined', () => {
    expect(getRoomById(undefined)).toBeUndefined()
  })

  it('retourne undefined pour null', () => {
    expect(getRoomById(null)).toBeUndefined()
  })

  it('retourne undefined pour un nombre', () => {
    expect(getRoomById(42)).toBeUndefined()
  })

  it('retourne undefined pour un objet', () => {
    expect(getRoomById({})).toBeUndefined()
  })

  it('est sensible à la casse — "Classique" ne correspond pas à "classique"', () => {
    expect(getRoomById('Classique')).toBeUndefined()
  })

  it('est sensible aux tirets — "familiale6" ne correspond pas à "familiale-6"', () => {
    expect(getRoomById('familiale6')).toBeUndefined()
  })

  it('est sensible aux espaces — " classique" ne correspond pas à "classique"', () => {
    expect(getRoomById(' classique')).toBeUndefined()
  })
})
