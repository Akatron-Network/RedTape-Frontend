import React from 'react'

export default function InputDefaultNoSpan(props) {
  return (
    <div className="relative col-span-2 lg:col-span-1 shadow-input rounded-md">
      <input type={props.type} ref={props.reference} id={props.name} className="block p-2 pb-[.30rem] min-h-[34px] w-full text-prussian_blue text-sm bg-white border border-white appearance-none placeholder:text-mn_blue focus:border-shadow_blue focus:ring-transparent peer rounded-md" placeholder=" " />
      <label htmlFor={props.name} className="absolute truncate cursor-text text-sm text-mn_blue bg-white px-1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2.5 opacity-70 peer-focus:text-queen_blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:opacity-100 peer-focus:top-1 peer-focus:text-base peer-focus:-translate-y-4 rounded-md">{props.name}</label>
    </div>
  )
}
