import React from 'react'

export default function InputComment(props) {
  return (
    <>
      <span className="w-full p-[6px] text-sm flex justify-center items-center rounded-[4px] bg-indigo_dye border border-indigo_dye rounded-b-none font-medium text-alica_blue_light">{props.name}</span>
      <textarea id={props.id} rows="4" class="block p-2.5 w-full text-sm text-indigo_dye bg-white rounded-[4px] rounded-t-none border border-indigo_dye focus:ring-mn_blue focus:border-mn_blue placeholder:text-mn_blue placeholder:opacity-50" placeholder={props.name + " girin"}></textarea>
    </>

  )
}
