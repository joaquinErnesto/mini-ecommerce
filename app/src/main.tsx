import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./assets/styles/global.css"

import { RouterProvider } from 'react-router-dom'
import { router } from "../routes.tsx"
import { Toaster } from 'react-hot-toast'

import { CartProvider } from './features/cart/context/CartProvider.tsx'
import { CheckoutProvider } from './features/checkout/context/CheckoutProvider.tsx'
import { AuthProvider } from './features/auth/context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <CheckoutProvider>
        <AuthProvider>

            {/* GLOBAL TOASTER */}
            <Toaster
              position="top-right"
              reverseOrder={false}
              gutter={12}
              toastOptions={{
                duration: 3000,

                style: {
                  background: "#1f1f1f",
                  color: "#ffffff",
                  border: "1px solid #444",
                  padding: "14px 16px",
                  borderRadius: "10px"
                },

                success: {
                  duration: 2500
                },

                error: {
                  duration: 4000
                }
              }}
            />

            <RouterProvider router={router} />
            
        </AuthProvider>
      </CheckoutProvider>
    </CartProvider>
  </StrictMode>,
)