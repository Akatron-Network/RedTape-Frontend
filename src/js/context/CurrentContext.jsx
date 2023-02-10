import { useRef, useEffect } from 'react';
import { createContext, useContext, useReducer } from 'react'
import currentReducer from '../reducer/currentReducer'
import Current from '../libraries/models/Current'
import TurkeyProvDist from '../libraries/tools/TurkeyProvDist'

const CurrentContext = createContext();

const Provider = ({ children }) => {

  //b State and Ref Management ----------------------------------------

  //- Current Details States
  const [state, dispatch] = useReducer(currentReducer, {

  });
  
  //- Current Details Refs
  const currentNameRef = useRef("")
  const currentAddressRef = useRef("")
  const currentProvinceRef = useRef("")
  const currentDistrictRef = useRef("")
  const currentTaxOfficeRef = useRef("")
  const currentTaxNoRef = useRef("")
  const currentIDNoRef = useRef("")
  const currentPhoneIRef = useRef("")
  const currentPhoneIIRef = useRef("")
  const currentMailRef = useRef("")
  const currentCodeIRef = useRef("")
  const currentCodeIIRef = useRef("")
  const currentCodeIIIRef = useRef("")
  const currentCodeIVRef = useRef("")
  const currentDescriptionRef = useRef("")

  //b ----------------------------------------------------------------

  //b Functions etc. ------------------------------------------------------
  var currentInputs = [
    currentNameRef,
    currentAddressRef,
    currentProvinceRef,
    currentDistrictRef,
    currentTaxOfficeRef,
    currentTaxNoRef,
    currentIDNoRef,
    currentPhoneIRef,
    currentPhoneIIRef,
    currentMailRef,
    currentCodeIRef,
    currentCodeIIRef,
    currentCodeIIIRef,
    currentCodeIVRef,
    currentDescriptionRef
  ]

  const createCurrent = async () => {

    let current_details = {
      name: currentNameRef.current.value,
      address: currentAddressRef.current.value,
      province: currentProvinceRef.current.value,
      district: currentDistrictRef.current.value,
      tax_office: currentTaxOfficeRef.current.value,
      tax_no: currentTaxNoRef.current.value,
      identification_no: currentIDNoRef.current.value,
      phone: currentPhoneIRef.current.value,
      phone_2: currentPhoneIIRef.current.value,
      mail: currentMailRef.current.value,
      code_1: currentCodeIRef.current.value,
      code_2: currentCodeIIRef.current.value,
      code_3: currentCodeIIIRef.current.value,
      code_4: currentCodeIVRef.current.value,
      description: currentDescriptionRef.current.value,
    }

    let create = await Current.createCurrent(current_details);
    console.log(create);

  }
  
  const clearCurrentInputs = async () => {

    for (let i of currentInputs) {                                //, Loop for clear inputs

      if (i === currentProvinceRef || i === currentDistrictRef) { //, Check select inputs
        i.current.value = "default"
      }
      else {
        i.current.value = ""
      }

    }

  }

  const getProvinceList = () => {
    let resp = new TurkeyProvDist()
    return resp.getProvinceList();  //r Return province list
  }

  const getDistrictList = (province) => {
    let resp = new TurkeyProvDist()
    console.log(resp.getDistrictList(province));
  }

  useEffect(() => {
    getProvinceList();  
  }, [])
  
  //b --------------------------------------------------------------------

  //- Current Context Data
  const current = {
    //, Refs
    currentNameRef,
    currentAddressRef,
    currentProvinceRef,
    currentDistrictRef,
    currentTaxOfficeRef,
    currentTaxNoRef,
    currentIDNoRef,
    currentPhoneIRef,
    currentPhoneIIRef,
    currentMailRef,
    currentCodeIRef,
    currentCodeIIRef,
    currentCodeIIIRef,
    currentCodeIVRef,
    currentDescriptionRef,

    //, States, Variables etc.


    //, Functions
    clearCurrentInputs,
    createCurrent,
    getDistrictList,
    getProvinceList,

  }

  return (
    <CurrentContext.Provider value={current}>
      {children}
    </CurrentContext.Provider>
  )
}

export const useCurrent = () => useContext(CurrentContext)
export default Provider