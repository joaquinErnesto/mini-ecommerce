import { Link } from "react-router-dom"

import type { Product } from "../../types/products.types"

import {
    formatCategory,
    formatPrice,
    getOriginalPrice,
} from "../../utils/productFormat"

import { RatingStars } from "../RatingStars/RatingStars"

import "./ProductCard.css"

interface Props {
    product: Product
    onAddToCart: (product: Product) => void
}

export const ProductCard = ({ product, onAddToCart }: Props) => {
    const originalPrice = getOriginalPrice(
        product.price,
        product.discountPercentage
    )

    const isOutOfStock =
        typeof product.stock === "number" && product.stock <= 0

    return (
        <article className="product-card">
            <Link
                className="product-card-link"
                to={`/products/${product.id}`}
            >
                <div className="product-card-media">
                    <img src={product.image} alt="" loading="lazy" />

                    {product.discountPercentage ? (
                        <span className="product-card-badge">
                            {Math.round(product.discountPercentage)}% off
                        </span>
                    ) : null}

                    <span className="product-card-arrow" aria-hidden="true">
                        <span className="material-symbols-outlined">
                            north_east
                        </span>
                    </span>
                </div>

                <div className="product-card-body">
                    <div className="product-card-meta">
                        <span>{formatCategory(product.category)}</span>

                        {product.brand ? (
                            <span className="product-card-brand">
                                {product.brand}
                            </span>
                        ) : null}
                    </div>

                    <h3 className="product-card-title">{product.title}</h3>

                    {typeof product.rating === "number" ? (
                        <RatingStars
                            rating={product.rating}
                            size="sm"
                            showValue
                        />
                    ) : null}
                </div>
            </Link>

            <div className="product-card-foot">
                <div className="product-card-pricing">
                    <span className="product-card-price">
                        {formatPrice(product.price)}
                    </span>

                    {originalPrice ? (
                        <span className="product-card-old">
                            {formatPrice(originalPrice)}
                        </span>
                    ) : null}
                </div>

                <button
                    type="button"
                    className="product-card-add"
                    onClick={() => onAddToCart(product)}
                    aria-label={
                        isOutOfStock
                            ? `${product.title} is sold out`
                            : `Add ${product.title} to cart`
                    }
                    disabled={isOutOfStock}
                >
                    <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        {isOutOfStock ? "block" : "add"}
                    </span>

                    {isOutOfStock ? "Sold out" : "Add"}
                </button>
            </div>
        </article>
    )
}
