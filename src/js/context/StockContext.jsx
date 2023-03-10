import { createContext, useContext, useReducer, useRef } from 'react'
import stockReducer from '../reducer/stockReducer'
import Stock from '../libraries/models/Stock'
import Table from '../libraries/tools/Table'
import { Modal } from 'flowbite';

const StockContext = createContext();

const Provider = ({ children }) => {

  //- Stock Refs and States
  const [state, dispatch] = useReducer(stockReducer , {
    table_columns: ["ID", "STOK İSMİ", "MALZEME", "ÜRÜN GRUBU", "BİRİM 1", "BİRİM 2", "ÇEV. ORANI", "ALIŞ", "SATIŞ"],
    table_rows: ["id", "name", "material", "product_group", "unit", "unit_2", "conversion_rate", "buy_price", "sell_price"],
    all_stocks: [],
    render_table: "",
    stock_details: {},
    edit_stock_modal: {},
  })

  const stockNameRef = useRef("")
  const stockMaterialRef = useRef("")
  const stockProductGroupRef = useRef("")
  const stockUnitIRef = useRef("")
  const stockUnitIIRef = useRef("")
  const stockConversionRateRef = useRef()
  const stockBuyPriceRef = useRef()
  const stockSellPriceRef = useRef()
  const stockCodeIRef = useRef("")
  const stockCodeIIRef = useRef("")
  const stockCodeIIIRef = useRef("")
  const stockCodeIVRef = useRef("")

  const stockNameEditRef = useRef("")
  const stockMaterialEditRef = useRef("")
  const stockProductGroupEditRef = useRef("")
  const stockUnitIEditRef = useRef("")
  const stockUnitIIEditRef = useRef("")
  const stockConversionRateEditRef = useRef()
  const stockBuyPriceEditRef = useRef()
  const stockSellPriceEditRef = useRef()
  const stockCodeIEditRef = useRef("")
  const stockCodeIIEditRef = useRef("")
  const stockCodeIIIEditRef = useRef("")
  const stockCodeIVEditRef = useRef("")

  
  //b Functions etc. ------------------------------------------------------
  const showStockList = async () => {
    let t = new Table(Stock.showStock, state.table_columns, state.table_rows);
    let dt = await t.getData();

    dispatch({
      type: "ALL_STOCKS",
      value: dt
    })

    t.setExecuteButtons([     //. Buttons in the table
      {
        func: (id) => getStockDetails(id),
        class: "golden-btn shadow-md px-2 w-fit rounded-[4px] active:scale-90",
        type: "edit",
        icon: "fa-solid fa-pen-to-square"
      },
      {
        func: (id) => removeStock(id),
        class: "ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90",
        type: "remove",
        icon: "fa-solid fa-xmark"
      }
    ])

    dispatch({               //. Get rendered table
      type: 'RENDER_TABLE',
      value: t.render()
    })
  }

  const getStockDetails = async (id) => {
    let dt = await Stock.getStock(id)
    console.log(dt);

    let stock_modal = showStockModal();
    stock_modal.show();
    
    dispatch({        //. Set stock details
      type: 'STOCK_DETAILS',
      value: dt
    })
    
    stockNameEditRef.current.value = dt.details.name;
    stockMaterialEditRef.current.value = dt.details.material;
    stockProductGroupEditRef.current.value = dt.details.product_group;
    stockUnitIEditRef.current.value = dt.details.unit;
    stockUnitIIEditRef.current.value = dt.details.unit_2;
    stockConversionRateEditRef.current.value = dt.details.conversion_rate;
    stockBuyPriceEditRef.current.value = dt.details.buy_price;
    stockSellPriceEditRef.current.value = dt.details.sell_price;
    stockCodeIEditRef.current.value = dt.details.code_1;
    stockCodeIIEditRef.current.value = dt.details.code_2;
    stockCodeIIIEditRef.current.value = dt.details.code_3;
    stockCodeIVEditRef.current.value = dt.details.code_4;

  }
  
  const editStock = async (id) => {
    let details = new Stock(id)
    console.log(details);

    let changes = {
      name: stockNameEditRef.current.value,
      material: stockMaterialEditRef.current.value,
      product_group: stockProductGroupEditRef.current.value,
      unit: stockUnitIEditRef.current.value,
      unit_2: stockUnitIIEditRef.current.value,
      conversion_rate: parseFloat(stockConversionRateEditRef.current.value),
      buy_price: parseFloat(stockBuyPriceEditRef.current.value),
      sell_price: parseFloat(stockSellPriceEditRef.current.value),
      code_1: stockCodeIEditRef.current.value,
      code_2: stockCodeIIEditRef.current.value,
      code_3: stockCodeIIIEditRef.current.value,
      code_4: stockCodeIVEditRef.current.value,
    }

    let st = await details.editStock(changes)
    console.log(st);

    await showStockList();
    if (st.Success) hideStockModal();
  }

  const createStock = async () => {

    let check = [stockConversionRateRef.current.value, stockBuyPriceRef.current.value, stockSellPriceRef.current.value]
    
    for (let c of check) {
      
      if(!(/\d/.test(c))) {
        throw new Error('Çevrim oranı, alış fiyatı veya satış fiyatı sayı olmak zorunda')
      }
    }

    let data = {
      name: stockNameRef.current.value,
      material: stockMaterialRef.current.value,
      product_group: stockProductGroupRef.current.value,
      unit: stockUnitIRef.current.value,
      unit_2: stockUnitIIRef.current.value,
      conversion_rate: parseFloat(stockConversionRateRef.current.value),
      buy_price: parseFloat(stockBuyPriceRef.current.value),
      sell_price: parseFloat(stockSellPriceRef.current.value),
      code_1: stockCodeIRef.current.value,
      code_2: stockCodeIIRef.current.value,
      code_3: stockCodeIIIRef.current.value,
      code_4: stockCodeIVRef.current.value,
    }

    let create = await Stock.createStock(data)
    console.log(create);

    await showStockList();
    clearStockInputs();
  }

  const clearStockInputs = () => {
    stockNameRef.current.value = ""
    stockMaterialRef.current.value = ""
    stockProductGroupRef.current.value = ""
    stockUnitIRef.current.value = ""
    stockUnitIIRef.current.value = ""
    stockConversionRateRef.current.value = ""
    stockBuyPriceRef.current.value = ""
    stockSellPriceRef.current.value = ""
    stockCodeIRef.current.value = ""
    stockCodeIIRef.current.value = ""
    stockCodeIIIRef.current.value = ""
    stockCodeIVRef.current.value = ""
  }

  const removeStock = async (id) => {
    let rmv = await Stock.removeStock(id);
    console.log(rmv);

    await showStockList();
  }

  //- Modal Funcs
  const showStockModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("editStockModal");
    const modal = new Modal(el, options);

    dispatch({        //. Set current modal object
      type: 'EDIT_STOCK_MODAL',
      value: modal
    })

    return modal;    
  }

  const hideStockModal = () => {
    state.edit_stock_modal.hide();
    clearStockEditInputs();

    dispatch({        //. Set current modal object
      type: 'EDIT_STOCK_MODAL',
      value: {}
    })
  }

  const clearStockEditInputs = () => {
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

  const stock = {

    //, Refs
    stockNameRef,
    stockMaterialRef,
    stockProductGroupRef,
    stockUnitIRef,
    stockUnitIIRef,
    stockConversionRateRef,
    stockBuyPriceRef,
    stockSellPriceRef,
    stockCodeIRef,
    stockCodeIIRef,
    stockCodeIIIRef,
    stockCodeIVRef,

    stockNameEditRef,
    stockMaterialEditRef,
    stockProductGroupEditRef,
    stockUnitIEditRef,
    stockUnitIIEditRef,
    stockConversionRateEditRef,
    stockBuyPriceEditRef,
    stockSellPriceEditRef,
    stockCodeIEditRef,
    stockCodeIIEditRef,
    stockCodeIIIEditRef,
    stockCodeIVEditRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    clearStockEditInputs,
    clearStockInputs,
    createStock,
    editStock,
    hideStockModal,
    showStockList,

  }

  return (
    <StockContext.Provider value={stock}>
      {children}
    </StockContext.Provider>
  )
}

export const useStock = () => useContext(StockContext)
export default Provider