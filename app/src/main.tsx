import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import "./assets/styles/global.css"

import { RouterProvider } from 'react-router-dom'
import { router } from "../routes.tsx"

import { Toaster } from 'react-hot-toast'

import { CartProvider } from './features/cart/context/CartProvider.tsx'
import { CheckoutProvider } from './features/checkout/context/CheckoutProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <CheckoutProvider>

        <RouterProvider router={router} />

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,

            style: {
              background: "#1e1e1e",
              color: "#ffffff",
              border: "1px solid #333"
            }
          }}
        />

      </CheckoutProvider>
    </CartProvider>
  </StrictMode>,
)