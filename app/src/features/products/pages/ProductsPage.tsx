import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton/ProductCardSkeleton";

import "./ProductsPage.css";

import { useCart } from "../../cart/context/useCart";

export const ProductsPage = () => {
    const {
        products,
        loading,
        error,
        refetch
    } = useProducts();

    const { addToCart } = useCart();

    // LOADING STATE
    if (loading) {
        return (
            <div className="products-page-container">
                <div>
                    <h1>Products</h1>

                    <div className="products-grid">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ERROR STATE
    if (error) {
        return (
            <div className="products-page-container">
                <div className="products-state-container">
                    <h2>
                        Failed to load products
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        className="retry-button"
                        onClick={refetch}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // EMPTY STATE
    if (products.length === 0) {
        return (
            <div className="products-page-container">
                <div className="products-state-container">
                    <h2>
                        No products found
                    </h2>

                    <p>
                        There are currently no products available.
                    </p>

                    <button
                        className="retry-button"
                        onClick={refetch}
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    // SUCCESS STATE
    return (
        <div className="products-page-container">
            <div>
                <h1>
                    Products
                </h1>

                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};