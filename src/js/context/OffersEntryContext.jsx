import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import offersEntryReducer from '../reducer/offersEntryReducer';
import Offers from '../libraries/models/Offers';
import Stock from "../libraries/models/Stock";
import Current from "../libraries/models/Current";
import { useReactToPrint } from "react-to-print";
import {Modal} from 'flowbite';

import CurrencyFormat from "../libraries/tools/CurrencyFormat";

const OffersEntryContext = createContext();

const Provider = ({ children }) => {
  //b State and Ref Management ----------------------------------------
  const [state, dispatch] = useReducer(offersEntryReducer, {
    add_entry_offer_product_modal: {},
    all_currents: [],
    all_offers: [],
    all_stocks: [],
    chosen_stock: {},
    chosen_stock_units: [],
    entry_product_details: {},
    entry_product_modal: {},
    entry_product_units: [],
    filtered_offers: [],
    filtered_stocks: [],
    get_offer_details: {},
    get_offer_items: [],
    get_offer_modal: {},
    invoiced: false,
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
    show_table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
    table_columns: ["SİPARİŞ KODU", "CARİ KOD", "CARİ İSİM", "SİPARİŞ KAYNAĞI", "FATURA DURUMU", "SİPARİŞ TARİHİ", "TESLİM TARİHİ", "TOPLAM TUTAR"],
    toggle_filtered_stock_table: false,
  })

  const offersEntryCurrentNameEditRef = useRef("")
  const offersEntryOfferSourceEditRef = useRef("")
  const offersEntryInvoicedEditRef = useRef("")
  const offersEntryDateEditRef = useRef("")
  const offersEntryDeliveryDateEditRef = useRef("")

  const entryProductNameEditRef = useRef("")
  const entryProductUnitEditRef = useRef("")
  const entryProductAmountEditRef = useRef("")
  const entryProductPriceEditRef = useRef("")
  const entryProductTaxRateEditRef = useRef("")
  const entryProductDescriptionEditRef = useRef("")

  const addOfferEntryProductUnitEditRef = useRef("")
  const addOfferEntryProductAmountEditRef = useRef("")
  const addOfferEntryProductPriceEditRef = useRef("")
  const addOfferEntryProductTaxRateEditRef = useRef("")
  const addOfferEntryProductDescriptionEditRef = useRef("")

  const addOffersEntryProductSearchInputRef = useRef("")

  const componentRef = useRef(null)

  //b Functions -------------------------------------------------------
  //b Functions -------------------------------------------------------
  const printPDF = (offer) => {
    let head_info = {};
    for(let c of state.all_currents) {
      if (offer.details.current_id === c.id) {
        head_info = {
          current_name: c.details.name,
          phone: c.details.phone,
          date: offer.details.date.split("T")[0],
          delivery_date: offer.details.delivery_date.split("T")[0],
          id: offer.id
        }
      }
    }

    let subtotal = 0;
    let tax = 0;
    for (let i of offer.details.items) {
      subtotal = subtotal + (i.amount * i.price)
      tax = tax + ((i.amount * i.price) * i.tax_rate)
    }
    
    let rows = {
      list: offer.items,
      subtotal: subtotal,
      tax: tax,
      total: offer.details.total_fee,
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
    documentTitle: 'Teklif',
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
  
  const showOffers = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
      orderBy: {id: "desc"}
    }

    let resp = await Offers.showOffers(query);

    dispatch({
      type: "ALL_OFFERS",
      value: resp
    })

    dispatch({
      type: 'FILTERED_OFFERS',
      value: resp
    })
  }

  const removeOffer = async (id) => {
    let remove = await Offers.removeOffer(id);

    await showOffers();
  }

  //- Edit Offers
  const getOfferDetails = async (id) => {
    let dt = [];

    for (let o of state.all_offers) {
      if (o.id === id) dt = o
    }

    dispatch({
      type: 'GET_OFFER_ITEMS',
      value: dt.items
    })

    dispatch({
      type: 'GET_OFFER_DETAILS',
      value: dt
    })

    if (dt.details.current_id !== null) {
      for (let c of state.all_currents) {
        if (c.id === dt.details.current_id) var cur_name = c.details.id + " / " + c.details.name
      }
    }
    else {
      var cur_name = dt.details.unregistered_current.name
    }

    let invoiced = "Faturalı";
    if (dt.details.invoiced === false) {
      invoiced = "Faturasız"
    }

    invoicedCheck(invoiced)

    let date = dt.details.date.split("T")[0]
    let delivery_date = dt.details.delivery_date.split("T")[0]

    offersEntryCurrentNameEditRef.current.innerHTML = cur_name
    offersEntryOfferSourceEditRef.current.value = dt.details.order_source
    offersEntryInvoicedEditRef.current.value = invoiced
    offersEntryDateEditRef.current.value = date
    offersEntryDeliveryDateEditRef.current.value = delivery_date

    let show_get_offer_details_modal = showModal("showOffersEntryModal", "GET_OFFER_MODAL");
    show_get_offer_details_modal.show();
  }

  const getProductDetails = async (id) => {
    let dt = [];

    for (let o of state.get_offer_items) {
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
    if (dt.tax_rate === 0.20) tax_rate = "%20"
    else if (dt.tax_rate === 0.10) tax_rate = "%10"

    entryProductNameEditRef.current.innerHTML = name
    entryProductUnitEditRef.current.value = dt.unit
    entryProductAmountEditRef.current.value = dt.amount
    entryProductPriceEditRef.current.value = dt.price
    entryProductTaxRateEditRef.current.value = tax_rate
    entryProductDescriptionEditRef.current.value = dt.description
    
    let entry_product_modal = showModal("editOffersEntryProductModal", "ENTRY_PRODUCT_MODAL");
    entry_product_modal.show();
  }

  const editOffersEntry = async (dt) => {
    let invoiced = true;
    if (offersEntryInvoicedEditRef.current.value === "Faturasız") invoiced = false;

    let details = {
      date: offersEntryDateEditRef.current.value + "T00:00:00.000Z",
      delivery_date: offersEntryDeliveryDateEditRef.current.value + "T00:00:00.000Z",
      order_source: offersEntryOfferSourceEditRef.current.value,
      invoiced: invoiced,
      items: state.get_offer_items
    }

    let o = await Offers.getOffer(dt.id)

    let edit = await o.editOffer(details);

    if(edit.Success) {
      hideGetOfferDetailsModal()
      showOffers();
    }
  }

  const editEntryProduct = async (dt) => {
    let items = [...state.get_offer_items]

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
      type: "GET_OFFER_ITEMS",
      value: items
    })

    hideEntryProductDetailsModal();
  }

  const removeProduct = async (id) => {
    let items = [...state.get_offer_items]

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
      type: 'GET_OFFER_ITEMS',
      value: items,
    })

  }

  const addOfferEntryProduct = () => {
    let items = [...state.get_offer_items]                                          //. Get product list    

    for (let p in items) {                                                          //. Every time a product is added rearrange row numbers
      items[p].row = parseInt(p) + 1 
    }

    let tax_rate = 0;
    if(state.invoiced) (tax_rate = (addOfferEntryProductTaxRateEditRef.current.value).replace("%", "") / 100)
    let amount_sum = ((parseFloat(addOfferEntryProductAmountEditRef.current.value)) * (parseFloat(addOfferEntryProductPriceEditRef.current.value)));
    let tax_sum = (parseFloat(amount_sum) * parseFloat(tax_rate));
    let total = parseFloat(amount_sum + tax_sum).toFixed(2)

    let new_product = {                                                             //. Create new product
      row: (items.length + 1),                                                      //. Row number one more than list length
      stock_id: state.chosen_stock.details.id,
      unit: addOfferEntryProductUnitEditRef.current.value,                          //. Birim
      amount: parseFloat(addOfferEntryProductAmountEditRef.current.value),          //. Miktar
      price: parseFloat(addOfferEntryProductPriceEditRef.current.value),            //. Birim Fiyat
      tax_rate: parseFloat(tax_rate),                                               //. Kdv Oranı
      description: addOfferEntryProductDescriptionEditRef.current.value,            //. Açıklama
    }

    items.push(new_product);                                                        //. Rearrange new product list

    dispatch({
      type: 'GET_OFFER_ITEMS',
      value: items,
    })

    hideAddEntryOfferProductModal();
  }

  const clearAddOfferEntryProduct = () => {

    dispatch({
      type: 'CHOSEN_STOCK',
      value: {}
    })

    dispatch({
      type: 'CHOSEN_STOCK_UNITS',
      value: []
    })
    addOffersEntryProductSearchInputRef.current.value = ""

    addOfferEntryProductUnitEditRef.current.value = "default"
    addOfferEntryProductAmountEditRef.current.value = ""
    addOfferEntryProductPriceEditRef.current.value = ""
    addOfferEntryProductTaxRateEditRef.current.value = "%0"
    addOfferEntryProductDescriptionEditRef.current.value = ""
  }

  const invoicedCheck = (value) => {
    if (value === "Faturasız") {
      dispatch({
        type: 'INVOICED',
        value: false
      })

      let items = [...state.get_offer_items]
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
          type: "GET_OFFER_ITEMS",
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

    if (state.get_offer_items.length > 0) {

      for (let o of state.get_offer_items) {
        total_fee = total_fee + (o.amount * o.price) * (1 + o.tax_rate)
      }

    }
    
    return CurrencyFormat(total_fee);
  }

  //- Create Order from Offer
  const createOrderFromOffer = (id) => {
    let dt = [];

    for (let o of state.all_offers) {
      if (o.id === id) dt = o
    }
  }

  //- Stocks Autocomplete
  const toggleFilteredStockTable = (e) => {

    if(e.target.id !== 'add_entry_offer_product_button' && e.target.id !== 'add_entry_offer_product_input' && e.target.id !== 'add_entry_offer_product_button_icon') {
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

    addOffersEntryProductSearchInputRef.current.value = st.details.id + " - " + st.details.name

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

  //- Table Search Funcs
  const filterOffers = async (event) => {
    const searchWord = event.target.value.toLocaleUpperCase('TR');

    const newFilter = state.all_offers.filter((source) => {
      var condition = false;

      if (source.details.current_id !== null) {
        for (let c of state.all_currents) {
          if (c.details.name.toString().toLocaleUpperCase('TR').includes(searchWord)) {
            if (source.details.current_id === c.id) {
              condition = true
            }
          }
        }
      }
      else {
        if (source.details.unregistered_current.name.toString().toLocaleUpperCase('TR').includes(searchWord)) {
          condition = true
        }
      }

      return condition;
    });
    
    dispatch({
      type: 'FILTERED_OFFERS',
      value: newFilter
    })
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

  const showAddEntryOfferProductModal = () => {
    let add_entry_offer_product_modal = showModal("addOfferEntryProductModal", "ADD_ENTRY_OFFER_PRODUCT_MODAL");
    add_entry_offer_product_modal.show();
  }

  const hideGetOfferDetailsModal = () => {
    state.get_offer_modal.hide();

    dispatch({
      type: 'GET_OFFER_ITEMS',
      value: []
    })

    dispatch({
      type: 'GET_OFFER_DETAILS',
      value: {}
    })

    dispatch({
      type: 'GET_OFFER_MODAL',
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

  const hideAddEntryOfferProductModal = () => {
    state.add_entry_offer_product_modal.hide();
    clearAddOfferEntryProduct();
  }
  
  const offers_entry = {

    //- Refs
    offersEntryCurrentNameEditRef,
    offersEntryOfferSourceEditRef,
    offersEntryInvoicedEditRef,
    offersEntryDateEditRef,
    offersEntryDeliveryDateEditRef,

    entryProductNameEditRef,
    entryProductUnitEditRef,
    entryProductAmountEditRef,
    entryProductPriceEditRef,
    entryProductTaxRateEditRef,
    entryProductDescriptionEditRef,

    addOfferEntryProductUnitEditRef,
    addOfferEntryProductAmountEditRef,
    addOfferEntryProductPriceEditRef,
    addOfferEntryProductTaxRateEditRef,
    addOfferEntryProductDescriptionEditRef,

    addOffersEntryProductSearchInputRef,

    componentRef,

    //- States, Variables etc.
    ...state,
    dispatch,

    //- Functions
    addOfferEntryProduct,
    chooseFilteredStock,
    createOrderFromOffer,
    editEntryProduct,
    editOffersEntry,
    filterStocks,
    filterOffers,
    getOfferDetails,
    getProductDetails,
    hideAddEntryOfferProductModal,
    hideEntryProductDetailsModal,
    hideGetOfferDetailsModal,
    invoicedCheck,
    printPDF,
    removeOffer,
    removeProduct,
    showAddEntryOfferProductModal,
    showCurrents,
    showStocks,
    showOffers,
    toggleFilteredStockTable,
    totalFee,

  }
  
  return (
    <OffersEntryContext.Provider value={offers_entry} >
      {children}
    </OffersEntryContext.Provider>
  )
}

export const useOffersEntry = () => useContext(OffersEntryContext)
export default Provider;