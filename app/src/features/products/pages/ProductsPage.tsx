import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton/ProductCardSkeleton";

import "./ProductsPage.css"
import { useCart } from "../../cart/context/useCart";

export const ProductsPage = () => {
    const { products, loading, error } = useProducts()
    const { addToCart } = useCart() 

    if (loading) {
        return (
            <div className="products-page-container">
                <div>
                    <h1>Products</h1>

                    <div>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error) return <p>{error}</p>

    return (
        <div className="products-page-container">
            <div>
                <h1>
                    Products
                </h1>

                <div>
                    {Array.isArray(products) && products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
            
                            onAddToCart={(prod) => 
                                addToCart(prod)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}