import React from 'react'
import InputDefault from '../items/InputDefault'
import PageSubTitle from '../items/PageSubTitle'
import { useTasks } from '../../context/TasksContext'
import UnassignedTasksProductTable from '../spesific-tables/UnassignedTasksProductTable';

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
            
            <div className="p-5 grid grid-cols-3 gap-2">
              <div className='col-span-1'><InputDefault type={"text"} name={"Stok Adı"} reference={tasks_data.stockNameEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Malzeme"} reference={tasks_data.stockMaterialEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Ürün Grubu"} reference={tasks_data.stockProductGroupEditRef} /></div>
            </div>
            

            <div className="flex items-center px-5 py-3 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="save-btn ml-2 float-right" onClick={() => tasks_data.editStock(tasks_data.stock_details.id)}><i className="fa-solid fa-handshake-simple mr-2"></i>Görev Ata</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
