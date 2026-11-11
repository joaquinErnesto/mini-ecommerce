type Props = {
  title: string
  children: React.ReactNode
}

export const ContactCard = ({ title, children }: Props) => {
  return (
    <section className="contact-card">
      <h2 className="contact-card-title">{title}</h2>

      <div className="contact-card-body">{children}</div>
    </section>
  )
}
