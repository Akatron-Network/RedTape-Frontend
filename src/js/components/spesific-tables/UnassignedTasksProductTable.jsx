import React from 'react'
import { useTasks } from '../../context/TasksContext'
import CurrencyFormat from '../../libraries/tools/CurrencyFormat'

export default function UnassignedTasksProductTable() {
  const { unassigned_tasks_product_table_columns, chosen_order_for_task, all_stocks } = useTasks();
  
  return (
    
    <div className="overflow-auto max-h-[639px] shadow-table">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {unassigned_tasks_product_table_columns.map((c, i) => {
              let cls = "p-2 font-bold h-10 text-xs text-prussian_blue bg-steel_blue_light sticky top-0"
              if(c === "TOPLAM TUTAR") cls= "p-2 font-bold h-10 text-xs text-prussian_blue bg-steel_blue_light text-center sticky top-0"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {chosen_order_for_task.items.map((p, i) => {
            let name = "";
            let material = "";
            let product_group = "";

            for (let s of all_stocks) {
              if (p.stock_id === s.details.id) {
                name = s.details.name;
                material = s.details.material;
                product_group = s.details.product_group
              }
            }
            
            return (
              <tr key={i} className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                  {p.row})
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {material}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {product_group}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.unit}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(parseFloat(p.amount))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(parseFloat(p.price))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(parseFloat(p.amount * p.price))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  %{(p.tax_rate) * 100}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(parseFloat((p.amount * p.price) * p.tax_rate))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-center font-bold">
                  {CurrencyFormat(parseFloat((p.amount * p.price) * (1 + p.tax_rate)))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.description}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-steel_blue_light h-10 sticky bottom-0" aria-label="Table navigation">
        <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{chosen_order_for_task.items.length}</span> kayıt bulunmaktadır.</span>
      </nav>
    </div>
  )
}
