import React from 'react'
import InputSelect from '../items/InputSelect'
import InputDefault from '../items/InputDefault'
import PageSubTitle from '../items/PageSubTitle'
import { useOrders } from '../../context/OrdersContext';
import { useMain } from '../../context/MainContext'
import InputFilledOldVersion from '../items/InputFilledOldVersion'

export default function EditProductModal() {
  const orders_data = useOrders();
  const { funcLoad } = useMain();

  return (
    <>
      <div id="editProductModal" data-modal-target="editProductModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-md shadow">
            <div className="flex items-start justify-between px-4 pt-3 pb-0 border-b border-steel_blue_light">
              <PageSubTitle title={"Ürün Düzenle"} />
              <button type="button" onClick={() => orders_data.hideProductModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-md p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="pt-4 px-5 grid grid-cols-1 gap-[2px]">
              
              <div className='col-span-2'><InputFilledOldVersion name={"Ürün Adı"} reference={orders_data.ordersNameEditRef} /></div>
              <div className='col-span-2'><InputSelect name={"Birim"} reference={orders_data.ordersUnitEditRef} options={orders_data.chosen_stock_edit_units} func={() => {}} /></div>
              <div className='col-span-2'><InputDefault name={"Miktar"} reference={orders_data.ordersAmountEditRef} type={"number"} /></div>
              <div className='col-span-2'><InputDefault name={"Birim Fiyat"} reference={orders_data.ordersPriceEditRef} type={"number"} /></div>
              <div className={orders_data.invoiced !== true ? "col-span-2 lg:col-span-1 opacity-40 pointer-events-none" : "col-span-2 lg:col-span-1"}><InputSelect name={"KDV Oranı"} reference={orders_data.ordersTaxRateEditRef} options={["%0", "%10", "%20"]} func={() => {}} /></div>
              <div className='col-span-2'><InputDefault name={"Açıklama"} reference={orders_data.ordersDescriptionEditRef} type={"text"} /></div>
            
            </div>

            <div className="flex items-center p-4 mt-4 space-x-2 border-t border-steel_blue_light justify-end">
              <button type="button" className="clear-btn float-right" onClick={() => orders_data.clearProductEditInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
              <button type="button" className="save-btn ml-2 float-right" onClick={() => funcLoad(orders_data.editProduct, orders_data.product_details.row)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
