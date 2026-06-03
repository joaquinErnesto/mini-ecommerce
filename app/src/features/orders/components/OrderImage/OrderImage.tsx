import "./OrderImage.css"

interface Props {
  image: string

  productName: string
}

export const OrderImage = ({
  image,
  productName
}: Props) => {

  return (
    <div className="order-image">
      <img
        src={image}
        alt={productName}
      />
    </div>
  )
}