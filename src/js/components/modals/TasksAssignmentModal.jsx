import React from 'react'
import InputComment from '../items/InputComment'
import PageSubTitle from '../items/PageSubTitle'
import { useTasks } from '../../context/TasksContext'
import UnassignedTasksProductTable from '../spesific-tables/UnassignedTasksProductTable';
import StepsCard from '../items/StepsCard'

export default function TasksAssignmentModal() {
  const tasks_data = useTasks();

  return (
    <>
      <div id="tasksAssignmentModal" data-modal-target="tasksAssignmentModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-[90%] md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              <PageSubTitle title={"Görev Ata"} />
              <button type="button" onClick={() => tasks_data.hideTasksAssignmentModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            
            <div className='pl-5 pt-3'><PageSubTitle title={"Sipariş Ürün Tablosu"} /></div>
            <div className='px-5 pb-0'><UnassignedTasksProductTable /></div>
            
            <div className='pl-5 pt-4'><PageSubTitle title={"Görev Adımlarını Oluştur"} /></div>
            <div className="p-5 pt-0 grid grid-cols-12 gap-4">
              <div className='col-span-3'><InputComment type={"text"} name={"Görev Açıklaması"} reference={tasks_data.tasksDescription}  /></div>
              
              {tasks_data.task_steps.map((t, i) => {
                return(
                  <StepsCard key={i} alias={i} row={t.row} />
                )
              })}

              <div className="col-span-3 flex items-center pt-1 justify-center">
                <button type="button" className="clear-btn h-14 w-40 truncate" onClick={() => tasks_data.addStep()}><i className="fa-solid fa-plus mr-2"></i>Yeni Adım Ekle</button>
              </div>
              
            </div>
            

            <div className="flex items-center px-5 py-3 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="save-btn ml-2 float-right" onClick={() => tasks_data.createTask()}><i className="fa-solid fa-handshake-simple mr-2"></i>Görev Ata</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
