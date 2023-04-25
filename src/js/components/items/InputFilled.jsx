import React from 'react'

export default function InputFilled(props) {
  return (
    <div className='w-full flex flex-row'>
      <span className="w-[33%] min-w-[130px] truncate font-bold flex justify-between min-h-[34px] text-sm items-center bg-transparent text-indigo_dye px-1">
        <div>{props.name}</div>
        <div className='px-2'>:</div>
      </span>
      <span type="text" ref={props.reference} id={props.id} className="w-[67%] min-h-[34px] truncate py-[6px] border border-transparent border-b-queen_blue bg-transparent text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 focus:ring-transparent block" placeholder={props.name + " girin"}></span>
    </div>
  )
}
