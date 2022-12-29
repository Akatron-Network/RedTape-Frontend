import React from 'react'
import { Link } from "react-router-dom";
import { useMain } from '../context/MainContext';

export default function Navbar() {
  const main_data = useMain();
  console.log(main_data)

  return (
    <header className="bg-pine_tree body-font shadow-navbar w-full z-50 fixed">
      <div className="container mx-[3px] flex flex-wrap p-2 px-[17px] flex-row items-center">
        <Link to={"/"} className="flex title-font font-medium items-center mb-0">
          <img className='h-7' src="/src/img/red-tape-logo.png" alt="RedTape Logo" />
          <span className="mx-3 text-xl text-laurel_green_light font-roboto">RedTape</span>
        </Link>

        <div className="h-7 border-r border-dark_olive_green pr-1 pl-5 mx-2" >
          <div className='text-dark_olive_green px-2 flex h-7 hover:bg-kombu_green hover:text-laurel_green items-center rounded transition duration-200 cursor-pointer'>
            <i className="fa-solid fa-bars text-[20px]"></i>
          </div>
        </div>
        
      </div>
    </header>
  )
}
