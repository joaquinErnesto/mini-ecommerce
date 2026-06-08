import "./OrderImage.css"

interface Props {
  images: string[]
}

export const OrderImage = ({
  images
}: Props) => {

  const visibleImages =
    images.slice(0, 3)

  return (
    <div className="order-image-stack">

      {visibleImages.map(
        (image, index) => (

          <img
            key={image}
            src={image}
            alt="Order product"
            className="order-stack-image"
            style={{
              left: `${index * 20}px`,
              zIndex: 10 - index
            }}
          />

        )
      )}

    </div>
  )
}