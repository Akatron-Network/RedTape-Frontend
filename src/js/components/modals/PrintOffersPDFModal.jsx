import React from 'react'
import PageSubTitle from '../items/PageSubTitle'
import { useOffers } from '../../context/OffersContext';

export default function PrintOffersPDFModal() {
  const { hidePrintPDFModal, handlePrint} = useOffers();

  return (
    <>
      <div id="printOffersPDFModal" data-modal-target="printOffersPDFModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 hidden left-0 right-0 z-50  w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-md shadow">
            <div className="flex items-start justify-between px-4 pt-3 pb-0 border-b border-steel_blue_light">
              <PageSubTitle title="Teklif Oluşturuldu" />
              <button type="button" onClick={() => hidePrintPDFModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-md p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>

            <div className="p-4 pb-5 flex flex-col justify-center gap-4">
              
              <p className='w-full text-center'>Teklif oluşturma başarıyla tamamlandı!</p>

              <button onClick={handlePrint} className='save-btn text-base flex items-center p-2 px-3 relative left-1/2 -translate-x-1/2'>
                <i className="fa-solid fa-print text-lg mr-2"></i>Yazdır
              </button>

              <div className='flex flex-row justify-center gap-2'>
                <button onClick={handlePrint} className='render-btn text-base flex items-center p-2 px-3'>
                  <i className="fa-solid fa-comment-sms text-lg mr-2"></i>SMS Gönder
                </button>
                <button onClick={handlePrint} className='clear-btn text-base flex items-center p-2 px-3'>
                  <i className="fa-solid fa-envelope text-lg mr-2"></i>Mail Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
