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
  }
}
