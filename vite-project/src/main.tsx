import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Loading from './components/Loading.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Suspense fallback={<Loading/>}>
      <App />
    </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
