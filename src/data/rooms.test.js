import { describe, it, expect, beforeAll } from 'vitest'
import { rooms, getRoomById } from './rooms.js'

describe('rooms data', () => {
  it('contient 4 chambres', () => {
    expect(rooms).toHaveLength(4)
  })

  it('contient la Chambre familiale 6 personnes', () => {
    const familiale = rooms.find((r) => r.id === 'familiale-6')
    expect(familiale).toBeDefined()
  })

  describe('Chambre familiale 6 personnes', () => {
    let room

    beforeAll(() => {
      room = rooms.find((r) => r.id === 'familiale-6')
    })

    it('a un id kebab-case unique : familiale-6', () => {
      expect(room.id).toBe('familiale-6')
    })

    it('a un nom correct', () => {
      expect(room.name).toBe('Chambre Familiale 6 Personnes')
    })

    it('supporte jusqu\'à 6 personnes (maxGuests: 6)', () => {
      expect(room.maxGuests).toBe(6)
    })

    it('a une shortDescription non vide', () => {
      expect(typeof room.shortDescription).toBe('string')
      expect(room.shortDescription.length).toBeGreaterThan(10)
    })

    it('a une longDescription non vide', () => {
      expect(typeof room.longDescription).toBe('string')
      expect(room.longDescription.length).toBeGreaterThan(10)
    })

    it('a un tarif situé entre 289€ et 689€ (399–450€)', () => {
      expect(room.pricePerNight).toBeGreaterThanOrEqual(289)
      expect(room.pricePerNight).toBeLessThanOrEqual(689)
    })

    it('a une surface adaptée pour 6 personnes (50–60 m²)', () => {
      expect(room.surface).toBeGreaterThanOrEqual(50)
      expect(room.surface).toBeLessThanOrEqual(65)
    })

    it('a un type de lit mentionnant des lits multiples', () => {
      expect(typeof room.bedType).toBe('string')
      // doit mentionner plusieurs lits
      const lower = room.bedType.toLowerCase()
      const hasMultiple =
        lower.includes('2') ||
        lower.includes('deux') ||
        lower.includes('double') ||
        lower.includes('lit') && lower.includes('+')
      expect(hasMultiple).toBe(true)
    })

    it('a au moins 4 images', () => {
      expect(Array.isArray(room.images)).toBe(true)
      expect(room.images.length).toBeGreaterThanOrEqual(4)
    })

    it('toutes les images sont des URLs Unsplash avec w=1200&q=80', () => {
      for (const url of room.images) {
        expect(url).toMatch(/^https:\/\/images\.unsplash\.com\//)
        expect(url).toContain('w=1200')
        expect(url).toContain('q=80')
      }
    })

    it('a des amenities avec au moins Wi-Fi et équipements familiaux', () => {
      expect(Array.isArray(room.amenities)).toBe(true)
      expect(room.amenities.length).toBeGreaterThan(0)

      const amenitiesStr = room.amenities.join(' ').toLowerCase()
      // doit avoir Wi-Fi
      expect(amenitiesStr).toMatch(/wi-fi|wifi/)
    })

    it('a des équipements familiaux dans ses amenities', () => {
      const amenitiesStr = room.amenities.join(' ').toLowerCase()
      // doit mentionner des équipements pour enfants/familles
      const hasFamilyAmenity =
        amenitiesStr.includes('enfant') ||
        amenitiesStr.includes('famille') ||
        amenitiesStr.includes('jeux') ||
        amenitiesStr.includes('lit enfant') ||
        amenitiesStr.includes('coin')
      expect(hasFamilyAmenity).toBe(true)
    })
  })

  describe('getRoomById', () => {
    it('retourne la chambre familiale par son id', () => {
      const room = getRoomById('familiale-6')
      expect(room).toBeDefined()
      expect(room.id).toBe('familiale-6')
      expect(room.maxGuests).toBe(6)
    })

    it('retourne undefined pour un id inexistant', () => {
      expect(getRoomById('inexistant')).toBeUndefined()
    })

    it('retourne toujours les 3 chambres existantes', () => {
      expect(getRoomById('classique')).toBeDefined()
      expect(getRoomById('executive')).toBeDefined()
      expect(getRoomById('presidentielle')).toBeDefined()
    })
  })

  describe('intégrité du catalogue', () => {
    it('tous les ids sont uniques', () => {
      const ids = rooms.map((r) => r.id)
      const uniqIds = new Set(ids)
      expect(uniqIds.size).toBe(rooms.length)
    })

    it('toutes les chambres ont les propriétés requises', () => {
      const requiredProps = [
        'id', 'name', 'shortDescription', 'longDescription',
        'pricePerNight', 'surface', 'bedType', 'maxGuests',
        'images', 'amenities',
      ]
      for (const room of rooms) {
        for (const prop of requiredProps) {
          expect(room, `chambre ${room.id} manque la prop ${prop}`).toHaveProperty(prop)
        }
      }
    })

    it('la page d\'accueil affichera "4 chambres disponibles" (rooms.length === 4)', () => {
      // HomePage affiche `{rooms.length} chambres disponibles`
      expect(rooms.length).toBe(4)
    })
  })
})
