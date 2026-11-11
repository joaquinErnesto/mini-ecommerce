type Props = {
    title: string
    text: string
}

export const FeatureItem = ({ title, text }: Props) => {
    return (
        <div className="privacy-feature">
            <span
                className="material-symbols-outlined privacy-feature-icon"
                aria-hidden="true"
            >
                check
            </span>

            <div>
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
        </div>
    )
}
