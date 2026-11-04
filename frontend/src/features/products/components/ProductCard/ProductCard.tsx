import type { Product } from "../../types/products.types";
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
                className="product-card-button"
                onClick={(e) => {
                    e.stopPropagation() // prevents triggering card click
                    handleAddToCart()
                }}
            >
                Add to Cart
            </button>
        </div>
    )
}