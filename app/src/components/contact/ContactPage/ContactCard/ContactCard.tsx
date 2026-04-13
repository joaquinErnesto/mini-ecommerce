type Props = {
  title: string
  children: React.ReactNode
}

export const ContactCard = ({ title, children }: Props) => {
  return (
    <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 flex flex-col gap-6">
      <h3 className="text-yellow-color text-xs uppercase tracking-widest">
        {title}
      </h3>

      {children}
    </div>
  )
}