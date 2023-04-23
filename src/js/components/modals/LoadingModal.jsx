
import React from 'react'

export default function LoadingModal() {

  return (
    <>
      <div id="loadingModal" data-modal-target="loadingModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-[100] hidden w-full p-4 overflow-x-hidden bg-dark_modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative rounded-md shadow">

            <div className='flex flex-col items-center'>
              <h1 className='mb-5 text-3xl text-alica_blue_light pb-2'>Yükleniyor</h1>
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
