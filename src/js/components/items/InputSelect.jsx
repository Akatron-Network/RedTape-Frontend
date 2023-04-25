import React from 'react'

export default function InputSelect(props) {
  return (
    <div className='w-full flex flex-row shadow-input rounded-md'>
      <span className="w-1/3 min-w-[120px] truncate flex min-h-[34px] justify-start items-center rounded-l-md border border-alica_blue px-3 py-[6px] text-sm bg-indigo_dye text-ghost_white">{props.name}</span>
      <select ref={props.reference} onChange={(e) => props.func(e.target.value)}  defaultValue={props.options.length > 0 && (!props.options[0].includes("BORÇ")) ? props.options[0] : "default"} required className="block w-2/3 min-h-[34px] py-[6px] text-sm text-prussian_blue rounded-r-md border border-alica_blue bg-white focus:ring-transparent focus:border-indigo_dye">
        <option value="default" disabled>{props.name + " seçin..."}</option>
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
