import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/main-items/Navbar';
import Sidebar from '../components/main-items/Sidebar';
import LoadingModal from '../components/modals/LoadingModal';
import ErrorModal from '../components/modals/ErrorModal';

export default function MainPage() {  
  return (
    <>
      <Navbar />
      <Sidebar />
      <LoadingModal />
      <ErrorModal />

      <div className='pt-16 pb-4 px-6'>
        <Outlet />
      </div>
    </>
  )
}
