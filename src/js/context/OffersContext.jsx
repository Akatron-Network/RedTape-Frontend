import { createContext, useContext, useReducer, useRef } from "react"
import offersReducer from '../reducer/offersReducer';
import Current from "../libraries/models/Current";
import Stock from "../libraries/models/Stock";
import { Modal } from "flowbite";
import Offers from "../libraries/models/Offers";
import { useReactToPrint } from "react-to-print";

const OffersContext = createContext()

const Provider = ({ children }) => {

  //b State and Ref Management ----------------------------------------

  //- Offers Details States
  const [state, dispatch] = useReducer(offersReducer, {
    all_currents: [],
    all_stocks: [],
    chosen_current: {},
    chosen_stock: {},
    chosen_stock_edit_units: [],
    chosen_stock_units: [],
    date: {
      current: "",
      early: "",
    },
    edit_product_modal: false,
    filtered_currents: [],
    filtered_stocks: [],
    invoiced: true,
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
    product_details: {},
    product_list: [],
    table_columns: ["", "ÜRÜN AD", "MALZEME", "ÜRÜN GRUBU", "BİRİM", "MİKTAR", "BİRİM FİYAT", "TUTAR", "KDV ORAN", "KDV TUTAR", "TOPLAM TUTAR", "AÇIKLAMA"],
    table_total: 0,
    toggle_filtered_current_table: false,
    toggle_filtered_stock_table: false,
  });

  const offersNewCurCheckedRef = useRef(false)
  
  const offersCurSearchInputRef = useRef()
  const offersSourceRef = useRef("");
  const offersInvoicedRef = useRef("");
  const offersGTEDateRef = useRef("");
  const offersLTEDateRef = useRef("");

  const offersCurIDRef = useRef("");
  const offersCurNameRef = useRef("");
  const offersCurAddressRef = useRef("");
  const offersCurProvDistRef = useRef("");
  const offersCurTaxOfficeNoRef = useRef("");
  const offersCurPhoneIRef = useRef("");
  const offersCurPhoneIIRef = useRef("");
  const offersCurMailRef = useRef("");

  const offersNewCurNameRef = useRef("");
  const offersNewCurMailRef = useRef("");
  const offersNewCurPhoneIRef = useRef("");
  const offersNewCurAddressRef = useRef("");

  const offersStockSearchInputRef = useRef("");
  const offersUnitRef = useRef("");
  const offersAmountRef = useRef("");
  const offersPriceRef = useRef("");
  const offersTaxRateRef = useRef("");
  const offersDescriptionRef = useRef("");

  const offersStockSearchInputEditRef = useRef("");
  const offersUnitEditRef = useRef("");
  const offersAmountEditRef = useRef("");
  const offersPriceEditRef = useRef("");
  const offersTaxRateEditRef = useRef("");
  const offersDescriptionEditRef = useRef("");

  const componentRef = useRef("");


  //b Functions etc. ------------------------------------------------------
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
    documentTitle: 'Teklif',
    
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

    if(e.target.id !== 'offers_search_current_button' && e.target.id !== 'offers_search_current_input' && e.target.id !== 'offers_search_current_button_icon') {
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

    offersCurSearchInputRef.current.value = cr.details.id + " - " + cr.details.name

    printCurrentDetails(cr);
  }

  const printCurrentDetails = (details) => {
    if(details === undefined) {
      offersCurIDRef.current.innerHTML = "";
      offersCurNameRef.current.innerHTML = "";
      offersCurAddressRef.current.innerHTML = "";
      offersCurProvDistRef.current.innerHTML = "";
      offersCurTaxOfficeNoRef.current.innerHTML = "";
      offersCurPhoneIRef.current.innerHTML = "";
      offersCurPhoneIIRef.current.innerHTML = "";
      offersCurMailRef.current.innerHTML =  "";
      
      dispatch({
        type: 'CHOSEN_CURRENT',
        value: {}
      })
    }
    else {
      //f If they are empty " - " if they dont empty values
      details.details.id === null || details.details.id === undefined ? offersCurIDRef.current.innerHTML = "-" :  offersCurIDRef.current.innerHTML = details.details.id
      details.details.name === null || details.details.name === undefined ? offersCurNameRef.current.innerHTML = "-" :  offersCurNameRef.current.innerHTML = details.details.name
      details.details.address === null || details.details.address === undefined  ? offersCurAddressRef.current.innerHTML = "-" :  offersCurAddressRef.current.innerHTML = details.details.address
      
      let tax_office = "";
      let tax_no = "";
      if (details.details.tax_office !== null && details.details.tax_office !== undefined) tax_office = details.details.tax_office
      if (details.details.tax_no !== null && details.details.tax_no !== undefined) tax_no = details.details.tax_no
      offersCurTaxOfficeNoRef.current.innerHTML = tax_office + " - " + tax_no

      details.details.phone === null || details.details.phone === undefined ? offersCurPhoneIRef.current.innerHTML = "-" :  offersCurPhoneIRef.current.innerHTML = details.details.phone
      details.details.phone_2 === null || details.details.phone_2 === undefined ? offersCurPhoneIIRef.current.innerHTML = "-" :  offersCurPhoneIIRef.current.innerHTML = details.details.phone_2
      details.details.mail === null || details.details.mail === undefined ? offersCurMailRef.current.innerHTML = "-" :  offersCurMailRef.current.innerHTML =  details.details.mail
      
      if (details.details.province === "default" || details.details.province === null || details.details.province === undefined) {
        details.details.province = ""
      }
      if (details.details.district === "default" || details.details.district === null || details.details.district === undefined) {
        details.details.district = ""
      }

      offersCurProvDistRef.current.innerHTML = details.details.province + " - " +  details.details.district
    }
  }

  const clearCurrentDetails = () => {

    if (offersNewCurCheckedRef.current.checked) {
      offersNewCurNameRef.current.value = "";
      offersNewCurMailRef.current.value = "";
      offersNewCurPhoneIRef.current.value = "";
      offersNewCurAddressRef.current.value = "";

    }
    else {
      offersCurSearchInputRef.current.value = "";
      offersSourceRef.current.value = "";
      offersInvoicedRef.current.value = "Faturalı";
      offersGTEDateRef.current.value = state.date.current
      offersLTEDateRef.current.value = state.date.current
  
      offersCurIDRef.current.innerHTML = "";
      offersCurNameRef.current.innerHTML = "";
      offersCurAddressRef.current.innerHTML = "";
      offersCurProvDistRef.current.innerHTML = "";
      offersCurTaxOfficeNoRef.current.innerHTML = "";
      offersCurPhoneIRef.current.innerHTML = "";
      offersCurPhoneIIRef.current.innerHTML = "";
      offersCurMailRef.current.innerHTML =  "";
    }

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

    if(e.target.id !== 'offers_search_stock_button' && e.target.id !== 'offers_search_stock_input' && e.target.id !== 'offers_search_stock_button_icon') {
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

    offersStockSearchInputRef.current.value = st.details.id + " - " + st.details.name

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

    let tax_rate = ((offersTaxRateRef.current.value).replace("%", "") / 100);

    let amount_sum = ((parseFloat(offersAmountRef.current.value)) * (parseFloat(offersPriceRef.current.value)));
    let tax_sum = (parseFloat(amount_sum) * parseFloat(tax_rate));
    let total = parseFloat(amount_sum + tax_sum).toFixed(2)

    let new_product = {                                           //. Create new product
      row: (new_product_list.length + 1),                         //. Row number one more than list length
      stock_id: state.chosen_stock.details.id,
      unit: offersUnitRef.current.value,                          //. Birim
      amount: parseFloat(offersAmountRef.current.value),          //. Miktar
      price: parseFloat(offersPriceRef.current.value),            //. Birim Fiyat
      tax_rate: parseFloat(tax_rate),                             //. Kdv Oranı
      description: offersDescriptionRef.current.value,            //. Açıklama

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
    offersStockSearchInputRef.current.value = ""
    offersUnitRef.current.value = "default"
    offersAmountRef.current.value = ""
    offersPriceRef.current.value = ""
    offersTaxRateRef.current.value = "%0"
    offersDescriptionRef.current.value = ""

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
    
    offersStockSearchInputEditRef.current.innerHTML = dt.stock_id + "-" + dt.stock_name
    offersUnitEditRef.current.value = dt.unit
    offersAmountEditRef.current.value = dt.amount
    offersPriceEditRef.current.value = dt.price
    offersTaxRateEditRef.current.value = "%" + (dt.tax_rate * 100)
    offersDescriptionEditRef.current.value = dt.description

  }
  
  const editProduct = async (row) => {
    let details = {};

    for (let p of state.product_list) {
      if (p.row === row) {
        details = p
      }
    }

    let tax_rate = ((offersTaxRateEditRef.current.value).replace("%", "") / 100);
    let amount_sum = ((parseFloat(offersAmountEditRef.current.value)) * (parseFloat(offersPriceEditRef.current.value)));
    let tax_sum = (parseFloat(amount_sum) * parseFloat(tax_rate));
    let total = parseFloat(amount_sum + tax_sum)

    details["unit"] = offersUnitEditRef.current.value
    details["amount"] = parseFloat(offersAmountEditRef.current.value)
    details["price"] = parseFloat(offersPriceEditRef.current.value)
    details["tax_rate"] = tax_rate
    details["description"] = offersDescriptionEditRef.current.value

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

      offersTaxRateRef.current.value = "%0"

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
    
    let el = document.getElementById("editOffersProductModal");
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

  const clearProductEditInputs = () => {
    offersStockSearchInputEditRef.current.innerHTML = "";
    offersUnitEditRef.current.value = "default";
    offersAmountEditRef.current.value = "";
    offersPriceEditRef.current.value = "";
    offersTaxRateEditRef.current.value = "default";
    offersDescriptionEditRef.current.value = "";
    
    dispatch({
      type: 'CHOSEN_STOCK_EDIT_UNITS',
      value: []
    })
  }

  const showPrintPDFModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("printOffersPDFModal");
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
  
  //- Offer Funcs
  const createOffer = async () => {
    if(offersInvoicedRef.current.value === "Faturalı") { var invoiced = true }
    else if(offersInvoicedRef.current.value === "Faturasız") { var invoiced = false }

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
      date: offersGTEDateRef.current.value + "T00:00:00.000Z",
      delivery_date: offersLTEDateRef.current.value + "T00:00:00.000Z",
      order_source: offersSourceRef.current.value,
      invoiced: invoiced,
      printed: false,
      total_fee: Number(total_fee),
      items: items
    }

    if (offersNewCurCheckedRef.current.checked) {
      data = {
        ...data,
        unregistered_current: {
          name: offersNewCurNameRef.current.value,
          phone: offersNewCurPhoneIRef.current.value,
          mail: offersNewCurMailRef.current.value,
          address: offersNewCurAddressRef.current.value
        },
      }

    }
    else {
      data = {
        ...data,
        current_id: state.chosen_current.id,
        code_1: state.chosen_current.details.code_1,
        code_2: state.chosen_current.details.code_2,
        code_3: state.chosen_current.details.code_3,
        code_4: state.chosen_current.details.code_4,
      }
    }

    let create = await Offers.createOffer(data)
  
    let rows = {
      ...state.print_pdf_rows,
      head_info : {
        date: offersGTEDateRef.current.value,
        delivery_date: offersLTEDateRef.current.value,
        id: create.id,
      }
    }

    if (offersNewCurCheckedRef.current.checked) {
      rows = {
        ...rows,
        head_info : {
          ...rows.head_info,
          current_name: offersNewCurNameRef.current.value,
          phone: offersNewCurPhoneIRef.current.value,
        }
      }
    }
    else {
      rows = {
        ...rows,
        head_info : {
          ...rows.head_info,
          current_name: state.chosen_current.details.name,
          phone: state.chosen_current.details.phone,
        }
      }
    }

    dispatch({
      type: 'PRINT_PDF_ROWS',
      value: rows
    })

    printPDF(),
    clearOffer();
  }

  const clearOffer = () => {

    dispatch({
      type: 'PRODUCT_LIST',
      value: []
    })
    
    dispatch({
      type: 'TABLE_TOTAL',
      value: 0,
    })

    clearProductInputs();
    clearCurrentDetails();
  }

  //- Offers Context Data
  const offers = {
    
    //, Refs
    offersNewCurCheckedRef,

    offersCurSearchInputRef,
    offersSourceRef,
    offersInvoicedRef,
    offersGTEDateRef,
    offersLTEDateRef,

    offersCurIDRef,
    offersCurNameRef,
    offersCurAddressRef,
    offersCurProvDistRef,
    offersCurTaxOfficeNoRef,
    offersCurPhoneIRef,
    offersCurPhoneIIRef,
    offersCurMailRef,

    offersNewCurNameRef,
    offersNewCurMailRef,
    offersNewCurPhoneIRef,
    offersNewCurAddressRef,

    offersStockSearchInputRef,
    offersUnitRef,
    offersAmountRef,
    offersPriceRef,
    offersTaxRateRef,
    offersDescriptionRef,

    offersStockSearchInputEditRef,
    offersUnitEditRef,
    offersAmountEditRef,
    offersPriceEditRef,
    offersTaxRateEditRef,
    offersDescriptionEditRef,

    componentRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    addProduct,
    chooseFilteredCurrent,
    chooseFilteredStock,
    clearProductEditInputs,
    createOffer,
    clearOffer,
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
    <OffersContext.Provider value={offers}>
      {children}
    </OffersContext.Provider>
  )
}

export const useOffers = () => useContext(OffersContext)
export default Provider;