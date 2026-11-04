import { InfoCard }
from "../../../profile/components/InfoCard/InfoCard"

import type {
  Order
}
from "../../types/order.types"

interface Props {
  order: Order
}

export const ShippingInfoCard = ({
  order
}: Props) => {

  return (
    <>

      <InfoCard
        label="Full Name"
        value={order.shipping.fullName}
      />

      <InfoCard
        label="Address"
        value={order.shipping.address}
      />

      <InfoCard
        label="City"
        value={order.shipping.city}
      />

      <InfoCard
        label="Country"
        value={order.shipping.country}
      />

      <InfoCard
        label="Zip Code"
        value={order.shipping.zipCode}
      />

    </>
  )
}