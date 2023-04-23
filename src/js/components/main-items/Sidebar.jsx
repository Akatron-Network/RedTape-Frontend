import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useMain } from '../../context/MainContext';

export default function Sidebar() {
  const { sidePanel, setSidePanel } = useMain();
  const [admin, setAdmin] = useState(false)
  const navigate = useNavigate();

  useEffect(() => { //* When click outside the sidepanel close sidepanel
    document.addEventListener('click', closeSidePanel)
    adminCheck();
    return () => { document.removeEventListener('click', closeSidePanel) }
  }, [])

  const closeSidePanel = (e) => { //* For show-hide sidepanel
    if (e.target.id !== "side-panel" &&
        e.target.id !== "menu-btn" &&
        e.target.className !== "fa-solid fa-bars text-[20px]") {
      setSidePanel(false)
    }
  }
  
  const adminCheck = async () => {
    if(localStorage.user_details !== undefined) var dt = JSON.parse(localStorage.user_details);
    else {navigate("/login"); return;}

    setAdmin(false);

    if (dt.admin) {
      setAdmin(true);
    }
  }
  

  return (
    <aside id='side-panel' className={sidePanel ? "w-[221px] pt-[52px] fixed h-screen bg-prussian_blue p-2 px-0 z-40 shadow-sidebar transition-all duration-500"
    : "transition-all duration-500 -translate-x-64 w-[221px] pt-[52px] fixed h-screen bg-prussian_blue p-2 px-0 z-40 shadow-sidebar"} aria-label="Sidebar">
      <ul className="space-y-2 trans px-2">


        {admin ? 
          <>
            <li>
              <Link to={"/admin-panel"} className="sidebar-elm">
                <div className='text-center w-6'>
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <span className="sidebar-elm-text">Admin Paneli</span>
              </Link>
            </li>

            <li>
              <Link to={"/current"} className="sidebar-elm">
                <div className='text-center w-6'>
                  <i className="fa-solid fa-user-pen"></i>
                </div>
                <span className="sidebar-elm-text">Cari Kayıt</span>
              </Link>
            </li>

            <li>
              <Link to={"/current-activity"} className="sidebar-elm">
                <div className='text-center w-6'>
                  <i className="fa-solid fa-address-card"></i>
                </div>
                <span className="sidebar-elm-text">Cari Hareket</span>
              </Link>
            </li>

            <li>
              <Link to={"/stock"} className="sidebar-elm">
                <div className='text-center w-6'>
                  <i className="fa-solid fa-boxes-packing"></i>
                </div>
                <span className="sidebar-elm-text">Stok Kayıt</span>
              </Link>
            </li>

            <li>
              <Link to={"/orders"} className="sidebar-elm">
                <div className='text-center w-6'>
                  <i className="fa-solid fa-dolly"></i>
                </div>
                <span className="sidebar-elm-text">Sipariş</span>
              </Link>
            </li>
          
            <li>
              <Link to={"/orders-entry"} className="sidebar-elm">
                <div className='text-center w-6'>
                  <i className="fa-solid fa-clipboard"></i>
                </div>
                <span className="sidebar-elm-text">Sipariş Kayıtları</span>
              </Link>
            </li>
          </>
        : undefined}

        <li>
          <Link to={"/tasks"} className="sidebar-elm">
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
