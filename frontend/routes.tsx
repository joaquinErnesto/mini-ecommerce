import { lazy } from "react";
import type { ComponentType } from "react";

import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./src/features/layout/main-layout/MainLayout";

/* Layouts and guards stay in the initial bundle: they render on every route. */
import { CheckoutGuard } from "./src/features/checkout/guards/CheckoutGuard";
import { ProtectedRoute } from "./src/features/auth/guards/ProtectedRoutes";
import { GuestRoute } from "./src/features/auth/guards/GuestRoutes";
import { AdminDashboardLayout } from "./src/features/admin/components/AdminDashboardLayout/AdminDashboardLayout";

/**
 * Every page is split into its own chunk, so the initial download only
 * contains the shell plus the page that is actually requested.
 */
function lazyPage<M, K extends keyof M>(
    loader: () => Promise<M>,
    name: K
) {
    return lazy(async () => ({
        default: (await loader())[name] as ComponentType
    }));
}

const HomePage = lazyPage(
    () => import("./src/features/layout/home/HomePage/HomePage"),
    "HomePage"
);

const PrivacyPage = lazyPage(
    () => import("./src/features/layout/privacy/PrivacyPage/PrivacyPage"),
    "PrivacyPage"
);

const TermsPage = lazyPage(
    () => import("./src/features/layout/terms/TermsPage/TermsPage"),
    "TermsPage"
);

const ContactPage = lazyPage(
    () => import("./src/features/layout/contact/ContactPage"),
    "ContactPage"
);

const AboutPage = lazyPage(
    () => import("./src/features/layout/about/AboutPage"),
    "AboutPage"
);

const ProductsPage = lazyPage(
    () => import("./src/features/products/pages/ProductsPage"),
    "ProductsPage"
);

const ProductDetailPage = lazyPage(
    () => import("./src/features/products/pages/ProductDetailPage"),
    "ProductDetailPage"
);

const CartPage = lazyPage(
    () => import("./src/features/cart/pages/CartPage"),
    "CartPage"
);

const CheckoutPage = lazyPage(
    () => import("./src/features/checkout/pages/CheckoutPage"),
    "CheckoutPage"
);

const OrderSuccessPage = lazyPage(
    () => import("./src/features/checkout/pages/OrderSuccessPage"),
    "OrderSuccessPage"
);

const LoginPage = lazyPage(
    () => import("./src/features/auth/pages/LoginPage"),
    "LoginPage"
);

const SignUpPage = lazyPage(
    () => import("./src/features/sign-up/pages/SignUpPage"),
    "SignUpPage"
);

const ProfilePage = lazyPage(
    () => import("./src/features/profile/pages/ProfilePage"),
    "ProfilePage"
);

const OrdersPage = lazyPage(
    () => import("./src/features/orders/pages/OrdersPage"),
    "OrdersPage"
);

const OrderDetailPage = lazyPage(
    () => import("./src/features/orders/pages/OrderDetailPage"),
    "OrderDetailPage"
);

const AdminDashboardPage = lazyPage(
    () => import("./src/features/admin/pages/AdminDashboardPage"),
    "AdminDashboardPage"
);

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
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute>
                        <AdminDashboardLayout />
                    </ProtectedRoute>
                ),
                errorElement: <p>Something went wrong loading the admin dashboard.</p>,
                children: [
                    {
                        index: true,
                        element: <AdminDashboardPage />,
                        errorElement: <p>Something went wrong loading dashboard data.</p>
                    }
                ]
            }
        ]
    }
])