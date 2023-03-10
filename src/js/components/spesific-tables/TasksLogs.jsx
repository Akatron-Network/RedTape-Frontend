import React from 'react'
import { useTasks } from '../../context/TasksContext'

export default function TasksLogs() {

  const { tasks_logs_columns, chosen_task_for_edit, all_users } = useTasks();

  return (
    
    <div className="shadow-table overflow-auto max-h-[530px]">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {tasks_logs_columns.map((c, i) => {
              let cls = "p-2 h-10 font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10"

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
                responsible_user = u.data.displayname
              }
            }

            return (
              <tr key={i} className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                  {parseInt(i) + 1 + ")"}
                </td>                
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {responsible_user}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.registry_date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.explanation}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-steel_blue_light h-10 bottom-0 sticky" aria-label="Table navigation">
        <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{chosen_task_for_edit.details.logs.length}</span> kayıt bulunmaktadır.</span>
      </nav>
    </div>
    
  )
}
