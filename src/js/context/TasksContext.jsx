import { createContext, useContext, useReducer, useRef } from 'react'
import tasksReducer from '../reducer/tasksReducer';
import { Modal } from 'flowbite';
import Current from '../libraries/models/Current';
import Stock from '../libraries/models/Stock';
import Orders from '../libraries/models/Orders';
import User from '../libraries/models/User';

const TasksContext = createContext();

const Provider = ({ children }) => {
  
  //- Stock Refs and States
  const [state, dispatch] = useReducer(tasksReducer, {
    all_currents:[],
    all_orders: [],
    all_stocks: [],
    all_users: [],
    chosen_order_for_task: {items:[]},
    display_names: [],
    tasks_assignment_modal: {},
    task_steps: [],
    unassigned_tasks_table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ KAYNAĞI", "FATURA DURUMU", "SİPARİŞ TARİHİ", "TESLİM TARİHİ", "TOPLAM TUTAR"],
    unassigned_tasks_product_table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
  })

  const tasksNameRef = useRef([])
  const tasksResponsibleUsernameRef = useRef([])
  const tasksPlannedFinishDate = useRef([])
  const tasksDescription = useRef([])

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
  
  //f Get Users
  const showUsers = async () => {
    let users = await User.showUser()
    let display_names = [];

    for (let u of users) {
      display_names.push(u.data.displayname)
    }

    dispatch({
      type: "ALL_USERS",
      value: users
    })

    dispatch({
      type: "DISPLAY_NAMES",
      value: display_names
    })
  }

  //f Show TasksAssignmentModal and filled in the inputs
  const makeTasksAssignment = async (dt) => {
    let tasks_assignment_modal = showModal("tasksAssignmentModal", "TASKS_ASSIGNMENT_MODAL");   //. Create and show Tasks Assignment Modal
    tasks_assignment_modal.show();

    for (let o of state.all_orders) {
      if (o.id === dt.details.id) {

        dispatch({
          type: 'CHOSEN_ORDER_FOR_TASK',
          value: o
        })
      }
    }

  }

  const clearTasksAssignmentInputs = () => {

  }

  //f Add step for tasks
  const addStep = () => {
    let list = [...state.task_steps];

    let new_step = {
      row: list.length + 1,
      name: "",
      responsible_username: "",
      planned_finish_date: ""
    }

    list.push(new_step);

    dispatch({
      type: "TASK_STEPS",
      value: list
    })
  }

  //! SİLİNCE İNPUT GİRİŞLERİ YANLIŞ OLUYOR. YANİ BEN 1.Yİ SİLERSEM SONUNCUNUN İNPUTU GİDİYOR VS
  //f Remove step for tasks
  const removeStep = (row) => {
    console.log(row);
    let list = [...state.task_steps];

    for (let l in list) {
      if (row === list[l].row) {
        console.log(list[l].row);
        const index = list.indexOf(list[l]);  //. Set index
        console.log(index);

        if (index > -1) {                     //. Remove from list
          list.splice(index, 1);
        }
      }
    }

    for (let l in list) {                     //. Give the sequence number again
      list[l].row = parseInt(l) + 1
    }

    dispatch({
      type: "TASK_STEPS",
      value: list
    })

  }

  const createTask = async () => {
    let steps = [...state.task_steps];

    for(let t of steps) {
      t.name = tasksNameRef.current[t.row - 1].value
      t.responsible_username = tasksResponsibleUsernameRef.current[t.row - 1].value
      t.planned_finish_date = tasksPlannedFinishDate.current[t.row - 1].value + "T00:00:00Z"
    }

    console.log(tasks);

    let data = {
      order_id: state.chosen_order_for_task.id,
      description: tasksDescription.current.value,
      task_steps: steps
    }
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
    tasksNameRef,
    tasksResponsibleUsernameRef,
    tasksPlannedFinishDate,
    tasksDescription,


    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    addStep,
    createTask,
    hideTasksAssignmentModal,
    makeTasksAssignment,
    removeStep,
    showCurrents,
    showOrders,
    showStocks,
    showUsers,

  }

  return(
    <TasksContext.Provider value={tasks} >
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)
export default Provider