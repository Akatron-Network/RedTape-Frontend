import React from 'react'
import PageSubTitle from '../items/PageSubTitle'
import { useOrders } from '../../context/OrdersContext';

export default function PrintPDFModal() {
  const { hidePrintPDFModal, handlePrint} = useOrders();

  return (
    <>
      <div id="printPDFModal" data-modal-target="printPDFModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 hidden left-0 right-0 z-50  w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-md shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light">
              <PageSubTitle title="Sipariş Yazdır" />
              <button type="button" onClick={() => hidePrintPDFModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-md p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>

            <div className="p-5 flex flex-col text-center">

              <p className='mb-5'>Sipariş oluşturma başarıyla tamamlandı!</p>

              <button onClick={handlePrint} className='save-btn text-base flex items-center p-2 px-3 relative left-1/2 -translate-x-1/2'>
                <i className="fa-solid fa-print text-lg mr-2"></i>Yazdır
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
