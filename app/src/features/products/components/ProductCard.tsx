import type { Product } from "../types/products.types";

interface Props {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onClick?: (id: number) => void;
}

export const ProductCard = ({ product, onAddToCart, onClick }: Props) => {
    const handleClick = () => {
        if (onClick) onClick(product.id)
    }

    const handleAddToCart = () => {
        if (onAddToCart) onAddToCart(product)
    }

    return (
        <div
            onClick={handleClick}
            style={{
                flex: "0 1 220px",
                maxWidth: "250px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                transition: "transform .2s ease, box-shadow .2s ease"
            }}
            onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-5px)"
                event.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, .1)"
            }}
            onMouseLeave={(event => {
                event.currentTarget.style.transform = "translateY(0)"
                event.currentTarget.style.boxShadow = "none"
            })}
        >
            <div
                style={{
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px"
                }}
            >
                {/* Image */}
                <img 
                    src={product.image} 
                    alt={product.title} 
                    style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain"
                    }}
                />
            </div>

            {/* Title */}
            <h3
                style={{
                    fontSize: "14px",
                    marginBottom: "8px",
                    lineHeight: "1.4",
                    height: "40px",
                    overflow: "hidden"
                }}
            >
                {product.title}
            </h3>

            {/* Price */}
            <p
                style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#2c7a7b"
                }}
            >
                ${product.price}
            </p>

            {/* Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation() // prevents triggering card click
                    handleAddToCart()
                }}
                style={{
                    padding: "10px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "#333",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "background .2 ease"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#555"
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#333"
                }}
            >
                Add to Cart
            </button>
        </div>
    )
}