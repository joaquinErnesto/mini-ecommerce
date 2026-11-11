type Props = {
    id: string
    number: string
    title: string
    content: string[]
}

export const TermsSection = ({ id, number, title, content }: Props) => {
    return (
        <section className="terms-section" id={id}>
            <div className="terms-section-left">
                <span className="terms-number">{number}</span>
            </div>

            <div className="terms-section-right">
                <h2>{title}</h2>

                {content.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        </section>
    )
}
