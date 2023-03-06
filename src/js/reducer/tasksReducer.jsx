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

    case 'TASKS_ASSIGNMENT_MODAL':
      return {
        ...state,
        tasks_assignment_modal: action.value
      }

    case 'TASKS_PRODUCTS':
      return {
        ...state,
        tasks_products: action.value
      }

  }
}