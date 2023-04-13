import { createContext, useContext, useReducer, useRef, useEffect } from "react";
import Current from "../libraries/models/Current";
import Stock from "../libraries/models/Stock";
import Orders from "../libraries/models/Orders";
import ordersEntryReducer from '../reducer/ordersEntryReducer'
import {Modal} from 'flowbite';
import { useReactToPrint } from "react-to-print";
import { useMain } from "./MainContext";
import CurrencyFormat from "../libraries/tools/CurrencyFormat";

const OrdersEntryContext = createContext();

const Provider = ({children}) => {

  //b State and Ref Management ----------------------------------------
  const [state, dispatch] = useReducer(ordersEntryReducer, {
    all_orders: [],
    all_currents: [],
    all_stocks: [],
    get_order_details: {},
    get_order_items: [],
    get_order_modal: {},
    entry_product_details: {},
    add_entry_order_product_modal: {},
    entry_product_modal: {},
    entry_product_units: [],
    filtered_stocks: [],
    filtered_orders: [],
    invoiced: false,
    chosen_stock: {},
    chosen_stock_units: [],
    toggle_filtered_stock_table: false,
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
    table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ KAYNAĞI", "FATURA DURUMU", "SİPARİŞ TARİHİ", "TESLİM TARİHİ", "TOPLAM TUTAR"],
    show_table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
  })

  const ordersEntryCurrentNameEditRef = useRef("")
  const ordersEntryOrderSourceEditRef = useRef("")
  const ordersEntryInvoicedEditRef = useRef("")
  const ordersEntryDateEditRef = useRef("")
  const ordersEntryDeliveryDateEditRef = useRef("")

  const entryProductNameEditRef = useRef("")
  const entryProductUnitEditRef = useRef("")
  const entryProductAmountEditRef = useRef("")
  const entryProductPriceEditRef = useRef("")
  const entryProductTaxRateEditRef = useRef("")
  const entryProductDescriptionEditRef = useRef("")

  const addOrderEntryProductUnitEditRef = useRef("")
  const addOrderEntryProductAmountEditRef = useRef("")
  const addOrderEntryProductPriceEditRef = useRef("")
  const addOrderEntryProductTaxRateEditRef = useRef("")
  const addOrderEntryProductDescriptionEditRef = useRef("")

  const addOrdersEntryProductSearchInputRef = useRef("")

  const componentRef = useRef(null)

  //b Functions -------------------------------------------------------
  const printPDF = (order) => {
    let head_info = {};
    for(let c of state.all_currents) {
      if (order.details.current_id === c.id) {
        head_info = {
          current_name: c.details.name,
          phone: c.details.phone,
          date: order.details.date.split("T")[0],
          delivery_date: order.details.delivery_date.split("T")[0],
          id: order.id
        }
      }
    }

    let subtotal = 0;
    let tax = 0;
    for (let i of order.details.items) {
      subtotal = subtotal + (i.amount * i.price)
      tax = tax + ((i.amount * i.price) * i.tax_rate)
    }
    
    let rows = {
      list: order.items,
      subtotal: subtotal,
      tax: tax,
      total: order.details.total_fee,
      head_info:head_info
    }

    dispatch({
      type: 'PRINT_PDF_ROWS',
      value: rows
    })
  }

  useEffect(() => {             //. Before set print_pdf_rows
    if (state.print_pdf_rows.head_info.current_name !== "") {
      handlePrint();
    }
  }, [state.print_pdf_rows])
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Sipariş',
  });

  //- Main Table Funcs
  const showStocks = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
      orderBy: {id: "desc"}
    }

    let resp = await Stock.showStock(query)

    dispatch({
      type: "ALL_STOCKS",
      value: resp
    })
    
    dispatch({
      type: 'FILTERED_STOCKS',
      value: resp
    })
  }

  const showCurrents = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
      orderBy: {id: "desc"}
    }

    let resp = await Current.showCurrent(query)

    dispatch({
      type: "ALL_CURRENTS",
      value: resp
    })
  }
  
  const showOrders = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
      orderBy: {id: "desc"}
    }

    let resp = await Orders.showOrders(query);

    dispatch({
      type: "ALL_ORDERS",
      value: resp
    })

    dispatch({
      type: 'FILTERED_ORDERS',
      value: resp
    })
  }

  const removeOrder = async (id) => {
    let remove = await Orders.removeOrder(id);

    await showOrders();
  }

  //- Edit Orders
  const getOrderDetails = async (id) => {
    let dt = [];

    for (let o of state.all_orders) {
      if (o.id === id) dt = o
    }

    dispatch({
      type: 'GET_ORDER_ITEMS',
      value: dt.items
    })

    dispatch({
      type: 'GET_ORDER_DETAILS',
      value: dt
    })

    

    for (let c of state.all_currents) {
      if (c.id === dt.details.current_id) var cur_name = c.details.id + " / " + c.details.name
    }

    let invoiced = "Faturalı";
    if (dt.details.invoiced === false) {
      invoiced = "Faturasız"
    }

    invoicedCheck(invoiced)

    let date = dt.details.date.split("T")[0]
    let delivery_date = dt.details.delivery_date.split("T")[0]

    ordersEntryCurrentNameEditRef.current.innerHTML = cur_name
    ordersEntryOrderSourceEditRef.current.value = dt.details.order_source
    ordersEntryInvoicedEditRef.current.value = invoiced
    ordersEntryDateEditRef.current.value = date
    ordersEntryDeliveryDateEditRef.current.value = delivery_date

    let show_get_order_details_modal = showModal("showOrdersEntryModal", "GET_ORDER_MODAL");
    show_get_order_details_modal.show();
  }

  const getProductDetails = async (id) => {
    let dt = [];

    for (let o of state.get_order_items) {
      if (o.id === id) dt = o
    }

    dispatch({
      type: 'ENTRY_PRODUCT_DETAILS',
      value: dt
    })

    for (let s of state.all_stocks) {
      if (dt.stock_id === s.id) {
        var units = [s.details.unit, s.details.unit_2]
        var name = s.details.id  + " / " + s.details.name
      }
    }

    dispatch({
      type: 'ENTRY_PRODUCT_UNITS',
      value: units
    })

    let tax_rate = "%0"
    if (dt.tax_rate === 0.18) tax_rate = "%18"
    else if (dt.tax_rate === 0.8) tax_rate = "%8"

    entryProductNameEditRef.current.innerHTML = name
    entryProductUnitEditRef.current.value = dt.unit
    entryProductAmountEditRef.current.value = dt.amount
    entryProductPriceEditRef.current.value = dt.price
    entryProductTaxRateEditRef.current.value = tax_rate
    entryProductDescriptionEditRef.current.value = dt.description
    
    let entry_product_modal = showModal("editOrdersEntryProductModal", "ENTRY_PRODUCT_MODAL");
    entry_product_modal.show();
  }

  const editOrdersEntry = async (dt) => {
    let invoiced = true;
    if (ordersEntryInvoicedEditRef.current.value === "Faturasız") invoiced = false;

    let details = {
      date: ordersEntryDateEditRef.current.value + "T00:00:00.000Z",
      delivery_date: ordersEntryDeliveryDateEditRef.current.value + "T00:00:00.000Z",
      order_source: ordersEntryOrderSourceEditRef.current.value,
      invoiced: invoiced,
      items: state.get_order_items
    }

    let o = await Orders.getOrder(dt.id)

    let edit = await o.editOrder(details);

    if(edit.Success) {
      hideGetOrderDetailsModal()
      showOrders();
    }
  }

  const editEntryProduct = async (dt) => {
    let items = [...state.get_order_items]

    for (let ind in items) {
      let i = items[ind]
      if (dt.id === i.id) {
        items[ind] = {
          ...i,
          unit : entryProductUnitEditRef.current.value,
          amount: Number(entryProductAmountEditRef.current.value),
          price: Number(entryProductPriceEditRef.current.value),
          tax_rate: ((entryProductTaxRateEditRef.current.value).replace("%", "") / 100),
          description: entryProductDescriptionEditRef.current.value
        }
      }
    }

    dispatch({
      type: "GET_ORDER_ITEMS",
      value: items
    })

    hideEntryProductDetailsModal();
  }

  const removeProduct = async (id) => {
    let items = [...state.get_order_items]

    for (let ind in items) {
      let i = items[ind]
      if (id === i.id) {
        items.splice(i,1)
      }
    }
    
    for (let p in items) {                          //. Every time a product is added rearrange row numbers
      items[p].row = parseInt(p) + 1      
    }

    dispatch({
      type: 'GET_ORDER_ITEMS',
      value: items,
    })

  }

  const addOrderEntryProduct = () => {
    let items = [...state.get_order_items]                                          //. Get product list    

    for (let p in items) {                                                          //. Every time a product is added rearrange row numbers
      items[p].row = parseInt(p) + 1 
    }

    let tax_rate = 0;
    if(state.invoiced) ((addOrderEntryProductTaxRateEditRef.current.value).replace("%", "") / 100)
    let amount_sum = ((parseFloat(addOrderEntryProductAmountEditRef.current.value)) * (parseFloat(addOrderEntryProductPriceEditRef.current.value)));
    let tax_sum = (parseFloat(amount_sum) * parseFloat(tax_rate));
    let total = parseFloat(amount_sum + tax_sum).toFixed(2)

    let new_product = {                                                             //. Create new product
      row: (items.length + 1),                                                      //. Row number one more than list length
      stock_id: state.chosen_stock.details.id,
      unit: addOrderEntryProductUnitEditRef.current.value,                          //. Birim
      amount: parseFloat(addOrderEntryProductAmountEditRef.current.value),          //. Miktar
      price: parseFloat(addOrderEntryProductPriceEditRef.current.value),            //. Birim Fiyat
      tax_rate: parseFloat(tax_rate),                                               //. Kdv Oranı
      description: addOrderEntryProductDescriptionEditRef.current.value,            //. Açıklama
    }

    items.push(new_product);                                                        //. Rearrange new product list

    dispatch({
      type: 'GET_ORDER_ITEMS',
      value: items,
    })

    hideAddEntryOrderProductModal();
  }

  const clearAddOrderEntryProduct = () => {

    dispatch({
      type: 'CHOSEN_STOCK',
      value: {}
    })

    dispatch({
      type: 'CHOSEN_STOCK_UNITS',
      value: []
    })
    addOrdersEntryProductSearchInputRef.current.value = ""

    addOrderEntryProductUnitEditRef.current.value = "default"
    addOrderEntryProductAmountEditRef.current.value = ""
    addOrderEntryProductPriceEditRef.current.value = ""
    addOrderEntryProductTaxRateEditRef.current.value = "%0"
    addOrderEntryProductDescriptionEditRef.current.value = ""
  }

  const invoicedCheck = (value) => {
    if (value === "Faturasız") {
      dispatch({
        type: 'INVOICED',
        value: false
      })

      let items = [...state.get_order_items]
      if (items.length > 0) {
    
        entryProductTaxRateEditRef.current.value = "%0";
  
        for (let ind in items) {
          let i = items[ind]
          items[ind] = {
            ...i,
            tax_rate: 0,
          }
        }
  
        dispatch({
          type: "GET_ORDER_ITEMS",
          value: items
        })

      }
    }
    else {
      dispatch({
        type: 'INVOICED',
        value: true
      }) 
    }
  }

  const totalFee = () => {
    let total_fee = 0;

    if (state.get_order_items.length > 0) {

      for (let o of state.get_order_items) {
        total_fee = total_fee + (o.amount * o.price) * (1 + o.tax_rate)
      }

    }
    
    return CurrencyFormat(total_fee);
  }

  //- Stocks Autocomplete
  const toggleFilteredStockTable = (e) => {

    if(e.target.id !== 'add_entry_order_product_button' && e.target.id !== 'add_entry_order_product_input' && e.target.id !== 'add_entry_order_product_button_icon') {
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

    const searchWord = e.target.value.toLocaleUpperCase('TR');
    const newFilter = state.all_stocks.filter((source) => {
      var condition = false;

      if (source.details.name !== undefined) {
        condition =
          (source.details.id).toString().toLocaleUpperCase('TR').includes(searchWord) ||
          (source.details.name).toLocaleUpperCase('TR').includes(searchWord) ||
          (source.details.material).toLocaleUpperCase('TR').includes(searchWord) ||
          (source.details.product_group).toLocaleUpperCase('TR').includes(searchWord);
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

    addOrdersEntryProductSearchInputRef.current.value = st.details.id + " - " + st.details.name

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

  //- Modal Funcs
  const showModal = (id, type) => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById(id);
    const modal = new Modal(el, options);

    dispatch({
      type: type,
      value: modal
    })

    return modal;
  }

  const showAddEntryOrderProductModal = () => {
    let add_entry_order_product_modal = showModal("addOrderEntryProductModal", "ADD_ENTRY_ORDER_PRODUCT_MODAL");
    add_entry_order_product_modal.show();
  }

  const hideGetOrderDetailsModal = () => {
    state.get_order_modal.hide();

    dispatch({
      type: 'GET_ORDER_ITEMS',
      value: []
    })

    dispatch({
      type: 'GET_ORDER_DETAILS',
      value: {}
    })

    dispatch({
      type: 'GET_ORDER_MODAL',
      value: {}
    })
  }

  const hideEntryProductDetailsModal = () => {
    state.entry_product_modal.hide();

    dispatch({
      type: 'ENTRY_PRODUCT_DETAILS',
      value: []
    })

    dispatch({
      type: 'ENTRY_PRODUCT_MODAL',
      value: {}
    })
  }

  const hideAddEntryOrderProductModal = () => {
    state.add_entry_order_product_modal.hide();
    clearAddOrderEntryProduct();
  }

  //- Table Search Funcs
  const filterOrders = async (event) => {
    const searchWord = event.target.value.toLocaleUpperCase('TR');

    const newFilter = state.all_orders.filter((source) => {
      var condition = false;

      for (let c of state.all_currents) {
        if (c.details.name.toString().toLocaleUpperCase('TR').includes(searchWord)) {
          if (source.details.current_id === c.id) {
            condition = true
          }
        }
      }

      return condition;
    });
    
    dispatch({
      type: 'FILTERED_ORDERS',
      value: newFilter
    })
  }

  const orders_entry = {

    //, Refs
    ordersEntryCurrentNameEditRef,
    ordersEntryOrderSourceEditRef,
    ordersEntryInvoicedEditRef,
    ordersEntryDateEditRef,
    ordersEntryDeliveryDateEditRef,

    entryProductNameEditRef,
    entryProductUnitEditRef,
    entryProductAmountEditRef,
    entryProductPriceEditRef,
    entryProductTaxRateEditRef,
    entryProductDescriptionEditRef,

    addOrderEntryProductUnitEditRef,
    addOrderEntryProductAmountEditRef,
    addOrderEntryProductPriceEditRef,
    addOrderEntryProductTaxRateEditRef,
    addOrderEntryProductDescriptionEditRef,

    addOrdersEntryProductSearchInputRef,

    componentRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    addOrderEntryProduct,
    chooseFilteredStock,
    editEntryProduct,
    editOrdersEntry,
    filterStocks,
    filterOrders,
    getOrderDetails,
    getProductDetails,
    hideAddEntryOrderProductModal,
    hideEntryProductDetailsModal,
    hideGetOrderDetailsModal,
    invoicedCheck,
    printPDF,
    removeOrder,
    removeProduct,
    showAddEntryOrderProductModal,
    showCurrents,
    showStocks,
    showOrders,
    toggleFilteredStockTable,
    totalFee,
  }
  
  return (
    <OrdersEntryContext.Provider value={orders_entry}>
      {children}
    </OrdersEntryContext.Provider>
  )
}

export const useOrdersEntry = () => useContext(OrdersEntryContext)
export default Provider
