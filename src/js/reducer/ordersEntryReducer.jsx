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

    case 'ALL_STOCKS':
      return {
        ...state,
        all_stocks: action.value
      }

    case 'RENDER_ORDERS_TABLE':
      return {
        ...state,
        render_orders_table: action.value
      }
      
      case 'GET_ORDER_DETAILS':
        return {
          ...state,
          get_order_details: action.value
        }

    case 'GET_ORDER_ITEMS':
      return {
        ...state,
        get_order_items: action.value
      }

    case 'GET_ORDER_MODAL':
      return {
        ...state,
        get_order_modal: action.value
      }

      case 'ENTRY_PRODUCT_DETAILS':
        return {
          ...state,
          entry_product_details: action.value
        }

    case 'ENTRY_PRODUCT_MODAL':
      return {
        ...state,
        entry_product_modal: action.value
      }

    case 'ENTRY_PRODUCT_UNITS':
      return {
        ...state,
        entry_product_units: action.value
      }

    case 'ADD_ENTRY_ORDER_PRODUCT_MODAL':
      return {
        ...state,
        add_entry_order_product_modal: action.value
      }

    case 'FILTERED_STOCKS':
      return {
        ...state,
        filtered_stocks: action.value
      }

    case 'FILTERED_ORDERS':
      return {
        ...state,
        filtered_orders: action.value
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

    case 'TOGGLE_FILTERED_STOCK_TABLE':
      return {
        ...state,
        toggle_filtered_stock_table: action.value
      }

    case 'INVOICED':
      return {
        ...state,
        invoiced: action.value
      }

    case 'PRINT_PDF_ROWS':
      return {
        ...state,
        print_pdf_rows: action.value
      }
  }
}
