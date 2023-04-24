export default function Tooltip({ message, children }) {
  return (
  
    <span className="group relative">
      <span className="absolute top-7 right-0 z-20 pointer-events-none whitespace-nowrap before:absolute scale-0 transition-all rounded-md bg-oxford_blue p-2 text-xs text-ghost_white group-hover:scale-100">{message}
      </span>
        

      {children}
    </span>
  )
}