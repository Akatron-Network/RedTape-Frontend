export default function reducer(state, action) {

  switch (action.type) {

    case 'DISTRICTS': //- Get districts when we chose province
      return {
        ...state,
        districts: action.value
      }
    
    case 'PROVINCES':
      return {
        ...state,
        provinces: action.value
      }
    
    case 'RENDER_TABLE':
      return {
        ...state,
        render_table: action.render
      }
    
    case 'CURRENT_DETAILS':
      return {
        ...state,
        current_details: action.value
      }
    
    case 'ALL_CURRENTS':
      return {
        ...state,
        all_currents: action.value
      }
    
    case 'EDIT_CURRENT_MODAL':
      return {
        ...state,
        edit_current_modal: action.value
      }
  }
}
