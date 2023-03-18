import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/main-items/Navbar';
import Sidebar from '../components/main-items/Sidebar';
import LoadingModal from '../components/modals/LoadingModal';
import ErrorModal from '../components/modals/ErrorModal';
import esprint from '../../img/esprint.png';

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
      <div className="absolute bottom-4 right-6 -z-[1] pointer-events-none">
        <div className='opacity-60'><img src={esprint} alt="" /></div>
        <div className='text-right opacity-60 mt-2'>Developed by <span className='text-green-600'>Akatron Network</span></div>
      </div>
    </>
  )
}
