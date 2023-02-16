import { useRef, useEffect, createContext, useContext, useReducer } from 'react';
import currentActivityReducer from '../reducer/currentActivityReducer'

const CurrentActivityContext = createContext();

const Provider = ({children}) => {
  //b State and Ref Management ----------------------------------------
  
  //- Current Details States
  const [state, dispatch] = useReducer(currentActivityReducer, {
  });

  //- Current Details Refs
  //, Current Details


  //, Current Activity Entry
  const curActDateRef = useRef("");
  const curActDescriptionRef = useRef("");
  const curActExpiryDateRef = useRef("");
  const curActDebtCreditRef = useRef("");
  const curActBalanceRef = useRef("");

  //b -----------------------------------------------------------------

  //b Functions etc. --------------------------------------------------

  //b -----------------------------------------------------------------

  //- Current Activity Context Data
  const current_activity = {

    //, Refs
    curActDateRef,
    curActDescriptionRef,
    curActExpiryDateRef,
    curActDebtCreditRef,
    curActBalanceRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions

  }

  return (
    <CurrentActivityContext.Provider value={current_activity}>
      {children}
    </CurrentActivityContext.Provider>
  )
}

export const useCurrentActivity = () => useContext(CurrentActivityContext)
export default Provider