import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import HomePage from '../pages/HomePage'

describe('HomePage', () => {
  it('affiche "4 chambres disponibles"', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText(/4 chambres disponibles/i)).toBeInTheDocument()
  })

  it('affiche la carte de la chambre familiale', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText('Chambre familiale 6 personnes')).toBeInTheDocument()
  })

  it('le sélecteur voyageurs propose l\'option 6 personnes', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const select = screen.getByRole('combobox')
    const options = Array.from(select.querySelectorAll('option')).map((o) => Number(o.value))
    expect(options).toContain(6)
  })

  it('le sélecteur voyageurs contient les options 1 à 6', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const select = screen.getByRole('combobox')
    const values = Array.from(select.querySelectorAll('option')).map((o) => Number(o.value))
    expect(values).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('le sélecteur ne propose pas l\'option 6 en double', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const select = screen.getByRole('combobox')
    const values = Array.from(select.querySelectorAll('option')).map((o) => Number(o.value))
    const count6 = values.filter((v) => v === 6).length
    expect(count6).toBe(1)
  })
})
