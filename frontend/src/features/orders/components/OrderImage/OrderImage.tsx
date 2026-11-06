import "./OrderImage.css"

interface Props {
  images: string[]
}

export const OrderImage = ({ images }: Props) => {
  const visibleImages = images.slice(0, 3)

  return (
    <div className="order-image-stack" aria-hidden="true">
      {visibleImages.length > 0 ? (
        visibleImages.map((image, index) => (
          <span
            className="order-stack-plate"
            key={`${image}-${index}`}
            style={{ zIndex: 10 - index }}
          >
            <img src={image} alt="" loading="lazy" />
          </span>
        ))
      ) : (
        <span className="order-stack-plate">
          <span className="material-symbols-outlined">
            image_not_supported
          </span>
        </span>
      )}

      {images.length > 3 ? (
        <span className="order-stack-more">+{images.length - 3}</span>
      ) : null}
    </div>
  )
}
