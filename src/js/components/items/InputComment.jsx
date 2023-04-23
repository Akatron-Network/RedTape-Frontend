import React from 'react'

export default function InputComment(props) {
  return (
    <div className='shadow-input rounded-md'>
      <span className="w-full p-[6px] min-w-[120px] truncate text-sm flex rounded-t-md justify-center items-center border border-alica_blue bg-indigo_dye font-medium text-ghost_white">{props.name}</span>
      <textarea ref={props.reference} rows="6" className="border resize-none border-alica_blue rounded-b-md block p-2.5 w-full min-w-[120px] text-sm text-prussian_blue bg-white focus:ring-transparent focus:border-indigo_dye placeholder:text-mn_blue placeholder:opacity-70" placeholder={props.name + " girin"}></textarea>
    </div>

  )
}
