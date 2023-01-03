import React from 'react'

export default function InputDefault(props) {
  return (
    <div className='w-full flex flex-row shadow-md'>
      <span className="w-1/3 flex justify-center text-sm items-center rounded-[4px] bg-indigo_dye border border-r-0 border-indigo_dye rounded-r-none font-medium text-alica_blue_light p-1">{props.name}</span>
      <input type="text" id={props.id} className="w-2/3 bg-white border border-indigo_dye text-indigo_dye text-sm leading-none placeholder:text-mn_blue placeholder:opacity-50 rounded-[4px] rounded-l-none focus:ring-mn_blue focus:border-mn_blue block p-2" placeholder={props.name + " girin"} required />
    </div>
  )
}
