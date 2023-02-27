import React, { useEffect } from 'react'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import OrdersEntryTable from '../components/items/OrdersEntryTable'
import Table from '../components/items/Table'

import { useOrdersEntry } from '../context/OrdersEntryContext'

export default function OrdersEntry() {
  const orders_entry_data = useOrdersEntry();
  console.log(orders_entry_data);

  useEffect(() => {
    orders_entry_data.showCurrents();
    orders_entry_data.showOrders();
  }, [])
  
  
  return (
    <>
      <PageMainTitle title={"Sipariş Kayıtları Paneli"} />
      
      <PageSubTitle title={"Sipariş Tablosu"} />
      <OrdersEntryTable />
      <Table />
      
    </>
  )
}
