import { useRef, useEffect, createContext, useContext, useReducer } from 'react';
import Current from '../libraries/models/Current';
import CurrentActivity from '../libraries/models/CurrentActivity';
import currentActivityReducer from '../reducer/currentActivityReducer'
import Table from '../libraries/tools/Table';
import {Modal} from 'flowbite';

const CurrentActivityContext = createContext();

const Provider = ({children}) => {
  //b State and Ref Management ----------------------------------------
  
  //- Current Details States
  const [state, dispatch] = useReducer(currentActivityReducer, {
    all_currents: [],
    current_activity: [],
    filtered_currents: [],
    toggle_filtered_table: false,
    chosen_current: {},
    date: {
      current: "",
      early: ""
    },
    table_columns: ["TARİH", "AÇIKLAMA", "VADE TARİHİ", "BORÇ TUTARI", "ALACAK TUTARI", "NET BAKİYE"],
    table_rows: ["date", "description", "expiry_date", "debt", "amount", "balance"],
    edit_cur_act_modal: {},
    cur_act_details: {},
    render_table: (
      <>
        <table className="w-full text-sm text-left text-pine_tree">
          <thead className="text-xs text-prussian_blue bg-steel_blue_light">
            <tr>
              <th className="py-2 px-3 font-bold text-sm">TARİH</th>
              <th className="py-2 px-3 font-bold text-sm">AÇIKLAMA</th>
              <th className="py-2 px-3 font-bold text-sm">VADE TARİHİ</th>
              <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">BORÇ TUTARI</th>
              <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">ALACAK TUTARI</th>
              <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">NET BAKİYE</th>
              <th className="py-2 px-3 w-20 font-bold text-sm"><span className="sr-only">Düzenle</span></th>
            </tr>
          </thead>
        </table>
        <nav className="flex justify-between items-center py-2 px-3 pr-1 bg-steel_blue_light h-10" aria-label="Table navigation">
          <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">0</span> kayıt bulunmaktadır.</span>
        </nav>
      </>
    ),
  });

  //- Current Details Refs
  //, Current Details
  const curActSearchInputRef = useRef("");
  const curActGTEDateRef = useRef("");
  const curActLTEDateRef = useRef("");

  const curActIDRef = useRef("");
  const curActNameRef = useRef("");
  const curActAddressRef = useRef("");
  const curActProvDistRef = useRef("");
  const curActTaxOfficeNoRef = useRef("");
  const curActPhoneIRef = useRef("");
  const curActPhoneIIRef = useRef("");
  const curActMailRef = useRef("");

  //, Current Activity Entry
  const curActDateRef = useRef("");
  const curActDescriptionRef = useRef("");
  const curActExpiryDateRef = useRef("");
  const curActDebtAmountRef = useRef("");
  const curActBalanceRef = useRef("");

  const curActDateEditRef = useRef("");
  const curActDescriptionEditRef = useRef("");
  const curActExpiryDateEditRef = useRef("");
  const curActDebtAmountEditRef = useRef("");
  const curActBalanceEditRef = useRef("");
  
  //b Functions etc. --------------------------------------------------

  //- Current Informations
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
  
  const getAllCurrents = async () => {
    let query = {
      skip: 0,
      take: 1000,
      where: {},
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

  const toggleFilteredTable = (e) => {

    if(e.target.id !== 'search_button' && e.target.id !== 'search_input' && e.target.id !== 'search_button_icon') {
      dispatch({
        type: 'TOGGLE_FILTERED_TABLE',
        value: false
      })
    }
    else {
      if(state.toggle_filtered_table !== true) {
        dispatch({
          type: 'TOGGLE_FILTERED_TABLE',
          value: true
        })
      }
    }

  }

  const filterCurrents = (event) => {

    if (event.target.value === "") {
      printCurrentDetails(undefined);   //. For clearing out current details inputs
    }
    
    if(state.toggle_filtered_table !== true) {
      dispatch({
        type: 'TOGGLE_FILTERED_TABLE',
        value: true
      })
    }

    const searchWord = event.target.value.toLocaleUpperCase('TR');
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
      type: 'TOGGLE_FILTERED_TABLE',
      value: false
    })

    curActSearchInputRef.current.value = cr.details.id + " - " + cr.details.name

    printCurrentDetails(cr);
  }

  const printCurrentDetails = (details) => {

    if(details === undefined || details === null || details === "") {
      curActIDRef.current.innerHTML = "";
      curActNameRef.current.innerHTML = "";
      curActAddressRef.current.innerHTML = "";
      curActProvDistRef.current.innerHTML = "";
      curActTaxOfficeNoRef.current.innerHTML = "";
      curActPhoneIRef.current.innerHTML = "";
      curActPhoneIIRef.current.innerHTML = "";
      curActMailRef.current.innerHTML =  "";
      
      dispatch({
        type: 'CHOSEN_CURRENT',
        value: {}
      })
    }
    else {
      details.details.id === null || details.details.id === undefined ? curActIDRef.current.innerHTML = "-" :  curActIDRef.current.innerHTML = details.details.id
      details.details.name === null || details.details.name === undefined ? curActNameRef.current.innerHTML = "-" :  curActNameRef.current.innerHTML = details.details.name
      details.details.address === null || details.details.address === undefined  ? curActAddressRef.current.innerHTML = "-" :  curActAddressRef.current.innerHTML = details.details.address

      let tax_office = "";
      let tax_no = "";
      if (details.details.tax_office !== null && details.details.tax_office !== undefined) tax_office = details.details.tax_office
      if (details.details.tax_no !== null && details.details.tax_no !== undefined) tax_no = details.details.tax_no
      curActTaxOfficeNoRef.current.innerHTML = tax_office + " - " + tax_no

      details.details.phone === null || details.details.phone === undefined ? curActPhoneIRef.current.innerHTML = "-" :  curActPhoneIRef.current.innerHTML = details.details.phone
      details.details.phone_2 === null || details.details.phone_2 === undefined ? curActPhoneIIRef.current.innerHTML = "-" :  curActPhoneIIRef.current.innerHTML = details.details.phone_2
      details.details.mail === null || details.details.mail === undefined ? curActMailRef.current.innerHTML = "-" :  curActMailRef.current.innerHTML =  details.details.mail
      
      
      if (details.details.province === "default" || details.details.province === null || details.details.province === undefined) {
        details.details.province = ""
      }
      if (details.details.district === "default" || details.details.district === null || details.details.district === undefined) {
        details.details.district = ""
      }

      curActProvDistRef.current.innerHTML = details.details.province + " - " +  details.details.district
    }

  }

  //- Table Functions
  const getCurrentActivity = async () => {

    if (JSON.stringify(state.chosen_current) === "{}") {  //. If chosen current is empty reset the table
      return dispatch({     //. Reset rendered table
        type: 'RENDER_TABLE',
        render: (
          <>
            <table className="w-full text-sm text-left text-pine_tree">
              <thead className="text-xs text-prussian_blue bg-steel_blue_light">
                <tr>
                  <th className="py-2 px-3 font-bold text-sm">TARİH</th>
                  <th className="py-2 px-3 font-bold text-sm">AÇIKLAMA</th>
                  <th className="py-2 px-3 font-bold text-sm">VADE TARİHİ</th>
                  <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">BORÇ TUTARI</th>
                  <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">ALACAK TUTARI</th>
                  <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">NET BAKİYE</th>
                  <th className="py-2 px-3 w-20 font-bold text-sm"><span className="sr-only">Düzenle</span></th>
                </tr>
              </thead>
            </table>
            <nav className="flex justify-between items-center py-2 px-3 pr-1 bg-steel_blue_light h-10" aria-label="Table navigation">
              <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">0</span> kayıt bulunmaktadır.</span>
            </nav>
          </>
        )
      }) 
    }

    let act = new Table(CurrentActivity.showCurrentActivity, state.table_columns, state.table_rows)

    let where = {
        current_id: state.chosen_current.id,
        date: {
          gte: curActGTEDateRef.current.value + "T00:00:00.000Z", //. Ne zamandan
          lte: curActLTEDateRef.current.value + "T23:59:59.000Z", //. Ne zamana kadar (Bugünun tarihi en fazla)
        }
      }

    let cur_act = await act.getData(0, 1000, where);

    dispatch({                  //. Set all current activities
      type: 'CURRENT_ACTIVITY',
      value: cur_act
    })
    
    act.setExecuteButtons([     //. Buttons in the table
      {
        func: (id) => getCurActDetails(id),
        class: "golden-btn shadow-md px-2 w-fit rounded-[4px] active:scale-90",
        type: "edit",
        icon: "fa-solid fa-pen-to-square"
      },
      {
        func: (id) => removeCurAct(id),
        class: "ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90",
        type: "remove",
        icon: "fa-solid fa-xmark"
      }
    ])

    dispatch({               //. Get rendered table
      type: 'RENDER_TABLE',
      render: act.render()
    })
  }

  const createCurrentActivity = async () => {
    let balance = 0;

    if (curActDebtAmountRef.current.value === "Borç") {
      balance = curActBalanceRef.current.value
    }
    else if (curActDebtAmountRef.current.value === "Alacak") {
      balance =  - curActBalanceRef.current.value
    }

    let data = {
      current_id: state.chosen_current.id,
      balance: parseFloat(balance),
      date: curActDateRef.current.value + "T00:00:00.000Z",
      description: curActDescriptionRef.current.value,
      expiry_date: curActExpiryDateRef.current.value + "T00:00:00.000Z",
    }

    let resp = await CurrentActivity.createCurrentActivity(data);

    await getCurrentActivity();
    clearCurActEntryInputs();
  }
  
  const clearCurActEntryInputs = () => {
    curActDateRef.current.value = state.date.current
    curActDescriptionRef.current.value = "";
    curActExpiryDateRef.current.value = "";
    curActDebtAmountRef.current.value = "default";
    curActBalanceRef.current.value = "";
  }

  const showCurActModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("editCurActModal");
    const modal = new Modal(el, options);

    dispatch({        //. Set current modal object
      type: 'EDIT_CUR_ACT_MODAL',
      value: modal
    })

    return modal;
  }

  const hideCurActModal = () => {
    state.edit_cur_act_modal.hide();
    clearCurActEditInputs();

    dispatch({        //. Set current action modal object
      type: 'EDIT_CUR_ACT_MODAL',
      value: {}
    })
  }

  const clearCurActEditInputs = () => {
    curActDateEditRef.current.value = state.date.current
    curActDescriptionEditRef.current.value = "";
    curActExpiryDateEditRef.current.value = "";
    curActDebtAmountEditRef.current.value = "default";
    curActBalanceEditRef.current.value = "";
  }

  const getCurActDetails = async (id) => {
    let dt = await CurrentActivity.getCurrentActivity(id.id)

    let cur_act_modal = showCurActModal();
    cur_act_modal.show();
    
    dispatch({        //. Set current details
      type: 'CUR_ACT_DETAILS',
      value: dt
    })

    curActDateEditRef.current.value = dt.details.date.split("T")[0];
    curActDescriptionEditRef.current.value = dt.details.description;
    curActExpiryDateEditRef.current.value = dt.details.expiry_date.split("T")[0];

    if (dt.details.balance > 0) {                                       //. If balance is positive 
      curActDebtAmountEditRef.current.value = "Borç";
      curActBalanceEditRef.current.value = dt.details.balance;
    }
    else {                                                             //. If balance is negative 
      curActDebtAmountEditRef.current.value = "Alacak";
      curActBalanceEditRef.current.value = (dt.details.balance * -1); 
    }

  }

  const editCurrentActivity = async (id) => {
    let details = new CurrentActivity(id)
    let balance = 0;

    if (curActDebtAmountEditRef.current.value === "Borç") {
      balance = curActBalanceEditRef.current.value
    }
    else if (curActDebtAmountEditRef.current.value === "Alacak") {
      balance =  - curActBalanceEditRef.current.value
    }

    let changes = {
      balance: parseFloat(balance),
      date: curActDateEditRef.current.value + "T00:00:00.000Z",
      description: curActDescriptionEditRef.current.value,
      expiry_date: curActExpiryDateEditRef.current.value + "T00:00:00.000Z",
    }

    let cr = await details.editCurrentActivity(changes)

    await getCurrentActivity();
    if (cr.Success) hideCurActModal();
  }

  const removeCurAct = async (id) => {
    let remove = await CurrentActivity.removeCurrentActivity(id.id);
    
    await getCurrentActivity();
  }

  //b -----------------------------------------------------------------

  //- Current Activity Context Data
  const current_activity = {

    //, Refs
    curActGTEDateRef,
    curActLTEDateRef,
    curActSearchInputRef,

    curActIDRef,
    curActNameRef,
    curActAddressRef,
    curActProvDistRef,
    curActTaxOfficeNoRef,
    curActPhoneIRef,
    curActPhoneIIRef,
    curActMailRef,

    curActDateRef,
    curActDescriptionRef,
    curActExpiryDateRef,
    curActDebtAmountRef,
    curActBalanceRef,

    curActDateEditRef,
    curActDescriptionEditRef,
    curActExpiryDateEditRef,
    curActDebtAmountEditRef,
    curActBalanceEditRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    chooseFilteredCurrent,
    clearCurActEntryInputs,
    clearCurActEditInputs,
    createCurrentActivity,
    editCurrentActivity,
    filterCurrents,
    getAllCurrents,
    getCurrentActivity,
    getDate,
    hideCurActModal,
    toggleFilteredTable,

  }

  return (
    <CurrentActivityContext.Provider value={current_activity}>
      {children}
    </CurrentActivityContext.Provider>
  )
}

export const useCurrentActivity = () => useContext(CurrentActivityContext)
export default Provider