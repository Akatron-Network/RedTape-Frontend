import React from 'react'
import { Link } from "react-router-dom";
import { useMain } from '../context/MainContext';

export default function Sidebar() {
  const main_data = useMain();
  console.log(main_data)

  return (
    <aside className="w-[221px] pt-[52px] fixed h-screen bg-kombu_green p-2 z-40 shadow-sidebar" aria-label="Sidebar">
      <ul className="space-y-2 trans">
        <li>
          <Link to={"/cari-kayit"} className="sidebar-elm">
            <div className='text-center w-6'>
              <i className="fa-solid fa-address-card"></i>
            </div>
            <span className="sidebar-elm-text">Cari Kayıt</span>
          </Link>
        </li>

        <li>
          <Link to={"/cari-hareket"} className="sidebar-elm">
            <div className='text-center w-6'>
              <i className="fa-solid fa-user-pen"></i>
            </div>
            <span className="sidebar-elm-text">Cari Hareket</span>
          </Link>
        </li>

      </ul>
    </aside>
  )
}
