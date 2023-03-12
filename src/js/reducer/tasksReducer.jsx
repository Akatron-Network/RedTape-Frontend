export default function reducer(state, action) {

  switch (action.type) {

    case 'ADMIN_CHECK':
      return {
        ...state,
        admin_check: action.value
      }

    case 'ALL_CURRENTS':
      return {
        ...state,
        all_currents: action.value
      }

    case 'ALL_ORDERS':
      return {
        ...state,
        all_orders: action.value
      }

    case 'ALL_STOCKS':
      return {
        ...state,
        all_stocks: action.value
      }

    case 'ALL_TASKS':
      return {
        ...state,
        all_tasks: action.value
      }

    case 'ALL_USERS':
      return {
        ...state,
        all_users: action.value
      }

    case 'TASKS_ASSIGNMENT_MODAL':
      return {
        ...state,
        tasks_assignment_modal: action.value
      }

    case 'TASKS_DROPDOWN_MODAL':
      return {
        ...state,
        tasks_dropdown_modal: action.value
      }

    case 'CHOSEN_ORDER_FOR_TASK':
      return {
        ...state,
        chosen_order_for_task: action.value
      }

    case 'TASK_STEPS':
      return {
        ...state,
        task_steps: action.value
      }

    case 'ASSIGNED_TASKS_TABLE_COLUMNS':
      return {
        ...state,
        assigned_tasks_table_columns: action.value
      }

    case 'DROPDOWN_MODAL_TITLE':
      return {
        ...state,
        dropdown_modal_title: action.value
      }

    case 'DROPDOWN_BUTTON_FOR_MODAL':
      return {
        ...state,
        dropdown_button_for_modal: action.value
      }
    
    case 'TASKS_EDITABLE':
      return {
        ...state,
        tasks_editable: action.value
      }

    case 'CHOSEN_TASK_FOR_EDIT':
      return {
        ...state,
        chosen_task_for_edit: action.value
      }

    case 'TASKS_LOGS_COLUMNS':
      return {
        ...state,
        tasks_logs_columns: action.value
      }

    case 'STATE_TYPE':
      return {
        ...state,
        state_type: action.value
      }

  }
}