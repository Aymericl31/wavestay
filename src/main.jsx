import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './routes'
import { I18nProvider } from './i18n/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </StrictMode>,
)
