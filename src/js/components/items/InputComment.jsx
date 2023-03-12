import React from 'react'

export default function InputComment(props) {
  return (
    <div className='shadow-input'>
      <span className="w-full p-[6px] min-w-[120px] truncate text-sm flex justify-center items-center border border-steel_blue_light border-b-0 bg-steel_blue_light font-medium text-prussian_blue">{props.name}</span>
      <textarea ref={props.reference} rows="6" className="border resize-none border-white block p-2.5 w-full min-w-[120px] text-sm text-prussian_blue bg-white focus:ring-transparent focus:border-shadow_blue placeholder:text-mn_blue placeholder:opacity-70" placeholder={props.name + " girin"}></textarea>
    </div>

  )
}
