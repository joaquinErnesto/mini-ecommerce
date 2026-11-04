import "./ProductCardSkeleton.css";

export const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton skeleton-image"></div>

      <div className="skeleton skeleton-title"></div>

      <div className="skeleton skeleton-description"></div>

      <div className="skeleton skeleton-price"></div>

      <div className="skeleton skeleton-button"></div>
    </div>
  );
};