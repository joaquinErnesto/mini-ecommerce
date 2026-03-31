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
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            {/* Image */}
            <img 
                src={product.image} 
                alt={product.title} 
                style={{
                    height: "150px",
                    objectFit: "contain",
                    marginBottom: "10px"
                }}
            />

            {/* Title */}
            <h3
                style={{
                    fontSize: "16px",
                    marginBottom: "8px"
                }}
            >
                {product.title}
            </h3>

            {/* Price */}
            <p
                style={{
                    fontWeight: "bold",
                    marginBottom: "10px"
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
                    padding: "8px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#333",
                    color: "#fff",
                    cursor: "pointer"
                }}
            >
                Add to Cart
            </button>
        </div>
    )
}