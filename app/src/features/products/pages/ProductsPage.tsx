import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import "./ProductsPage.css"

export const ProductsPage = () => {
    const { products, loading, error } = useProducts()

    if (loading) return <p>Loading products...</p>
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
                            onClick={(id) => {
                                console.log("Navigate to product:", id)
                            }}
                            onAddToCart={(prod) => {
                                console.log("Add to cart:", prod)
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}