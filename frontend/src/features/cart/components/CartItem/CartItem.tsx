import { Link } from "react-router-dom"

import { formatPrice } from "../../../products/utils/productFormat"

import "./CartItem.css"

interface Props {
    id: number
    title: string
    description: string
    price: number
    quantity: number
    image: string
    onIncrease: () => void
    onDecrease: () => void
    onRemove: () => void
}

export const CartItem = ({
    id,
    title,
    description,
    price,
    quantity,
    image,
    onIncrease,
    onDecrease,
    onRemove,
}: Props) => {
    return (
        <article className="cart-line">
            <Link
                className="cart-line-media"
                to={`/products/${id}`}
                aria-label={`View ${title}`}
            >
                <img src={image} alt="" loading="lazy" />
            </Link>

            <div className="cart-line-info">
                <h2 className="cart-line-title">
                    <Link to={`/products/${id}`}>{title}</Link>
                </h2>

                <p className="cart-line-description">{description}</p>

                <div className="cart-line-controls">
                    <div
                        className="cart-qty"
                        role="group"
                        aria-label={`Quantity for ${title}`}
                    >
                        <button
                            type="button"
                            className="cart-qty-button"
                            onClick={onDecrease}
                            disabled={quantity <= 1}
                            aria-label={`Decrease quantity of ${title}`}
                        >
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                remove
                            </span>
                        </button>

                        <span
                            className="cart-qty-value"
                            aria-live="polite"
                        >
                            {quantity}
                        </span>

                        <button
                            type="button"
                            className="cart-qty-button"
                            onClick={onIncrease}
                            aria-label={`Increase quantity of ${title}`}
                        >
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                add
                            </span>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="cart-remove"
                        onClick={onRemove}
                        aria-label={`Remove ${title} from bag`}
                    >
                        <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                        >
                            delete
                        </span>
                        Remove
                    </button>
                </div>
            </div>

            <div className="cart-line-pricing">
                <span className="cart-line-total">
                    {formatPrice(price * quantity)}
                </span>

                <span className="cart-line-each">
                    {formatPrice(price)} each
                </span>
            </div>
        </article>
    )
}
