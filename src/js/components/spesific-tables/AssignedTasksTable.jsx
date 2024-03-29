import React from 'react'
import { useTasks } from '../../context/TasksContext'
import CurrencyFormat from '../../libraries/tools/CurrencyFormat';

export default function AssignedTasksTable() {

  const { assigned_tasks_table_columns, all_tasks, all_currents, all_users, dropdownFuncs, editTask, admin_check } = useTasks();

  return (
    
    <div className={all_tasks.length !== 0 ? "shadow-table overflow-auto max-h-[550px] min-h-[416.38px] relative bg-ghost_white rounded-md border border-alica_blue" : "shadow-table overflow-auto max-h-[550px] relative bg-alica_blue_light rounded-md border border-alica_blue"}>
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {assigned_tasks_table_columns.map((c, i) => {
              let cls = "p-2 h-10 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-[1]"
              if(c === "SİPARİŞ DURUMU") cls= "p-2 h-10 font-normal min-w-[102px] text-xs text-center sticky top-0 text-ghost_white bg-indigo_dye z-[1]"
              if(c === "TAHSİLAT DURUMU") cls= "p-2 h-10 font-normal text-xs text-right sticky top-0 text-ghost_white bg-indigo_dye z-[1]"
              if(c === "TOPLAM TUTAR") cls= "p-2 pr-5 h-10 font-normal text-xs text-right sticky top-0 text-ghost_white bg-indigo_dye z-[1]"
              if(c === "TOPLAM TUTAR" && !admin_check.admin)  cls= "p-2 pr-5 h-10 font-normal text-xs text-right sticky top-0 text-ghost_white bg-indigo_dye z-[1] hidden"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
            <th scope="col" className="p-2 h-10 w-9 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-[1]">
              <span className="sr-only">Düzenle</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {all_tasks.map((p, i) => {
            let cur_name = "";
            for (let c of all_currents) {
              if (p.details.order.current_id === c.details.id) {
                cur_name = c.details.name
              }
            }

            let responsible_username = "-";
            let name = "-";
            let finish_date = "-";
            if (p.details.current_step !== null) {
              name = p.details.current_step.name;
              finish_date = p.details.current_step.planned_finish_date.split("T")[0];


              for (let u of all_users) {
                  if (p.details.current_step.responsible_username === u.username) {
                    responsible_username = u.details.displayname
                  }
              }

              if ((Date.now()) > ((new Date(p.details.current_step.planned_finish_date)).getTime() + 86400000)) {
                if ((p.details.state !== "Tamamlandı") && (p.details.state !== "İptal Edildi")) { p.details.state = "Gecikti" }
              }
            }

            let queue = false;
            let ln = all_tasks.length;

            if(ln > 5) {
              if (i === ln - 1 || i === ln - 2 || i === ln - 3 || i === ln - 4) queue = true
            }

            if (i%2 === 0) { var row_cls = "bg-white border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            else { var row_cls = "bg-alica_blue_light border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            // if (p.details.state === "İptal Edildi") row_cls = "bg-red-400 border-b h-9 border-alica_blue hover:bg-red-500 transition duration-300"
            // else if (p.details.state === "Tamamlandı") row_cls = "bg-green-400 border-b h-9 border-alica_blue hover:bg-green-500 transition duration-300"
            // else if (p.details.state === "Gecikti") row_cls = "bg-gray-400 border-b h-9 border-alica_blue hover:bg-gray-500 transition duration-300"
            
            let state_cls = "px-4 py-1 rounded-md text-fogra w-[90%] shadow-md text-center border border-alica_blue_light m-auto";
            if (p.details.state === "İptal Edildi") state_cls += " bg-eggplant_light"
            else if (p.details.state === "Tamamlandı") state_cls += " bg-sea_green_light"
            else if (p.details.state === "Gecikti") state_cls += " bg-gray-400"
            
            return (
              <tr key={i} className={row_cls}>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order.id}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order.current_id}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {cur_name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order.date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order.delivery_date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {finish_date}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {responsible_username}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold justify-center items-center">
                  <div className={state_cls}>
                    {p.details.state}
                  </div>
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-right">
                  {p.details.order.credit_current_act === null ? "Tahsil Edilmedi" : "Tahsil Edildi"}
                </td>
                {admin_check.admin ? 
                  <td className="py-[0.20rem] pl-2 pr-5 text-prussian_blue text-[13px] font-bold text-right">
                    {CurrencyFormat(p.details.order.total_fee)} <i className="fa-solid fa-turkish-lira-sign"></i>
                  </td>
                  : undefined
                }
                <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <div className="dropdown relative inline-block">
                    <button type='button' onClick={() => {}} className='save-btn shadow-md px-1 w-8 rounded-md active:scale-90'><i className="fa-solid fa-bars"></i></button>
                    <ul className={!queue ? "dropdown-menu duration-500 shadow-table absolute hidden text-oxford_blue z-[2] right-[15px] -mt-[15px] w-max text-left bg-white rounded" : "dropdown-menu duration-500 shadow-table absolute hidden text-oxford_blue z-[2] right-3 -mt-[211px] w-max text-left bg-white rounded"}>
                      
                      <li onClick={() => dropdownFuncs(p, "İşlemi Tamamla")} className="text-sky-700 transition duration-200 hover:bg-alica_blue_light py-1 px-3 block truncate border-b-0 cursor-pointer rounded-t">
                        <i className="fa-solid fa-check mr-2 w-4 text-center"></i>İşlemi Tamamla
                      </li>
                      <li onClick={() => dropdownFuncs(p, "İşlemi İptal Et")} className=" text-orange-500 transition duration-200 hover:bg-alica_blue_light py-1 px-3 block truncate border-b-0 cursor-pointer">
                        <i className="fa-solid fa-xmark mr-2 w-4 text-center"></i>İşlemi İptal Et
                      </li>
                      <li onClick={() => editTask(p)} className={admin_check.admin ? "text-yellow-500 transition duration-200 hover:bg-alica_blue_light py-1 px-3 block truncate border-b-0 cursor-pointer" : "text-yellow-500 transition duration-200 hover:bg-alica_blue_middle py-1 px-3 block truncate border-b-0 cursor-pointer rounded-b"}>
                        <i className="fa-solid fa-pen-to-square mr-2 w-4 text-center"></i>Görev Detaylarını Görüntüle
                      </li>
                      {admin_check.admin ? 
                        <>
                          <li onClick={() => dropdownFuncs(p, "Görevi Tamamla")} className="text-green-700 transition duration-200 hover:bg-alica_blue_light py-1 px-3 block truncate border-b-0 cursor-pointer">
                            <i className="fa-solid fa-square-check mr-2 w-4 text-center"></i>Görevi Tamamla
                          </li>
                          <li onClick={() => dropdownFuncs(p, "Görevi Baştan Başlat")} className="text-indigo-700 transition duration-200 hover:bg-alica_blue_light py-1 px-3 block truncate border-b-0 cursor-pointer">
                            <i className="fa-solid fa-repeat mr-2 w-4 text-center"></i>Görevi Baştan Başlat
                          </li>
                          <li onClick={() => dropdownFuncs(p, "Görevi İptal Et")} className="text-red-600 transition duration-200 hover:bg-alica_blue_light py-1 px-3 block truncate cursor-pointer rounded-b">
                            <i className="fa-solid fa-square-xmark mr-2 w-4 text-center"></i>Görevi İptal Et
                          </li>
                          <li onClick={() => dropdownFuncs(p, "Tahsil Et")} className={p.details.order.credit_current_act === null ? "text-not_tahsil transition duration-200 hover:bg-alica_blue_light py-1 px-3 block truncate cursor-pointer rounded-b" : "text-not_tahsil transition duration-200 opacity-30 pointer-events-none hover:bg-alica_blue_middle py-1 px-3 block truncate cursor-pointer rounded-b"}>
                            <i className="fa-solid fa-money-bill-1-wave mr-2 w-4 text-center"></i>Tahsil Et
                          </li>
                        </>
                        : undefined
                      }
                      
                    </ul>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className={all_tasks.length > 8 || all_tasks.length === 0 ? "flex justify-between items-center py-2 px-3 z-[1] bg-indigo_dye h-10 bottom-0 sticky" : "flex justify-between items-center py-2 px-3 z-[1] bg-indigo_dye h-10 bottom-0 absolute w-full"} aria-label="Table navigation">
        <span className="text-sm font-normal text-steel_blue">Toplamda <span className="font-normal text-alica_blue_middle">{all_tasks.length}</span> kayıt bulunmaktadır.</span>
      </nav>
    </div>
    
  )
}
