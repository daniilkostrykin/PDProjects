import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Если у тебя есть общий контекст (например, AppProvider), раскомментируй строки ниже:
// import { AppProvider } from '@/context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AppProvider> */}
      <App />
    {/* </AppProvider> */}
  </React.StrictMode>
)
