import React from 'react'
import { useTasks } from '../../context/TasksContext';
import InputDate from './InputDate'
import InputDefault from './InputDefault'
import InputSelect from './InputSelect'

export default function StepsCard(props) {
  const { display_names, tasksNameRef, tasksResponsibleUsernameRef, tasksPlannedFinishDate, removeStep} = useTasks();
  return (
    
    <div className='col-span-3 grid gap-[1px]'>
      <span className="w-full shadow-input truncate flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px]">{props.row}. Adım</span>
      <InputDefault type={"text"} name={"Görev"} reference={(el) => {if (tasksNameRef.current !== null) tasksNameRef.current[props.alias] = el}} />
      <InputSelect name={"Görevli"} reference={(el) => {if (tasksResponsibleUsernameRef.current !== null) tasksResponsibleUsernameRef.current[props.alias] = el}} options={display_names} func={() => {}} />
      <InputDate name={"Teslim Tarihi"} reference={(el) => {if (tasksPlannedFinishDate.current !== null) tasksPlannedFinishDate.current[props.alias] = el}}  />
      <button type='button' onClick={() => removeStep(props.row)} className="danger-btn w-full min-h-[34px] mt-[1px] border-none"><i className="fa-solid fa-xmark mr-2"></i>Adımı Sil</button>
      {/* ref={(el) => {if (chart_data.yColSelRef.current !== null) chart_data.yColSelRef.current[alias] = el}} */}
    </div>
  )
}
