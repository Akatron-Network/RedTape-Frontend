import { createContext, useContext, useReducer, useRef, useEffect } from 'react'
import tasksReducer from '../reducer/tasksReducer';
import { Modal } from 'flowbite';
import Current from '../libraries/models/Current';
import Stock from '../libraries/models/Stock';
import Orders from '../libraries/models/Orders';
import User from '../libraries/models/User';
import Tasks from '../libraries/models/Tasks';
import CurrentActivity from '../libraries/models/CurrentActivity';

const TasksContext = createContext();

const Provider = ({ children }) => {  
  
  //- Stock Refs and States
  const [state, dispatch] = useReducer(tasksReducer, {
    admin_check: {admin: false, username: undefined},
    all_currents:[],
    all_orders: [],
    all_stocks: [],
    all_tasks: [],
    all_users: [],
    assigned_tasks_table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ TARİHİ", "SİP. TESLİM TARİHİ", "AKTİF GÖREV", "GÖREV BİTİŞ TARİHİ", "SORUMLU",	"SİPARİŞ DURUMU", "TAHSİLAT DURUMU", "TOPLAM TUTAR"],
    badges: {
      aktif: 0,
      iptal_edilenler: 0,
      gecikenler: 0,
      tahsil_edilmeyenler: 0,
    },
    chosen_order_for_task: {items:[]},
    chosen_task_for_edit: {details:{logs: [], task_steps: []}},
    dropdown_button_for_modal: {title: "", data: {}, constructor: undefined},
    dropdown_modal_title: "",
    state_type: {state: "Aktif"},
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
  const assignedTableUserRef = useRef("")
  const editTasksDescriptionRef = useRef([])
  const editTasksFinishDate = useRef([])

  const editTaskOrderCurrentRef = useRef("")
  const editTaskOrderSourceRef = useRef("")
  const editTaskOrderInvoicedRef = useRef("")
  const editTaskOrderCurGTEDateRef = useRef("")
  const editTaskOrderCurLTEDateRef = useRef("")

  //b Functions -------------------------------------------------------
  //- Permisson check for Tables, buttons etc.
  //f Admin Check
  const adminCheck = async () => {
    if(localStorage.user_details !== undefined) var dt = JSON.parse(localStorage.user_details);
    else { return; }

    let val = {
      admin: false,
      username: dt.username
    }

    if (dt.admin) {
      val = {
        admin: true,
        username: undefined
      }
    }
    
    dispatch({
      type: 'ADMIN_CHECK',
      value: val
    })

    await showTasks({"state": "Aktif"}, val.username)
  }

  //- Main Table Funcs
  //f Get Currents for table columns name
  const showCurrents = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
      orderBy: {id: "desc"}
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
      orderBy: {id: "desc"}
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
      orderBy: {id: "desc"}
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

  //f Get Badges
  const showBadges = async () => {
    let badges = {
      aktif: 0,
      iptal_edilenler: 0,
      gecikenler: 0,
      tahsil_edilmeyenler: 0,
    }

    let query = {
      skip: 0,
      take: 1000,
      where: undefined,
      orderBy: {id: "desc"}
    }

    let show = await Tasks.showTasks(query)

    if (state.admin_check.username === undefined) { //. Check admin or not

      for (let t of show) {
        
        if ((t.details.state === "Aktif")) {
          badges.aktif = badges.aktif + 1
        }
  
        if ((t.details.state === "İptal Edildi")) {
          badges.iptal_edilenler = badges.iptal_edilenler + 1
        }
  
        if (t.details.current_step !== null) {        //. If state = Gecikti
          if (Date.now() > (new Date(t.details.current_step.planned_finish_date)).getTime() + 86400000) {
            if ((t.details.state !== "Tamamlandı") && (t.details.state !== "İptal Edildi")) { 
              badges.gecikenler = badges.gecikenler + 1
            }
          }
        }
  
        if (t.details.order.credit_current_act === null) {        //. If state = Tahsil Edilmedi
          badges.tahsil_edilmeyenler = badges.tahsil_edilmeyenler + 1
        }
      }

    }
    else {
      for (let t of show) {
        
        if (t.details.current_step !== null) {
        
          if ((t.details.state === "Aktif") && (t.details.current_step.responsible_username === state.admin_check.username)) {
            badges.aktif = badges.aktif + 1
          }
    
          if ((t.details.state === "İptal Edildi") && (t.details.current_step.responsible_username === state.admin_check.username)) {
            badges.iptal_edilenler = badges.iptal_edilenler + 1
          }
    
          if ((Date.now() > (new Date(t.details.current_step.planned_finish_date)).getTime() + 86400000) && (t.details.current_step.responsible_username === state.admin_check.username)) { //. If state = Gecikti
            if ((t.details.state !== "Tamamlandı") && (t.details.state !== "İptal Edildi")) { 
              badges.gecikenler = badges.gecikenler + 1
            }
          }
    
          if ((t.details.order.credit_current_act === null) && (t.details.current_step.responsible_username === state.admin_check.username)) {  //. If state = Tahsil Edilmedi
            badges.tahsil_edilmeyenler = badges.tahsil_edilmeyenler + 1
          }

        }
      }

    }

    dispatch({
      type: "BADGES",
      value: badges
    })
  }

  useEffect(() => {
    console.log(state.admin_check.username);
    if (state.admin_check.username !== undefined) showBadges();
  }, [state.admin_check.username])
  
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
        let current = "-";
        for (let c of state.all_currents) {
          if (c.id === o.details.current_id) {
            current = c.details.id + " - " + c.details.name
          }
        }
        
        let invoiced = "Faturasız"
        if (o.details.invoiced) { invoiced = "Faturalı"}

        editTaskOrderCurrentRef.current.value = current
        editTaskOrderSourceRef.current.value = o.details.order_source
        editTaskOrderInvoicedRef.current.value = invoiced
        editTaskOrderCurGTEDateRef.current.value = o.details.date.split("T")[0]
        editTaskOrderCurLTEDateRef.current.value = o.details.delivery_date.split("T")[0]
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

    editTaskOrderCurrentRef.current.value = ""
    editTaskOrderSourceRef.current.value = ""
    editTaskOrderInvoicedRef.current.value = ""
    editTaskOrderCurGTEDateRef.current.value = ""
    editTaskOrderCurLTEDateRef.current.value = ""
  }

  //f Add step for tasks
  const addStep = () => {
    let steps = [...state.task_steps];

    let new_step = {
      row: steps.length + 1,
      name: "",
      responsible_username: "",
      planned_finish_date: new Date().toISOString().split('T')[0]
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
      
      //. Check "T00:00:00.000Z" format
      if (t.planned_finish_date.includes("T")) tasksPlannedFinishDate.current[t.row - 1].value = t.planned_finish_date.split("T")[0]
      else tasksPlannedFinishDate.current[t.row - 1].value = t.planned_finish_date
    }

    dispatch({
      type: "TASK_STEPS",
      value: steps
    })

  }
  
  //- Tasks Class Funcs
  const showTasks = async (st = {}, resp_user = undefined) => {
    if(state.admin_check.admin) {resp_user = undefined}
    
    let last_state = st.state;
    if (last_state === "Gecikti" || last_state === "Tahsil Edilmedi") {  //. Get all tasks
      last_state = undefined;
    }

    let where = {
      current_step: {responsible_username: resp_user},
      state: last_state
    }

    let query = {
      skip: 0,
      take: 1000,
      where: where,
      orderBy: {id: "desc"}
    }

    let show = await Tasks.showTasks(query)

    dispatch({
      type: "ALL_TASKS",
      value: show
    })

    let list = []

    document.getElementById("btn_1").classList.remove("!bg-indigo_dye"); 
    document.getElementById("btn_1").classList.remove("!text-white")
    document.getElementById("btn_2").classList.remove("!bg-green-700"); 
    document.getElementById("btn_2").classList.remove("!text-white")
    document.getElementById("btn_3").classList.remove("!bg-red-700"); 
    document.getElementById("btn_3").classList.remove("!text-white")
    document.getElementById("btn_4").classList.remove("!bg-gray-700"); 
    document.getElementById("btn_4").classList.remove("!text-white")
    document.getElementById("btn_5").classList.remove("!bg-orange-600"); 
    document.getElementById("btn_5").classList.remove("!text-white")
    document.getElementById("btn_6").classList.remove("!bg-cyan-600"); 
    document.getElementById("btn_6").classList.remove("!text-white")
    
    //. Check state type
    if (st.state === undefined) {
      document.getElementById("btn_1").classList.add("!bg-indigo_dye"); 
      document.getElementById("btn_1").classList.add("!text-white")
    }
    else if (st.state === "Tamamlandı") {
      document.getElementById("btn_2").classList.add("!bg-green-700"); 
      document.getElementById("btn_2").classList.add("!text-white")
    }
    else if (st.state === "İptal Edildi") {
      document.getElementById("btn_3").classList.add("!bg-red-700"); 
      document.getElementById("btn_3").classList.add("!text-white")
    }
    else if (st.state === "Gecikti") {
      document.getElementById("btn_4").classList.add("!bg-gray-700"); 
      document.getElementById("btn_4").classList.add("!text-white")
    
      show.map((p) => {     
        if (p.details.current_step !== null) {        //. If state = Gecikti, get and set 'Gecikti' rows
          if (Date.now() > (new Date(p.details.current_step.planned_finish_date)).getTime() + 86400000) {
            if ((p.details.state !== "Tamamlandı") && (p.details.state !== "İptal Edildi")) { 
              list.push(p)
            }
          }
        }
      })
      
      dispatch({
        type: "ALL_TASKS",
        value: list
      })
    }
    else if (st.state === "Aktif") {
      document.getElementById("btn_5").classList.add("!bg-orange-600"); 
      document.getElementById("btn_5").classList.add("!text-white")
    }
    else if (st.state === "Tahsil Edilmedi") {
      document.getElementById("btn_6").classList.add("!bg-cyan-600"); 
      document.getElementById("btn_6").classList.add("!text-white")

      show.map((p) => {        //. If state = Tahsil Edilmedi, get and set 'Tahsil Edilmedi' rows
        if (p.details.order.credit_current_act === null) { list.push(p) }
      })

      dispatch({
        type: "ALL_TASKS",
        value: list
      })
    }

    dispatch({
      type: "STATE_TYPE",
      value: {state: st.state}
    })

    await showBadges();
  }

  const createOrEditTask = async () => {
    let steps = [...state.task_steps];

    for (let s of steps) {  //. Check includes time format
      if(!s.planned_finish_date.includes("T")) s.planned_finish_date = s.planned_finish_date + "T00:00:00.000Z";
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

      await showTasks(state.state_type, state.admin_check.username);
    }
    else {
      let create = await Tasks.createTask(data)
      await showOrders();
    }

    await showTasks(state.state_type, state.admin_check.username);

    hideTasksAssignmentModal();
  }

  //f Prepare modal for all dropdown funcs
  const dropdownFuncs = async (dt, title) => {    
    let tasks_dropdown_modal = showModal('tasksDropdownModal', "TASKS_DROPDOWN_MODAL");
    tasks_dropdown_modal.show();

    dispatch({
      type: "DROPDOWN_MODAL_TITLE",
      value: title
    })

    let btn = {
      data: dt,
      title: title,
      constructor: dt.constructor
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
    else if (title === "Tahsil Et") {
      let balance = - dt.details.order.total_fee

      let act_data = {
        current_id: dt.details.order.current_id,
        credit_order_id: dt.details.order.id,
        balance: parseFloat(balance),
        date: new Date().toISOString(),
        description: tasksStepDescriptionRef.current.value,
        expiry_date: new Date().toISOString(),
      }

      let resp = await CurrentActivity.createCurrentActivity(act_data);
    }
        
    await showTasks(state.state_type, state.admin_check.username);
    await showOrders();
    hideDropdownModal();
  }

  //f Check type with title and use funcs for in unassigned table buttons
  const unassignedDropdownFuncsApply = async (dt, title) => {
    //. Create a new task
    let create_task_data = {
      order_id: dt.id,
      description: "Direkt Görev",
      task_steps: [
        {
            "row": 1,
            "name": "Direkt İşlem",
            "responsible_username": state.all_users[0].username,
            "planned_finish_date": new Date().toISOString().split('T')[0] + "T00:00:00.000Z"
        }
      ]
    }

    let create_dt = await Tasks.createTask(create_task_data)          //. First create task
    let dropdown_dt = await dropdownFuncsApply(create_dt, title)      //. Then which function do we want to use
  }

  const editTask = async (dt) => {    
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

    let current = "-";
    for (let c of state.all_currents) {
      if (c.id === dt.details.order.current_id) {
        current = c.details.id + " - " + c.details.name
      }
    }
    
    let invoiced = "Faturasız"
    if (dt.details.order.invoiced) { invoiced = "Faturalı"}

    editTaskOrderCurrentRef.current.value = current
    editTaskOrderSourceRef.current.value = dt.details.order.order_source
    editTaskOrderInvoicedRef.current.value = invoiced
    editTaskOrderCurGTEDateRef.current.value = dt.details.order.date.split("T")[0]
    editTaskOrderCurLTEDateRef.current.value = dt.details.order.delivery_date.split("T")[0]


    let tasks_assignment_modal = showModal("tasksAssignmentModal", "TASKS_ASSIGNMENT_MODAL");
    tasks_assignment_modal.show();
  }

  //f When Editable true filled inputs in steps card
  useEffect(() => {
    if (state.tasks_editable === true) {
      for (let s of state.chosen_task_for_edit.details.task_steps) {
        tasksNameRef.current[s.row - 1].value = s.name
        tasksResponsibleUsernameRef.current[s.row - 1].value = s.responsible_username
        tasksPlannedFinishDate.current[s.row - 1].value = s.planned_finish_date.split("T")[0]

        if (s.complate_description !== null) { editTasksDescriptionRef.current[s.row - 1].value = s.complate_description }
        else { editTasksDescriptionRef.current[s.row - 1].value = "-" }

        if (s.complate_date !== null) { editTasksFinishDate.current[s.row - 1].value = s.complate_date.split("T")[0]}
      }

    }
  }, [state.tasks_editable])
  
  const removeTask = async () => {
    let remove = await Tasks.removeTask(state.chosen_task_for_edit.id)

    await showTasks(state.state_type, state.admin_check.username);
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
      value: {title: "", data: {}, constructor: undefined},
    })
  }


  const tasks = {

    //, Refs
    assignedTableUserRef,
    editTasksDescriptionRef,
    editTasksFinishDate,
    tasksNameRef,
    tasksResponsibleUsernameRef,
    tasksPlannedFinishDate,
    tasksDescription,
    tasksStepDescriptionRef,

    editTaskOrderCurrentRef,
    editTaskOrderSourceRef,
    editTaskOrderInvoicedRef,
    editTaskOrderCurGTEDateRef,
    editTaskOrderCurLTEDateRef,


    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    addStep,
    adminCheck,
    createOrEditTask,
    dropdownFuncsApply,
    dropdownFuncs,
    editTask,
    hideDropdownModal,
    hideTasksAssignmentModal,
    makeTasksAssignment,
    removeStep,
    removeTask,
    showBadges,
    showCurrents,
    showOrders,
    showStocks,
    showTasks,
    showUsers,
    unassignedDropdownFuncsApply,
  }

  return(
    <TasksContext.Provider value={tasks} >
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => useContext(TasksContext)
export default Provider