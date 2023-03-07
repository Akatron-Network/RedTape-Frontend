import React from 'react'
import InputFilled from '../items/InputFilled'
import InputSelect from '../items/InputSelect'
import InputDefault from '../items/InputDefault'
import PageSubTitle from '../items/PageSubTitle'
import { useOrdersEntry } from '../../context/OrdersEntryContext'
import AutoSearch from '../items/AutoSearch'

export default function AddOrderEntryProductModal() {
  const orders_entry_data = useOrdersEntry();

  return (
    <>
      <div id="addOrderEntryProductModal" data-modal-target="addOrderEntryProductModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              <PageSubTitle title={"Yeni Kalem Ekle"} />
              <button type="button" onClick={() => orders_entry_data.hideAddEntryOrderProductModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="pt-4 px-5 grid grid-cols-1 gap-[1px]">
              
              <div className='col-span-2'>

                <div className='flex flex-row col-span-1 mb-2 relative'>
                  <span className="w-1/3 shadow-input flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px]">Stok Adı</span>
                  <div className='w-2/3 shadow-input relative z-[21]'>
                    <input id='add_entry_order_product_input' type="text" ref={orders_entry_data.addOrdersEntryProductSearchInputRef} onChange={(e) => orders_entry_data.filterStocks(e)} className="w-full min-h-[34px] py-[6px] pr-9 bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder="Stok kodu, stok ismi, malzeme, ürün grubu ile arayın" required />
                    <button type="button" id='add_entry_order_product_button' className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <i id='add_entry_order_product_button_icon' className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
                    </button>
                  </div>
                  <div className={orders_entry_data.toggle_filtered_stock_table ? 
                    "opacity-100 transition duration-300 absolute overflow-y-auto shadow-button right-0 top-full w-2/3 z-20 border border-t-0 h-60 border-shadow_blue bg-alica_blue" 
                    : "absolute transition duration-300 overflow-y-auto shadow-button right-0 top-full w-2/3 z-20 border border-t-0 h-60 border-shadow_blue bg-alica_blue opacity-0 pointer-events-none"
                  }>
                  <AutoSearch data={orders_entry_data.filtered_stocks} func={orders_entry_data.chooseFilteredStock} cols={["Stok Kod", "Stok Adı", "Malzeme", "Ürün Grubu"]} />
                  </div>
                </div>

              </div>

              <div className='col-span-2'><InputSelect name={"Birim"} reference={orders_entry_data.addOrderEntryProductUnitEditRef} options={orders_entry_data.chosen_stock_units} func={() => {}} /></div>
              <div className='col-span-2'><InputDefault name={"Miktar"} reference={orders_entry_data.addOrderEntryProductAmountEditRef} type={"number"} /></div>
              <div className='col-span-2'><InputDefault name={"Birim Fiyat"} reference={orders_entry_data.addOrderEntryProductPriceEditRef} type={"number"} /></div>
              <div className={orders_entry_data.invoiced !== true ? "col-span-2 opacity-40 pointer-events-none" : "col-span-2"}><InputSelect name={"KDV Oranı"} reference={orders_entry_data.addOrderEntryProductTaxRateEditRef} options={["%0", "%8", "%18"]} func={() => {}} /></div>
              <div className='col-span-2'><InputDefault name={"Açıklama"} reference={orders_entry_data.addOrderEntryProductDescriptionEditRef} type={"text"} /></div>
            
            </div>

            <div className="flex items-center px-5 py-3 mt-4 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="save-btn ml-2 float-right" onClick={() => orders_entry_data.addOrderEntryProduct()}><i className="fa-solid fa-floppy-disk mr-2"></i>Yeni Kalem Oluştur</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
