import { useCheckout } from "../context/useCheckout";

export const CheckoutPage = () => {
  const { state } = useCheckout();

  return (
    <div>
      <h1>Checkout</h1>

      <p>Step: {state.step}</p>

      {/* We will replace this later with real components */}
    </div>
  );
};