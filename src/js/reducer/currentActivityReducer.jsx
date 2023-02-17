export default function reducer(state, action) {

  switch (action.type) {

    case 'ALL_CURRENTS':
      return {
        ...state,
        all_currents: action.value
      }

    case 'FILTERED_CURRENTS':
      return {
        ...state,
        filtered_currents: action.value
      }

    case 'TOGGLE_FILTERED_TABLE':
      return {
        ...state,
        toggle_filtered_table: action.value
      }

    case 'CHOSEN_CURRENT':
      return {
        ...state,
        chosen_current: action.value
      }

    case 'DATE':
      return {
        ...state,
        date: action.value
      }
  }
}
