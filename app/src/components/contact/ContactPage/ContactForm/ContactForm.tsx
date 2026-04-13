export const ContactForm = () => {
  return (
    <section className="lg:col-span-8">
      <div className="bg-[#131313] p-8 md:p-12 rounded-xl border border-white/5">

        <form className="space-y-8">

          {/* ROW */}
          <div className="grid md:grid-cols-2 gap-8">
            <input
              placeholder="Full Name"
              className="input"
            />
            <input
              placeholder="Email"
              type="email"
              className="input"
            />
          </div>

          {/* SUBJECT */}
          <select className="input">
            <option>Curated Collection Inquiry</option>
            <option>Shipping & Logistics</option>
            <option>Partnership</option>
          </select>

          {/* MESSAGE */}
          <textarea
            placeholder="Your message..."
            rows={6}
            className="input resize-none"
          />

          {/* FOOTER */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Curators Online
            </div>

            <button className="btn-primary">
              SEND MESSAGE
            </button>
          </div>

        </form>

      </div>
    </section>
  )
}