import { createBrowserRouter } from "react-router-dom";
import { ProductsPage } from "./src/features/products/pages/ProductsPage";
import { ProductDetailPage } from "./src/features/products/pages/ProductDetailPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductsPage />,
        errorElement: <p>Something went wrong loading  products.</p>
    },
    {
        path: "/products/:id",
        element: <ProductDetailPage />
    }
])