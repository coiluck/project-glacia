import { createContext } from 'react'

// .screen-viewport の実DOM
export const ScreenViewportContext = createContext<HTMLDivElement | null>(null)
