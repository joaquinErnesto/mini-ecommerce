import { useState } from "react"
import { toast } from "react-hot-toast"

export const ContactForm = () => {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSent(true)
    event.currentTarget.reset()

    toast.success("Message sent. We’ll be in touch soon.")
  }

  return (
    <section className="contact-form-panel" aria-labelledby="contact-form-title">
      <header className="contact-form-head">
        <p className="contact-kicker">
          <span className="contact-kicker-dot" aria-hidden="true" />
          Send a note
        </p>

        <h2 id="contact-form-title">Tell us what you need.</h2>

        <p>
          A few details help us route your message to the right person.
        </p>
      </header>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-row">
          <label className="contact-field">
            <span>Full name</span>
            <input
              name="name"
              type="text"
              placeholder="Ada Lovelace"
              autoComplete="name"
              required
            />
          </label>

          <label className="contact-field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>
        </div>

        <label className="contact-field">
          <span>Subject</span>

          <span className="contact-select">
            <select name="subject" defaultValue="collection">
              <option value="collection">Curated collection inquiry</option>
              <option value="shipping">Shipping &amp; logistics</option>
              <option value="partnership">Partnership</option>
              <option value="other">Something else</option>
            </select>

            <span className="material-symbols-outlined" aria-hidden="true">
              expand_more
            </span>
          </span>
        </label>

        <label className="contact-field">
          <span>Message</span>
          <textarea
            name="message"
            rows={6}
            placeholder="Tell us a little about what you’re looking for."
            required
          />
        </label>

        <div className="contact-form-foot">
          <p className="contact-status">
            <span className="contact-status-dot" aria-hidden="true" />
            Support online
          </p>

          <button className="contact-submit" type="submit">
            Send message
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </div>

        {sent ? (
          <p className="contact-form-note" role="status">
            Thanks — your note is on its way. We’ll reply within one business
            day.
          </p>
        ) : null}
      </form>
    </section>
  )
}
