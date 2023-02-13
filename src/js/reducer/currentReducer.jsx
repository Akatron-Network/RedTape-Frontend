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
  }
}
