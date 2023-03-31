import React, { useEffect } from 'react'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import OrdersEntryTable from '../components/spesific-tables/OrdersEntryTable'
import EditOrdersEntryProductModal from '../components/modals/EditOrdersEntryProductModal'
import EditOrdersEntryModal from '../components/modals/EditOrdersEntryModal'
import { useOrdersEntry } from '../context/OrdersEntryContext'
import AddOrderEntryProductModal from '../components/modals/AddOrderEntryProductModal'
import RenderPDF from '../components/items/RenderPDF'
import { useMain } from '../context/MainContext'
import { useNavigate } from 'react-router-dom'

export default function OrdersEntry() {
  const orders_entry_data = useOrdersEntry();
  const { adminAll, adminCheck, funcLoad } = useMain();
  
  const navigate = useNavigate();

  useEffect(() => {
    if(!adminAll) navigate("/")
  }, [adminAll])

  useEffect(() => {
    adminCheck();
    orders_entry_data.showCurrents();
    funcLoad(orders_entry_data.showOrders);
    orders_entry_data.showStocks();

    document.addEventListener('click', function(e) {
      orders_entry_data.toggleFilteredStockTable(e);
    })

    return () => {
      document.addEventListener('click', function(e) {
        orders_entry_data.toggleFilteredStockTable(e);
      })

      orders_entry_data.dispatch({
        type: 'CHOSEN_STOCK_UNITS',
        value: []
      })
    }
  }, [])
  
  
  return (
    <>
      <PageMainTitle title={"Sipariş Kayıtları Paneli"} />
      
      <div className="flex flex-row justify-between mb-1">
        <PageSubTitle title={"Sipariş Tablosu"} />
        <div className='flex flex-row shadow-input ellipsis h-[30px]'>
          <span className="w-1/3 truncate flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px">Ara<i className="fa-solid fa-magnifying-glass text-indigo_dye ml-2"></i></span>
          <input onChange={(e) => orders_entry_data.filterOrders(e)} type={"text"} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder="Cari İsim ile ara..." required />
        </div>
      </div>

      <OrdersEntryTable />
      <EditOrdersEntryModal />
      <EditOrdersEntryProductModal />
      <AddOrderEntryProductModal />
      
      <div className='hidden'>
        <RenderPDF reference={orders_entry_data.componentRef} data={orders_entry_data.print_pdf_rows} stocks={orders_entry_data.all_stocks} />
      </div>
    </>
  )
}
