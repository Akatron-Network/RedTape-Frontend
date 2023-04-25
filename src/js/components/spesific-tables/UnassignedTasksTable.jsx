import React from 'react'
import { useTasks } from '../../context/TasksContext'
import Tooltip from '../items/Tooltip';
import CurrencyFormat from '../../libraries/tools/CurrencyFormat';
import { useMain } from '../../context/MainContext';

export default function UnassignedTasksTable() {
  const { funcLoad } = useMain();
  const { unassigned_tasks_table_columns, all_orders, all_currents, makeTasksAssignment, dropdownFuncs } = useTasks();

  return (
    
    <div className="shadow-table overflow-auto max-h-[550px] rounded-md border border-alica_blue">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {unassigned_tasks_table_columns.map((c, i) => {
              let cls = "p-2 h-10 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10"
              if(c === "TOPLAM TUTAR") cls= "p-2 pr-5 h-10 font-normal text-xs text-right sticky top-0 text-ghost_white bg-indigo_dye z-10"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
            <th scope="col" className="p-2 h-10 w-[112px] font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10">
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

            if (i%2 === 0) { var row_cls = "bg-white border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            else { var row_cls = "bg-alica_blue_light border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            
            return (
              <tr key={i} className={row_cls}>
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
                <td className="py-[0.20rem] pl-2 pr-5 text-prussian_blue text-[13px] text-right font-bold">
                  {CurrencyFormat(p.details.total_fee)} <i className="fa-solid fa-turkish-lira-sign"></i>
                </td>
                <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <Tooltip message={"Görev Ata"}>
                    <button type='button' onClick={() => funcLoad(makeTasksAssignment, p)} className='clear-btn bg-queen_blue hover:bg-shadow_blue w-8 shadow-md px-1 rounded-md active:scale-90'><i className="fa-solid fa-handshake-simple"></i></button>
                  </Tooltip>
                  <Tooltip message={"Görevi Tamamla"}>
                    <button type='button' onClick={() => dropdownFuncs(p, "Görevi Tamamla")} className='clear-btn w-8 bg-sea_green hover:bg-sea_green_light shadow-md px-2 rounded-md active:scale-90 ml-1'><i className="fa-solid fa-square-check"></i></button>
                  </Tooltip>
                  <Tooltip message={"Tahsil Et"}>
                    <button type='button' onClick={() => dropdownFuncs(p, "Tahsil Et")} 
                     className={p.details.credit_current_act === null ? 
                      'clear-btn w-8 bg-not_tahsil_dark hover:bg-not_tahsil_light shadow-md px-2 rounded-md active:scale-90 ml-1' 
                      : 
                      'clear-btn w-8 bg-not_tahsil_dark hover:bg-not_tahsil_light shadow-md px-2 rounded-md active:scale-90 ml-1 opacity-30 pointer-events-none'}>
                      <i className="fa-solid fa-money-bill-1-wave"></i></button>
                  </Tooltip>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-indigo_dye h-10 bottom-[-1px] sticky" aria-label="Table navigation">
        <span className="text-sm font-normal text-steel_blue">Toplamda <span className="font-normal text-alica_blue_middle">{all_orders.length}</span> kayıt bulunmaktadır.</span>
      </nav>
    </div>
    
  )
}
