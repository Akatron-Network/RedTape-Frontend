import { useRef, useEffect, createContext, useContext, useReducer } from 'react';
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
    table_columns: ["ID", "CARİ AD", "TC KİMLİK NUMARASI", "TELEFON", "ADRES"], //, removed ["order"]
    table_rows: ["id", "name", "identification_no", "phone", "address"],        //, removed ["order"]
    render_table: "",
    editable: false,
    current_details: {},
    all_currents: []
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
  
  var current_details = {
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

    dispatch({    //. Get districts when we chose province
      type: 'GET_DISTRICTS',
      value: dist
    })

  }
  
  const createCurrent = async () => {
    let create = await Current.createCurrent(current_details);
    console.log(create);

    showCurrentList();    
    clearCurrentInputs();
  }
  
  const clearCurrentInputs = () => {

    for (let i of currentInputs) {                                //. Loop for clear inputs
      if (i === currentProvinceRef || i === currentDistrictRef) { //. Check select inputs
        i.current.value = "default"
      }
      else {
        i.current.value = ""
      }
    }
    
    dispatch({        //. Change editable
      type: 'EDITABLE',
      value: false
    })

    dispatch({        //. Current details clear
      type: 'CURRENT_DETAILS',
      value: {}
    })

  }

  //- Current Table Funcs
  useEffect(() => {
    showCurrentList();
  }, [])

  //? Show spesific currents
  const showCurrentList = async () => {
    let t = new Table(Current.showCurrent, state.table_columns, state.table_rows);
    let dt = await t.getData();
    console.log(dt);

    dispatch({                //. Set all currents
      type: 'ALL_CURRENTS',
      value: dt
    })

    t.setExecuteButtons([     //. Buttons in the table
      {
        func: (id) => getCurrentDetails(id),
        class: "golden-btn shadow-md px-2 w-fit rounded-[4px] active:scale-90",
        type: "edit",
        icon: "fa-solid fa-pen-to-square"
      },
      {
        func: (id) => removeCurrent(id),
        class: "ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90",
        type: "remove",
        icon: "fa-solid fa-xmark"
      }
    ])

    dispatch({               //. Get rendered table
      type: 'RENDER_TABLE',
      render: t.render()
    })
  }
  
  //? Get current details to fill inputs
  const getCurrentDetails = async (id) => {
    let dt = await Current.getCurrent(id)
    console.log(dt);
    
    dispatch({        //. Set current details
      type: 'CURRENT_DETAILS',
      value: dt
    })

    dispatch({        //. Change editable
      type: 'EDITABLE',
      value: true
    })
    
    currentNameRef.current.value = dt.details.name,
    currentAddressRef.current.value = dt.details.address,
    currentProvinceRef.current.value = dt.details.province
    currentDistrictRef.current.value = dt.details.district
    currentTaxOfficeRef.current.value = dt.details.tax_office
    currentTaxNoRef.current.value = dt.details.tax_no
    currentIDNoRef.current.value = dt.details.identification_no
    currentPhoneIRef.current.value = dt.details.phone
    currentPhoneIIRef.current.value = dt.details.phone_2
    currentMailRef.current.value = dt.details.mail
    currentCodeIRef.current.value = dt.details.code_1
    currentCodeIIRef.current.value = dt.details.code_2
    currentCodeIIIRef.current.value = dt.details.code_3
    currentCodeIVRef.current.value = dt.details.code_4
    currentDescriptionRef.current.value = dt.details.description
    
  }

  //? Apply current edit
  const editCurrent = async () => {
    let cr = await details.editCurrent(current_details)
    console.log(cr);
    
    dispatch({        //. Change editable
      type: 'EDITABLE',
      value: false
    })

  }
  
  const removeCurrent = async (id) => {
    let rmv = await Current.removeCurrent(id);
    console.log(rmv);

    showCurrentList();
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
    editCurrent,
    getCurrentDetails,
    getDistrictList,
    getProvinceList,
    removeCurrent,

  }

  return (
    <CurrentContext.Provider value={current}>
      {children}
    </CurrentContext.Provider>
  )
}

export const useCurrent = () => useContext(CurrentContext)
export default Provider