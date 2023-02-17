import { useRef, useEffect, createContext, useContext, useReducer } from 'react';
import Current from '../libraries/models/Current';
import CurrentActivity from '../libraries/models/CurrentActivity';
import currentActivityReducer from '../reducer/currentActivityReducer'

const CurrentActivityContext = createContext();

const Provider = ({children}) => {
  //b State and Ref Management ----------------------------------------
  
  //- Current Details States
  const [state, dispatch] = useReducer(currentActivityReducer, {
    all_currents: [],
    filtered_currents: [],
    toggle_filtered_table: false,
    chosen_current: {},
    date: {}
  });

  //- Current Details Refs
  //, Current Details
  const curActSearchInputRef = useRef("");
  const curActGTEDateRef = useRef("");
  const curActLTEDateRef = useRef("");
  const curActGTEDefaultRef = useRef("");
  const curActLTEDefaultRef = useRef("");

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
  const curActDebtCreditRef = useRef("");
  const curActBalanceRef = useRef("");

  //b -----------------------------------------------------------------
  
  //b Functions etc. --------------------------------------------------
  //- Current Informations
  useEffect(() => { 
    getAllCurrents();
    getDate();

    document.addEventListener('click', toggleFilteredTable)
    return () => { document.removeEventListener('click', toggleFilteredTable) } //. When click outside the sidepanel close sidepanel
  }, [])

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
    let currents = await Current.showCurrent();
    console.log(currents);

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
    const searchWord = event.target.value.toLowerCase();
    const newFilter = state.all_currents.filter((source) => {
      var condition = false;

      if (source.details.name !== undefined) {
        condition =
          (source.details.id).toString().toLowerCase().includes(searchWord) ||
          source.details.name.toLowerCase().includes(searchWord);
      } else {
        condition = source.id.toLowerCase().includes(searchWord);
      }

      return condition;
    });
    
    dispatch({
      type: 'FILTERED_CURRENTS',
      value: newFilter
    })
  };

  const chooseFilteredCurrent = async (id) => {
    console.log(id);
    let cr = await Current.getCurrent(id);
    console.log(cr);

    dispatch({
      type: 'CHOSEN_CURRENT',
      value: cr
    })
    
    dispatch({
      type: 'TOGGLE_FILTERED_TABLE',
      value: false
    })

    curActSearchInputRef.current.value = cr.details.id + " - " + cr.details.name
  }

  const getCurrentActivity = async () => {
    let query = {
      skip: undefined,
      take: 1000,
      where: {
        id: state.chosen_current.id,
        date: {
          gte: curActGTEDateRef.current.value + "T00:00:00.000Z", //. Ne zamandan
          lte: curActLTEDateRef.current.value + "T00:00:00.000Z", //. Ne zamana kadar (Bugünun tarihi en fazla)
        }
      }
    }

    let resp = await CurrentActivity.showCurrentActivity(query);
    console.log(resp);
  }

  //b -----------------------------------------------------------------

  //- Current Activity Context Data
  const current_activity = {

    //, Refs
    curActGTEDateRef,
    curActLTEDateRef,
    curActGTEDefaultRef,
    curActLTEDefaultRef,
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
    curActDebtCreditRef,
    curActBalanceRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    chooseFilteredCurrent,
    filterCurrents,
    getCurrentActivity,
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