import React from 'react'
import InputDefault from '../items/InputDefault'
import PageSubTitle from '../items/PageSubTitle'
import { useOrders } from '../../context/OrdersContext';

export default function EditProductModal() {
  const orders_data = useOrders();

  return (
    <>
      <div id="editProductModal" data-modal-target="editProductModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              <PageSubTitle title={"Stok Düzenle"} />
              <button type="button" onClick={() => orders_data.hideProductModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="pt-4 px-5 grid grid-cols-1 gap-[1px]">

              <div className='flex flex-row col-span-5 lg:col-span-3 relative'>
                <div className='w-full shadow-input relative z-[19]'>
                  <div className="relative col-span-2 lg:col-span-1" >
                    <input type="text" ref={orders_data.ordersNameEditRef} id="search_stock_input" onChange={(e) => orders_data.filterStocks(e)} className="block p-2 pb-[.30rem] min-h-[34px] w-full text-prussian_blue text-sm bg-white border border-white appearance-none placeholder:text-mn_blue focus:border-shadow_blue focus:ring-transparent peer" placeholder=" " />
                    <label htmlFor="search_stock_input" className="absolute truncate cursor-text text-sm text-mn_blue bg-white px-1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2.5 opacity-70 peer-focus:text-queen_blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:opacity-100 peer-focus:top-1 peer-focus:text-base peer-focus:-translate-y-4">Ürün Adı</label>
                  </div>
                  <button id='search_stock_button' type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i id='search_stock_button_icon' className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
                  </button>
                </div>
                <div className={orders_data.toggle_filtered_stock_table ? 
                  "opacity-100 transition duration-200 absolute overflow-y-auto shadow-button right-0 top-full w-full z-[18] border border-t-0 h-60 border-shadow_blue bg-alica_blue" 
                  :
                  "absolute transition duration-200 overflow-y-auto shadow-button right-0 top-full w-full z-[18] border border-t-0 h-60 border-shadow_blue bg-alica_blue opacity-0 pointer-events-none"
                }>
                  {/* <AutoSearch data={orders_data.filtered_stocks} func={orders_data.chooseFilteredStock} cols={["Stok Kod", "Stok İsim", "Malzeme", "Ürün Grubu"]} /> */}
                </div>
              </div>
              
              <div className='col-span-2'><InputDefault name={"Miktar"} reference={orders_data.stockNameEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Birim Fiyat"} reference={orders_data.stockMaterialEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Açıklama"} reference={orders_data.stockProductGroupEditRef} /></div>
            
            </div>

            <div className="flex items-center px-5 py-3 mt-4 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="clear-btn float-right" onClick={() => orders_data.clearProductEditInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
              <button type="button" className="save-btn ml-2 float-right" onClick={() => orders_data.editProduct()}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
