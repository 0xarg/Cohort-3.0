interface ButtonProps{
    name: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    icon?: any
}
export function Button({name,onClick,icon}: ButtonProps) {
  return (
    <button onClick={onClick} className="border-1 py-2 px-3 rounded-lg focus:bg-white focus:text-black focus:outline-0 hover:bg-white hover:text-black font-[550] hover:shadow-lg duration-300 flex items-center gap-3 cursor-pointer">{icon} {name}</button>
  );
}
