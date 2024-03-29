import React from 'react'

export default function InputDate(props) {
  return (
    <div className='w-full flex flex-row shadow-input rounded-md'>
      <span className="w-1/3 min-w-[132px] truncate flex justify-start px-3 min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white py-[6px] rounded-l-md">{props.name}</span>
      <input type="date" ref={props.reference} defaultValue={props.defaultValue} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" required />
    </div>
  )
}
