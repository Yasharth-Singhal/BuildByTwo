import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import '../styles.css'
import '../experience.css'

export default function mount(element) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode><HelmetProvider>{element}</HelmetProvider></React.StrictMode>,
  )
}
