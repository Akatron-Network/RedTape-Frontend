import { createContext, useContext, useReducer, useRef } from "react"
import Current from "../libraries/models/Current";
import Stock from "../libraries/models/Stock";
import ordersReducer from '../reducer/ordersReducer'

const OrdersContext = createContext()

const Provider = ({ children }) => {

  //b State and Ref Management ----------------------------------------

  //- Current Details States
  const [state, dispatch] = useReducer(ordersReducer, {
    toggle_filtered_current_table: false,
    toggle_filtered_stock_table: false,
    all_currents: [],
    filtered_currents: [],
    chosen_current: {},
    all_stocks: [],
    filtered_stocks: [],
    chosen_stock: {},
    chosen_stock_units: [],
    date: {
      current: "",
      early: "",
    }
  });

  const ordersCurSearchInputRef = useRef("");
  const ordersSourceRef = useRef("");
  const ordersInvoicedRef = useRef("");
  const ordersCurGTEDateRef = useRef("");
  const ordersCurLTEDateRef = useRef("");

  const ordersCurIDRef = useRef("");
  const ordersCurNameRef = useRef("");
  const ordersCurAddressRef = useRef("");
  const ordersCurProvDistRef = useRef("");
  const ordersCurTaxOfficeNoRef = useRef("");
  const ordersCurPhoneIRef = useRef("");
  const ordersCurPhoneIIRef = useRef("");
  const ordersCurMailRef = useRef("");

  const ordersNameRef = useRef("");
  const ordersUnitRef = useRef("");
  const ordersAmountRef = useRef("");
  const ordersPriceRef = useRef("");
  const ordersTaxRateRef = useRef("");
  const ordersDescriptionRef = useRef("");


  //b Functions -------------------------------------------------------
  const getDate = () => {

    const date = new Date();

    let day = ('0' + date.getDate()).slice(-2)        //. ("0" + "10") Giving us "010" so adding .slice(-2) 
    let month = ('0' + (date.getMonth()+1)).slice(-2) //. gives us the last two characters => "10"
    let year = date.getFullYear();

    let current_full = year + "-" + month + "-" + day;

    let three_month_early = date.setFullYear(date.getFullYear(), date.getMonth() - 3);
    let early_date = new Date(three_month_early);

    let early_day = ('0' + early_date.getDate()).slice(-2)        //. ("0" + "10") Giving us "010" so adding .slice(-2) 
    let early_month = ('0' + (early_date.getMonth()+1)).slice(-2) //. gives us the last two characters => "10"
    let early_year = early_date.getFullYear();

    let early_full = early_year + "-" + early_month + "-" + early_day;

    let d = {
      current: current_full,
      early: early_full
    }

    dispatch({
      type: 'DATE',
      value: d
    })

  }
  
  //- Current Autocomplete
  const getAllCurrents = async () => {

    let currents = await Current.showCurrent();

    dispatch({
      type: 'ALL_CURRENTS',
      value: currents
    })
    
    dispatch({
      type: 'FILTERED_CURRENTS',
      value: currents
    })

  }
  
  const toggleFilteredCurrentTable = (e) => {

    if(e.target.id !== 'search_current_button' && e.target.id !== 'search_current_input' && e.target.id !== 'search_current_button_icon') {
      dispatch({
        type: 'TOGGLE_FILTERED_CURRENT_TABLE',
        value: false
      })
    }
    else {
      if(state.toggle_filtered_current_table !== true) {
        dispatch({
          type: 'TOGGLE_FILTERED_CURRENT_TABLE',
          value: true
        })
      }
    }

  }

  const filterCurrents = (e) => {

    if (e.target.value === "") {
      printCurrentDetails(undefined);   //. For clearing out current details inputs
    }

    const searchWord = e.target.value.toLowerCase();
    const newFilter = state.all_currents.filter((source) => {
      var condition = false;

      if (source.details.name !== undefined) {
        condition =
          (source.details.id).toString().toLowerCase().includes(searchWord) ||
          source.details.name.toLowerCase().includes(searchWord);
      } else {
        condition = source.id.toLowerCase().includes(searchWord);
      }

      return condition;
    });
    
    dispatch({
      type: 'FILTERED_CURRENTS',
      value: newFilter
    })

  }

  const chooseFilteredCurrent = async (id) => {
    
    let cr = await Current.getCurrent(id);
    console.log(cr);

    dispatch({
      type: 'CHOSEN_CURRENT',
      value: cr
    })
    
    dispatch({
      type: 'TOGGLE_FILTERED_CURRENT_TABLE',
      value: false
    })

    ordersCurSearchInputRef.current.value = cr.details.id + " - " + cr.details.name

    printCurrentDetails(cr);
  }

  const printCurrentDetails = (details) => {

    if(details === undefined) {
      ordersCurIDRef.current.innerHTML = "";
      ordersCurNameRef.current.innerHTML = "";
      ordersCurAddressRef.current.innerHTML = "";
      ordersCurProvDistRef.current.innerHTML = "";
      ordersCurTaxOfficeNoRef.current.innerHTML = "";
      ordersCurPhoneIRef.current.innerHTML = "";
      ordersCurPhoneIIRef.current.innerHTML = "";
      ordersCurMailRef.current.innerHTML =  "";
      
      dispatch({
        type: 'CHOSEN_CURRENT',
        value: {}
      })
    }
    else {
      ordersCurIDRef.current.innerHTML = details.details.id
      ordersCurNameRef.current.innerHTML = details.details.name
      ordersCurAddressRef.current.innerHTML = details.details.address
      ordersCurTaxOfficeNoRef.current.innerHTML = details.details.tax_office + " - " +  details.details.tax_no
      ordersCurPhoneIRef.current.innerHTML = details.details.phone
      ordersCurPhoneIIRef.current.innerHTML = details.details.phone_2
      ordersCurMailRef.current.innerHTML =  details.details.mail
      
      if (details.details.province === "default") {
        details.details.province = ""
      }
      if (details.details.district === "default") {
        details.details.district = ""
      }

      ordersCurProvDistRef.current.innerHTML = details.details.province + " - " +  details.details.district
    }

  }

  //- Stock Autocomplete
  const getAllStocks = async () => {

    let stock = await Stock.showStock();

    dispatch({
      type: 'ALL_STOCKS',
      value: stock
    })
    
    dispatch({
      type: 'FILTERED_STOCKS',
      value: stock
    })

  }
  
  const toggleFilteredStockTable = (e) => {

    if(e.target.id !== 'search_stock_button' && e.target.id !== 'search_stock_input' && e.target.id !== 'search_stock_button_icon') {
      dispatch({
        type: 'TOGGLE_FILTERED_STOCK_TABLE',
        value: false
      })
    }
    else {
      if(state.toggle_filtered_stock_table !== true) {
        dispatch({
          type: 'TOGGLE_FILTERED_STOCK_TABLE',
          value: true
        })
      }
    }

  }

  const filterStocks = (e) => {

    if (e.target.value === "") {
      printCurrentDetails(undefined);   //. For clearing out current details inputs
    }

    const searchWord = e.target.value.toLowerCase();
    const newFilter = state.all_stocks.filter((source) => {
      var condition = false;

      if (source.details.name !== undefined) {
        condition =
          (source.details.id).toString().toLowerCase().includes(searchWord) ||
          source.details.name.toLowerCase().includes(searchWord);
      } else {
        condition = source.id.toLowerCase().includes(searchWord);
      }

      return condition;
    });
    
    dispatch({
      type: 'FILTERED_STOCKS',
      value: newFilter
    })

  }

  const chooseFilteredStock = async (id) => {
    
    let st = await Stock.getStock(id);

    dispatch({
      type: 'CHOSEN_STOCK',
      value: st
    })
    
    dispatch({
      type: 'TOGGLE_FILTERED_STOCK_TABLE',
      value: false
    })

    ordersNameRef.current.value = st.details.id + " - " + st.details.name

    printStockDetails(st);
  }

  const printStockDetails = (details) => {
    console.log(details);
    
    dispatch({
      type: 'CHOSEN_STOCK_UNITS',
      value: [details.details.unit, details.details.unit_2]
    })
  }

  const data = {
    //, Refs
    ordersCurSearchInputRef,
    ordersSourceRef,
    ordersInvoicedRef,
    ordersCurGTEDateRef,
    ordersCurLTEDateRef,

    ordersCurIDRef,
    ordersCurNameRef,
    ordersCurAddressRef,
    ordersCurProvDistRef,
    ordersCurTaxOfficeNoRef,
    ordersCurPhoneIRef,
    ordersCurPhoneIIRef,
    ordersCurMailRef,

    ordersNameRef,
    ordersUnitRef,
    ordersAmountRef,
    ordersPriceRef,
    ordersTaxRateRef,
    ordersDescriptionRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    chooseFilteredCurrent,
    chooseFilteredStock,
    filterCurrents,
    filterStocks,
    getAllCurrents,
    getAllStocks,
    getDate,
    toggleFilteredCurrentTable,
    toggleFilteredStockTable,

  }

  return (
    <OrdersContext.Provider value={data} >
      { children }
    </OrdersContext.Provider>
  )
}
export const useOrders = () => useContext(OrdersContext)
export default Provider

