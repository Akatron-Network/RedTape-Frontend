import React from 'react'
import InputComment from '../items/InputComment'
import InputDefault from '../items/InputDefault'
import InputDate from '../items/InputDate'
import PageSubTitle from '../items/PageSubTitle'
import { useTasks } from '../../context/TasksContext'
import UnassignedTasksProductTable from '../spesific-tables/UnassignedTasksProductTable';
import StepsCard from '../items/StepsCard'
import TasksLogs from '../spesific-tables/TasksLogs';
import { useMain } from '../../context/MainContext'

export default function TasksAssignmentModal() {
  const tasks_data = useTasks();
  const { funcLoad } = useMain();

  return (
    <>
      <div id="tasksAssignmentModal" data-modal-target="tasksAssignmentModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-[90%] max-h-[900px] overflow-auto md:h-auto">
          <div className="relative bg-ghost_white rounded-md shadow">
            <div className="flex items-start justify-between px-4 pt-3 pb-0 border-b border-steel_blue_light">
              <PageSubTitle title={tasks_data.tasks_editable ? "Görev Detayları" : "Görev Ata"} />
              <button type="button" onClick={() => tasks_data.hideTasksAssignmentModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-md p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>

            <div className='grid xl:grid-cols-5 grid-cols-6 p-4 gap-1 pointer-events-none'>
              <div className='col-span-5'><PageSubTitle title={"Sipariş Üst Bilgileri"} /></div>
              <div className='xl:col-span-1 col-span-2'><InputDefault name={"Cari Kod / İsim"} reference={tasks_data.editTaskOrderCurrentRef} type={"text"} /></div>
              <div className='xl:col-span-1 col-span-2'><InputDefault name={"Sipariş Kaynağı"} reference={tasks_data.editTaskOrderSourceRef} type={"text"} /></div>
              <div className='xl:col-span-1 col-span-2'><InputDefault name={"Fatura Durumu"} reference={tasks_data.editTaskOrderInvoicedRef} type={"text"} /></div>
              <div className='xl:col-span-1 col-span-2'><InputDate name={"Sipariş Tarihi"} reference={tasks_data.editTaskOrderCurGTEDateRef} /></div>
              <div className='xl:col-span-1 col-span-2'><InputDate name={"Teslim Tarihi"} reference={tasks_data.editTaskOrderCurLTEDateRef} /></div>
            </div>

            <div className={!tasks_data.admin_check.admin ? 'hidden' : ''}>
              <div className='pl-5 pt-3'><PageSubTitle title={tasks_data.tasks_editable ? "Görev Adımları" : "Görev Adımlarını Oluştur"} /></div>

              <div className="px-5 pb-5 grid grid-cols-12 gap-4">
                <div className={!tasks_data.admin_check.admin ? 'xl:col-span-3 col-span-6 pointer-events-none' : 'xl:col-span-3 col-span-6'}><InputComment type={"text"} name={"Görev Açıklaması"} reference={tasks_data.tasksDescription}  /></div>
                
                {tasks_data.task_steps.map((t, i) => {
                  return(
                    <StepsCard key={i} alias={i} row={t.row} />
                  )
                })}

                {!tasks_data.tasks_editable ?
                  <div className="col-span-3 flex items-center pt-1 justify-center">
                    <button type="button" className="clear-btn h-14 w-40 truncate" onClick={() => tasks_data.addStep()}><i className="fa-solid fa-plus mr-2"></i>Yeni Adım Ekle</button>
                  </div>
                : undefined}
                
              </div>

            </div>

            {tasks_data.tasks_editable && tasks_data.admin_check.admin ?
              <>
                <div className='pl-5 pt-3'><PageSubTitle title={"Görev Geçmişi"} /></div>
                <div className='px-5 pb-5'><TasksLogs /></div> 
              </>
            : undefined}
            
            <div className='pl-5 pt-3'><PageSubTitle title={"Sipariş Ürün Tablosu"} /></div>
            <div className='px-5 pb-5'><UnassignedTasksProductTable /></div>
            
            <div className="flex items-center p-4 space-x-2 border-t border-steel_blue_light justify-end">
              {tasks_data.tasks_editable && tasks_data.admin_check.admin ? <button type="button" className="danger-btn ml-2 float-right" onClick={() => funcLoad(tasks_data.removeTask)}><i className="fa-solid fa-trash-can mr-2"></i>Görevi Tamamen Sil</button> : undefined } 
              {tasks_data.admin_check.admin ? <button type="button" className={tasks_data.task_steps.length < 1 ? "save-btn ml-2 float-right opacity-30 pointer-events-none" : "save-btn ml-2 float-right"} onClick={() => funcLoad(tasks_data.createOrEditTask)}><i className="fa-solid fa-handshake-simple mr-2"></i>{tasks_data.tasks_editable ? "Görev Detaylarını Onayla" : "Görev Ata"}</button>  : undefined }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
