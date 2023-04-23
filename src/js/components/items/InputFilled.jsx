import React from 'react'

export default function InputFilled(props) {
  return (
    <div className='w-full flex flex-row shadow-input rounded-md'>
      <span className="w-1/3 min-w-[120px] truncate flex justify-center min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-1 py-[6px] rounded-l-md">{props.name}</span>
      <span type="text" ref={props.reference} id={props.id} className="w-2/3 min-h-[34px] truncate py-[6px] bg-alica_blue_light border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" placeholder={props.name + " girin"}></span>
    </div>
  )
}
