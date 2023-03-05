import React from 'react'
import InputFilled from '../items/InputFilled'
import InputSelect from '../items/InputSelect'
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
              <PageSubTitle title={"Ürün Düzenle"} />
              <button type="button" onClick={() => orders_data.hideProductModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="pt-4 px-5 grid grid-cols-1 gap-[1px]">
              
              <div className='col-span-2'><InputFilled name={"Ürün Adı"} reference={orders_data.ordersNameEditRef} /></div>
              <div className='col-span-2'><InputSelect name={"Birim"} reference={orders_data.ordersUnitEditRef} options={orders_data.chosen_stock_edit_units} func={() => {}} /></div>
              <div className='col-span-2'><InputDefault name={"Miktar"} reference={orders_data.ordersAmountEditRef} type={"number"} /></div>
              <div className='col-span-2'><InputDefault name={"Birim Fiyat"} reference={orders_data.ordersPriceEditRef} type={"number"} /></div>
              <div className='col-span-2'><InputSelect name={"KDV Oranı"} reference={orders_data.ordersTaxRateEditRef} options={["%0", "%8", "%18"]} func={() => {}} /></div>
              <div className='col-span-2'><InputDefault name={"Açıklama"} reference={orders_data.ordersDescriptionEditRef} type={"text"} /></div>
            
            </div>

            <div className="flex items-center px-5 py-3 mt-4 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="clear-btn float-right" onClick={() => orders_data.clearProductEditInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
              <button type="button" className="save-btn ml-2 float-right" onClick={() => orders_data.editProduct(orders_data.product_details.row)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
