interface ButtonProps{
    name: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
export function Button({name,onClick}: ButtonProps) {
  return (
    <button onClick={onClick} className="border-1 py-2 px-3 rounded-lg hover:bg-white hover:text-black font-[550] hover:shadow-lg duration-300 cursor-pointer">{name}</button>
  );
}
