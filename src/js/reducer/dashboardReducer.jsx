export default function reducer(state, action) {

  switch (action.type) {

    case 'DASHBOARD_CARDS_INFO':
      return {
        ...state,
        dashboard_cards_info: action.value
      }
  }
}
