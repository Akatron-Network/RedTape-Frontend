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
    // tasks_data.showBadges();//. In showTask function
    tasks_data.showUsers();
  }, [])


  return (
    <div> {/* className='pb-40' */}
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
        <div className='flex mb-3 h-max w-fit flex-wrap gap-2'>
          <button onClick={() => tasks_data.showTasks(undefined, tasks_data.admin_check.username)} id="btn_1" type="button" 
            className="flex items-center truncate !overflow-visible relative min-w-10 text-indigo_dye hover:text-white border-b border-indigo_dye hover:bg-indigo_dye transition-all duration-200 min-h-[28px] font-medium rounded-md text-sm px-5 text-center mr-2 mb-2">
            Tümü
          </button>
          
          <button onClick={() => tasks_data.showTasks({"state": "Tamamlandı"}, tasks_data.admin_check.username)} id="btn_2" type="button" 
            className="flex items-center truncate !overflow-visible relative text-sea_green hover:text-white border-b border-sea_green hover:bg-sea_green transition-all duration-200 min-h-[28px] font-medium rounded-md text-sm px-5 text-center mr-2 mb-2">
            Tamamlananlar
          </button>
          
          <button onClick={() => tasks_data.showTasks({"state": "Aktif"}, tasks_data.admin_check.username)} id="btn_5" type="button" 
            className="flex items-center truncate !overflow-visible relative text-blues hover:text-white border-b border-blues hover:bg-blues transition-all duration-200 min-h-[28px] font-medium rounded-md text-sm px-5 text-center mr-2 mb-2">
            Aktif
            <span className="inline-flex items-center justify-center w-5 h-4 p-2 pb-[9px] ml-2 text-xs text-white bg-blues rounded-full border border-ghost_white">
              {tasks_data.badges.aktif}
            </span>
          </button>
          
          <button onClick={() => tasks_data.showTasks({"state": "İptal Edildi"}, tasks_data.admin_check.username)} id="btn_3" type="button" 
            className="flex items-center truncate !overflow-visible relative text-eggplant_light hover:text-white border-b border-eggplant_light hover:bg-eggplant_light transition-all duration-200 min-h-[28px] font-medium rounded-md text-sm px-5 text-center mr-2 mb-2">
            İptal Edilenler
            <span className="inline-flex items-center justify-center w-5 h-4 p-2 pb-[9px] ml-2 text-xs text-white bg-eggplant_light rounded-full border border-ghost_white">
              {tasks_data.badges.iptal_edilenler}
            </span>
          </button>
          
          <button onClick={() => tasks_data.showTasks({"state": "Gecikti"}, tasks_data.admin_check.username)} id="btn_4" type="button" 
            className="flex items-center truncate !overflow-visible relative text-gray-500 hover:text-white border-b border-gray-500 hover:bg-gray-500 transition-all duration-200 min-h-[28px] font-medium rounded-md text-sm px-5 text-center mr-2 mb-2">
            Gecikenler
            <span className="inline-flex items-center justify-center w-5 h-4 p-2 pb-[9px] ml-2 text-xs text-white bg-gray-500 rounded-full border border-ghost_white">
              {tasks_data.badges.gecikenler}
            </span>
          </button>
        
          <button onClick={() => tasks_data.showTasks({"state": "Tahsil Edilmedi"}, tasks_data.admin_check.username)} id="btn_6" type="button" 
            className="flex items-center truncate !overflow-visible relative text-not_tahsil hover:text-white border-b border-not_tahsil hover:bg-not_tahsil transition-all duration-200 h-full min-h-[28px] font-medium rounded-md text-sm px-5 text-center mr-2 mb-2">
            Tahsil Edilmeyenler
            <span className="inline-flex items-center justify-center w-5 h-4 p-2 pb-[9px] ml-2 text-xs text-white bg-not_tahsil rounded-full border border-ghost_white">
              {tasks_data.badges.tahsil_edilmeyenler}
            </span>
          </button>
        </div>
      </div>
      <AssignedTasksTable />

      <TasksAssignmentModal />
      <TasksDropdownModal />
    </div>
  )
}
