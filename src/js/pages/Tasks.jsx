import React, { useEffect } from 'react'
import GorevTakibiTablo from '../components/gorev-takip/GorevTakibiTablo'
import SiparisGorevTablo from '../components/gorev-takip/SiparisGorevTablo'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import TasksAssignmentModal from '../components/modals/TasksAssignmentModal'
import UnassignedTasksTable from '../components/spesific-tables/UnassignedTasksTable'
import { useTasks } from '../context/TasksContext'

export default function Tasks() {
  const tasks_data = useTasks();
  console.log(tasks_data)

  useEffect(() => {
    tasks_data.showCurrents();
    tasks_data.showOrders();
    tasks_data.showStocks();
    tasks_data.showUsers();
  }, [])

  return (
    <>
      <PageMainTitle title={"Görev Takip Paneli"} />

      <PageSubTitle title={"Atanmamış Görevler"} />
      <UnassignedTasksTable />
      
      <div className='mt-10'><PageSubTitle title={"Aktif Görevler"} /></div>
      <GorevTakibiTablo />

      <TasksAssignmentModal />
    </>
  )
}
