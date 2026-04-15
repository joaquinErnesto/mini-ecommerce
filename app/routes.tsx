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
                errorElement: <p>Something went wrong loading product.</p> 
            }
        ]
    }
])