export default function reducer(state, action) {

  switch (action.type) {

    case 'ALL_USERS':
      return {
        ...state,
        all_users: action.value
      }

    case 'RENDER_TABLE':
      return {
        ...state,
        render_table: action.render
      }

    case 'EDIT_USER_MODAL':
      return {
        ...state,
        edit_user_modal: action.value
      }

    case 'CHOSEN_USER_DETAILS':
      return {
        ...state,
        chosen_user_details: action.value
      }
  }
}
