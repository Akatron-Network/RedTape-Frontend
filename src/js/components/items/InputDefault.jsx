import React from 'react'

export default function InputDefault(props) {
  return (
    <div className='w-full flex flex-row shadow-input ellipsis rounded-md'>
      <span className="w-1/3 min-w-[120px] truncate rounded-l-md flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px">{props.name}</span>
      <input type={props.type} ref={props.reference} className="w-2/3 min-h-[34px] py-[6px] rounded-r-md bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 focus:border-shadow_blue focus:ring-transparent block" placeholder={props.name + " girin"} required />
    </div>
  )
}
