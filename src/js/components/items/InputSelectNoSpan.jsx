import React from 'react'

export default function InputSelectNoSpan(props) {
  return (
    <div className='shadow-input'>
      <select ref={props.reference} defaultValue={props.options.length > 0 ? props.options[0] : "default"} required className="block min-h-[34px] w-full pr-8 pl-2 py-[6px] text-sm text-prussian_blue border border-white bg-white focus:ring-transparent focus:border-shadow_blue">
        <option value="default" disabled>{props.name}</option>
        {
          (props.options !== undefined) ? 
          (props.options).map((p, index) => {
            return <option key={index} value={p}>{p}</option>
          }) 
          : undefined
        }
      </select>
    </div>
  )
}
