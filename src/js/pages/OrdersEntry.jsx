import React, { useEffect } from 'react'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import OrdersEntryTable from '../components/spesific-tables/OrdersEntryTable'
import EditOrdersEntryProductModal from '../components/modals/EditOrdersEntryProductModal'
import EditOrdersEntryModal from '../components/modals/EditOrdersEntryModal'
import { useOrdersEntry } from '../context/OrdersEntryContext'
import AddOrderEntryProductModal from '../components/modals/AddOrderEntryProductModal'
import RenderPDF from '../components/items/RenderPDF'

export default function OrdersEntry() {
  const orders_entry_data = useOrdersEntry();

  useEffect(() => {
    orders_entry_data.showCurrents();
    orders_entry_data.showOrders();
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
      
      <PageSubTitle title={"Sipariş Tablosu"} />
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
