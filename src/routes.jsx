import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import RoomDetailPage from './pages/RoomDetailPage'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'

function RootLayout() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'rooms/:id', Component: RoomDetailPage },
      { path: 'booking/:roomId', Component: BookingPage },
      { path: 'confirmation', Component: ConfirmationPage },
    ],
  },
])
