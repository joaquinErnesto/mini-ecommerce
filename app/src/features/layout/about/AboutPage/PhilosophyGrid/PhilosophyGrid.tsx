import { Tag } from "../Tag/Tag"

export const PhilosophyGrid = () => {
  return (
    <section className="philosophy">

      <div className="grid md:grid-cols-12 gap-6">

        {/* BIG CARD */}
        <div className="card col-span-8">
          <h2>The Anti-Template</h2>
          <p>
            Built for the selective. A private gallery experience.
          </p>

          <div className="flex gap-3 mt-6">
            <Tag label="Minimalism" />
            <Tag label="Intent" />
            <Tag label="Curation" />
          </div>
        </div>

        {/* IMAGE */}
        <div className="image-card col-span-4">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCZVxVPRsXlmwuh___wQHWg7Q28QPCNh3WryYq6OOadZwJaB0cEkFN1yOy01zmZaAEOkRnk2dHfSnSQZmB6ZLoVM7ZAXGF3-queCe3tdljp0D8TDXlHT8mLb84jvuLz8iO5fxmTQMZgQ3lrVt5IiZZsDRNcXnB8v8RxF08PvewhOhhUXfiYc_7ICpoW8NixEErtR7G6YAywKP0MYfxiBwrhdt3TNimyxr8_Prn1xdyN1mcAQ2oOCAVB16bss7CfuL7TLXM6ZCeey_A" />
        </div>

      </div>

    </section>
  )
}