import { createContext, useContext, useReducer } from "react";
import Current from "../libraries/models/Current";
import Orders from "../libraries/models/Orders";
import ordersEntryReducer from '../reducer/ordersEntryReducer'
import {Modal} from 'flowbite';

const OrdersEntryContext = createContext();

const Provider = ({children}) => {

  //b State and Ref Management ----------------------------------------
  const [state, dispatch] = useReducer(ordersEntryReducer, {
    all_orders : [],
    all_currents : [],
    show_orders_modal : {},
    show_orders_details : [],
    table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ KAYNAĞI", "FATURA DURUMU", "SİPARİŞ TARİHİ", "TESLİM TARİHİ", "TOPLAM TUTAR"],
    show_table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
  })

  //b Functions -------------------------------------------------------
  //- Main Table Funcs
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

  const showOrderDetails = async (id) => {
    let dt = [];

    for (let o of state.all_orders) {
      if (o.id === id) dt = o.items
    }

    let show_orders_modal = showShowOrdersModal();
    show_orders_modal.show();
    
    dispatch({
      type: 'SHOW_ORDERS_DETAILS',
      value: dt
    })
    
  }

  const getOrderDetails = async (id) => {

  }

  const removeOrder = async (id) => {

  }

  //- Modal Funcs
  const showShowOrdersModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("showOrdersModal");
    const modal = new Modal(el, options);

    dispatch({        //. Set current modal object
      type: 'SHOW_ORDERS_MODAL',
      value: modal
    })

    return modal;
  }

  const hideShowOrdersModal = () => {
    state.show_orders_modal.hide();
    // clearCurrentEditInputs();

    dispatch({
      type: 'SHOW_ORDERS_DETAILS',
      value: {}
    })
  }


  const orders_entry = {

    //, Refs

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    getOrderDetails,
    hideShowOrdersModal,
    removeOrder,
    showCurrents,
    showOrderDetails,
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
