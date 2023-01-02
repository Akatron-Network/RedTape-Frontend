import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../js/components/main-items/Navbar';
import Sidebar from '../js/components/main-items/Sidebar';

export default function MainPage() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className='py-16 px-6'>
        <Outlet />
      </div>
    </>
  )
}
