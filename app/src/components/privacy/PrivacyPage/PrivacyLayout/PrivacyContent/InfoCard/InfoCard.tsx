type Props = {
    title: string
    text: string
}

export const InfoCard = ({ title, text }: Props) => {
    return (
        <div className="info-card">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}