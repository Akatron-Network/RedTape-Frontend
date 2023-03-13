export default function reducer(state, action) {

  switch (action.type) {

    case 'TOGGLE_FILTERED_CURRENT_TABLE':
      return {
        ...state,
        toggle_filtered_current_table: action.value
      }

    case 'TOGGLE_FILTERED_STOCK_TABLE':
      return {
        ...state,
        toggle_filtered_stock_table: action.value
      }

    case 'DATE':
      return {
        ...state,
        date: action.value
      }

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

      case 'ALL_STOCKS':
        return {
          ...state,
          all_stocks: action.value
        }

    case 'FILTERED_STOCKS':
      return {
        ...state,
        filtered_stocks: action.value
      }

    case 'CHOSEN_CURRENT':
      return {
        ...state,
        chosen_current: action.value
      }

    case 'CHOSEN_STOCK':
      return {
        ...state,
        chosen_stock: action.value
      }

    case 'CHOSEN_STOCK_UNITS':
      return {
        ...state,
        chosen_stock_units: action.value
      }

    case 'CHOSEN_STOCK_EDIT_UNITS':
      return {
        ...state,
        chosen_stock_edit_units: action.value
      }

    case 'PRODUCT_LIST':
      return {
        ...state,
        product_list: action.value
      }

    case 'EDIT_PRODUCT_MODAL':
      return {
        ...state,
        edit_product_modal: action.value
      }

    case 'PRODUCT_DETAILS':
      return {
        ...state,
        product_details: action.value
      }

    case 'TABLE_TOTAL':
      return {
        ...state,
        table_total: action.value
      }

    case 'INVOICED':
      return {
        ...state,
        invoiced: action.value
      }

    case 'PRINT_PDF_MODAL':
      return {
        ...state,
        print_pdf_modal: action.value
      }
  }
}
