import "./OrdersFilters.css"

export type OrderFilter =
  | "All"
  | "Pending"
  | "Processed"
  | "Delivered"
  | "Cancelled"

const FILTERS: OrderFilter[] = [
  "All",
  "Pending",
  "Processed",
  "Delivered",
  "Cancelled",
]

interface Props {
  activeFilter: OrderFilter
  counts: Record<OrderFilter, number>
  onChange: (filter: OrderFilter) => void
}

export const OrdersFilters = ({
  activeFilter,
  counts,
  onChange,
}: Props) => {
  return (
    <div
      className="orders-filters"
      role="group"
      aria-label="Filter orders by status"
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter

        return (
          <button
            key={filter}
            type="button"
            className={`orders-filter ${isActive ? "is-active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onChange(filter)}
          >
            {filter}
            <span className="orders-filter-count">
              {counts[filter]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
