type Props = {
    id: string
    title: string
    children: React.ReactNode
}

export const SectionBlock = ({ id, title, children }: Props) => {
    return (
        <section id={id} className="privacy-section">
            <h2>{title}</h2>
            <div className="section-content">
                {children}
            </div>
        </section>
    )
}