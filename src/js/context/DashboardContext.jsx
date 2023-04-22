import { createContext, useContext, useReducer } from "react";
import dashboardReducer from '../reducer/dashboardReducer'
import Dashboard from "../libraries/models/Dashboard";

const DashboardContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    dashboard_cards_info: {}
  });

  const showDashboard = async () => {
    let dt = await Dashboard.showDashboard();

    dispatch({
      type: 'DASHBOARD_CARDS_INFO',
      value: dt.details
    })
  }

  const dashboard = {

    //, Refs

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
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