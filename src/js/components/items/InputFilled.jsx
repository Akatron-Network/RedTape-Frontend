import React from 'react'

export default function InputFilled(props) {
  return (
    <div className='w-full flex flex-row shadow-input'>
      <span className="w-1/3 min-w-[120px] truncate flex justify-center min-h-[34px] border border-alica_blue_light  text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px">{props.name}</span>
      <span type="text" ref={props.reference} id={props.id} className="w-2/3 min-h-[34px] py-[6px] bg-alica_blue_middle border border-gray-100 text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder={props.name + " girin"}>Doldurulacak alan</span>
    </div>
  )
}
