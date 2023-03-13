import React from 'react'
import PageSubTitle from '../items/PageSubTitle'
import { useOrders } from '../../context/OrdersContext';
import logo from '../../../img/pdf.png';

export default function PrintPDFModal() {
  const { hidePrintPDFModal, handlePrint} = useOrders();

  return (
    <>
      <div id="printPDFModal" data-modal-target="printPDFModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              <PageSubTitle title="PDF İndir" />
              <button type="button" onClick={() => hidePrintPDFModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>

            <div className="p-5 flex justify-center">

              <button onClick={handlePrint} className='danger-btn text-ghost_white text-lg flex items-center p-2'>
                <img className='h-8 mr-2' src={logo} alt="" />
                PDF İndir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
