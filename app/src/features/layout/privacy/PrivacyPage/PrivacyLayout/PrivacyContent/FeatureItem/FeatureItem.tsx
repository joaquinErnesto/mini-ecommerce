type Props = {
    title: string
    text: string
}

export const FeatureItem = ({ title, text }: Props) => {
    return (
        <div className="feature-item">
            <div className="icon" />
            <div>
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
        </div>
    )
}