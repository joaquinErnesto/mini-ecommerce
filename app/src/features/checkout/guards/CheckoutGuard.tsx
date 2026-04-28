import { Navigate } from "react-router-dom";
import { useCart } from "../../cart/context/useCart";

export const CheckoutGuard = ({ children }: { children: React.ReactNode }) => {
  const { items } = useCart();

  if (items.length === 0) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
};