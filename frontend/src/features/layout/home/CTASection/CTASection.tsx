import { useState } from "react"
import type { FormEvent } from "react"

import toast from "react-hot-toast"

export const CTASection = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        toast.success("You're on the list. We'll write when the edit changes.")
        setEmail("")
    }

    return (
        <section className="home-cta" aria-labelledby="home-cta-title">
            <div className="home-cta-panel">
                <div className="home-cta-copy">
                    <h2 id="home-cta-title">
                        First look,<br />
                        every week.
                    </h2>

                    <p>
                        New pieces and early access, sent when the edit
                        changes. No noise, just the short list.
                    </p>
                </div>

                <form className="home-cta-form" onSubmit={handleSubmit}>
                    <label className="home-cta-label" htmlFor="home-email">
                        Email address
                    </label>

                    <div className="home-cta-field">
                        <input
                            id="home-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />

                        <button type="submit">
                            Join the list
                            <span
                                className="material-symbols-outlined"
                                aria-hidden="true"
                            >
                                arrow_forward
                            </span>
                        </button>
                    </div>

                    <p className="home-cta-note">
                        One email when the edit changes. Leave whenever you
                        like.
                    </p>
                </form>
            </div>
        </section>
    )
}
