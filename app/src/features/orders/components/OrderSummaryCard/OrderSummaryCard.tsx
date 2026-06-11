import "./OrderSummaryCard.css"

interface Props {
  totalItems: number
  total: number
}

export const OrderSummaryCard = ({
  totalItems,
  total
}: Props) => {

  return (
    <div className="order-summary-card">

      <h2>
        Order Summary
      </h2>

      <div>
        <span>Total Items</span>
        <strong>{totalItems}</strong>
      </div>

      <div>
        <span>Total</span>
        <strong>
          ${total.toFixed(2)}
        </strong>
      </div>

    </div>
  )
}