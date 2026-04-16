import { useNavigate } from "react-router-dom";
import "./EmptyCart.css";

export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="empty-cart">
      <span className="material-symbols-outlined empty-icon">
        shopping_cart
      </span>

      <h2>
        Your cart is empty
      </h2>

      <p>
        Looks like you haven't added anything yet.
      </p>

      <button onClick={() => navigate("/products")}>
        Browse Products
      </button>
    </div>
  );
};