import React from 'react'
import { useOrdersEntry } from '../../context/OrdersEntryContext'
import Tooltip from './Tooltip';

export default function OrdersTable() {

  const { table_columns, all_orders, all_currents, showOrderDetails, getOrderDetails, removeOrder } = useOrdersEntry();

  return (
    
    <div className="overflow-x-auto relative shadow-table">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead className="text-xs text-prussian_blue bg-steel_blue_light">
          <tr>
            {table_columns.map((c, i) => {
              let cls = "p-2 font-bold text-xs"
              if(c === "TOPLAM TUTAR") cls= "p-2 font-bold text-xs text-center"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
            <th scope="col" className="p-2 w-28 font-bold text-xs">
              <span className="sr-only">Düzenle</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {all_orders.map((p, i) => {

            let cur_name = "";
            for (let c of all_currents) {
              if (p.details.current_id === c.details.id) {
                cur_name = c.details.name
              }
            }
            
            return (
              <tr key={i} className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.id}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.current_id}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {cur_name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order_source}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.invoiced === true ? "Faturalı" : "Faturasız"}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.delivery_date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-center font-bold">
                  {p.details.total_fee}
                </td>
                <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <Tooltip message={"Siparişi Görüntüle"}>
                    <button type='button' onClick={() => showOrderDetails(p.details.id)} className='clear-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-eye"></i></button>
                  </Tooltip>
                  <Tooltip message={"Siparişi Düzenle"}>
                    <button type='button' onClick={() => getOrderDetails(p.details.id)} className='ml-1 golden-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-pen-to-square"></i></button>
                  </Tooltip>
                  <Tooltip message={"Siparişi Sil"}>
                    <button type='button' onClick={() => removeOrder(p.details.id)} className='ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-xmark"></i></button>
                  </Tooltip>
                </td>
              </tr>

            )
          })}
        </tbody>
      </table>

      <nav className="flex justify-between items-center py-2 px-3 bg-steel_blue_light h-10" aria-label="Table navigation">
        <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">0</span> kayıt bulunmaktadır.</span>
      </nav>
    </div>
    
  )
}
