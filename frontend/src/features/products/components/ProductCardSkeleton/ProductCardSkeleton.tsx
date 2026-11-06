import "./ProductCardSkeleton.css"

export const ProductCardSkeleton = () => {
    return (
        <div className="product-card-skeleton" aria-hidden="true">
            <div className="product-card-skeleton-media skeleton" />

            <div className="product-card-skeleton-body">
                <span className="skeleton product-card-skeleton-meta" />
                <span className="skeleton product-card-skeleton-title" />
                <span className="skeleton product-card-skeleton-rating" />
            </div>

            <div className="product-card-skeleton-foot">
                <span className="skeleton product-card-skeleton-price" />
                <span className="skeleton product-card-skeleton-button" />
            </div>
        </div>
    )
}
