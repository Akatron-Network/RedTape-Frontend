export default function reducer(state, action) {

  switch (action.type) {

    case 'TABLE_COLUMNS':
      return {
        ...state,
        table_columns: action.value
      }

    case 'ALL_OFFERS':
      return {
        ...state,
        all_offers: action.value
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

    // case 'RENDER_OFFERS_TABLE':
    //   return {
    //     ...state,
    //     render_offers_table: action.value
    //   }
    
    case 'GET_OFFER_DETAILS':
      return {
        ...state,
        get_offer_details: action.value
      }

    case 'GET_OFFER_ITEMS':
      return {
        ...state,
        get_offer_items: action.value
      }

    case 'GET_OFFER_MODAL':
      return {
        ...state,
        get_offer_modal: action.value
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

    case 'ADD_ENTRY_OFFER_PRODUCT_MODAL':
      return {
        ...state,
        add_entry_offer_product_modal: action.value
      }

    case 'FILTERED_STOCKS':
      return {
        ...state,
        filtered_stocks: action.value
      }

    case 'FILTERED_OFFERS':
      return {
        ...state,
        filtered_offers: action.value
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

    case 'SHOW_TABLE_COLUMNS':
      return {
        ...state,
        show_table_columns: action.value
      }
  }
}
