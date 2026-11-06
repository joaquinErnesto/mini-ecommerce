import type { ReactNode } from "react"

import "./AuthLayout.css"

const BRAND_IMAGE =
    "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp"

interface Props {
    children: ReactNode
}

export const AuthLayout = ({ children }: Props) => {
    return (
        <div className="auth-layout">
            <div className="auth-layout-inner">
                <aside className="auth-brand" aria-label="About Mini E-Commerce">
                    <p className="auth-brand-kicker">
                        <span className="auth-brand-kicker-dot" aria-hidden="true" />
                        Curated weekly
                    </p>

                    <p className="auth-brand-title">
                        Fewer,
                        <br />
                        better things
                        <span className="auth-brand-period">.</span>
                    </p>

                    <p className="auth-brand-lede">
                        Fragrance, furniture, and small everyday luxuries,
                        chosen one by one.
                    </p>

                    <div className="auth-brand-plate">
                        <img
                            src={BRAND_IMAGE}
                            alt=""
                            loading="eager"
                        />
                        <span className="auth-brand-caption">
                            The current edit
                        </span>
                    </div>

                    <p className="auth-brand-foot">
                        A short list, refreshed as the shop changes.
                    </p>
                </aside>

                <div className="auth-layout-content">{children}</div>
            </div>
        </div>
    )
}
