interface ButtonProps{
    name: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    icon?: any,
    disabled?: boolean
}
export function Button({name,onClick,icon, disabled}: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick} className="border-1 py-2 px-3 rounded-lg focus:bg-white focus:text-black focus:outline-0 hover:bg-white hover:text-black font-[550] hover:shadow-lg duration-300 flex items-center gap-3 cursor-pointer">{icon} {name}</button>
  );
}
