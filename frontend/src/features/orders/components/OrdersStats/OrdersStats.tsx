import "./OrdersStats.css"

interface OrdersStatsProps {
  total: number
  pending: number
  delivered: number
  processed: number
  cancelled: number
}

export const OrdersStats = ({
  total,
  pending,
  delivered,
  processed,
  cancelled,
}: OrdersStatsProps) => {
  return (
    <section className="orders-stats" aria-label="Order overview">
      <div className="orders-stat">
        <span className="orders-stat-dot is-total" aria-hidden="true" />
        <span className="orders-stat-label">All orders</span>
        <strong>{total}</strong>
      </div>

      <div className="orders-stat">
        <span className="orders-stat-dot is-pending" aria-hidden="true" />
        <span className="orders-stat-label">Pending</span>
        <strong>{pending}</strong>
      </div>

      <div className="orders-stat">
        <span className="orders-stat-dot is-processed" aria-hidden="true" />
        <span className="orders-stat-label">Processed</span>
        <strong>{processed}</strong>
      </div>

      <div className="orders-stat">
        <span className="orders-stat-dot is-delivered" aria-hidden="true" />
        <span className="orders-stat-label">Delivered</span>
        <strong>{delivered}</strong>
      </div>

      <div className="orders-stat">
        <span className="orders-stat-dot is-cancelled" aria-hidden="true" />
        <span className="orders-stat-label">Cancelled</span>
        <strong>{cancelled}</strong>
      </div>
    </section>
  )
}
