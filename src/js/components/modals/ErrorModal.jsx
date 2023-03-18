import React from 'react'
import { useMain } from '../../context/MainContext';

export default function ErrorModal() {
  const { hideErrorModal, errorText } = useMain();

  return (
    <>
      <div id="errorModal" data-modal-target="errorModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-[101] hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              
              <div className="flex text-2xl items-center mb-3">
                <i className="fa-solid fa-circle-exclamation text-red-800"></i>
                <h1 className='text-oxford_blue ml-3'>Hata</h1>
              </div>

              <button type="button" onClick={() => hideErrorModal()} className="text-oxford_blue mt-[2px] bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            
            <div className="p-5 flex flex-col">
              <span className='text-lg font-bold text-red-800'>{errorText.code}</span>
              <span className='text-base font-bold text-oxford_blue'>{errorText.message}</span>
              <hr className="h-px w-2/3 relative left-0 bg-steel_blue_light border-0 my-2"></hr>
              <span className='text-base text-oxford_blue'>{errorText.response}</span>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
