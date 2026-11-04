import { useNavigate }
from "react-router-dom"

import "./OrdersEmptyState.css"

export const OrdersEmptyState = () => {

  const navigate =
    useNavigate()

  return (
    <div className="orders-empty">

      <span className="material-symbols-outlined">
        inventory_2
      </span>

      <h2>
        No Orders Found
      </h2>

      <p>
        You haven't placed any orders yet.
      </p>

      <button
        onClick={() =>
          navigate("/products")
        }
      >
        Go Shopping
      </button>

    </div>
  )
}