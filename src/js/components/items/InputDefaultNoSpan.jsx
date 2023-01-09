import React from 'react'

export default function InputDefaultNoSpan(props) {
  return (
    <div className='shadow-input'>
      <input type="text" id={props.id} className="min-h-[34px] w-full px-2 py-[6px] bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 focus:border-shadow_blue focus:ring-transparent block" placeholder={props.name} required />
    </div>
  )
}
