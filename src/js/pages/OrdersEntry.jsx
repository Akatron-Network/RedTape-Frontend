import React, { useEffect } from 'react'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import OrdersEntryTable from '../components/spesific-tables/OrdersEntryTable'
import EditOrdersEntryProductModal from '../components/modals/EditOrdersEntryProductModal'
import EditOrdersEntryModal from '../components/modals/EditOrdersEntryModal'
import { useOrdersEntry } from '../context/OrdersEntryContext'

export default function OrdersEntry() {
  const orders_entry_data = useOrdersEntry();
  console.log(orders_entry_data);

  useEffect(() => {
    orders_entry_data.showCurrents();
    orders_entry_data.showOrders();
    orders_entry_data.showStocks();
  }, [])
  
  
  return (
    <>
      <PageMainTitle title={"Sipariş Kayıtları Paneli"} />
      
      <PageSubTitle title={"Sipariş Tablosu"} />
      <OrdersEntryTable />
      <EditOrdersEntryProductModal />
      <EditOrdersEntryModal />
      
    </>
  )
}
