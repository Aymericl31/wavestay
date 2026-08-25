import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import RoomDetailPage from '../pages/RoomDetailPage'

function renderWithRoute(roomId) {
  return render(
    <MemoryRouter initialEntries={[`/rooms/${roomId}`]}>
      <Routes>
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('RoomDetailPage — chambre familiale', () => {
  it('se charge sans erreur et affiche le nom de la chambre dans le h1', () => {
    renderWithRoute('familiale')
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Chambre familiale 6 personnes')
  })

  it('affiche la capacité maximale de 6 personnes', () => {
    renderWithRoute('familiale')
    expect(screen.getByText(/jusqu'à 6 personne/i)).toBeInTheDocument()
  })

  it('affiche la surface de la chambre', () => {
    renderWithRoute('familiale')
    // La surface "55 m²" apparaît dans le sous-titre et/ou la description
    const elements = screen.getAllByText(/55\s*m²/i)
    expect(elements.length).toBeGreaterThanOrEqual(1)
  })

  it('affiche les équipements de la chambre', () => {
    renderWithRoute('familiale')
    expect(screen.getByText(/Wi-Fi haut débit gratuit/i)).toBeInTheDocument()
  })

  it('affiche "Chambre introuvable" pour un id inexistant', () => {
    renderWithRoute('inexistant')
    expect(screen.getByText(/chambre introuvable/i)).toBeInTheDocument()
  })
})
