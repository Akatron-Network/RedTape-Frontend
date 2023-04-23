import React from 'react'

export default function Table(props) {  
  return (
    <div className="overflow-auto max-h-[639px] shadow-table rounded-md">
      {props.data}
    </div>

  )
}
