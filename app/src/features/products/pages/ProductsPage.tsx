import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";

export const ProductsPage = () => {
    const { products, loading, error } = useProducts()

    if (loading) return <p>Loading products...</p>
    if (error) return <p>{error}</p>

    return (
        <div style={{padding: "20px"}}>
            <h1>
                Products
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "16px",
                    marginTop: "20px"
                }}
            >
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
    )
}