import { createContext, useContext, useReducer, useRef } from "react";
import Current from "../libraries/models/Current";
import Stock from "../libraries/models/Stock";
import Orders from "../libraries/models/Orders";
import ordersEntryReducer from '../reducer/ordersEntryReducer'
import {Modal} from 'flowbite';

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
    entry_product_modal: {},
    entry_product_units: [],
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

  //b Functions -------------------------------------------------------
  //- Main Table Funcs
  const showStocks = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
    }

    let resp = await Stock.showStock(query)

    dispatch({
      type: "ALL_STOCKS",
      value: resp
    })
  }

  const showCurrents = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
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
    }

    let resp = await Orders.showOrders(query);

    dispatch({
      type: "ALL_ORDERS",
      value: resp
    })
  }

  const removeOrder = async (id) => {
    let remove = await Orders.removeOrder(id);
    console.log(remove);

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

    let date = dt.details.date.split("T")[0]
    let delivery_date = dt.details.delivery_date.split("T")[0]

    ordersEntryCurrentNameEditRef.current.innerHTML = cur_name
    ordersEntryOrderSourceEditRef.current.value = dt.details.order_source
    ordersEntryInvoicedEditRef.current.value = invoiced
    ordersEntryDateEditRef.current.value = date
    ordersEntryDeliveryDateEditRef.current.value = delivery_date

    let show_get_order_details_modal = showGetOrderDetailsModal();
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

    let tax_rate = "%8"
    if (dt.tax_rate === 0.18) tax_rate = "%18"

    entryProductNameEditRef.current.innerHTML = name
    entryProductUnitEditRef.current.value = dt.unit
    entryProductAmountEditRef.current.value = dt.amount
    entryProductPriceEditRef.current.value = dt.price
    entryProductTaxRateEditRef.current.value = tax_rate
    entryProductDescriptionEditRef.current.value = dt.description
    
    let entry_product_modal = showEntryProductDetailsModal();
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
    console.log(edit);

    if(edit.Success) {
      hideGetOrderDetailsModal()
      showOrders();
    }

  }

  const editEntryProduct = async (id) => {

  }

  const removeProduct = async (id) => {

  }

  //- Modal Funcs
  const showGetOrderDetailsModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("showOrdersEntryModal");
    const modal = new Modal(el, options);

    dispatch({
      type: 'GET_ORDER_MODAL',
      value: modal
    })

    return modal;
  }

  const hideGetOrderDetailsModal = () => {
    state.get_order_modal.hide();
    // clearCurrentEditInputs();

    dispatch({
      type: 'GET_ORDER_DETAILS',
      value: []
    })

    dispatch({
      type: 'GET_ORDER_MODAL',
      value: {}
    })
  }

  const showEntryProductDetailsModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("editOrdersEntryProductModal");
    const modal = new Modal(el, options);

    dispatch({
      type: 'ENTRY_PRODUCT_MODAL',
      value: modal
    })

    return modal;
  }

  const hideEntryProductDetailsModal = () => {
    state.entry_product_modal.hide();
    // clearCurrentEditInputs();

    dispatch({
      type: 'ENTRY_PRODUCT_DETAILS',
      value: []
    })

    dispatch({
      type: 'ENTRY_PRODUCT_MODAL',
      value: {}
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

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    editEntryProduct,
    editOrdersEntry,
    getOrderDetails,
    getProductDetails,
    hideEntryProductDetailsModal,
    hideGetOrderDetailsModal,
    removeOrder,
    removeProduct,
    showCurrents,
    showStocks,
    showOrders,
  }
  
  return (
    <OrdersEntryContext.Provider value={orders_entry}>
      {children}
    </OrdersEntryContext.Provider>
  )
}

export const useOrdersEntry = () => useContext(OrdersEntryContext)
export default Provider
