export default function reducer(state, action) {

  switch (action.type) {

    case 'ALL_CURRENTS':
      return {
        ...state,
        all_currents: action.value
      }

    case 'CURRENT_ACTIVITY':
      return {
        ...state,
        current_activity: action.value
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

    case 'RENDER_TABLE':
      return {
        ...state,
        render_table: action.render
      }

    case 'EDIT_CUR_ACT_MODAL':
      return {
        ...state,
        edit_cur_act_modal: action.value
      }

    case 'CUR_ACT_MODAL_DETAILS':
      return {
        ...state,
        cur_act_modal_details: action.value
      }
  }
}
