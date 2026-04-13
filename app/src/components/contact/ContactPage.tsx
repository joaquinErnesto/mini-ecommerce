import "../../assets/styles/contact.css"

import { ContactHeader } from "./ContactPage/ContactHeader/ContactHeader"
import { ContactInfoPanel } from "./ContactPage/ContactInfoPanel/ContactInfoPanel"
import { ContactForm } from "./ContactPage/ContactForm/ContactForm"

export const ContactPage = () => {
  return (
    <div className="contact-page">

      <main className="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto">

        <ContactHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ContactInfoPanel />
          <ContactForm />
        </div>

      </main>

    </div>
  )
}