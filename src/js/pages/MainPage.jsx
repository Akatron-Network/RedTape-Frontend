import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/main-items/Navbar';
import Sidebar from '../components/main-items/Sidebar';

export default function MainPage() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className='pt-16 pb-4 px-6'>
        <Outlet />
      </div>
    </>
  )
}
