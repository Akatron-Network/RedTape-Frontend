import React from 'react'
import InputDefault from '../items/InputDefault'
import InputSelect from '../items/InputSelect'
import InputFilled from '../items/InputFilled'
import PageSubTitle from '../items/PageSubTitle'
import { useOrdersEntry } from '../../context/OrdersEntryContext'
import ShowOrdersTable from '../spesific-tables/ShowOrdersTable'

export default function EditOrdersEntryModal() {
  const orders_entry_data = useOrdersEntry();

  return (
    <>
      <div id="showOrdersEntryModal" data-modal-target="showOrdersEntryModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-[41] hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-[90%] md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              <PageSubTitle title={"Sipariş Düzenle"} />
              <button type="button" onClick={() => orders_entry_data.hideGetOrderDetailsModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>

            <div className="p-5 grid grid-cols-1 grid-flow-row gap-[1px] w-full lg:w-[45%] xl:w-[40%]">
              <div className='col-span-1'><InputFilled name={"Cari Kod / İsim"} reference={orders_entry_data.ordersEntryCurrentNameEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Sipariş Kaynağı"} reference={orders_entry_data.ordersEntryOrderSourceEditRef} type={"text"} /></div>
              <div className='col-span-1'><InputSelect name={"Faturalı / Faturasız"} reference={orders_entry_data.ordersEntryInvoicedEditRef} options={["Faturalı", "Faturasız"]} func={() => {}} /></div>
              <div className='col-span-1'><InputDefault name={"Sipariş Tarihi"} reference={orders_entry_data.ordersEntryDateEditRef} type={"date"} /></div>
              <div className='col-span-1'><InputDefault name={"Teslim Tarihi"} reference={orders_entry_data.ordersEntryDeliveryDateEditRef} type={"date"} /></div>
            </div>
            <div className='p-5'><ShowOrdersTable /></div>

            <div className="flex items-center px-5 py-3 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="save-btn ml-2 float-right" onClick={() => orders_entry_data.editOrdersEntry(orders_entry_data.get_order_details)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
