import { describe, it, expect } from 'vitest'
import { rooms, getRoomById } from '../data/rooms'

describe('rooms data', () => {
  it('contient 4 chambres', () => {
    expect(rooms).toHaveLength(4)
  })

  it('inclut la chambre familiale avec le nom exact', () => {
    const familiale = rooms.find((r) => r.id === 'familiale')
    expect(familiale).toBeDefined()
    expect(familiale.name).toBe('Chambre familiale 6 personnes')
  })

  it('getRoomById("familiale") retourne correctement la chambre', () => {
    const room = getRoomById('familiale')
    expect(room).toBeDefined()
    expect(room.id).toBe('familiale')
    expect(room.name).toBe('Chambre familiale 6 personnes')
  })

  it('la chambre familiale supporte maxGuests: 6', () => {
    const room = getRoomById('familiale')
    expect(room.maxGuests).toBe(6)
  })

  it('la chambre familiale a un prix entre 450 et 550€/nuit', () => {
    const room = getRoomById('familiale')
    expect(room.pricePerNight).toBeGreaterThanOrEqual(450)
    expect(room.pricePerNight).toBeLessThanOrEqual(550)
  })

  it('la chambre familiale a exactement 4 images Unsplash', () => {
    const room = getRoomById('familiale')
    expect(room.images).toHaveLength(4)
    room.images.forEach((url) => {
      expect(url).toMatch(/^https:\/\/images\.unsplash\.com\//)
    })
  })

  it('la chambre familiale a les champs requis définis', () => {
    const room = getRoomById('familiale')
    expect(room.shortDescription).toBeTruthy()
    expect(room.longDescription).toBeTruthy()
    expect(room.surface).toBeGreaterThan(0)
    expect(room.bedType).toBeTruthy()
    expect(Array.isArray(room.amenities)).toBe(true)
    expect(room.amenities.length).toBeGreaterThan(0)
  })

  it('la chambre familiale a un tarif supérieur à la Suite Exécutive', () => {
    const executive = getRoomById('executive')
    const familiale = getRoomById('familiale')
    expect(familiale.pricePerNight).toBeGreaterThan(executive.pricePerNight)
  })

  it('la chambre familiale a un tarif inférieur à la Suite Présidentielle', () => {
    const presidentielle = getRoomById('presidentielle')
    const familiale = getRoomById('familiale')
    expect(familiale.pricePerNight).toBeLessThan(presidentielle.pricePerNight)
  })

  it('getRoomById retourne undefined pour un id inconnu', () => {
    expect(getRoomById('inexistant')).toBeUndefined()
  })
})
