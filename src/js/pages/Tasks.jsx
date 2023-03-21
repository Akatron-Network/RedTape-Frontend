import React, { useEffect } from 'react'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import TasksAssignmentModal from '../components/modals/TasksAssignmentModal'
import TasksDropdownModal from '../components/modals/TasksDropdownModal'
import AssignedTasksTable from '../components/spesific-tables/AssignedTasksTable'
import UnassignedTasksTable from '../components/spesific-tables/UnassignedTasksTable'
import { useMain } from '../context/MainContext'
import { useTasks } from '../context/TasksContext'

export default function Tasks() {
  const tasks_data = useTasks();
  const { funcLoad } = useMain();

  useEffect(() => {
    tasks_data.adminCheck();
    tasks_data.showCurrents();
    funcLoad(tasks_data.showOrders);
    tasks_data.showStocks();
    // tasks_data.showTasks(); //. In adminCheck function
    tasks_data.showUsers();
  }, [])


  return (
    <div className='pb-40'>
      <PageMainTitle title={"Görev Takip Paneli"} />

      {tasks_data.admin_check.admin ? 
        <div className='mb-10'>
          <PageSubTitle title={"Atanmamış Görevler"} />
          <UnassignedTasksTable /> 
        </div>
        : undefined
      }
      
      <div className='flex'>
        <div className='mr-10'><PageSubTitle title={"Atanan Görevler"} /></div>
        <div className='flex mb-3 h-7 w-fit'>
          <button onClick={() => tasks_data.showTasks(undefined, tasks_data.admin_check.username)} id="btn_1" type="button" className="truncate min-w-10 text-indigo_dye hover:text-white border-b border-indigo_dye hover:bg-indigo_dye transition-all duration-200 h-full focus:outline-none font-medium rounded-sm text-sm px-5 text-center mr-2 mb-2">Tümü</button>
          <button onClick={() => tasks_data.showTasks({"state": "Aktif"}, tasks_data.admin_check.username)} id="btn_5" type="button" className="truncate text-orange-500 hover:text-white border-b border-orange-500 hover:bg-orange-500 transition-all duration-200 h-full focus:outline-none font-medium rounded-sm text-sm px-5 text-center mr-2 mb-2">Aktif</button>
          <button onClick={() => tasks_data.showTasks({"state": "Tamamlandı"}, tasks_data.admin_check.username)} id="btn_2" type="button" className="truncate text-green-700 hover:text-white border-b border-green-700 hover:bg-green-700 transition-all duration-200 h-full focus:outline-none font-medium rounded-sm text-sm px-5 text-center mr-2 mb-2">Tamamlananlar</button>
          <button onClick={() => tasks_data.showTasks({"state": "İptal Edildi"}, tasks_data.admin_check.username)} id="btn_3" type="button" className="truncate text-red-700 hover:text-white border-b border-red-700 hover:bg-red-700 transition-all duration-200 h-full focus:outline-none font-medium rounded-sm text-sm px-5 text-center mr-2 mb-2">İptal Edilenler</button>
          <button onClick={() => tasks_data.showTasks({"state": "Gecikti"}, tasks_data.admin_check.username)} id="btn_4" type="button" className="truncate text-gray-700 hover:text-white border-b border-gray-700 hover:bg-gray-700 transition-all duration-200 h-full focus:outline-nonefont-medium rounded-sm text-sm px-5 text-center mr-2 mb-2">Gecikenler</button>
        </div>
      </div>
      <AssignedTasksTable />

      <TasksAssignmentModal />
      <TasksDropdownModal />
    </div>
  )
}
