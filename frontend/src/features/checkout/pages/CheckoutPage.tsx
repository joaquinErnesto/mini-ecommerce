import { useEffect } from "react"

import { ShippingForm } from "../components/ShippingForm/ShippingForm"
import { PaymentMethod } from "../components/PaymentMethod/PaymentMethod"
import { ReviewStep } from "../components/ReviewStep/ReviewStep"
import { CheckoutSummary } from "../components/CheckoutSummary/CheckoutSummary"

import { useCheckout } from "../context/useCheckout"

import "./CheckoutPage.css"

const STEPS = [
    { number: 1, label: "Shipping" },
    { number: 2, label: "Payment" },
    { number: 3, label: "Review" },
]

export const CheckoutPage = () => {
    const { state, setStep } = useCheckout()

    useEffect(() => {
        if (state.step === 2 && !state.shipping.fullName) {
            setStep(1)
        }

        if (state.step === 3) {
            const method = state.payment.method

            if (
                (method === "Card" && !state.payment.cardHolder) ||
                (method === "Crypto" && !state.payment.walletAddress) ||
                (method === "Transfer" && !state.payment.accountHolder)
            ) {
                setStep(2)
            }
        }
    }, [state, setStep])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [state.step])

    return (
        <div className="checkout-page">
            <header className="checkout-hero">
                <p className="checkout-kicker">
                    <span className="checkout-kicker-dot" aria-hidden="true" />
                    Secure checkout
                </p>

                <h1 className="checkout-title">
                    Checkout
                    <span className="checkout-title-accent">.</span>
                </h1>

                <p className="checkout-lede">
                    Shipping, payment, then one last look. Your bag is held
                    until you confirm.
                </p>
            </header>

            <div className="checkout-container">
                <div className="checkout-left">
                    <ol
                        className="checkout-steps"
                        aria-label="Checkout progress"
                    >
                        {STEPS.map((step) => {
                            const isActive = state.step === step.number
                            const isComplete = state.step > step.number

                            return (
                                <li
                                    key={step.number}
                                    className={`checkout-step ${
                                        isActive ? "is-active" : ""
                                    } ${isComplete ? "is-complete" : ""}`}
                                    aria-current={isActive ? "step" : undefined}
                                >
                                    <span
                                        className="checkout-step-number"
                                        aria-hidden="true"
                                    >
                                        {isComplete ? (
                                            <span className="material-symbols-outlined">
                                                check
                                            </span>
                                        ) : (
                                            step.number
                                        )}
                                    </span>

                                    <span className="checkout-step-label">
                                        {step.label}
                                    </span>
                                </li>
                            )
                        })}
                    </ol>

                    <section className="checkout-panel">
                        {state.step === 1 && <ShippingForm />}
                        {state.step === 2 && <PaymentMethod />}
                        {state.step === 3 && <ReviewStep />}
                    </section>
                </div>

                <aside className="checkout-right">
                    <CheckoutSummary />
                </aside>
            </div>
        </div>
    )
}
