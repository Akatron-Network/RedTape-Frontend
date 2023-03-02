import React from 'react'
import { useOrdersEntry } from '../../context/OrdersEntryContext'
import CurrencyFormat from '../../libraries/tools/CurrencyFormat';
import Tooltip from '../items/Tooltip';

export default function OrdersTable() {

  const { table_columns, all_orders, all_currents, showOrderDetails, getOrderDetails, removeOrder } = useOrdersEntry();

  return (
    
    <div className="shadow-table overflow-auto max-h-[730px]">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {table_columns.map((c, i) => {
              let cls = "p-2 h-10 font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10"
              if(c === "TOPLAM TUTAR") cls= "p-2 h-10 font-bold text-xs text-center sticky top-0 text-prussian_blue bg-steel_blue_light z-10"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
            <th scope="col" className="p-2 h-10 w-28 font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10">
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
                  {CurrencyFormat(p.details.total_fee)}
                </td>
                <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <Tooltip message={"Ürünü Düzenle"}>
                    <button type='button' onClick={() => getOrderDetails(p.details.id)} className='ml-1 golden-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-pen-to-square"></i></button>
                  </Tooltip>
                  <Tooltip message={"Ürünü Sil"}>
                    <button type='button' onClick={() => removeOrder(p.details.id)} className='ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-xmark"></i></button>
                  </Tooltip>
                </td>
              </tr>

            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-steel_blue_light h-10 bottom-0 sticky" aria-label="Table navigation">
        <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{all_orders.length}</span> kayıt bulunmaktadır.</span>
      </nav>
    </div>
    
  )
}
