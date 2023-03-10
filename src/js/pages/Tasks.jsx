import React, { useEffect } from 'react'
import GorevTakibiTablo from '../components/gorev-takip/GorevTakibiTablo'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import TasksAssignmentModal from '../components/modals/TasksAssignmentModal'
import TasksDropdownModal from '../components/modals/TasksDropdownModal'
import AssignedTasksTable from '../components/spesific-tables/AssignedTasksTable'
import UnassignedTasksTable from '../components/spesific-tables/UnassignedTasksTable'
import { useTasks } from '../context/TasksContext'

export default function Tasks() {
  const tasks_data = useTasks();
  console.log(tasks_data)

  useEffect(() => {
    tasks_data.showCurrents();
    tasks_data.showOrders();
    tasks_data.showStocks();
    tasks_data.showTasks();
    tasks_data.showUsers();
  }, [])

  return (
    <div className='pb-40'>
      <PageMainTitle title={"Görev Takip Paneli"} />

      <PageSubTitle title={"Atanmamış Görevler"} />
      <UnassignedTasksTable />
      
      <div className='flex mt-10'>
        <div className='mr-10'><PageSubTitle title={"Atanan Görevler"} /></div>
        <div className='flex mb-3 h-7'>
          <button onClick={() => tasks_data.showTasks()} id="btn_1" type="button" className="text-cyan-800 hover:text-white border-b border-cyan-800 hover:bg-cyan-900 transition-all duration-200 h-full focus:outline-none font-medium rounded-sm text-sm px-5 text-center mr-2 mb-2">Tümü</button>
          <button onClick={() => tasks_data.showTasks({"state": "Tamamlandı"})} id="btn_2" type="button" className="text-green-600 hover:text-white border-b border-green-600 hover:bg-green-700 transition-all duration-200 h-full focus:outline-none font-medium rounded-sm text-sm px-5 text-center mr-2 mb-2">Tamamlananlar</button>
          <button onClick={() => tasks_data.showTasks({"state": "İptal Edildi"})} id="btn_3" type="button" className="text-red-600 hover:text-white border-b border-red-600 hover:bg-red-700 transition-all duration-200 h-full focus:outline-none font-medium rounded-sm text-sm px-5 text-center mr-2 mb-2">İptal Edilenler</button>
          <button onClick={() => tasks_data.showTasks({"state": "Gecikti"})} id="btn_4" type="button" className="text-gray-600 hover:text-white border-b border-gray-600 hover:bg-gray-700 transition-all duration-200 h-full focus:outline-nonefont-medium rounded-sm text-sm px-5 text-center mr-2 mb-2">Gecikenler</button>
        </div>
      </div>
      <AssignedTasksTable />

      <TasksAssignmentModal />
      <TasksDropdownModal />
    </div>
  )
}
