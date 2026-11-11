const rights = [
    {
        title: "Right to access",
        text: "Request a copy of the personal data we hold about you."
    },
    {
        title: "Right to rectification",
        text: "Ask us to correct anything that is inaccurate or incomplete."
    },
    {
        title: "Right to erasure",
        text: "Ask us to delete your data where we are not required to keep it."
    }
]

export const RightsList = () => {
    return (
        <ul className="privacy-rights">
            {rights.map((right) => (
                <li key={right.title}>
                    <h4>{right.title}</h4>
                    <p>{right.text}</p>
                </li>
            ))}
        </ul>
    )
}
