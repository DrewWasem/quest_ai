import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './test-error-boundary'
import TestR3F from './test-r3f'

window.addEventListener('error', (e) => {
  document.getElementById('errors')!.textContent += '\n[window] ' + e.message + ' at ' + e.filename + ':' + e.lineno
})

window.addEventListener('unhandledrejection', (e) => {
  document.getElementById('errors')!.textContent += '\n[promise] ' + e.reason
})

const root = createRoot(document.getElementById('root')!)
root.render(
  <div style={{ background: '#0F0A1A', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fredoka, sans-serif' }}>
    <h1 style={{ color: '#fbbf24', marginBottom: '12px', fontSize: '2rem' }}>Three.js Living Room — Proof of Concept</h1>
    <p style={{ color: '#B8A9D4', marginBottom: '20px' }}>Drag to orbit, scroll to zoom</p>
    <pre id="errors" style={{ color: '#ff6b6b', fontSize: '12px', maxWidth: '900px', whiteSpace: 'pre-wrap' }}></pre>
    <ErrorBoundary>
      <TestR3F />
    </ErrorBoundary>
  </div>
)
