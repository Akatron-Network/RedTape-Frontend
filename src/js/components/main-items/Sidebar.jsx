import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useMain } from '../../context/MainContext';

export default function Sidebar() {
  const { sidePanel, setSidePanel } = useMain();

  useEffect(() => { //* When click outside the sidepanel close sidepanel
    document.addEventListener('click', closeSidePanel)
    return () => { document.removeEventListener('click', closeSidePanel) }
  }, [])

  const closeSidePanel = (e) => { //* For show-hide sidepanel
    if (e.target.id !== "side-panel" &&
        e.target.id !== "menu-btn" &&
        e.target.className !== "fa-solid fa-bars text-[20px]") {
      setSidePanel(false)
    }
  }
  

  return (
    <aside id='side-panel' className={sidePanel ? "w-[221px] pt-[52px] fixed h-screen bg-prussian_blue p-2 px-0 z-40 shadow-sidebar transition-all duration-500"
    : "transition-all duration-500 -translate-x-64 w-[221px] pt-[52px] fixed h-screen bg-prussian_blue p-2 px-0 z-40 shadow-sidebar"} aria-label="Sidebar">
      <ul className="space-y-2 trans">
        <li>
          <Link to={"/kayit-cari"} className="sidebar-elm">
            <div className='text-center w-6'>
              <i className="fa-solid fa-user-pen"></i>
            </div>
            <span className="sidebar-elm-text">Cari Kayıt</span>
          </Link>
        </li>

        <li>
          <Link to={"/cari-hareket"} className="sidebar-elm">
            <div className='text-center w-6'>
              <i className="fa-solid fa-address-card"></i>
            </div>
            <span className="sidebar-elm-text">Cari Hareket</span>
          </Link>
        </li>

        <li>
          <Link to={"/kayit-stok"} className="sidebar-elm">
            <div className='text-center w-6'>
              <i className="fa-solid fa-boxes-packing"></i>
            </div>
            <span className="sidebar-elm-text">Stok Kayıt</span>
          </Link>
        </li>

        <li>
          <Link to={"/siparis"} className="sidebar-elm">
            <div className='text-center w-6'>
              <i className="fa-solid fa-dolly"></i>
            </div>
            <span className="sidebar-elm-text">Sipariş</span>
          </Link>
        </li>

        <li>
          <Link to={"/gorev-takip"} className="sidebar-elm">
            <div className='text-center w-6'>
              <i className="fa-solid fa-clipboard-question"></i>
            </div>
            <span className="sidebar-elm-text">Görev Takip</span>
          </Link>
        </li>
      </ul>
    </aside>
  )
}
