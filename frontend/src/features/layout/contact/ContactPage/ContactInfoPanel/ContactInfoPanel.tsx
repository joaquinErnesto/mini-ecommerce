import { ContactCard } from "../ContactCard/ContactCard"

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "LinkedIn", href: "https://linkedin.com" }
]

export const ContactInfoPanel = () => {
  return (
    <aside className="contact-info">
      <ContactCard title="Direct contact">
        <a
          className="contact-mail"
          href="mailto:support@mini-ecommerce.com"
        >
          support@mini-ecommerce.com
        </a>

        <a className="contact-phone" href="tel:+18881234567">
          +1 (888) 123-4567
        </a>

        <p className="contact-muted">
          Monday to Friday, 9:00–18:00 GMT.
        </p>
      </ContactCard>

      <ContactCard title="Digital presence">
        <ul className="contact-social">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{social.label}</span>
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true"
                >
                  north_east
                </span>
              </a>
            </li>
          ))}
        </ul>
      </ContactCard>

      <figure className="contact-studio">
        <img
          src="https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp"
          alt="Classic sunglasses on display in the studio"
          loading="lazy"
        />

        <figcaption>
          <span>London gallery</span>
          <strong>22 Shoreditch High St.</strong>
        </figcaption>
      </figure>
    </aside>
  )
}
