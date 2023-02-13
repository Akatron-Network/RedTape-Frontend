import { useRef, useEffect } from 'react';
import { createContext, useContext, useReducer } from 'react'
import currentReducer from '../reducer/currentReducer'
import Current from '../libraries/models/Current'
import TurkeyProvDist from '../libraries/tools/TurkeyProvDist'
import Table from '../libraries/tools/Table';

const CurrentContext = createContext();

const Provider = ({ children }) => {

  //b State and Ref Management ----------------------------------------

  //- Current Details States
  const [state, dispatch] = useReducer(currentReducer, {
    districts: [],
    provinces: [],
    tableColumns: ["ID", "CARİ AD", "TC KİMLİK NUMARASI", "TELEFON", "ADRES"],
    tableRows: [],
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
  //- New Current Create Funcs
  useEffect(() => {
    getProvinceList();
  }, [])

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

  const getProvinceList = () => {
    let resp = new TurkeyProvDist()

    dispatch({    //- Get provinces
      type: 'GET_PROVINCES',
      value: resp.getProvinceList()
    })
    
  }

  const getDistrictList = (province) => {
    let resp = new TurkeyProvDist()
    let dist = resp.getDistrictList(province);

    dispatch({    //- Get districts when we chose province
      type: 'GET_DISTRICTS',
      value: dist
    })

  }
  
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

  //- Current Table Funcs
  useEffect(() => {
    showCurrent();
  }, [])
  
  const showCurrent = async () => {
    let t = new Table(Current.showCurrent)

    let tbl = await t.getData();
    console.log(tbl);
  }
  
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
    ...state,
    dispatch,

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