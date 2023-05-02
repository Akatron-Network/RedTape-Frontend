import React, { useEffect } from 'react'
import PageMainTitle from '../items/PageMainTitle';
import { Link } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';
import { useMain } from '../../context/MainContext';
import BasicLineChart from '../charts/BasicLineChart';
import DashboardTable from '../charts/DashboardTable';


export default function Dashboard() {
  const { showDashboard, dashboard_cards_info, dashboard_charts_info, resizeCheck } = useDashboard();
  const { funcLoad, adminCheck, adminAll } = useMain();

  useEffect(() => {
    funcLoad(showDashboard);
    adminCheck();

    setTimeout(() => {
      resizeCheck();
    }, 500);

    window.addEventListener('resize', resizeCheck)
    return () => {
      window.removeEventListener('resize', resizeCheck)
    }
  }, []);

  
  return (
    <>
    {adminAll ? 
      <>
        <PageMainTitle title={"Gösterge Paneli"} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          
          <Link className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-1 bg-white" to="/tasks">
            <div className="p-5 flex items-center">
              <div className="inline-flex bg-violet-200 text-violet-600 flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                <i className="fa-solid fa-handshake-simple text-2xl"></i>
              </div>
              <div className='overflow-hidden'>
                <span className="block text-2xl font-bold">{dashboard_cards_info.not_created_task_count}</span>
                <span className="block text-gray-600 truncate">Atanmamış Görevler</span>
              </div>
            </div>
          </Link>

          <Link className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-1 bg-white" to="/tasks">
            <div className="p-5 flex items-center">
              <div className="inline-flex bg-orange-200 text-orange-600 flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                <i className="fa-solid fa-list-check text-2xl"></i>
              </div>
              <div className='overflow-hidden'>
                <span className="block text-2xl font-bold">{dashboard_cards_info.active_task_count}</span>
                <span className="block text-gray-600 truncate">Aktif Görevler</span>
              </div>
            </div>
          </Link>
          
          <Link className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-1 bg-white" to="/tasks">
            <div className="p-5 flex items-center">
              <div className="inline-flex bg-gray-200 text-gray-600 flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                <i className="fa-regular fa-hourglass-half text-2xl"></i>
              </div>
              <div className='overflow-hidden'>
                <span className="block text-2xl font-bold">{dashboard_cards_info.overdue_task_count}</span>
                <span className="block text-gray-600 truncate">Geciken Görevler</span>
              </div>
            </div>
          </Link>
          
          <Link className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-1 bg-white" to="/orders-entry">
            <div className="p-5 flex items-center">
              <div className="inline-flex bg-green-200 text-green-600 flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                <i className="fa-solid fa-square-check text-2xl"></i>
              </div>
              <div className='overflow-hidden'>
                <span className="block text-2xl font-bold">{dashboard_cards_info.complated_order_count_month}</span>
                <span className="block text-gray-600 truncate">Tamamlanan Sipariş (Aylık)</span>
              </div>
            </div>
          </Link>

          <div id='line_chart_card' className="transition duration-300 shadow-xl rounded-lg col-span-2 bg-white pt-5 px-5 h-fit">
            <div className="inline items-center">
              <BasicLineChart data={dashboard_charts_info} />
            </div>
          </div>

          <div id="table_chart_card" className="transition duration-300 shadow-xl rounded-lg col-span-2 bg-white p-5 h-fit overflow-hidden">
            <div className='pb-4 text-gray-600'>Cari Aktif Bakiye</div>
            <div className="inline items-center">
              <DashboardTable />
            </div>
          </div>
          
        </div>
      </>
      : undefined
    }

    </>
  )
}
