import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app'
import { enableMocks } from './http/mocks'

import './index.css'

enableMocks().then(() => {
  // biome-ignore lint/style/noNonNullAssertion: ignore
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
