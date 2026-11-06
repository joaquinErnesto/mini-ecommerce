import { Link } from "react-router-dom"

import { formatPrice } from "../../../products/utils/productFormat"

import type { OrderItem } from "../../types/order.types"

import "./OrderItemCard.css"

interface Props {
  item: OrderItem
}

export const OrderItemCard = ({ item }: Props) => {
  return (
    <article className="order-item-card">
      <Link
        className="order-item-media"
        to={`/products/${item.productId}`}
        aria-label={`View ${item.title}`}
      >
        <img src={item.image} alt="" loading="lazy" />
      </Link>

      <div className="order-item-copy">
        <h3>
          <Link to={`/products/${item.productId}`}>{item.title}</Link>
        </h3>

        <div className="order-item-meta">
          <span>Qty {item.quantity}</span>
          <span>{formatPrice(item.price)} each</span>
        </div>
      </div>

      <strong className="order-item-total">
        {formatPrice(item.price * item.quantity)}
      </strong>
    </article>
  )
}
