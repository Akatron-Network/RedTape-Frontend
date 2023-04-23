import React from 'react'

export default function InputDefault(props) {
  return (
    <div className='w-full flex flex-row shadow-input ellipsis rounded-md'>
      <span className="w-1/3 min-w-[120px] truncate rounded-l-md flex justify-center min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-1 py-[6px]">{props.name}</span>
      <input type={props.type} ref={props.reference} className="w-2/3 min-h-[34px] py-[6px] rounded-r-md bg-white border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 focus:border-indigo_dye focus:ring-transparent block" placeholder={props.name + " girin"} required />
    </div>
  )
}
