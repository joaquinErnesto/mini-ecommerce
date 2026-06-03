import "./OrdersHeader.css"

interface OrdersHeaderProps {
  totalOrders: number
}

export const OrdersHeader = ({
  totalOrders
}: OrdersHeaderProps) => {

  return (
    <section className="orders-header">

      <span className="orders-header-badge">
        Acquisitions
      </span>

      <div className="orders-header-content">

        <div>
          <h1>
            Order History
          </h1>

          <p>
            {totalOrders} orders found
          </p>
        </div>

      </div>

    </section>
  )
}