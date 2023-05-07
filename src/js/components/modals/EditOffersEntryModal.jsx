import React from 'react'
import InputDefault from '../items/InputDefault'
import InputSelect from '../items/InputSelect'
import PageSubTitle from '../items/PageSubTitle'
import { useOffersEntry } from '../../context/OffersEntryContext'
import ShowOffersTable from '../spesific-tables/ShowOffersTable'
import { useMain } from '../../context/MainContext'
import InputFilledOldVersion from '../items/InputFilledOldVersion'

export default function EditOffersEntryModal() {
  const offers_entry_data = useOffersEntry();
  const { funcLoad } = useMain();

  return (
    <>
      <div id="showOffersEntryModal" data-modal-target="showOffersEntryModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-[41] hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-[90%] md:h-auto">
          <div className="relative bg-ghost_white rounded-md shadow">
            <div className="flex items-start justify-between px-4 pt-3 pb-0 border-b border-steel_blue_light">
              <PageSubTitle title={"Teklifi Düzenle"} />
              <button type="button" onClick={() => funcLoad(offers_entry_data.hideGetOfferDetailsModal)} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-md p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>

            <div className="p-4 grid grid-cols-1 grid-flow-row gap-[2px] w-full lg:w-[45%] xl:w-[40%] relative">
              <div className='col-span-1'><InputFilledOldVersion name={"Cari Kod / İsim"} reference={offers_entry_data.offersEntryCurrentNameEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Sipariş Kaynağı"} reference={offers_entry_data.offersEntryOfferSourceEditRef} type={"text"} /></div>
              <div className='col-span-1'><InputSelect name={"Faturalı / Faturasız"} reference={offers_entry_data.offersEntryInvoicedEditRef} options={["Faturalı", "Faturasız"]} func={offers_entry_data.invoicedCheck} /></div>
              <div className='col-span-1'><InputDefault name={"Sipariş Tarihi"} reference={offers_entry_data.offersEntryDateEditRef} type={"date"} /></div>
              <div className='col-span-1'><InputDefault name={"Teslim Tarihi"} reference={offers_entry_data.offersEntryDeliveryDateEditRef} type={"date"} /></div>
            </div>
            <div className='px-5'>
              <ShowOffersTable />
              
              <div className="flex items-center py-3 space-x-2 justify-end">
                <button type="button" className="clear-btn" onClick={() => offers_entry_data.showAddEntryOfferProductModal()}><i className="fa-solid fa-floppy-disk mr-2"></i>Yeni Kalem Ekle</button>
              </div>
            </div>

            <div className="flex items-center p-4 space-x-2 border-t border-steel_blue_light justify-end">
              <button type="button" className="save-btn" onClick={() => funcLoad(offers_entry_data.editOffersEntry, offers_entry_data.get_offer_details)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
