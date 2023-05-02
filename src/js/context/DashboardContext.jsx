import { createContext, useContext, useReducer } from "react";
import dashboardReducer from '../reducer/dashboardReducer'
import Dashboard from "../libraries/models/Dashboard";

export const DashboardContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    dashboard_cards_info: {},
    dashboard_charts_info: {
      line: {},
      table: {},
    },
  });

  const showDashboard = async () => {
    let dt = await Dashboard.showDashboard();
    let get_months = getMonthlySales(dt);

    let charts_info = {
      line: get_months,
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

  const getMonthlySales = (dt) => {
    let sales = dt.details.sales_data_month
    let time = {}

    for (let s of sales) {

      let m = parseInt(s.month)
      let y = s.year
      let t = m + " " + y

      if (m === 1) t = "Ocak " + y
      if (m === 2) t = "Şubat " + y
      if (m === 3) t = "Mart " + y
      if (m === 4) t = "Nisan " + y
      if (m === 5) t = "Mayıs " + y
      if (m === 6) t = "Haziran " + y
      if (m === 7) t = "Temmuz " + y
      if (m === 8) t = "Ağustos " + y
      if (m === 9) t = "Eylül " + y
      if (m === 10) t = "Ekim " + y
      if (m === 11) t = "Kasım " + y
      if (m === 12) t = "Aralık " + y

      if (time[t] === undefined) time[t] = 0;
      time[t] = Number((time[t] + s.balance).toFixed(2));
    }
    
    return time;
  }

  const resizeCheck = () => {
    document.getElementById('table_chart_card').style.height = document.getElementById('line_chart_card').offsetHeight + "px"
    
    if (document.getElementById('line_chart_card').offsetHeight > document.getElementById('table_chart_card_table').offsetHeight) {
      document.getElementById('table_chart_card_table').style.height = "fit-content"
    }
    else {
      document.getElementById('table_chart_card_table').style.height = document.getElementById('line_chart_card').offsetHeight - 80 + "px"
    }
    
  }
  
  const dashboard = {

    //, Refs

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
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