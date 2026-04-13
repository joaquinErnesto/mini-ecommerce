import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./src/components/layout/MainLayout";

import { ProductsPage } from "./src/features/products/pages/ProductsPage";
import { ProductDetailPage } from "./src/features/products/pages/ProductDetailPage";
import { HomePage } from "./src/components/home/HomePage/HomePage";

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
                path: "products",
                element: <ProductsPage />,
                errorElement: <p>Something went wrong loading products.</p>
            },
            {
                path: "products/:id",
                element: <ProductDetailPage />,
                errorElement: <p>Something went wrong loading product.</p>
            }
        ]
    }
])