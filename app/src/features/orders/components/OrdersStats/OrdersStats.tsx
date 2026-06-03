import "./OrdersStats.css"

interface OrdersStatsProps {
  total: number

  delivered: number

  processed: number

  cancelled: number
}

export const OrdersStats = ({
  total,
  delivered,
  processed,
  cancelled
}: OrdersStatsProps) => {

  return (
    <section className="orders-stats">

      <div className="orders-stat-card">
        <h4>Total Orders</h4>
        <span>{total}</span>
      </div>

      <div className="orders-stat-card">
        <h4>Delivered</h4>
        <span>{delivered}</span>
      </div>

      <div className="orders-stat-card">
        <h4>Processed</h4>
        <span>{processed}</span>
      </div>

      <div className="orders-stat-card">
        <h4>Cancelled</h4>
        <span>{cancelled}</span>
      </div>

    </section>
  )
}