import { createContext, useContext, useReducer, useRef } from "react"
import Current from "../libraries/models/Current";
import Stock from "../libraries/models/Stock";
import ordersReducer from '../reducer/ordersReducer'
import {Modal} from 'flowbite';
import Orders from "../libraries/models/Orders";
import { useReactToPrint } from "react-to-print";
import { useMain } from "./MainContext";

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
    print_pdf_modal: {},
    print_pdf_rows: {
      subtotal: 0,
      tax: 0,
      total:0,
      list:[],
      head_info: {
        current_name: "",
        phone: "",
        date: "",
        delivery_date: "",
        id: "",
      }
    },
    chosen_stock_units: [],
    chosen_stock_edit_units: [],
    product_list: [],
    edit_product_modal: false,
    invoiced: true,
    product_details: {},
    table_total: "0",
    date: {
      current: "",
      early: "",
    },
    table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
  });

  const ordersCurSearchInputRef = useRef("");
  const ordersSourceRef = useRef("");
  const ordersInvoicedRef = useRef("");
  const ordersGTEDateRef = useRef("");
  const ordersLTEDateRef = useRef("");

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

  const componentRef = useRef();

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
  
  const printPDF = () => {
    let pdf_modal = showPrintPDFModal();
    pdf_modal.show();
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Sipariş',
    
    onAfterPrint: () => {
      dispatch({
        type: 'PRINT_PDF_ROWS',
        value: {
          subtotal: 0,
          tax: 0,
          total: 0,
          list:[],
          head_info: {
            current_name: "",
            phone: "",
            date: "",
            delivery_date: "",
            id: "",
          }
        }
      })

      hidePrintPDFModal();
    }
  });

  //- Current Autocomplete
  const getAllCurrents = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
      orderBy: {id: "desc"}
    }

    let currents = await Current.showCurrent(query);

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
    
    if(state.toggle_filtered_current_table !== true) {
      dispatch({
        type: 'TOGGLE_FILTERED_CURRENT_TABLE',
        value: true
      })
    }

    const searchWord = e.target.value.toLocaleUpperCase('TR');
    const newFilter = state.all_currents.filter((source) => {
      var condition = false;

      if (source.details.name !== undefined) {
        condition =
          (source.details.id).toString().toLocaleUpperCase('TR').includes(searchWord) ||
          source.details.name.toLocaleUpperCase('TR').includes(searchWord);
      } 
      // else {
      //   condition = source.id.toLocaleUpperCase('TR').includes(searchWord);
      // }
      
      return condition;
    });

    dispatch({
      type: 'FILTERED_CURRENTS',
      value: newFilter
    })

  }

  const chooseFilteredCurrent = async (id) => {
    
    let cr = await Current.getCurrent(id);

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
      // ordersCurIDRef.current.innerHTML = details.details.id
      // ordersCurNameRef.current.innerHTML = details.details.name
      // ordersCurAddressRef.current.innerHTML = details.details.address
      // ordersCurTaxOfficeNoRef.current.innerHTML = details.details.tax_office + " - " +  details.details.tax_no
      // ordersCurPhoneIRef.current.innerHTML = details.details.phone
      // ordersCurPhoneIIRef.current.innerHTML = details.details.phone_2
      // ordersCurMailRef.current.innerHTML =  details.details.mail
      //f If they are empty " - " if they dont empty values
      details.details.id === null || details.details.id === undefined ? ordersCurIDRef.current.innerHTML = "-" :  ordersCurIDRef.current.innerHTML = details.details.id
      details.details.name === null || details.details.name === undefined ? ordersCurNameRef.current.innerHTML = "-" :  ordersCurNameRef.current.innerHTML = details.details.name
      details.details.address === null || details.details.address === undefined  ? ordersCurAddressRef.current.innerHTML = "-" :  ordersCurAddressRef.current.innerHTML = details.details.address
      
      let tax_office = "";
      let tax_no = "";
      if (details.details.tax_office !== null && details.details.tax_office !== undefined) tax_office = details.details.tax_office
      if (details.details.tax_no !== null && details.details.tax_no !== undefined) tax_no = details.details.tax_no
      ordersCurTaxOfficeNoRef.current.innerHTML = tax_office + " - " + tax_no

      details.details.phone === null || details.details.phone === undefined ? ordersCurPhoneIRef.current.innerHTML = "-" :  ordersCurPhoneIRef.current.innerHTML = details.details.phone
      details.details.phone_2 === null || details.details.phone_2 === undefined ? ordersCurPhoneIIRef.current.innerHTML = "-" :  ordersCurPhoneIIRef.current.innerHTML = details.details.phone_2
      details.details.mail === null || details.details.mail === undefined ? ordersCurMailRef.current.innerHTML = "-" :  ordersCurMailRef.current.innerHTML =  details.details.mail
      
      if (details.details.province === "default" || details.details.province === null || details.details.province === undefined) {
        details.details.province = ""
      }
      if (details.details.district === "default" || details.details.district === null || details.details.district === undefined) {
        details.details.district = ""
      }

      ordersCurProvDistRef.current.innerHTML = details.details.province + " - " +  details.details.district
    }
  }

  const clearCurrentDetails = () => {
    ordersCurSearchInputRef.current.value = "";
    ordersSourceRef.current.value = "";
    ordersInvoicedRef.current.value = "Faturalı";
    ordersGTEDateRef.current.value = state.date.current
    ordersLTEDateRef.current.value = state.date.current

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

  //- Stock Autocomplete
  const getAllStocks = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
      orderBy: {id: "desc"}
    }

    let stock = await Stock.showStock(query);

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
    
    if(state.toggle_filtered_stock_table !== true) {
      dispatch({
        type: 'TOGGLE_FILTERED_STOCK_TABLE',
        value: true
      })
    }

    const searchWord = e.target.value.toLocaleUpperCase('TR');
    const newFilter = state.all_stocks.filter((source) => {
      var condition = false;

      if (source.details.name !== undefined) {
        condition =
          (source.details.id).toString().toLocaleUpperCase('TR').includes(searchWord) ||
          (source.details.name).toLocaleUpperCase('TR').includes(searchWord)
          // (source.details.material).toLocaleUpperCase('TR').includes(searchWord) ||
          // (source.details.product_group).toLocaleUpperCase('TR').includes(searchWord);
      } 
      // else {
      //   condition = source.id.toLocaleUpperCase('TR').includes(searchWord);
      // }

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
    let new_product_list = [...state.product_list];               //. Get product list
                
    for (let p in new_product_list) {                             //. Every time a product is added rearrange row numbers
      new_product_list[p].row = parseInt(p) + 1      
    }

    let tax_rate = ((ordersTaxRateRef.current.value).replace("%", "") / 100);

    let amount_sum = ((parseFloat(ordersAmountRef.current.value)) * (parseFloat(ordersPriceRef.current.value)));
    let tax_sum = (parseFloat(amount_sum) * parseFloat(tax_rate));
    let total = parseFloat(amount_sum + tax_sum).toFixed(2)

    let new_product = {                                           //. Create new product
      row: (new_product_list.length + 1),                         //. Row number one more than list length
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

    new_product_list.push(new_product);                           //. Rearrange new product list

    dispatch({
      type: 'PRODUCT_LIST',
      value: new_product_list,
    })

    let table_total = 0;
    let subtotal = 0;
    let tax = 0;
    for (let p of new_product_list) {
      table_total = table_total + parseFloat(p.total)
      subtotal = subtotal + parseFloat(p.amount_sum)
      tax = tax + parseFloat(p.tax_sum)
    }

    let rows = {
      ...state.print_pdf_rows,
      list: new_product_list,
      subtotal: subtotal,
      tax: tax,
      total: table_total,
    }

    dispatch({
      type: 'PRINT_PDF_ROWS',
      value: rows
    })

    dispatch({
      type: 'TABLE_TOTAL',
      value: table_total,
    })

    clearProductInputs();
  }

  const clearProductInputs = () => {
    ordersNameRef.current.value = ""
    ordersUnitRef.current.value = "default"
    ordersAmountRef.current.value = ""
    ordersPriceRef.current.value = ""
    ordersTaxRateRef.current.value = "%0"
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

    let table_total = 0;
    let subtotal = 0;
    let tax = 0;
    for (let p of state.product_list) {               //. Update total cost
      table_total = table_total + parseFloat(p.total)
      subtotal = subtotal + parseFloat(p.amount_sum)
      tax = tax + parseFloat(p.tax_sum)
    }

    let rows = {
      ...state.print_pdf_rows,
      list: list,
      subtotal: subtotal,
      tax: tax,
      total: table_total,
    }
    
    dispatch({
      type: 'PRINT_PDF_ROWS',
      value: rows
    })

    dispatch({
      type: 'TABLE_TOTAL',
      value: table_total,
    })
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

    for (let s of state.all_stocks) {
      if (s.details.id === dt.stock_id) {
        
        dispatch({
          type: 'CHOSEN_STOCK_EDIT_UNITS',
          value: [s.details.unit, s.details.unit_2]
        })

      }
    }
    
    ordersNameEditRef.current.innerHTML = dt.stock_id + "-" + dt.stock_name
    ordersUnitEditRef.current.value = dt.unit
    ordersAmountEditRef.current.value = dt.amount
    ordersPriceEditRef.current.value = dt.price
    ordersTaxRateEditRef.current.value = "%" + (dt.tax_rate * 100)
    ordersDescriptionEditRef.current.value = dt.description

  }
  
  const editProduct = async (row) => {
    let details = {};

    for (let p of state.product_list) {
      if (p.row === row) {
        details = p
      }
    }

    let tax_rate = ((ordersTaxRateEditRef.current.value).replace("%", "") / 100);
    let amount_sum = ((parseFloat(ordersAmountEditRef.current.value)) * (parseFloat(ordersPriceEditRef.current.value)));
    let tax_sum = (parseFloat(amount_sum) * parseFloat(tax_rate));
    let total = parseFloat(amount_sum + tax_sum)

    details["unit"] = ordersUnitEditRef.current.value
    details["amount"] = parseFloat(ordersAmountEditRef.current.value)
    details["price"] = parseFloat(ordersPriceEditRef.current.value)
    details["tax_rate"] = tax_rate
    details["description"] = ordersDescriptionEditRef.current.value

    details["amount_sum"] = amount_sum
    details["tax_sum"] = tax_sum
    details["total"] = total
    
    let table_total = 0;
    let subtotal = 0;
    let tax = 0;           
    for (let p of state.product_list) {               //. Update total cost
      table_total = table_total + parseFloat(p.total)
      subtotal = subtotal + parseFloat(p.amount_sum)
      tax = tax + parseFloat(p.tax_sum)
    }

    let rows = {
      ...state.print_pdf_rows,
      list: state.product_list,
      subtotal: subtotal,
      tax: tax,
      total: table_total,
    }
    
    dispatch({
      type: 'PRINT_PDF_ROWS',
      value: rows
    })

    dispatch({
      type: 'TABLE_TOTAL',
      value: table_total,
    })

    hideProductModal();
  }

  const invoicedCheck = (value) => {
    let list = [...state.print_pdf_rows.list]

    if (value === "Faturasız") {
      dispatch({
        type: 'INVOICED',
        value: false
      })

      ordersTaxRateRef.current.value = "%0"

      let total = 0;
      if(list.length > 0) {
        for (let l of list) {
          l.tax_rate = 0;
          l.tax_sum = 0;
          l.amount_sum = (l.amount * l.price)
          l.total = (l.amount * l.price)
          total = total + l.total
        }
        state.print_pdf_rows.total = total;
        state.table_total = total;
      }
    }
    else {
      dispatch({
        type: 'INVOICED',
        value: true
      }) 
    }
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
    state.edit_product_modal.hide();
    clearProductEditInputs();

    dispatch({
      type: 'EDIT_PRODUCT_MODAL',
      value: {}
    })
  }

  const showPrintPDFModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("printPDFModal");
    const modal = new Modal(el, options);

    dispatch({
      type: 'PRINT_PDF_MODAL',
      value: modal
    })

    return modal;    
  }
  
  const hidePrintPDFModal = () => {
    state.print_pdf_modal.hide();

  }
  
  const clearProductEditInputs = () => {
    ordersNameEditRef.current.innerHTML = "";
    ordersUnitEditRef.current.value = "default";
    ordersAmountEditRef.current.value = "";
    ordersPriceEditRef.current.value = "";
    ordersTaxRateEditRef.current.value = "default";
    ordersDescriptionEditRef.current.value = "";
    
    dispatch({
      type: 'CHOSEN_STOCK_EDIT_UNITS',
      value: []
    })
  }

  //- Order Funcs
  const createOrder = async () => {
    if(ordersInvoicedRef.current.value === "Faturalı") { var invoiced = true }
    else if(ordersInvoicedRef.current.value === "Faturasız") { var invoiced = false }

    let items = [];
    let total_fee = 0;
    let tax_rate = 0;

    for (let p of state.product_list) {
      if (invoiced === true) { tax_rate = p.tax_rate }

      let js = {
        amount : p.amount,
        description : p.description,
        price : p.price,
        row : p.row,
        stock_id : p.stock_id,
        tax_rate : tax_rate,
        unit : p.unit,
      }
      total_fee = (total_fee + Number(p.total))
      items.push(js)
    }

    let data = {
      current_id: state.chosen_current.id,
      date: ordersGTEDateRef.current.value + "T00:00:00.000Z",
      delivery_date: ordersLTEDateRef.current.value + "T00:00:00.000Z",
      order_source: ordersSourceRef.current.value,
      invoiced: invoiced,
      printed: false,
      total_fee: Number(total_fee),
      code_1: state.chosen_current.details.code_1,
      code_2: state.chosen_current.details.code_2,
      code_3: state.chosen_current.details.code_3,
      code_4: state.chosen_current.details.code_4,
      items: items
    }

    let create = await Orders.createOrder(data)
  
    let rows = {
      ...state.print_pdf_rows,
      head_info : {
        current_name: state.chosen_current.details.name,
        phone: state.chosen_current.details.phone,
        date: ordersGTEDateRef.current.value,
        delivery_date: ordersLTEDateRef.current.value,
        id: create.id,
      }
    }

    dispatch({
      type: 'PRINT_PDF_ROWS',
      value: rows
    })

    printPDF(),
    clearOrder();
  }

  const clearOrder = () => {

    dispatch({
      type: 'PRODUCT_LIST',
      value: []
    })
    
    dispatch({
      type: 'TABLE_TOTAL',
      value: "0",
    })

    clearProductInputs();
    clearCurrentDetails();
  }

  const orders = {
    //- Refs
    ordersCurSearchInputRef,
    ordersSourceRef,
    ordersInvoicedRef,
    ordersGTEDateRef,
    ordersLTEDateRef,

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

    ordersNameEditRef,
    ordersUnitEditRef,
    ordersAmountEditRef,
    ordersPriceEditRef,
    ordersTaxRateEditRef,
    ordersDescriptionEditRef,

    componentRef,

    //- States, Variables etc.
    ...state,
    dispatch,

    //- Functions
    addProduct,
    chooseFilteredCurrent,
    chooseFilteredStock,
    clearProductEditInputs,
    clearOrder,
    createOrder,
    editProduct,
    filterCurrents,
    filterStocks,
    getAllCurrents,
    getAllStocks,
    getDate,
    getProductDetails,
    handlePrint,
    hidePrintPDFModal,
    hideProductModal,
    invoicedCheck,
    removeProduct,
    toggleFilteredCurrentTable,
    toggleFilteredStockTable,

  }

  return (
    <OrdersContext.Provider value={orders} >
      { children }
    </OrdersContext.Provider>
  )
}
export const useOrders = () => useContext(OrdersContext)
export default Provider

