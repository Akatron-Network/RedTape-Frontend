export default function reducer(state, action) {

  switch (action.type) {

    case 'ALL_STOCKS':
      return {
        ...state,
        all_stocks: action.value
      }

    case 'TABLE_COLUMNS':
      return {
        ...state,
        table_columns: action.value
      }

    case 'TABLE_ROWS':
      return {
        ...state,
        table_rows: action.value
      }

    case 'RENDER_TABLE':
      return {
        ...state,
        render_table: action.value
      }

    case 'STOCK_DETAILS':
      return {
        ...state,
        stock_details: action.value
      }

    case 'EDIT_STOCK_MODAL':
      return {
        ...state,
        edit_stock_modal: action.value
      }

  }
}
