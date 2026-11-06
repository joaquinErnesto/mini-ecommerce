import type { Order } from "../../types/order.types"

import "./ShippingInfoCard.css"

interface Props {
  order: Order
}

export const ShippingInfoCard = ({ order }: Props) => {
  return (
    <div className="shipping-info-card">
      <span className="shipping-info-icon material-symbols-outlined" aria-hidden="true">
        local_shipping
      </span>

      <div className="shipping-info-copy">
        <p className="shipping-info-name">{order.shipping.fullName}</p>
        <p>{order.shipping.address}</p>
        <p>
          {order.shipping.city}, {order.shipping.country}{" "}
          {order.shipping.zipCode}
        </p>
      </div>
    </div>
  )
}
