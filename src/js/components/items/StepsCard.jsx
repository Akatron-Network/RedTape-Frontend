import React from 'react'
import { useTasks } from '../../context/TasksContext';

export default function StepsCard(props) {
  const { all_users, task_steps, tasksNameRef, tasksResponsibleUsernameRef, tasksPlannedFinishDate, removeStep, tasks_editable, editTasksDescriptionRef, editTasksFinishDate} = useTasks();
  
  return (
      <div className='xl:col-span-3 col-span-6 grid gap-[2px]'>
        <span className="w-full shadow-input truncate flex justify-center min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-1 py-[6px] rounded-md">{props.row}. Adım</span>
        
        {/* <InputDefault type={"text"} name={"Görev"} reference={(el) => {if (tasksNameRef.current !== null) tasksNameRef.current[props.alias] = el}} /> */}
        <div className={tasks_editable ? 'w-full flex flex-row shadow-input ellipsis pointer-events-none rounded-md' : 'w-full flex flex-row shadow-input ellipsis rounded-md'}>
          <span className="w-1/3 min-w-[120px] truncate flex justify-center min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-1 py-[6px] rounded-l-md">Görev</span>
          <input type="text" ref={(el) => {if (tasksNameRef.current !== null) tasksNameRef.current[props.alias] = el}} onBlur={(e) => {task_steps[props.alias].name = e.target.value}} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" placeholder="Görev girin" required />
        </div>
        
        {/* <InputSelect name={"Görevli"} reference={(el) => {if (tasksResponsibleUsernameRef.current !== null) tasksResponsibleUsernameRef.current[props.alias] = el}} options={display_names} func={() => {}} /> */}
        <div className={tasks_editable ? 'w-full flex flex-row shadow-input pointer-events-none rounded-md' : 'w-full flex flex-row shadow-input rounded-md'}>
          <span className="w-1/3 min-w-[120px] truncate flex min-h-[34px] justify-center items-center border border-alica_blue px-1 py-[6px] text-sm bg-indigo_dye rounded-l-md text-ghost_white">Görevli</span>
          <select ref={(el) => {if (tasksResponsibleUsernameRef.current !== null) tasksResponsibleUsernameRef.current[props.alias] = el}} defaultValue="default" onChange={(e) => {task_steps[props.alias].responsible_username = e.target.value}} required className="block w-2/3 min-h-[34px] py-[6px] text-sm text-prussian_blue border border-alica_blue bg-white focus:ring-transparent focus:border-indigo_dye rounded-r-md">
            <option value="default" disabled>Görevli seçin...</option>
            {(all_users !== undefined) ? 
              (all_users).map((p, index) => {
                return <option key={index} value={p.username}>{p.details.displayname}</option>
              }) 
              : undefined
            }
          </select>
        </div>
        
        {/* <InputDate name={"Teslim Tarihi"} reference={(el) => {if (tasksPlannedFinishDate.current !== null) tasksPlannedFinishDate.current[props.alias] = el}}  /> */}
        <div className={tasks_editable ? 'w-full flex flex-row shadow-input pointer-events-none rounded-md' : 'w-full flex flex-row shadow-input rounded-md'}>
          <span className="w-1/3 min-w-[120px] truncate flex justify-center min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-1 py-[6px] rounded-l-md">Teslim Tarihi</span>
          {!tasks_editable ? 
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} ref={(el) => {if (tasksPlannedFinishDate.current !== null) tasksPlannedFinishDate.current[props.alias] = el}} onBlur={(e) => {task_steps[props.alias].planned_finish_date = e.target.value}} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" required />
            : 
            <input type="date"  ref={(el) => {if (tasksPlannedFinishDate.current !== null) tasksPlannedFinishDate.current[props.alias] = el}} onBlur={(e) => {task_steps[props.alias].planned_finish_date = e.target.value}} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" required />
          }
          
        </div>

        {tasks_editable ? 
          <>
          <hr className="h-px w-[99%] relative left-1/2 -translate-x-1/2 bg-shadow_blue border-0"></hr>
            <div className={tasks_editable ? 'w-full flex flex-row shadow-input pointer-events-none rounded-md' : 'w-full flex flex-row shadow-input rounded-md'}>
              <span className="w-1/3 min-w-[120px] truncate flex justify-center min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-1 py-[6px] rounded-l-md">Görev Bitiş Tar.</span>
              <input type="date" ref={(el) => {if (editTasksFinishDate.current !== null) editTasksFinishDate.current[props.alias] = el}} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" required />
            </div>

            <div className='w-full flex flex-row shadow-input rounded-md'>
              <span className="w-1/3 min-w-[120px] truncate flex justify-center min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-1 py-[6px] rounded-l-md">Açıklama</span>
              <textarea disabled type="text" rows="3" ref={(el) => {if (editTasksDescriptionRef.current !== null) editTasksDescriptionRef.current[props.alias] = el}} className="w-2/3 resize-none min-h-[34px] py-[6px] bg-white border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" placeholder="Görev girin" required />
            </div>
          </>
          : undefined
        }
        
        {!tasks_editable ?
          <button type='button' onClick={() => removeStep(props.row)} className="danger-btn w-full min-h-[34px] mt-[1px] border-none"><i className="fa-solid fa-xmark mr-2"></i>Adımı Sil</button>
          : undefined
        }
      </div>
  )
}
