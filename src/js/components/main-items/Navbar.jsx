import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useMain } from '../../context/MainContext';

export default function Navbar() {
  const { sidePanel, setSidePanel } = useMain();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <header className="bg-oxford_blue shadow-navbar w-full z-50 fixed">
      <div className="container mx-[3px] flex flex-wrap p-2 px-[11px] flex-row items-center">
        <Link to={"/dashboard"} className="flex title-font font-medium items-center mb-0">
          <img className='h-7' src="/src/img/red-tape-logo.png" alt="RedTape Logo" />
          <span className="mx-3 text-xl text-steel_blue font-roboto">RedTape</span>
        </Link>

        <div className="h-7 border-r border-indigo_dye pr-[3px] pl-5 mr-2 ml-4" >
          <div id='menu-btn' onClick={() => setSidePanel(!sidePanel)}
            className='text-queen_blue p-2 flex h-7 active:scale-105 hover:bg-prussian_blue hover:text-steel_blue items-center rounded transition duration-200 cursor-pointer'>
            <i className="fa-solid fa-bars text-[20px]"></i>
          </div>
        </div>

        <div className="h-7 border-indigo_dye mx-[6px] absolute right-0" >
          <div onClick={logout}
            className='text-queen_blue flex h-7 p-2 active:scale-105 hover:bg-prussian_blue hover:text-steel_blue items-center rounded transition duration-200 cursor-pointer'>
            <i className="fa-solid fa-right-from-bracket text-[20px]"></i>
          </div>
        </div>
      </div>
    </header>
  )
}
