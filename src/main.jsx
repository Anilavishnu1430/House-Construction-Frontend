import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchContext from './context/SearchContext.jsx'
import ThemeProvider from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="801141330130-64rf44bp21fkuj4kgm7eftv4l110rigb.apps.googleusercontent.com">
      <ThemeProvider>
      <SearchContext>
        <App />
      </SearchContext>
      </ThemeProvider>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
