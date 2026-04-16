import "./CheckoutPage.css";
import { ShippingForm } from "../components/ShippingForm/ShippingForm";
import { PaymentMethod } from "../components/PaymentMethod/PaymentMethod";
import { CheckoutSummary } from "../components/CheckoutSummary/CheckoutSummary";

export const CheckoutPage = () => {
    return (
        <div className="checkout-page">
            <main className="checkout-container">

                {/* LEFT */}
                <div className="checkout-left">
                <section>
                    <h1>Finalize Your Selection</h1>
                    <p>Complete your purchase</p>
                </section>

                <ShippingForm />
                <PaymentMethod />
                </div>

                {/* RIGHT */}
                <div className="checkout-right">
                <CheckoutSummary />
                </div>

            </main>
        </div>
    );
};