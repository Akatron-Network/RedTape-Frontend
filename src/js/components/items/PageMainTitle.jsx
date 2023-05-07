import React from 'react'

export default function PageMainTitle(props) {
  return (
    <h1 className='mb-5 text-2xl text-oxford_blue border-b-2 border-steel_blue_light pb-2'>{props.icon} &nbsp;{props.title}</h1>
  )
}
