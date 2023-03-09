import { createContext, useContext, useReducer, useRef } from 'react'
import tasksReducer from '../reducer/tasksReducer';
import { Modal } from 'flowbite';
import Current from '../libraries/models/Current';
import Stock from '../libraries/models/Stock';
import Orders from '../libraries/models/Orders';
import User from '../libraries/models/User';
import Tasks from '../libraries/models/Tasks';

const TasksContext = createContext();

const Provider = ({ children }) => {
  
  //- Stock Refs and States
  const [state, dispatch] = useReducer(tasksReducer, {
    all_currents:[],
    all_orders: [],
    all_stocks: [],
    all_tasks: [],
    all_users: [],
    assigned_tasks_table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ TARİHİ", "SİP. TESLİM TARİHİ", "AKTİF GÖREV", "GÖREV BİTİŞ TARİHİ", "SORUMLU",	"SİPARİŞ DURUMU"],
    chosen_order_for_task: {items:[]},
    display_names: [],
    tasks_assignment_modal: {},
    tasks_dropdown_modal: {},
    task_steps: [],
    unassigned_tasks_table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ KAYNAĞI", "FATURA DURUMU", "SİPARİŞ TARİHİ", "TESLİM TARİHİ", "TOPLAM TUTAR"],
    unassigned_tasks_product_table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
  })

  const tasksNameRef = useRef([])
  const tasksResponsibleUsernameRef = useRef([])
  const tasksPlannedFinishDate = useRef([])
  const tasksDescription = useRef([])
  const tasksStepDescriptionRef = useRef("")

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
      let user = {
        [u.data.displayname] : u.data.username
      }
      display_names.push(user)
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
    tasksDescription.current.value = "",
    
    dispatch({
      type: "TASK_STEPS",
      value: [],
    })

    dispatch({
      type: 'TASKS_ASSIGNMENT_MODAL',
      value: {}
    })
  }

  //f Add step for tasks
  const addStep = () => {
    let steps = [...state.task_steps];

    let new_step = {
      row: steps.length + 1,
      name: "",
      responsible_username: "",
      planned_finish_date: ""
    }

    steps.push(new_step);

    dispatch({
      type: "TASK_STEPS",
      value: steps
    })
  }

  //f Remove step for tasks
  const removeStep = (row) => {
    let steps = [...state.task_steps];

    for (let l in steps) {
      if (row === steps[l].row) {
        const index = steps.indexOf(steps[l]);  //. Set index

        if (index > -1) {                       //. Remove from steps
          steps.splice(index, 1);
        }
      }
    }

    for (let l in steps) {                     //. Give the sequence number again
      steps[l].row = parseInt(l) + 1
    }
    
    for(let t of steps) {                     //. All refs print again correctly
      tasksNameRef.current[t.row - 1].value = t.name
      tasksResponsibleUsernameRef.current[t.row - 1].value = t.responsible_username
      
      //. Check "T00:00:00Z" format
      if (t.planned_finish_date.includes("T")) tasksPlannedFinishDate.current[t.row - 1].value = t.planned_finish_date.split("T")[0]
      else tasksPlannedFinishDate.current[t.row - 1].value = t.planned_finish_date
    }

    dispatch({
      type: "TASK_STEPS",
      value: steps
    })

  }
  
  //- Tasks Class Funcs
  const showTasks = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
    }

    let show = await Tasks.showTasks(query)
    console.log(show);
  
    dispatch({
      type: "ALL_TASKS",
      value: show
    })
  }

  const createTask = async () => {
    let steps = [...state.task_steps];

    for (let s of steps) {
      s.planned_finish_date = s.planned_finish_date + "T00:00:00Z"
    }

    let data = {
      order_id: state.chosen_order_for_task.id,
      description: tasksDescription.current.value,
      task_steps: steps
    }
    
    let create = await Tasks.createTask(data)
    console.log(create);

    await showOrders();

    hideTasksAssignmentModal();
  }

  const completeStep = async (id) => {
    console.log(id);
    let tasks_dropdown_modal = showModal('tasksDropdownModal', "TASKS_DROPDOWN_MODAL");
    tasks_dropdown_modal.show();
    
  }

  const cancelStep = async (id) => {
    console.log(id);

  }

  const completeTask = async (id) => {
    console.log(id);

  }

  const reOpenTask = async (id) => {
    console.log(id);

  }

  const editTask = async (id) => {
    console.log(id);

  }

  const cancelTask = async (id) => {
    console.log(id);

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
  }

  const hideDropdownModal = () => {
    state.tasks_dropdown_modal.hide();
  }


  const tasks = {

    //, Refs
    tasksNameRef,
    tasksResponsibleUsernameRef,
    tasksPlannedFinishDate,
    tasksDescription,
    tasksStepDescriptionRef,


    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    addStep,
    cancelStep,
    cancelTask,
    completeStep,
    completeTask,
    createTask,
    editTask,
    hideDropdownModal,
    hideTasksAssignmentModal,
    makeTasksAssignment,
    removeStep,
    reOpenTask,
    showCurrents,
    showOrders,
    showStocks,
    showTasks,
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