import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./src/components/layout/MainLayout";

import { ProductsPage } from "./src/features/products/pages/ProductsPage";
import { ProductDetailPage } from "./src/features/products/pages/ProductDetailPage";
import { HomePage } from "./src/components/home/HomePage/HomePage";
import { PrivacyPage } from "./src/components/privacy/PrivacyPage/PrivacyPage";
import { TermsPage } from "./src/components/terms/TermsPage/TermsPage";
import { ContactPage } from "./src/components/contact/ContactPage";
import { AboutPage } from "./src/components/about/AboutPage";
import { CartPage } from "./src/features/cart/pages/CartPage";
import { CheckoutPage } from "./src/features/checkout/pages/CheckoutPage";
import { OrderSuccessPage } from "./src/features/checkout/pages/OrderSuccessPage";
import { CheckoutGuard } from "./src/features/checkout/guards/CheckoutGuard";
import { LoginPage } from "./src/features/auth/pages/LoginPage";
import { SignUpPage } from "./src/features/sign-up/pages/SignUpPage";
import { ProfilePage } from "./src/features/profile/pages/ProfilePage";
import { OrdersPage } from "./src/features/orders/pages/OrdersPage";
import { OrderDetailPage } from "./src/features/orders/pages/OrderDetailPage";

import { ProtectedRoute } from "./src/features/auth/guards/ProtectedRoutes";
import { GuestRoute } from "./src/features/auth/guards/GuestRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <p>Something went wrong</p>,
        children: [
            {
                index: true,
                element: <HomePage />,
                errorElement: <p>Something went wrong loading products.</p>
            },
            {
                path: "privacy",
                element: <PrivacyPage />,
                errorElement: <p>Something went wrong loading privacy page.</p>
            },
            {
                path: "terms",
                element: <TermsPage />,
                errorElement: <p>Something went wrong loading terms page.</p>
            },
            {
                path: "contact",
                element: <ContactPage />,
                errorElement: <p>Something went wrong loading contact page.</p>
            },
            {
                path: "about",
                element: <AboutPage />,
                errorElement: <p>Something went wrong loading about page.</p> 
            },
            {
                path: "products",
                element: <ProductsPage />,
                errorElement: <p>Something went wrong loading products.</p>
            },
            {
                path: "products/:id",
                element: <ProductDetailPage />,
                errorElement: <p>Something went wrong loading product.</p>
            },
            {
                path: "cart",
                element: <CartPage />,
                errorElement: <p>Something went wrong loading cart.</p> 
            },
            {
                path: "checkout",
                element: (
                    <ProtectedRoute>
                        <CheckoutGuard>
                            <CheckoutPage />
                        </CheckoutGuard>
                    </ProtectedRoute>
                ),
                errorElement: <p>Something went wrong loading checkout.</p>
            },
            {
                path: "checkout/success",
                element: (
                    <ProtectedRoute>
                        <OrderSuccessPage />
                    </ProtectedRoute>
                ),
                errorElement: (
                    <p>
                        Something went wrong loading order confirmation.
                    </p>
                )
            },
            {
                path: "login",
                element: (
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                ),
                errorElement: <p>Something went wrong loading login.</p>
            },
            {
                path: "signup",
                element: (
                    <GuestRoute>
                        <SignUpPage />
                    </GuestRoute>
                ),
                errorElement: <p>Something went wrong loading sign up.</p>
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
                errorElement: <p>Something went wrong loading profile.</p>
            },
            {
                path: "profile/orders",
                element: (
                    <ProtectedRoute>
                        <OrdersPage />
                    </ProtectedRoute>
                ),
                errorElement: <p>Something went wrong loading orders.</p>
            },
            {
                path: "profile/orders/:id",
                element: (
                    <ProtectedRoute>
                        <OrderDetailPage />
                    </ProtectedRoute>
                ),
                errorElement: <p>Something went wrong loading order details.</p>
            }
        ]
    }
])