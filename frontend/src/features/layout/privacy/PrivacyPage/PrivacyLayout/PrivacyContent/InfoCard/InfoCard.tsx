type Props = {
    title: string
    text: string
}

export const InfoCard = ({ title, text }: Props) => {
    return (
        <div className="privacy-info-card">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}
