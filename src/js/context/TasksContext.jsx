import { createContext, useContext, useReducer, useRef } from 'react'
import tasksReducer from '../reducer/tasksReducer';
import { Modal } from 'flowbite';
import Current from '../libraries/models/Current';
import Stock from '../libraries/models/Stock';
import Orders from '../libraries/models/Orders';

const TasksContext = createContext();

const Provider = ({ children }) => {
  
  //- Stock Refs and States
  const [state, dispatch] = useReducer(tasksReducer, {
    all_currents:[],
    all_orders: [],
    all_stocks: [],
    tasks_products: [],
    tasks_assignment_modal: {},
    unassigned_tasks_table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ KAYNAĞI", "FATURA DURUMU", "SİPARİŞ TARİHİ", "TESLİM TARİHİ", "TOPLAM TUTAR"],
    unassigned_tasks_product_table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
  })

  //b Functions -------------------------------------------------------
  
  //- Main Table Funcs
  //f Get Currents for table columns name
  const showCurrents = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
    }

    let resp = await Current.showCurrent(query)

    dispatch({
      type: "ALL_CURRENTS",
      value: resp
    })
  }
  
  //f Get Orders for unassigned tasks
  const showOrders = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {"task": null },       //. For show unassigned tasks
    }

    let resp = await Orders.showOrders(query);

    dispatch({
      type: "ALL_ORDERS",
      value: resp
    })
  }

  //f Get Stocks
  const showStocks = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
    }

    let resp = await Stock.showStock(query)

    dispatch({
      type: "ALL_STOCKS",
      value: resp
    })
  }
  
  //f Show TasksAssignmentModal and filled in the inputs
  const makeTasksAssignment = async (dt) => {
    let tasks_assignment_modal = showModal("tasksAssignmentModal", "TASKS_ASSIGNMENT_MODAL");   //. Create and show Tasks Assignment Modal
    tasks_assignment_modal.show();

    for (let o of state.all_orders) {
      if (o.id === dt.details.id) {

        dispatch({
          type: 'TASKS_PRODUCTS',
          value: o.items
        })
      }
    }

  }

  const clearTasksAssignmentInputs = () => {

  }

  //- Modal Funcs
  const showModal = (id, type) => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById(id);
    const modal = new Modal(el, options);

    dispatch({                  //. Set tasks assignment modal object
      type: type,
      value: modal
    })

    return modal;    
  }

  const hideTasksAssignmentModal = () => {
    state.tasks_assignment_modal.hide();
    clearTasksAssignmentInputs();

    dispatch({                  //. Set tasks assignment modal object
      type: 'TASKS_ASSIGNMENT_MODAL',
      value: {}
    })
  }

  const tasks = {

    //, Refs


    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    hideTasksAssignmentModal,
    makeTasksAssignment,
    showCurrents,
    showOrders,
    showStocks,

  }

  return(
    <TasksContext.Provider value={tasks} >
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)
export default Provider