import "./OrdersFilters.css"

export type OrderFilter =
  | "All"
  | "Pending"
  | "Processed"
  | "Delivered"
  | "Cancelled"

interface Props {
  activeFilter: OrderFilter

  onChange: (
    filter: OrderFilter
  ) => void
}

const filters: OrderFilter[] = [
  "All",
  "Pending",
  "Processed",
  "Delivered",
  "Cancelled"
]

export const OrdersFilters = ({
  activeFilter,
  onChange
}: Props) => {

  return (
    <section className="orders-filters">

      {filters.map((filter) => (

        <button
          key={filter}
          className={
            activeFilter === filter
              ? "active"
              : ""
          }
          onClick={() =>
            onChange(filter)
          }
        >
          {filter}
        </button>

      ))}

    </section>
  )
}