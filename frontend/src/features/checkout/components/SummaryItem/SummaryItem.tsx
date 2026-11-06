import type { CartItem } from "../../../cart/types/cart.types"
import { formatPrice } from "../../../products/utils/productFormat"

import "./SummaryItem.css"

export const SummaryItem = ({ item }: { item: CartItem }) => {
  return (
    <div className="summary-item">
      <div className="summary-item-media">
        <img src={item.image} alt="" loading="lazy" />
      </div>

      <div className="summary-item-copy">
        <p className="summary-item-title">{item.title}</p>
        <span className="summary-item-qty">
          Qty {item.quantity}
        </span>
      </div>

      <span className="summary-item-price">
        {formatPrice(item.price * item.quantity)}
      </span>
    </div>
  )
}
