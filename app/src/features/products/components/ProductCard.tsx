import type { Product } from "../types/products.types";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css"

interface Props {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: Props) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/products/${product.id}`)
    }

    const handleAddToCart = () => {
        if (onAddToCart) onAddToCart(product)
    }

    return (
        <div
            className="product-card-container"
            onClick={handleClick}
            onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-5px)"
                event.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, .1)"
            }}
            onMouseLeave={(event => {
                event.currentTarget.style.transform = "translateY(0)"
                event.currentTarget.style.boxShadow = "none"
            })}
        >
            <div className="product-card-image-container">
                {/* Image */}
                <img 
                    src={product.image} 
                    alt={product.title} 
                />
            </div>

            {/* Title */}
            <h3>
                {product.title}
            </h3>

            {/* Description */}
            <p className="product-card-description">
                {product.description}
            </p>

            {/* Price */}
            <p>
                ${product.price}
            </p>

            {/* Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation() // prevents triggering card click
                    handleAddToCart()
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(80, 80, 80, 1)"
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--product-button-color)"
                }}
            >
                Add to Cart
            </button>
        </div>
    )
}