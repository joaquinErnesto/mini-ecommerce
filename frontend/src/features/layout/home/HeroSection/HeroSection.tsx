import { Link } from "react-router-dom"

import type { Product } from "../../../products/types/products.types"

import {
    formatCategory,
    formatPrice,
    getOriginalPrice,
} from "../utils/productFormat"

interface Props {
    product: Product | null
    loading: boolean
    featuredCount: number
}

export const HeroSection = ({ product, loading, featuredCount }: Props) => {
    const originalPrice = product
        ? getOriginalPrice(product.price, product.discountPercentage)
        : null

    return (
        <section className="home-hero" aria-labelledby="home-hero-title">
            <div className="home-hero-inner">
                <div className="home-hero-copy">
                    <p className="home-hero-kicker">
                        <span className="home-hero-kicker-dot" aria-hidden="true" />
                        This week's edit
                    </p>

                    <h1 id="home-hero-title" className="home-hero-title">
                        The short<br />
                        list<span className="home-hero-title-accent">.</span>
                    </h1>

                    <p className="home-hero-lede">
                        Fragrance, furniture, and small luxuries that earn their
                        place. A short, considered edit, chosen by hand.
                    </p>

                    <div className="home-hero-actions">
                        <Link
                            className="home-button home-button--primary"
                            to="/products"
                        >
                            Shop all products
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                arrow_forward
                            </span>
                        </Link>

                        <a
                            className="home-button home-button--ghost"
                            href="#featured"
                        >
                            See this week's picks
                        </a>
                    </div>

                    <p className="home-hero-note">
                        {featuredCount > 0
                            ? `${featuredCount + 1} pieces in this week's edit.`
                            : "A short list, refreshed as the shop changes."}
                    </p>
                </div>

                <div className="home-hero-visual">
                    {loading ? (
                        <div
                            className="home-hero-card home-hero-card--skeleton"
                            aria-hidden="true"
                        >
                            <div className="home-hero-card-media" />

                            <div className="home-hero-card-info">
                                <span className="home-skeleton-line home-skeleton-line--xs" />
                                <span className="home-skeleton-line home-skeleton-line--title" />
                                <span className="home-skeleton-line home-skeleton-line--price" />
                            </div>
                        </div>
                    ) : product ? (
                        <Link
                            className="home-hero-card"
                            to={`/products/${product.id}`}
                        >
                            <div className="home-hero-card-media">
                                <img
                                    src={product.image}
                                    alt=""
                                    loading="eager"
                                />

                                <span className="home-hero-card-pick">
                                    This week's pick
                                </span>

                                {product.rating ? (
                                    <span className="home-hero-card-rating">
                                        <span
                                            className="material-symbols-outlined"
                                            aria-hidden="true"
                                        >
                                            star
                                        </span>
                                        {product.rating.toFixed(1)}
                                    </span>
                                ) : null}

                                <span
                                    className="home-hero-card-go"
                                    aria-hidden="true"
                                >
                                    <span className="material-symbols-outlined">
                                        north_east
                                    </span>
                                </span>
                            </div>

                            <div className="home-hero-card-info">
                                <span className="home-hero-card-category">
                                    {formatCategory(product.category)}
                                </span>

                                <h2>{product.title}</h2>

                                <div className="home-hero-card-row">
                                    <span className="home-hero-card-price">
                                        {formatPrice(product.price)}
                                    </span>

                                    {originalPrice ? (
                                        <span className="home-hero-card-old">
                                            {formatPrice(originalPrice)}
                                        </span>
                                    ) : null}

                                    {product.discountPercentage ? (
                                        <span className="home-hero-card-off">
                                            {Math.round(product.discountPercentage)}% off
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="home-hero-card home-hero-card--fallback">
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                image_not_supported
                            </span>

                            <p>This week's pick couldn't load.</p>

                            <Link className="home-section-link" to="/products">
                                Browse all products
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
