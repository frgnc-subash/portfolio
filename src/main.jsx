import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Add loaded class after styles are ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('root').classList.add('loaded')
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
