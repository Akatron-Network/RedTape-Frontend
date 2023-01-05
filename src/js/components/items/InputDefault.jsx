import React from 'react'

export default function InputDefault(props) {
  return (
    <div className='w-full flex flex-row shadow-md'>
      <span className="w-1/3 flex justify-center min-h-[34px] border border-alica_blue_middle text-sm items-center bg-alica_blue_middle font-medium text-indigo_dye px-1 py-[6px">{props.name}</span>
      <input type="text" id={props.id} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-alica_blue_middle text-mn_blue text-sm leading-none placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder={props.name + " girin"} required />
    </div>
  )
}
