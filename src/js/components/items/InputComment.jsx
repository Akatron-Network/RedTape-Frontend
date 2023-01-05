import React from 'react'

export default function InputComment(props) {
  return (
    <div className='shadow-md'>
      <span className="w-full p-[6px] text-sm flex justify-center items-center border border-alica_blue_middle border-b-0 bg-alica_blue font-medium text-indigo_dye">{props.name}</span>
      <textarea id={props.id} rows="4" class=" border border-alica_blue_middle block p-2.5 w-full text-sm text-mn_blue bg-white focus:ring-transparent focus:border-shadow_blue placeholder:text-mn_blue placeholder:opacity-70" placeholder={props.name + " girin"}></textarea>
    </div>

  )
}
