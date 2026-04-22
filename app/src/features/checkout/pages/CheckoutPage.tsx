import "./CheckoutPage.css";
import { ShippingForm } from "../components/ShippingForm/ShippingForm";
import { PaymentMethod } from "../components/PaymentMethod/PaymentMethod";
import { CheckoutSummary } from "../components/CheckoutSummary/CheckoutSummary";
import { useCheckout } from "../context/useCheckout";

export const CheckoutPage = () => {
    const { state } = useCheckout()

    return (
        <div className="checkout-page">
            <main className="checkout-container">

                {/* LEFT */}
                <div className="checkout-left">
                    <section>
                        <h1>Finalize Your Selection</h1>
                        <p>Complete your purchase</p>
                    </section>

                    <div className="step-indicator">
                        <span className={state.step >= 1 ? "active" : ""}>
                            Shipping
                        </span>

                        <span className={state.step >= 2 ? "active" : ""}>
                            Payment
                        </span>

                        <span className={state.step >= 3 ? "active" : ""}>
                            Review
                        </span>
                    </div>

                    {state.step === 1 && <ShippingForm />}
                    {state.step === 2 && <PaymentMethod />}
                    {state.step === 3 && <h2>Review your order</h2>}
                </div>

                {/* RIGHT */}
                <div className="checkout-right">
                    <CheckoutSummary />
                </div>

            </main>
        </div>
    );
};