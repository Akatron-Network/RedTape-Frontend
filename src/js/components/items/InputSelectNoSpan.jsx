import React from 'react'

export default function InputSelectNoSpan(props) {
  return (
    <div className='shadow-input'>
      <select id={props.id} defaultValue="default" required className="block min-h-[34px] w-full pr-8 pl-2 py-[6px] text-sm text-prussian_blue border border-white bg-white focus:ring-transparent focus:border-shadow_blue">
        <option value="default" disabled>{props.name}</option>
      </select>
    </div>
  )
}
