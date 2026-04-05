import { createBrowserRouter } from "react-router-dom";
import { ProductsPage } from "./src/features/products/pages/ProductsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductsPage />,
        errorElement: <p>Something went wrong loading  products.</p>
    }
])