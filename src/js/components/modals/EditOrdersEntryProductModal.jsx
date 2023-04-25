import React from 'react'
import InputSelect from '../items/InputSelect'
import InputDefault from '../items/InputDefault'
import PageSubTitle from '../items/PageSubTitle'
import { useOrdersEntry } from '../../context/OrdersEntryContext'
import { useMain } from '../../context/MainContext'
import InputFilledOldVersion from '../items/InputFilledOldVersion'

export default function EditOrdersEntryProductModal() {
  const orders_entry_data = useOrdersEntry();
  const { funcLoad } = useMain();

  return (
    <>
      <div id="editOrdersEntryProductModal" data-modal-target="editOrdersEntryProductModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-md shadow">
            <div className="flex items-start justify-between px-4 pt-3 pb-0 border-b border-steel_blue_light">
              <PageSubTitle title={"Ürün Düzenle"} />
              <h1 className='text-lg text-shadow_blue mb-3 ml-2'>(Sıra: {orders_entry_data.entry_product_details.row})</h1>
              <button type="button" onClick={() => orders_entry_data.hideEntryProductDetailsModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-md p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="pt-4 px-5 grid grid-cols-1 gap-[2px]">
              
              <div className='col-span-2'><InputFilledOldVersion name={"Ürün Kod / İsim"} reference={orders_entry_data.entryProductNameEditRef} /></div>
              <div className='col-span-2'><InputSelect name={"Birim"} reference={orders_entry_data.entryProductUnitEditRef} options={orders_entry_data.entry_product_units} func={() => {}} /></div>
              <div className='col-span-2'><InputDefault name={"Miktar"} reference={orders_entry_data.entryProductAmountEditRef} type={"number"} /></div>
              <div className='col-span-2'><InputDefault name={"Birim Fiyat"} reference={orders_entry_data.entryProductPriceEditRef} type={"number"} /></div>
              <div className={orders_entry_data.invoiced !== true ? "col-span-2 opacity-40 pointer-events-none" : "col-span-2"}><InputSelect name={"KDV Oranı"} reference={orders_entry_data.entryProductTaxRateEditRef} options={["%0", "%8", "%18"]} func={() => {}} /></div>
              <div className='col-span-2'><InputDefault name={"Açıklama"} reference={orders_entry_data.entryProductDescriptionEditRef} type={"text"} /></div>
            
            </div>

            <div className="flex items-center p-4 mt-4 space-x-2 border-t border-steel_blue_light justify-end">
              <button type="button" className="save-btn ml-2 float-right" onClick={() => funcLoad(orders_entry_data.editEntryProduct, orders_entry_data.entry_product_details)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
