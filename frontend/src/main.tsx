import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './Routes.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const rootDiv = document.getElementById("root")
rootDiv?.setAttribute("class", "flex flex-col min-h-screen relative")

const queryClient = new QueryClient()

ReactDOM.createRoot(rootDiv!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </React.StrictMode>,
)
