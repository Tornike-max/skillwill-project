
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/UserContextProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { NextUIProvider } from '@nextui-org/system'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NextUIProvider>
          <App />
        </NextUIProvider>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
