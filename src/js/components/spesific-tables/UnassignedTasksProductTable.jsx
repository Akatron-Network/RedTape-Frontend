import React from 'react'
import { useTasks } from '../../context/TasksContext'
import CurrencyFormat from '../../libraries/tools/CurrencyFormat'

export default function UnassignedTasksProductTable() {
  const { unassigned_tasks_product_table_columns, chosen_order_for_task, all_stocks, admin_check } = useTasks();
  
  //. For Total Fee
  if (Object.keys(chosen_order_for_task).includes("details")) { var sum = chosen_order_for_task.details.total_fee }
  else { var sum = chosen_order_for_task.total_fee }

  //. For Tax-Sum and Sub-Sum
  var nav_tax_sum = 0;
  var nav_sum = 0;
  for (let i of chosen_order_for_task.items) {
    nav_tax_sum = nav_tax_sum + ((i.amount * i.price) * i.tax_rate)
    nav_sum = nav_sum + (i.amount * i.price)
  }

  return (
    
    <div className="overflow-auto max-h-[639px] shadow-table rounded-md border border-alica_blue">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {unassigned_tasks_product_table_columns.map((c, i) => {
              let cls = "p-2 font-normal h-10 text-xs text-ghost_white bg-indigo_dye sticky top-0"
              if (c === "TOPLAM TUTAR") cls= "p-2 pr-5 font-normal h-10 text-xs text-ghost_white bg-indigo_dye text-right sticky top-0"
              else if(c === "BİRİM FİYAT" || c === "TUTAR" || c === "KDV TUTAR" || c === "TUTAR") cls = "p-2 font-normal h-10 text-xs text-right text-ghost_white bg-indigo_dye sticky top-0"
              else if(c === "KDV ORAN") cls = "p-2 font-normal h-10 text-xs text-center text-ghost_white bg-indigo_dye sticky top-0"


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

            let amount = (p.amount) === 0 ? "0,00" : CurrencyFormat(parseFloat(p.amount))
            let price = (p.price) === 0 ? "0,00" : CurrencyFormat(parseFloat(p.price))
            let sum = (p.amount * p.price) === 0 ? "0,00" : CurrencyFormat(parseFloat(p.amount * p.price))
            let tax_rate = "%" + (p.tax_rate) * 100
            let tax_sum = ((p.amount * p.price) * p.tax_rate) === 0 ?  "0,00" : CurrencyFormat(parseFloat((p.amount * p.price) * p.tax_rate))
            let total = ((p.amount * p.price) * (1 + p.tax_rate)) === 0 ?  "0,00" : CurrencyFormat(parseFloat((p.amount * p.price) * (1 + p.tax_rate)))
            
            if (i%2 === 0) { var row_cls = "bg-white border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            else { var row_cls = "bg-alica_blue_light border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }

            return (
              <tr key={i} className={row_cls}>
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
                {admin_check.admin ? 
                  <>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                      {amount}
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-right">
                      {price} <i className="fa-solid fa-turkish-lira-sign"></i>
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-right">
                      {sum} <i className="fa-solid fa-turkish-lira-sign"></i>
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-center">
                      {tax_rate}
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-right">
                      {tax_sum} <i className="fa-solid fa-turkish-lira-sign"></i>
                    </td>
                    <td className="py-[0.20rem] px-2 pr-5 text-prussian_blue text-[13px] text-right font-bold">
                      {total} <i className="fa-solid fa-turkish-lira-sign"></i>
                    </td>
                  </>
                  : 
                  <>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                      -
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                      -
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                      -
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                      -
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                      -
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-center font-bold">
                      -
                    </td>
                  </>
                }
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.description}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-indigo_dye h-fit sticky bottom-0" aria-label="Table navigation">
        <span className="text-sm font-normal text-steel_blue">Toplamda <span className="font-normal text-alica_blue_middle">{chosen_order_for_task.items.length}</span> kayıt bulunmaktadır.</span>
        <div className="flex flex-col text-right">
          <span className="text-sm font-normal text-steel_blue">Ara Toplam <span className="font-normal tracking-wide text-alica_blue_middle">{nav_sum === 0 ? "0,00" : CurrencyFormat(nav_sum)}</span> <i className="fa-solid fa-turkish-lira-sign"></i></span>
          <span className="text-sm font-normal text-steel_blue">KDV Tutar <span className="font-normal tracking-wide text-alica_blue_middle">{nav_tax_sum === 0 ? "0,00" : CurrencyFormat(nav_tax_sum)}</span> <i className="fa-solid fa-turkish-lira-sign"></i></span>
          <hr className='border-mn_blue my-[2px]'/>
          <span className="text-sm font-bold text-steel_blue">Toplam Tutar <span className="font-bold tracking-wide text-alica_blue_middle">{sum === 0 ? "0,00" : CurrencyFormat(sum)}</span> <i className="fa-solid fa-turkish-lira-sign"></i></span>
        </div>
      </nav>
    </div>
  )
}
