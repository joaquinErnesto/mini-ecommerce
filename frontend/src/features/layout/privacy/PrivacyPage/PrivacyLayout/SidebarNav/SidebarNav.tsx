import { useEffect, useState } from "react"

const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "collection", label: "Data collection" },
    { id: "usage", label: "Usage" },
    { id: "security", label: "Security" },
    { id: "rights", label: "Your rights" }
]

export const SidebarNav = () => {
    const [activeId, setActiveId] = useState(sections[0].id)

    useEffect(() => {
        const elements = sections
            .map((section) => document.getElementById(section.id))
            .filter((element): element is HTMLElement => Boolean(element))

        if (elements.length === 0) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    )

                if (visible[0]) {
                    setActiveId(visible[0].target.id)
                }
            },
            {
                rootMargin: "-28% 0px -58% 0px",
                threshold: [0, 0.2, 0.5, 1]
            }
        )

        elements.forEach((element) => observer.observe(element))

        return () => observer.disconnect()
    }, [])

    return (
        <aside className="privacy-sidebar">
            <p className="privacy-sidebar-label">On this page</p>

            <nav aria-label="Privacy policy sections">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        className={`privacy-toc-link${
                            activeId === section.id ? " is-active" : ""
                        }`}
                        href={`#${section.id}`}
                        onClick={() => setActiveId(section.id)}
                    >
                        {section.label}
                    </a>
                ))}
            </nav>
        </aside>
    )
}
