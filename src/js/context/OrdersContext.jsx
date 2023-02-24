import { createContext, useContext, useReducer, useRef } from "react"
import Current from "../libraries/models/Current";
import Stock from "../libraries/models/Stock";
import ordersReducer from '../reducer/ordersReducer'
import {Modal} from 'flowbite';

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
    product_list: [],
    edit_product_modal: false,
    product_details: {},
    date: {
      current: "",
      early: "",
    },
    table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
    // table_rows: ["row", "product_name", "material", "product_group", "unit", "amount", "price", "amount_sum", "tax_rate", "tax_sum", "total", "description"],
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

  const ordersNameEditRef = useRef("");
  const ordersUnitEditRef = useRef("");
  const ordersAmountEditRef = useRef("");
  const ordersPriceEditRef = useRef("");
  const ordersTaxRateEditRef = useRef("");
  const ordersDescriptionEditRef = useRef("");


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
      printStockDetails(undefined);   //. For clearing out current details inputs
    }

    const searchWord = e.target.value.toLowerCase();
    const newFilter = state.all_stocks.filter((source) => {
      var condition = false;

      if (source.details.name !== undefined) {
        condition =
          (source.details.id).toString().toLowerCase().includes(searchWord) ||
          (source.details.name).toLowerCase().includes(searchWord) ||
          (source.details.material).toLowerCase().includes(searchWord) ||
          (source.details.product_group).toLowerCase().includes(searchWord);
      } 
      else {
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
    if(details === undefined) {
    
      dispatch({
        type: 'CHOSEN_STOCK_UNITS',
        value: []
      })
    }
    else {
      dispatch({
        type: 'CHOSEN_STOCK_UNITS',
        value: [details.details.unit, details.details.unit_2]
      })      
    }
  }

  //- Products
  const addProduct = () => {
    let new_product_list = [...state.product_list]; //. Get product list

    for (let p in new_product_list) {               //. Every time a product is added rearrange row numbers
      new_product_list[p].row = parseInt(p) + 1      
    }

    let tax_rate = ((ordersTaxRateRef.current.value).replace("%", "") / 100);
    let amount_sum = ((parseFloat(ordersAmountRef.current.value)) * (parseFloat(ordersPriceRef.current.value)));
    let tax_sum = ((amount_sum) * parseFloat(tax_rate));
    let total = amount_sum + tax_sum

    let new_product = {                             //. Create new product
      row: (new_product_list.length + 1),           //. Row number one more than list length
      stock_id: state.chosen_stock.details.id,
      unit: ordersUnitRef.current.value,                          //. Birim
      amount: parseFloat(ordersAmountRef.current.value),          //. Miktar
      price: parseFloat(ordersPriceRef.current.value),            //. Birim Fiyat
      tax_rate: parseFloat(tax_rate),                             //. Kdv Oranı
      description: ordersDescriptionRef.current.value,            //. Açıklama

      stock_name: state.chosen_stock.details.name,                //. Ürün Ad (Çıkartılacak)
      material: state.chosen_stock.details.material,              //. Malzeme (Çıkartılacak)
      product_group: state.chosen_stock.details.product_group,    //. Ürün grubu (Çıkartılacak)
      amount_sum: amount_sum,                                     //. Tutar (Çıkartılacak)
      tax_sum: tax_sum,                                           //. KDV Tutar (Çıkartılacak)
      total: total,                                               //. Toplam Tutar (Çıkartılacak)
    }

    new_product_list.push(new_product);             //. Rearrange new product list

    dispatch({
      type: 'PRODUCT_LIST',
      value: new_product_list,
    })

    clearProductInputs();
  }

  const clearProductInputs = () => {
    ordersNameRef.current.value = ""
    ordersUnitRef.current.value = "default"
    ordersAmountRef.current.value = ""
    ordersPriceRef.current.value = ""
    ordersTaxRateRef.current.value = "%8"
    ordersDescriptionRef.current.value = ""

    dispatch({
      type: 'CHOSEN_STOCK',
      value: {},
    })
  }

  const removeProduct = (row) => {
    let list = state.product_list; //. Get product list
    
    for (let p in list) {
      if (list[p].row === row) {
        list.splice(p,1)
      }
    }
      
    for (let p in state.product_list) {               //. Every time a product is added rearrange row numbers
      state.product_list[p].row = parseInt(p) + 1      
    }

    // dispatch({
    //   type: 'PRODUCT_LIST',
    //   value: new_list,
    // })
  }

  const getProductDetails = async (id) => {
    let stock_modal = showProductModal();
    stock_modal.show();
    
    let list = state.product_list; //. Get product list
    
    for (let p in list) {
      if (list[p].row === id) {
        var dt = list[p]
      }
    }
    
    dispatch({        //. Set stock details
      type: 'PRODUCT_DETAILS',
      value: dt
    })
    
    ordersNameEditRef.current.value = dt
    ordersUnitEditRef.current.value = dt
    ordersAmountEditRef.current.value = dt
    ordersPriceEditRef.current.value = dt
    ordersTaxRateEditRef.current.value = dt
    ordersDescriptionEditRef.current.value = dt

  }
  
  const editStock = async (id) => {
    // let details = new Stock(id)
    // console.log(details);

    // let changes = {
    //    name: stockNameEditRef.current.value,
    // }

    // let st = await details.editStock(changes)
    // console.log(st);

    // if (st.Success) hideStockModal();
  }

  //- Modal Funcs
  const showProductModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("editProductModal");
    const modal = new Modal(el, options);

    dispatch({        //. Set current modal object
      type: 'EDIT_PRODUCT_MODAL',
      value: modal
    })

    return modal;    
  }

  const hideProductModal = () => {
    state.edit_stock_modal.hide();
    clearStockEditInputs();

    dispatch({        //. Set current modal object
      type: 'EDIT_STOCK_MODAL',
      value: {}
    })
  }

  const clearProductEditInputs = () => {
    stockNameEditRef.current.value = ""
    stockMaterialEditRef.current.value = ""
    stockProductGroupEditRef.current.value = ""
    stockUnitIEditRef.current.value = ""
    stockUnitIIEditRef.current.value = ""
    stockConversionRateEditRef.current.value = "0"
    stockBuyPriceEditRef.current.value = "0"
    stockSellPriceEditRef.current.value = "0"
    stockCodeIEditRef.current.value = ""
    stockCodeIIEditRef.current.value = ""
    stockCodeIIIEditRef.current.value = ""
    stockCodeIVEditRef.current.value = ""
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
    addProduct,
    chooseFilteredCurrent,
    chooseFilteredStock,
    filterCurrents,
    filterStocks,
    getAllCurrents,
    getAllStocks,
    getDate,
    getProductDetails,
    removeProduct, 
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

