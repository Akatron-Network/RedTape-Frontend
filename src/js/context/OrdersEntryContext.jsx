import { createContext, useContext, useReducer } from "react";
import Current from "../libraries/models/Current";
import Orders from "../libraries/models/Orders";
import ordersEntryReducer from '../reducer/ordersEntryReducer'

const OrdersEntryContext = createContext();

const Provider = ({children}) => {

  //b State and Ref Management ----------------------------------------
  const [state, dispatch] = useReducer(ordersEntryReducer, {
    all_orders : [],
    all_currents : [],
    table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ KAYNAĞI", "FATURA DURUMU", "SİPARİŞ TARİHİ", "TESLİM TARİHİ", "TOPLAM TUTAR"]
  })

  //b Functions -------------------------------------------------------
  const showCurrents = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
    }

    let resp = await Current.showCurrent(query)
    console.log(resp)

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
    console.log(resp);

    dispatch({
      type: "ALL_ORDERS",
      value: resp
    })
  }

  const orders_entry = {

    //, Refs

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    showCurrents,
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
