import React from 'react'
import ShowOrdersTable from '../spesific-tables/ShowOrdersTable'
import PageSubTitle from '../items/PageSubTitle'
import { useOrdersEntry } from '../../context/OrdersEntryContext'

export default function ShowOrdersModal() {
  const { hideShowOrdersModal, show_orders_details } = useOrdersEntry();

  return (
    <>
      <div id="showOrdersModal" data-modal-target="showOrdersModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-[90%] md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              <PageSubTitle title={"Ürün Tablosu"} />
              <span className='text-lg mb-3 ml-1 text-shadow_blue'>(Sipariş Kodu: {show_orders_details[0] !== undefined ? show_orders_details[0].order_id : ""})</span>
              <button type="button" onClick={() => hideShowOrdersModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-5 grid grid-cols-1 gap-[1px]">
              <ShowOrdersTable />
            </div>
            {/* <div className="flex items-center px-5 py-3 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="clear-btn float-right" onClick={() => cur_act_data.clearCurActEditInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
              <button type="button" className="save-btn ml-2 float-right" onClick={() => cur_act_data.editCurrentActivity(cur_act_data.cur_act_details.id)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
