interface InputProps{
    ref?: React.Ref<HTMLInputElement>
    placeholder:string
    label: string
    type: string
    value?: string
    disabled?: boolean
}


export function Input({ref,placeholder,label, type, value, disabled}:InputProps){
    return(
        <div className="flex flex-col gap-1">
        <label className="hover:text-amber-100 duration-300" htmlFor={label} >{label}:</label>
        <input value={value} disabled={disabled} className="outline-1 hover:scale-105 focus:scale-105 duration-300 outline-neutral-500 rounded-md py-2 px-3" type={type} ref={ref} name={label} placeholder={placeholder}  />
        </div>
    )
}