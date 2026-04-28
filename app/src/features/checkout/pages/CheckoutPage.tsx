import "./CheckoutPage.css";
import { ShippingForm } from "../components/ShippingForm/ShippingForm";
import { PaymentMethod } from "../components/PaymentMethod/PaymentMethod";
import { ReviewStep } from "../components/ReviewStep/ReviewStep";
import { CheckoutSummary } from "../components/CheckoutSummary/CheckoutSummary";
import { useCheckout } from "../context/useCheckout";
import { useEffect } from "react";

export const CheckoutPage = () => {
    const { state, setStep } = useCheckout()

    useEffect(() => {
        // If trying to access step 2 without shipping
        if (state.step === 2 && !state.shipping.fullName) {
            setStep(1)
        }
        
        // If trying step 3 without payment
        if (state.step === 3 && !state.payment.cardHolder) {
            setStep(2)
        }
    }, [state, setStep])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [state.step])

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
                    {state.step === 3 && <ReviewStep />}
                </div>

                {/* RIGHT */}
                <div className="checkout-right">
                    <CheckoutSummary />
                </div>

            </main>
        </div>
    );
};