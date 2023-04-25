import React from 'react'
import { useTasks } from '../../context/TasksContext'

export default function TasksLogs() {

  const { tasks_logs_columns, chosen_task_for_edit, all_users } = useTasks();

  return (
    
    <div className="shadow-table overflow-auto max-h-[380px] rounded-md border border-alica_blue">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {tasks_logs_columns.map((c, i) => {
              let cls = "p-2 h-10 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {chosen_task_for_edit.details.logs.map((p, i) => {
            let responsible_user = "";
            for (let u of all_users) {
              if (p.registry_username === u.username) {
                responsible_user = u.details.displayname
              }
            }

            function addHours(date, hours) {
              date.setHours(date.getHours() + hours);
            
              return date;
            }
            
            const date = new Date(p.registry_date);
            
            const newDate = (addHours(date, 3)).toISOString();
            
            if (i%2 === 0) { var row_cls = "bg-white border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            else { var row_cls = "bg-alica_blue_light border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }

            return (
              <tr key={i} className={row_cls}>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                  {parseInt(i) + 1 + ")"}
                </td>                
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {responsible_user}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {newDate.split("T")[0] + " - " + newDate.split('T')[1].split('.')[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.explanation}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-indigo_dye h-10 bottom-[-1px] sticky" aria-label="Table navigation">
        <span className="text-sm font-normal text-steel_blue">Toplamda <span className="font-normal text-alica_blue_middle">{chosen_task_for_edit.details.logs.length}</span> kayıt bulunmaktadır.</span>
      </nav>
    </div>
    
  )
}
