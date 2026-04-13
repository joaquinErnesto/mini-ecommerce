import { ContactCard } from "../ContactCard/ContactCard"

export const ContactInfoPanel = () => {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-8">

      {/* CONTACT */}
      <ContactCard title="Direct Contact">
        <p className="text-2xl font-medium text-white">
          curator@electricnoir.com
        </p>
        <p className="text-gray-400">+1 (888) NOIR-STUDIO</p>
      </ContactCard>

      {/* SOCIAL */}
      <ContactCard title="Digital Presence">
        <div className="flex flex-col gap-4">
          {["Instagram", "Behance", "LinkedIn"].map((item) => (
            <div
              key={item}
              className="flex justify-between text-gray-400 hover:text-white transition cursor-pointer"
            >
              <span>{item}</span>
              <span>↗</span>
            </div>
          ))}
        </div>
      </ContactCard>

      {/* IMAGE CARD */}
      <div className="relative overflow-hidden rounded-xl h-64 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA45qpZJOwfwTpFhiRaUTjWT-INxU7paLgccf3pB4aSE2GHHs_P-9p8x5QZC5xQFaLb-_fuSg7H5U77rvaF8a_2BNk6FapZth8rRHV-LZXEv4VNxKBKUaWpYKOVlIht0j-D0fC_be13fKejspky7VKD-NIt1LnxFiU0sf047QAsyRXBM77VwlOzNLMHOmjcPCPgHBy-XR9R7sNXmw1M_uV3RS-EZ84RROucf1_yfoT4Teool1bF9pJQbz8flEnoLQsPsKvSAGN4e8hg"
          className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition"
        />

        <div className="absolute bottom-6 left-6 z-20">
          <p className="text-white font-bold">London Gallery</p>
          <p className="text-gray-400 text-sm">22 Shoreditch High St.</p>
        </div>
      </div>

    </aside>
  )
}