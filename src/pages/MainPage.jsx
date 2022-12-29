import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../js/components/Navbar';
import Sidebar from '../js/components/Sidebar';

export default function MainPage() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className='pt-12'>
        <Outlet />
      </div>
    </>
  )
}
