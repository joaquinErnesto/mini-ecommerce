import "./contact.css"

import { ContactHeader } from "./ContactPage/ContactHeader/ContactHeader"
import { ContactInfoPanel } from "./ContactPage/ContactInfoPanel/ContactInfoPanel"
import { ContactForm } from "./ContactPage/ContactForm/ContactForm"

export const ContactPage = () => {
  return (
    <div className="contact-page">
      <ContactHeader />

      <div className="contact-layout">
        <ContactInfoPanel />
        <ContactForm />
      </div>
    </div>
  )
}
