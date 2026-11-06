import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { getProductById } from "../services/products.api"
import { useCart } from "../../cart/context/useCart"

import type { Product } from "../types/products.types"

import {
    formatCategory,
    formatPrice,
    getOriginalPrice,
} from "../utils/productFormat"

import { RatingStars } from "../components/RatingStars/RatingStars"

import "./ProductDetailPage.css"

const getInitials = (name: string): string =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "?"

const formatReviewDate = (date: string): string => {
    const parsed = new Date(date)

    if (Number.isNaN(parsed.getTime())) return date

    return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

export const ProductDetailPage = () => {
    const { id } = useParams()
    const { addToCart } = useCart()
    const navigate = useNavigate()

    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [requestKey, setRequestKey] = useState(0)
    const [justAdded, setJustAdded] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        let active = true

        const numericId = Number(id)

        if (!id || !Number.isFinite(numericId)) {
            setLoading(false)
            setError(true)
            setProduct(null)

            return () => {
                active = false
            }
        }

        setLoading(true)
        setError(false)
        setProduct(null)
        setJustAdded(false)

        const fetchProduct = async () => {
            try {
                const data = await getProductById(numericId)

                if (active) setProduct(data)
            } catch (fetchError) {
                console.error("Error loading product:", fetchError)

                if (active) setError(true)
            } finally {
                if (active) setLoading(false)
            }
        }

        void fetchProduct()

        return () => {
            active = false
        }
    }, [id, requestKey])

    useEffect(() => {
        if (!justAdded) return

        const timeout = window.setTimeout(() => setJustAdded(false), 2000)

        return () => window.clearTimeout(timeout)
    }, [justAdded])

    if (loading) {
        return (
            <div className="product-detail-page">
                <div className="detail-skeleton" aria-hidden="true">
                    <div className="detail-skeleton-plate detail-skeleton-block" />

                    <div className="detail-skeleton-info">
                        <span className="detail-skeleton-block detail-skeleton-kicker" />
                        <span className="detail-skeleton-block detail-skeleton-title" />
                        <span className="detail-skeleton-block detail-skeleton-title detail-skeleton-title--short" />
                        <span className="detail-skeleton-block detail-skeleton-rating" />
                        <span className="detail-skeleton-block detail-skeleton-line" />
                        <span className="detail-skeleton-block detail-skeleton-line" />
                        <span className="detail-skeleton-block detail-skeleton-line detail-skeleton-line--short" />
                        <span className="detail-skeleton-block detail-skeleton-price" />
                        <span className="detail-skeleton-block detail-skeleton-actions" />
                    </div>
                </div>

                <p className="detail-visually-hidden" role="status">
                    Loading product
                </p>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="product-detail-page">
                <div className="detail-state" role="alert">
                    <span
                        className="material-symbols-outlined detail-state-icon"
                        aria-hidden="true"
                    >
                        production_quantity_limits
                    </span>

                    <h1>We couldn't load this piece.</h1>

                    <p>
                        It may have moved, or the shop is taking a moment. Try
                        again or head back to the full catalogue.
                    </p>

                    <div className="detail-state-actions">
                        <button
                            type="button"
                            className="detail-button"
                            onClick={() => setRequestKey((key) => key + 1)}
                        >
                            Try again
                        </button>

                        <Link
                            className="detail-button detail-button--ghost"
                            to="/products"
                        >
                            Back to the catalogue
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const originalPrice = getOriginalPrice(
        product.price,
        product.discountPercentage
    )

    const isOutOfStock =
        typeof product.stock === "number" && product.stock <= 0
    const isLowStock =
        typeof product.stock === "number" &&
        product.stock > 0 &&
        product.stock < 10

    const reviews = product.reviews ?? []

    const stockLabel =
        product.availabilityStatus ??
        (isOutOfStock ? "Out of stock" : "In stock")

    const assurances = [
        {
            icon: "local_shipping",
            label: "Shipping",
            value: product.shippingInformation ?? "Tracked delivery",
        },
        {
            icon: "lock",
            label: "Checkout",
            value: "Encrypted payment",
        },
        {
            icon: "inventory_2",
            label: "Stock",
            value:
                product.availabilityStatus ??
                (isOutOfStock ? "Out of stock" : "Ready to ship"),
        },
    ]

    const specs = [
        product.brand
            ? { label: "Brand", value: product.brand }
            : null,
        { label: "Category", value: formatCategory(product.category) },
        product.warranty
            ? { label: "Warranty", value: product.warranty }
            : null,
        {
            label: "Reference",
            value: `#${String(product.id).padStart(4, "0")}`,
        },
    ].filter(
        (spec): spec is { label: string; value: string } => spec !== null
    )

    const handleAddToCart = () => {
        addToCart(product)
        setJustAdded(true)
    }

    const handleBuyNow = () => {
        addToCart(product)
        navigate("/cart")
    }

    return (
        <div className="product-detail-page">
            <nav className="detail-breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>

                <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                >
                    chevron_right
                </span>

                <Link to="/products">Shop</Link>

                <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                >
                    chevron_right
                </span>

                <span aria-current="page">{product.title}</span>
            </nav>

            <article className="detail-main">
                <div className="detail-gallery">
                    <div className="detail-plate">
                        <img src={product.image} alt={product.title} />

                        {product.discountPercentage ? (
                            <span className="detail-badge">
                                {Math.round(product.discountPercentage)}% off
                            </span>
                        ) : null}
                    </div>

                    <ul className="detail-assurances">
                        {assurances.map((assurance) => (
                            <li
                                className="detail-assurance"
                                key={assurance.label}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    aria-hidden="true"
                                >
                                    {assurance.icon}
                                </span>

                                <div>
                                    <span className="detail-assurance-label">
                                        {assurance.label}
                                    </span>
                                    <p>{assurance.value}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="detail-info">
                    <p className="detail-kicker">
                        {formatCategory(product.category)}

                        {product.brand ? (
                            <>
                                <span
                                    className="detail-kicker-sep"
                                    aria-hidden="true"
                                />
                                {product.brand}
                            </>
                        ) : null}
                    </p>

                    <h1 className="detail-title">{product.title}</h1>

                    {typeof product.rating === "number" ? (
                        <div className="detail-rating-row">
                            <RatingStars
                                rating={product.rating}
                                size="md"
                            />

                            <span className="detail-rating-count">
                                {reviews.length > 0
                                    ? `${reviews.length} review${
                                          reviews.length === 1 ? "" : "s"
                                      }`
                                    : "No reviews yet"}
                            </span>
                        </div>
                    ) : null}

                    <p className="detail-description">{product.description}</p>

                    <div className="detail-price-block">
                        <span className="detail-price">
                            {formatPrice(product.price)}
                        </span>

                        {originalPrice ? (
                            <span className="detail-old">
                                {formatPrice(originalPrice)}
                            </span>
                        ) : null}

                        {product.discountPercentage ? (
                            <span className="detail-off">
                                {Math.round(product.discountPercentage)}% off
                            </span>
                        ) : null}
                    </div>

                    <p className="detail-stock">
                        <span
                            className={`detail-stock-dot ${
                                isOutOfStock
                                    ? "is-out"
                                    : isLowStock
                                      ? "is-low"
                                      : "is-in"
                            }`}
                            aria-hidden="true"
                        />

                        <span>{stockLabel}</span>

                        {typeof product.stock === "number" &&
                        product.stock > 0 ? (
                            <span className="detail-stock-note">
                                {product.stock} available
                            </span>
                        ) : null}
                    </p>

                    <div className="detail-actions">
                        <button
                            type="button"
                            className={`detail-add ${
                                justAdded ? "is-added" : ""
                            }`}
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                        >
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                {justAdded ? "check" : "shopping_bag"}
                            </span>

                            {isOutOfStock
                                ? "Sold out"
                                : justAdded
                                  ? "Added to cart"
                                  : "Add to cart"}
                        </button>

                        <button
                            type="button"
                            className="detail-buy"
                            onClick={handleBuyNow}
                            disabled={isOutOfStock}
                        >
                            Buy now
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                arrow_forward
                            </span>
                        </button>
                    </div>

                    <dl className="detail-specs">
                        {specs.map((spec) => (
                            <div className="detail-spec" key={spec.label}>
                                <dt>{spec.label}</dt>
                                <dd>{spec.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </article>

            <section
                className="detail-reviews"
                aria-labelledby="detail-reviews-title"
            >
                <div className="detail-reviews-head">
                    <div>
                        <h2 id="detail-reviews-title">What people say</h2>

                        <p>
                            {reviews.length > 0
                                ? `${reviews.length} review${
                                      reviews.length === 1 ? "" : "s"
                                  } from the community.`
                                : "No reviews yet. Be the first to share a thought."}
                        </p>
                    </div>

                    {typeof product.rating === "number" ? (
                        <div className="detail-score">
                            <strong>{product.rating.toFixed(1)}</strong>

                            <div className="detail-score-meta">
                                <RatingStars
                                    rating={product.rating}
                                    size="sm"
                                    showValue={false}
                                />
                                <span>out of 5</span>
                            </div>
                        </div>
                    ) : null}
                </div>

                {reviews.length > 0 ? (
                    <div className="detail-reviews-grid">
                        {reviews.map((review, index) => (
                            <article
                                className="review-card"
                                key={`${review.reviewerEmail}-${index}`}
                            >
                                <header className="review-head">
                                    <span
                                        className="review-avatar"
                                        aria-hidden="true"
                                    >
                                        {getInitials(review.reviewerName)}
                                    </span>

                                    <div className="review-who">
                                        <p className="review-name">
                                            {review.reviewerName}
                                        </p>
                                        <p className="review-date">
                                            {formatReviewDate(review.date)}
                                        </p>
                                    </div>

                                    <RatingStars
                                        rating={review.rating}
                                        size="sm"
                                        showValue={false}
                                    />
                                </header>

                                <p className="review-comment">
                                    “{review.comment}”
                                </p>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="detail-no-reviews">
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            reviews
                        </span>

                        <p>No reviews yet. This piece is new to the shop.</p>
                    </div>
                )}

                <div className="detail-back">
                    <Link className="detail-back-link" to="/products">
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            arrow_back
                        </span>
                        Back to the catalogue
                    </Link>
                </div>
            </section>
        </div>
    )
}
