import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";

export const ProductsPage = () => {
    const { products, loading, error } = useProducts()

    if (loading) return <p>Loading products...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="products-page-container"
            style={{
                display: "flex",
                width: "100%",
                border: "3px solid red"
            }}
        >
            <div style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "20px",
                textAlign: "center",
                border: "3px solid black",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1 style={{ 
                    textAlign: "center",
                    marginBottom: "10px" 
                }}>
                    Products
                </h1>

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        marginTop: "30px",
                        justifyContent: "center"
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
        </div>
    )
}