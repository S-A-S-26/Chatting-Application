import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Loading from './components/Loading.tsx'
import { Provider } from 'react-redux'
import store from './store/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </BrowserRouter>
)

{/* <StrictMode> */ }
{/* </StrictMode> */ }
