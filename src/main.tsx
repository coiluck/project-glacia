import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import ScreenFrame from './layouts/ScreenFrame'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScreenFrame>
      <RouterProvider router={router} />
    </ScreenFrame>
  </StrictMode>,
)
