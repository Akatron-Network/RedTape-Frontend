export default function reducer(state, action) {

  switch (action.type) {

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

    case 'DISPLAY_NAMES':
      return {
        ...state,
        display_names: action.value
      }

    case 'ASSIGNED_TASKS_TABLE_COLUMNS':
      return {
        ...state,
        assigned_tasks_table_columns: action.value
      }

  }
}