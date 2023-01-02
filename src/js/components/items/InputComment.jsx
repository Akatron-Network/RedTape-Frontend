import React from 'react'

export default function InputComment(props) {
  return (
    <>
      <span className="w-full p-[6px] text-sm flex justify-center items-center rounded-[4px] bg-kombu_green border border-kombu_green rounded-b-none font-medium text-white">{props.name}</span>
      <textarea id={props.id} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-[4px] rounded-t-none border border-kombu_green focus:ring-ebony focus:border-ebony placeholder:opacity-50" placeholder={props.name + " girin"}></textarea>
    </>

  )
}
