import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.tsx'

// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
