import { createContext, useContext, useMemo, useReducer } from "react";
import dashboardReducer from '../reducer/dashboardReducer'
import Dashboard from "../libraries/models/Dashboard";

export const DashboardContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    dashboard_cards_info: {},
    dashboard_charts_info: {
      line: [],
      table: {},
    },
  });

  const showDashboard = async () => {
    let dt = await Dashboard.showDashboard();
    let get_sales = getSales(dt, "daily");

    let charts_info = {
      line: get_sales,
      table: dt.details.current_final_balances,
    }
    
    dispatch({
      type: 'DASHBOARD_CHARTS_INFO',
      value: charts_info
    })

    dispatch({
      type: 'DASHBOARD_CARDS_INFO',
      value: dt.details
    })
  }

  const changeChartType = async (type) => {
    let dt = await Dashboard.showDashboard();
    let get_sales = getSales(dt, type);

    let charts_info = {
      ...state.dashboard_charts_info,
      line: get_sales,
    }
    
    dispatch({
      type: 'DASHBOARD_CHARTS_INFO',
      value: charts_info
    })
  }

  const getSales = (dt, type) => {
    let sales = dt.details.sales_daily
    let time = []

    if (type === "monthly") {
      sales = dt.details.sales_monthly
    }

    for (let s of sales) {

      // let m = parseInt(s.month)
      // let y = s.year
      // let t = m + " " + y

      // if (m === 1) t = "Ocak " + y
      // if (m === 2) t = "Şubat " + y
      // if (m === 3) t = "Mart " + y
      // if (m === 4) t = "Nisan " + y
      // if (m === 5) t = "Mayıs " + y
      // if (m === 6) t = "Haziran " + y
      // if (m === 7) t = "Temmuz " + y
      // if (m === 8) t = "Ağustos " + y
      // if (m === 9) t = "Eylül " + y
      // if (m === 10) t = "Ekim " + y
      // if (m === 11) t = "Kasım " + y
      // if (m === 12) t = "Aralık " + y

      // if (time[t] === undefined) time[t] = 0;
      // time[t] = Number((time[t] + s.balance).toFixed(2));

      let y = s.year
      let m = s.month
      let d = s.day
      
      if (type === "monthly") {
        d = new Date(y, m , 0).getDate();
      }

      if (d < 10) {
        d = "0" + d
      }

      if (m < 10) {
        m = "0" + m
      }

      let t = y + "-" + m + "-" + d
      let date = new Date(t)
      time.push([date.getTime(), Number((s.sum).toFixed(2))])
    }
    
    let timeBoard = time.sort((a, b) => a[0] - b[0])
    
    if (type === "daily") {
      if (!document.getElementById("daily_sales").classList.contains('bg-ciro_blue')) {
        document.getElementById("daily_sales").classList.add('text-white')
        document.getElementById("daily_sales").classList.add('bg-ciro_blue')
        document.getElementById("daily_sales").classList.remove('hover:text-gray-700')
        document.getElementById("daily_sales").classList.remove('hover:bg-gray-100')
        document.getElementById("daily_sales").classList.remove('text-gray-500')

        document.getElementById("monthly_sales").classList.remove('bg-ciro_blue')
        document.getElementById("monthly_sales").classList.remove('bg-ciro_blue')
        document.getElementById("monthly_sales").classList.add('hover:text-gray-700')
        document.getElementById("monthly_sales").classList.add('hover:bg-gray-100')
        document.getElementById("monthly_sales").classList.add('text-gray-500')
      }
    }
    else if (type === "monthly") {
      if (!document.getElementById("monthly_sales").classList.contains('bg-ciro_blue')) {
        document.getElementById("monthly_sales").classList.add('text-white')
        document.getElementById("monthly_sales").classList.add('bg-ciro_blue')
        document.getElementById("monthly_sales").classList.remove('hover:text-gray-700')
        document.getElementById("monthly_sales").classList.remove('hover:bg-gray-100')
        document.getElementById("monthly_sales").classList.remove('text-gray-500')

        document.getElementById("daily_sales").classList.remove('bg-ciro_blue')
        document.getElementById("daily_sales").classList.remove('bg-ciro_blue')
        document.getElementById("daily_sales").classList.add('hover:text-gray-700')
        document.getElementById("daily_sales").classList.add('hover:bg-gray-100')
        document.getElementById("daily_sales").classList.add('text-gray-500')
      }
    }

    return timeBoard;
  }

  const resizeCheck = () => {
    // document.getElementById('table_chart_card').style.height = document.getElementById('line_chart_card').offsetHeight + "px"
    
    // if (document.getElementById('line_chart_card').offsetHeight > document.getElementById('table_chart_card_table').offsetHeight) {
    //   document.getElementById('table_chart_card_table').style.height = "fit-content"
    // }
    // else {
    //   document.getElementById('table_chart_card_table').style.height = document.getElementById('line_chart_card').offsetHeight - 80 + "px"
    // }
    
  }
  
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row?.current?.details?.name ?? "",
        id: 'current_name',
        header: 'Cari Ad'
      },
      {
        accessorKey: 'balance',
        header: 'Net Bakiye',
        enableGlobalFilter: false,
        enableColumnFilter: false,
        muiTableBodyCellProps: ({ cell }) => ({
          sx: {
            backgroundColor: cell.getValue() > 0 ? 'rgba(22, 184, 44, 0.5)' : '#E34744',
            textAlign: "right"
          }
        })
      },
      // {
      //   accessorKey: 'date',
      //   header: 'Tarih',
      //   enableGlobalFilter: false,
      //   enableColumnFilter: false,
      //   Cell: ({ cell }) => {
      //     let cell_value = cell.getValue().split("T")[0]
      //     cell_value = cell_value.split("-").reverse().join(".");
          
      //     return (
      //       <span>{cell_value}</span>
      //     )
      //   }
      // },
      // {
      //   accessorFn: (row) => row?.current?.nets_code ?? "",
      //   id: 'nets_code',
      //   header: 'Cari Kod'
      // },
      // {
      //   accessorFn: (row) => row?.current?.name ?? "",
      //   id: 'name',
      //   header: 'Cari Ad'
      // },
      // {
      //   accessorKey: 'total_fee',
      //   header: 'Tutar',
      //   enableGlobalFilter: false,
      //   enableColumnFilter: false,
      //   Cell: ({ cell }) => {
      //     let cell_value = cell.getValue().toFixed(2)
          
      //     return (
      //       <span>{cell_value} &nbsp;₺</span>
      //     )
      //   }
      // },
      // {
      //   accessorKey: 'control_error',
      //   header: 'Hata',
      //   enableGlobalFilter: false,
      //   enableColumnFilter: false,
      //   Cell: ({ cell }) => {
      //     if (cell.getValue() !== null) {
      //       let cell_value = cell.getValue()

      //       return (
      //         <button className="hs-tooltip inline-block [--trigger:focus] [--placement:left]">
      //           <div className="hs-tooltip-toggle block text-center">
      //             <span className="transition-all text-red-500 font-bold dark:hover:text-red-600 hover:text-red-700">
      //             <i className="fa-solid fa-arrow-left"></i> &nbsp; Hatayı Görüntüle
      //             </span>
      //             <p className="hs-tooltip-content hs-tooltip-shown:opacity-100 max-h-[300px] max-w-[600px] overflow-y-auto whitespace-break-spaces hs-tooltip-shown:visible text-red-600 dark:text-red-500 opacity-0 left-0 top-0 cursor-text select-text transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border text-sm rounded-md shadow-md dark:bg-gray-900 dark:border-gray-700" role="tooltip">
      //               {cell_value}
      //             </p>
      //           </div>
      //         </button>
      //       )
      //     }
      //   }
      // },
    ],
    [],
  );

  const dashboard = {

    //- Refs

    //- States, Variables etc.
    columns,
    ...state,
    dispatch,

    //- Functions
    changeChartType,
    resizeCheck,
    showDashboard,

  }

  return (
    <DashboardContext.Provider value={dashboard}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => useContext(DashboardContext)
export default Provider;