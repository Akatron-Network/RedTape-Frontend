import React from 'react'
import { useTasks } from '../../context/TasksContext';

export default function StepsCard(props) {
  const { all_users, task_steps, tasksNameRef, tasksResponsibleUsernameRef, tasksPlannedFinishDate, removeStep, tasks_editable} = useTasks();

  return (
    <div className='col-span-3 grid gap-[1px]'>
      <span className="w-full shadow-input truncate flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px]">{props.row}. Adım</span>
      
      {/* <InputDefault type={"text"} name={"Görev"} reference={(el) => {if (tasksNameRef.current !== null) tasksNameRef.current[props.alias] = el}} /> */}
      <div className='w-full flex flex-row shadow-input ellipsis'>
        <span className="w-1/3 min-w-[120px] truncate flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px">Görev</span>
        <input type="text" ref={(el) => {if (tasksNameRef.current !== null) tasksNameRef.current[props.alias] = el}} onBlur={(e) => {task_steps[props.alias].name = e.target.value}} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder="Görev girin" required />
      </div>
      
      {/* <InputSelect name={"Görevli"} reference={(el) => {if (tasksResponsibleUsernameRef.current !== null) tasksResponsibleUsernameRef.current[props.alias] = el}} options={display_names} func={() => {}} /> */}
      <div className='w-full flex flex-row shadow-input'>
        <span className="w-1/3 min-w-[120px] truncate flex min-h-[34px] justify-center items-center border border-alica_blue_light px-1 py-[6px] text-sm bg-steel_blue_light rounded-r-none text-prussian_blue">Görevli</span>
        <select ref={(el) => {if (tasksResponsibleUsernameRef.current !== null) tasksResponsibleUsernameRef.current[props.alias] = el}} defaultValue="default" onChange={(e) => {task_steps[props.alias].responsible_username = e.target.value}} required className="block w-2/3 min-h-[34px] py-[6px] text-sm text-prussian_blue border border-white bg-white focus:ring-transparent focus:border-shadow_blue">
          <option value="default" disabled>Görevli seçin...</option>
          {
            (all_users !== undefined) ? 
            (all_users).map((p, index) => {
              return <option key={index} value={p.username}>{p.data.displayname}</option>
            }) 
            : undefined
          }
        </select>
      </div>
      
      {/* <InputDate name={"Teslim Tarihi"} reference={(el) => {if (tasksPlannedFinishDate.current !== null) tasksPlannedFinishDate.current[props.alias] = el}}  /> */}
      <div className='w-full flex flex-row shadow-input'>
        <span className="w-1/3 min-w-[120px] truncate flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px">Teslim Tarihi</span>
        <input type="date" ref={(el) => {if (tasksPlannedFinishDate.current !== null) tasksPlannedFinishDate.current[props.alias] = el}} onBlur={(e) => {task_steps[props.alias].planned_finish_date = e.target.value}} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" required />
      </div>
      
      {!tasks_editable ?
        <button type='button' onClick={() => removeStep(props.row)} className="danger-btn w-full min-h-[34px] mt-[1px] border-none"><i className="fa-solid fa-xmark mr-2"></i>Adımı Sil</button>
      : undefined}
    </div>
  )
}
