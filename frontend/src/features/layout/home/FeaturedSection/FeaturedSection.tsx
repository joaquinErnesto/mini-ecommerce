import { Link } from "react-router-dom"

import type { Product } from "../../../products/types/products.types"

import {
    formatCategory,
    formatPrice,
    getOriginalPrice,
} from "../utils/productFormat"

interface Props {
    products: Product[]
    loading: boolean
    failed: boolean
    onRetry: () => void
}

const SLOTS = ["lead", "tall", "a", "b", "c"] as const

export const FeaturedSection = ({
    products,
    loading,
    failed,
    onRetry,
}: Props) => {
    return (
        <section
            className="home-featured"
            id="featured"
            aria-labelledby="home-featured-title"
        >
            <div className="home-section-head">
                <div>
                    <h2 id="home-featured-title">This week's picks</h2>

                    <p>
                        A handful of pieces we'd keep for ourselves. Fragrance,
                        furniture, and small everyday luxuries.
                    </p>
                </div>

                <Link className="home-section-link" to="/products">
                    See all products
                    <span
                        className="material-symbols-outlined"
                        aria-hidden="true"
                    >
                        arrow_forward
                    </span>
                </Link>
            </div>

            {loading ? (
                <>
                    <div className="home-featured-grid" aria-hidden="true">
                        {SLOTS.map((slot) => (
                            <div
                                key={slot}
                                className={`home-featured-card home-featured-slot--${slot} home-featured-card--skeleton`}
                            >
                                <div className="home-featured-media" />

                                <div className="home-featured-info">
                                    <div className="home-featured-copy">
                                        <span className="home-skeleton-line home-skeleton-line--xs" />
                                        <span className="home-skeleton-line home-skeleton-line--title" />
                                    </div>

                                    <span className="home-skeleton-line home-skeleton-line--price" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="home-visually-hidden" role="status">
                        Loading this week's picks
                    </p>
                </>
            ) : failed || products.length === 0 ? (
                <div className="home-featured-state" role="status">
                    <h3>We couldn't load this week's picks.</h3>

                    <p>
                        The request was interrupted. Try again, or browse the
                        full catalogue while we sort it out.
                    </p>

                    <div className="home-featured-state-actions">
                        <button
                            type="button"
                            className="home-button home-button--primary"
                            onClick={onRetry}
                        >
                            Try again
                        </button>

                        <Link className="home-section-link" to="/products">
                            Browse all products
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="home-featured-grid">
                    {products.slice(0, SLOTS.length).map((product, index) => {
                        const slot = SLOTS[index]
                        const isLead = slot === "lead"

                        const originalPrice = getOriginalPrice(
                            product.price,
                            product.discountPercentage
                        )

                        return (
                            <Link
                                key={product.id}
                                className={`home-featured-card home-featured-slot--${slot}`}
                                to={`/products/${product.id}`}
                            >
                                <div className="home-featured-media">
                                    <img
                                        src={product.image}
                                        alt=""
                                        loading={isLead ? "eager" : "lazy"}
                                    />

                                    {product.discountPercentage ? (
                                        <span className="home-featured-badge">
                                            {Math.round(product.discountPercentage)}% off
                                        </span>
                                    ) : null}

                                    <span
                                        className="home-featured-arrow"
                                        aria-hidden="true"
                                    >
                                        <span className="material-symbols-outlined">
                                            north_east
                                        </span>
                                    </span>
                                </div>

                                <div className="home-featured-info">
                                    <div className="home-featured-copy">
                                        <span className="home-featured-category">
                                            {formatCategory(product.category)}
                                        </span>

                                        <h3 className="home-featured-title">
                                            {product.title}
                                        </h3>

                                        {isLead ? (
                                            <p className="home-featured-description">
                                                {product.description}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div className="home-featured-pricing">
                                        <span className="home-featured-price">
                                            {formatPrice(product.price)}
                                        </span>

                                        {originalPrice ? (
                                            <span className="home-featured-old">
                                                {formatPrice(originalPrice)}
                                            </span>
                                        ) : null}
                                    </div>

                                    {isLead ? (
                                        <span className="home-featured-open">
                                            View product
                                            <span
                                                className="material-symbols-outlined"
                                                aria-hidden="true"
                                            >
                                                arrow_forward
                                            </span>
                                        </span>
                                    ) : null}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </section>
    )
}
