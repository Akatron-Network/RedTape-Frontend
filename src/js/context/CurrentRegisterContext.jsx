import { useRef } from 'react';
import { createContext, useContext, useReducer } from 'react'
import currentRegisterReducer from '../reducer/currentRegisterReducer'

const CurrentRegister = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(currentRegisterReducer, {

  });

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

  const current = {
    //* Refs
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

    //* States, Variables etc.


    //* Functions

  }

  return (
    <CurrentRegister.Provider value={current}>
      {children}
    </CurrentRegister.Provider>
  )
}

export const useCurrentRegister = () => useContext(CurrentRegister)
export default Provider