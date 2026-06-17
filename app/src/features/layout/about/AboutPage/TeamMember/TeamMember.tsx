type Props = {
  name: string
  role: string
  image: string
}

export const TeamMember = ({ name, role, image }: Props) => {
  return (
    <div className="text-center group">
      <div className="team-avatar">
        <img src={image} className="w-full h-full object-cover" />
      </div>

      <h4 className="text-white font-bold uppercase text-sm tracking-widest">
        {name}
      </h4>

      <p className="text-blue-color text-xs mt-1">
        {role}
      </p>
    </div>
  )
}