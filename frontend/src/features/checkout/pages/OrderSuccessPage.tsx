import { Link, Navigate } from "react-router-dom"

import { getSession } from "../../auth/utils/authStorage"
import { getOrdersByUser } from "../../orders/utils/ordersStorage"
import { formatPrice } from "../../products/utils/productFormat"

import "./OrderSuccessPage.css"

export const OrderSuccessPage = () => {
    const session = getSession()

    if (!session) {
        return <Navigate to="/" replace />
    }

    const orders = getOrdersByUser(session.user.id)
    const latestOrder = orders[0]

    if (!latestOrder) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="order-success-page">
            <div className="order-success-card">
                <div className="order-success-mark" aria-hidden="true">
                    <span className="material-symbols-outlined">check</span>
                </div>

                <p className="order-success-kicker">Thank you</p>

                <h1>
                    Order confirmed
                    <span className="order-success-accent">.</span>
                </h1>

                <p className="order-success-lede">
                    We've received your order and saved it to your account.
                    From here, we take it.
                </p>

                <dl className="order-success-details">
                    <div>
                        <dt>Order number</dt>
                        <dd>{latestOrder.id}</dd>
                    </div>

                    <div>
                        <dt>Date</dt>
                        <dd>{latestOrder.date}</dd>
                    </div>

                    <div>
                        <dt>Total</dt>
                        <dd>{formatPrice(latestOrder.total)}</dd>
                    </div>

                    <div>
                        <dt>Items</dt>
                        <dd>{latestOrder.totalItems}</dd>
                    </div>

                    <div className="order-success-detail-full">
                        <dt>Shipping to</dt>
                        <dd>
                            {latestOrder.shipping.fullName}
                            {latestOrder.shipping.city
                                ? `, ${latestOrder.shipping.city}`
                                : ""}
                        </dd>
                    </div>
                </dl>

                <div className="order-success-actions">
                    <Link
                        className="order-success-button"
                        to="/profile/orders"
                    >
                        View my orders
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            arrow_forward
                        </span>
                    </Link>

                    <Link
                        className="order-success-button order-success-button--ghost"
                        to="/products"
                    >
                        Continue shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}
