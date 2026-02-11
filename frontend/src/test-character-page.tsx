import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TestCharacter from './test-character'

// Error logging
window.addEventListener('error', (e) => console.error('Global error:', e.error))
window.addEventListener('unhandledrejection', (e) => console.error('Unhandled rejection:', e.reason))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TestCharacter />
  </StrictMode>
)
