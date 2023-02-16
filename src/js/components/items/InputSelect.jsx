import React from 'react'

export default function InputSelect(props) {
  console.log(props);
  return (
    <div className='w-full flex flex-row shadow-input'>
      <span className="w-1/3 flex min-h-[34px] justify-center items-center border border-alica_blue_light px-1 py-[6px] text-sm bg-steel_blue_light rounded-r-none text-prussian_blue">{props.name}</span>
      <select ref={props.reference} onChange={(e) => props.func(e.target.value)} defaultValue="default" required className="block w-2/3 min-h-[34px] py-[6px] text-sm text-prussian_blue border border-white bg-white focus:ring-transparent focus:border-shadow_blue">
        <option value="default" disabled>{props.name + " seçin..."}</option>
        {
          (props.options !== undefined) ? 
          (props.options).map((p, index) => {
            return <option key={index} value={p}>{p}</option>
          }) 
          : undefined
        }
        {/* <option value="38">Kayseri</option> */}
      </select>
    </div>
  )
}
