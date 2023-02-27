import { createContext, useContext, useReducer } from "react";
import Current from "../libraries/models/Current";
import Orders from "../libraries/models/Orders";
import Table from "../libraries/tools/Table";
import ordersEntryReducer from '../reducer/ordersEntryReducer'

const OrdersEntryContext = createContext();

const Provider = ({children}) => {

  //b State and Ref Management ----------------------------------------
  const [state, dispatch] = useReducer(ordersEntryReducer, {
    all_orders : [],
    all_currents : [],
    table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ KAYNAĞI", "FATURA DURUMU", "SİPARİŞ TARİHİ", "TESLİM TARİHİ", "TOPLAM TUTAR"],
    render_orders_table: (
      <>
        <table className="w-full text-sm text-left text-pine_tree">
          <thead className="text-xs text-prussian_blue bg-steel_blue_light">
            <tr>
              <th className="py-2 px-3 font-bold text-sm">SİPARİŞ KODU</th>
              <th className="py-2 px-3 font-bold text-sm">CARİ KOD	</th>
              <th className="py-2 px-3 font-bold text-sm">CARİ İSİM</th>
              <th className="py-2 px-3 font-bold text-sm">SİPARİŞ KAYNAĞI</th>
              <th className="py-2 px-3 font-bold text-sm">FATURA DURUMU</th>
              <th className="py-2 px-3 font-bold text-sm">SİPARİŞ TARİHİ</th>
              <th className="py-2 px-3 font-bold text-sm">TESLİM TARİHİ</th>
              <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">TOPLAM TUTAR</th>
              <th className="py-2 px-3 w-20 font-bold text-sm"><span className="sr-only">Düzenle</span></th>
            </tr>
          </thead>
        </table>
        <nav className="flex justify-between items-center py-2 px-3 pr-1 bg-steel_blue_light h-10" aria-label="Table navigation">
          <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">0</span> kayıt bulunmaktadır.</span>
        </nav>
      </>
    ),
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

    
    let t = new Table(Orders.showOrders, state.table_columns, state.table_rows);
    let dt = await t.getData();

    dispatch({
      type: "ALL_ORDERS",
      value: resp
    })

    t.setExecuteButtons([     //. Buttons in the table
      {
        func: (id) => showOrderDetails(id),
        class: "clear-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90 mr-1",
        type: "show",
        icon: "fa-solid fa-eye"
      },
      {
        func: (id) => getOrderDetails(id),
        class: "golden-btn shadow-md px-2 w-fit rounded-[4px] active:scale-90",
        type: "edit",
        icon: "fa-solid fa-pen-to-square"
      },
      {
        func: (id) => removeOrder(id),
        class: "ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90",
        type: "remove",
        icon: "fa-solid fa-xmark"
      }
    ])

    dispatch({               //. Get rendered table
      type: 'RENDER_ORDERS_TABLE',
      render: t.render()
    })
  }

  const showOrderDetails = async () => {
    
  }

  const getOrderDetails = async () => {

  }

  const removeOrder = async () => {

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
