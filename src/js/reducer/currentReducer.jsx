export default function reducer(state, action) {

  switch (action.type) {

    case 'GET_DISTRICTS': //- Get districts when we chose province
      return {
        ...state,
        districts: action.value
      }
    
    case 'GET_PROVINCES':
      return {
        ...state,
        provinces: action.value
      }
    
    case 'RENDER_TABLE':
      return {
        ...state,
        render_table: action.render
      }
    
    case 'EDITABLE':
      return {
        ...state,
        editable: action.value
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
  }
}
