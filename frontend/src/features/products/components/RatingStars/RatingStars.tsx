import "./RatingStars.css"

interface Props {
    rating: number
    size?: "sm" | "md" | "lg"
    showValue?: boolean
}

export const RatingStars = ({
    rating,
    size = "sm",
    showValue = true,
}: Props) => {
    const normalized = Math.max(0, Math.min(5, rating))
    const rounded = Math.round(normalized * 2) / 2

    return (
        <span
            className={`rating-stars rating-stars--${size}`}
            role="img"
            aria-label={`${normalized.toFixed(1)} out of 5`}
        >
            {Array.from({ length: 5 }, (_, index) => {
                const filled = rounded >= index + 1
                const half = !filled && rounded >= index + 0.5

                return (
                    <span
                        key={index}
                        className={`material-symbols-outlined rating-star ${
                            filled
                                ? "is-filled"
                                : half
                                  ? "is-half"
                                  : "is-empty"
                        }`}
                        aria-hidden="true"
                    >
                        {half ? "star_half" : "star"}
                    </span>
                )
            })}

            {showValue ? (
                <span className="rating-stars-value" aria-hidden="true">
                    {normalized.toFixed(1)}
                </span>
            ) : null}
        </span>
    )
}
