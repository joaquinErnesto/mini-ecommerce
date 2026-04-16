import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./assets/styles/global.css"

import { RouterProvider } from 'react-router-dom'
import { router } from "../routes.tsx"

import { CartProvider } from './features/cart/context/CartProvider.tsx'
import { CheckoutProvider } from './features/checkout/context/CheckoutProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
        <CheckoutProvider>
          <RouterProvider router={router}/>
        </CheckoutProvider>
    </CartProvider>
  </StrictMode>,
)
