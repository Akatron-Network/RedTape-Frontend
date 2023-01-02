import React from 'react'

export default function InputDefault(props) {
  return (
    <div className='w-full flex flex-row shadow-md'>
      <span className="w-1/3 flex justify-center text-sm items-center rounded-[4px] bg-kombu_green border border-r-0 border-kombu_green rounded-r-none font-medium text-white p-1">{props.name}</span>
      <input type="text" id={props.id} className="w-2/3 bg-white border border-kombu_green text-pine_tree text-sm leading-none placeholder:text-pine_tree placeholder:opacity-50 rounded-[4px] rounded-l-none focus:ring-ebony focus:border-ebony block p-2" placeholder={props.name + " girin"} required />
    </div>
  )
}
