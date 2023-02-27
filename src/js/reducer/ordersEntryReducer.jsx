export default function reducer(state, action) {

  switch (action.type) {

    case 'TABLE_COLUMNS':
      return {
        ...state,
        table_columns: action.value
      }

    case 'ALL_ORDERS':
      return {
        ...state,
        all_orders: action.value
      }

    case 'ALL_CURRENTS':
      return {
        ...state,
        all_currents: action.value
      }

    case 'RENDER_ORDERS_TABLE':
      return {
        ...state,
        render_orders_table: action.value
      }

    case 'SHOW_ORDERS_MODAL':
      return {
        ...state,
        show_orders_modal: action.value
      }

    case 'SHOW_ORDERS_DETAILS':
      return {
        ...state,
        show_orders_details: action.value
      }
  }
}
