import { createContext, useContext, useReducer, useRef, useEffect } from 'react'
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
    chosen_task_for_edit: {details:{logs:[]}},
    dropdown_button_for_modal: {title: "", data: {}},
    dropdown_modal_title: "",
    tasks_editable: false,
    tasks_assignment_modal: {},
    tasks_dropdown_modal: {},
    tasks_logs_columns: ["", "SORUMLU KİŞİ", "TARİH", "AÇIKLAMA"],
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

    dispatch({
      type: "ALL_USERS",
      value: users
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

    dispatch({
      type: "CHOSEN_ORDER_FOR_TASK",
      value: {items:[]}
    })
    
    dispatch({
      type: 'CHOSEN_TASK_FOR_EDIT',
      value: {}
    })

    dispatch({
      type: "TASKS_EDITABLE",
      value: false
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
  const showTasks = async (where = {}) => {
    let state = where;
    if (where.state === "Gecikti") {  //. Get all tasks
      state = {state: undefined};
    }

    let query = {
      skip: 0,
      take: 1000,
      where: state,
    }

    let show = await Tasks.showTasks(query)
    console.log(show);
    let list = []
    
    show.map((p) => {     //. Get and set 'Gecikti' rows
      if (p.details.current_step !== null) {
        if (Date.now() > (new Date(p.details.current_step.planned_finish_date)).getTime()) {
          if ((p.details.state !== "Tamamlandı") && (p.details.state !== "İptal Edildi")) { 
            list.push(p)
          }
        }
      }
    })

    dispatch({
      type: "ALL_TASKS",
      value: show
    })

    document.getElementById("btn_1").classList.remove("!bg-cyan-900"); 
    document.getElementById("btn_1").classList.remove("!text-white")
    document.getElementById("btn_2").classList.remove("!bg-green-700"); 
    document.getElementById("btn_2").classList.remove("!text-white")
    document.getElementById("btn_3").classList.remove("!bg-red-700"); 
    document.getElementById("btn_3").classList.remove("!text-white")
    document.getElementById("btn_4").classList.remove("!bg-gray-700"); 
    document.getElementById("btn_4").classList.remove("!text-white")

    console.log(where.state);
    if (where.state === undefined) {
      document.getElementById("btn_1").classList.add("!bg-cyan-900"); 
      document.getElementById("btn_1").classList.add("!text-white")
    }
    else if (where.state === "Tamamlandı") {
      document.getElementById("btn_2").classList.add("!bg-green-700"); 
      document.getElementById("btn_2").classList.add("!text-white")
    }
    else if (where.state === "İptal Edildi") {
      document.getElementById("btn_3").classList.add("!bg-red-700"); 
      document.getElementById("btn_3").classList.add("!text-white")
    }
    else if (where.state === "Gecikti") {
      document.getElementById("btn_4").classList.add("!bg-gray-700"); 
      document.getElementById("btn_4").classList.add("!text-white")
      
      dispatch({
        type: "ALL_TASKS",
        value: list
      })

    }
  }

  const createOrEditTask = async () => {
    let steps = [...state.task_steps];

    for (let s of steps) {
      s.planned_finish_date = s.planned_finish_date + "T00:00:00Z"
    }

    let data = {
      order_id: state.chosen_order_for_task.id,
      description: tasksDescription.current.value,
      task_steps: steps
    }
    
    if (state.tasks_editable) {

      data = {
        description: tasksDescription.current.value,
      }

      let edit = await Tasks.editTask(state.chosen_task_for_edit.id, data)
      console.log(edit);

      await showTasks();
    }
    else {
      let create = await Tasks.createTask(data)
      console.log(create);
    }

    await showOrders();

    hideTasksAssignmentModal();
  }

  //f Prepare modal for all dropdown funcs
  const dropdownFuncs = (dt, title) => {
    let tasks_dropdown_modal = showModal('tasksDropdownModal', "TASKS_DROPDOWN_MODAL");
    tasks_dropdown_modal.show();

    dispatch({
      type: "DROPDOWN_MODAL_TITLE",
      value: title
    })

    let btn = {
      data: dt,
      title: title
    }

    dispatch({
      type: "DROPDOWN_BUTTON_FOR_MODAL",
      value: btn
    })
  }

  //f Check type with title and use funcs
  const dropdownFuncsApply = async (dt, title) => {
    let data = {};
    let resp = {};

    data = {
      id: dt.id,
      description: tasksStepDescriptionRef.current.value
    }

    if (title === "İşlemi Tamamla") { 
      data = {
        id: dt.id,
        complate_description: tasksStepDescriptionRef.current.value
      }
      resp = await Tasks.completeStep(data) 
    }
    else if (title === "İşlemi İptal Et") { resp = await Tasks.cancelStep(data) }
    else if (title === "Görevi Tamamla") { resp = await Tasks.completeTask(data) }
    else if (title === "Görevi Baştan Başlat") { resp = await Tasks.reOpenTask(data) }
    else if (title === "Görevi İptal Et") { resp = await Tasks.cancelTask(data) }
    
    await showTasks();
    hideDropdownModal();
  }

  const editTask = async (dt) => {
    console.log(dt);
    
    dispatch({
      type: 'CHOSEN_TASK_FOR_EDIT',
      value: dt
    })

    dispatch({
      type: "TASKS_EDITABLE",
      value: true
    })
    
    dispatch({
      type: 'CHOSEN_ORDER_FOR_TASK',
      value: dt.details.order
    })

    tasksDescription.current.value = dt.details.description

    let steps = [];
    for (let s of dt.details.task_steps) {
      let step = {
        name: s.name,
        planned_finish_date: s.planned_finish_date.split("T")[0],
        responsible_username: s.responsible_username,
        row: s.row,
      }
      steps.push(step)
    }

    dispatch({
      type: "TASK_STEPS",
      value: steps
    })


    let tasks_assignment_modal = showModal("tasksAssignmentModal", "TASKS_ASSIGNMENT_MODAL");
    tasks_assignment_modal.show();
  }

  //f When Editable true filled inputs in steps card
  useEffect(() => {
    if (state.tasks_editable === true) {
      for (let s of state.task_steps) {
        tasksNameRef.current[s.row - 1].value = s.name
        tasksResponsibleUsernameRef.current[s.row - 1].value = s.responsible_username
        tasksPlannedFinishDate.current[s.row - 1].value = s.planned_finish_date.split("T")[0]
      }
    }
  }, [state.tasks_editable])
  
  const removeTask = async () => {
    let remove = await Tasks.removeTask(state.chosen_task_for_edit.id)
    console.log(remove);

    await showTasks();
    await showOrders();

    hideTasksAssignmentModal();
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
    tasksStepDescriptionRef.current.value = "";

    dispatch({
      type: "TASKS_DROPDOWN_MODAL",
      value: {}
    })

    dispatch({
      type: "DROPDOWN_MODAL_TITLE",
      value: ""
    })

    dispatch({
      type: "DROPDOWN_BUTTON_FOR_MODAL",
      value: {title: "", data: {}},
    })
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
    createOrEditTask,
    dropdownFuncsApply,
    dropdownFuncs,
    editTask,
    hideDropdownModal,
    hideTasksAssignmentModal,
    makeTasksAssignment,
    removeStep,
    removeTask,
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