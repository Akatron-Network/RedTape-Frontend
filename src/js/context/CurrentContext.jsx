import { useRef, createContext, useContext, useReducer } from 'react';
import currentReducer from '../reducer/currentReducer'
import Current from '../libraries/models/Current'
import TurkeyProvDist from '../libraries/tools/TurkeyProvDist'
import Table from '../libraries/tools/Table';
import {Modal} from 'flowbite';
import { useMain } from './MainContext';

const CurrentContext = createContext();

const Provider = ({ children }) => {
  const { funcLoad } = useMain();

  //b State and Ref Management ----------------------------------------

  //- Current Details States
  const [state, dispatch] = useReducer(currentReducer, {
    districts: [],
    provinces: [],
    table_columns: ["CARİ KOD", "CARİ İSİM", "CARİ TİP", "TELEFON", "ADRES"], //, removed ["order"]
    table_rows: ["id", "name", "current_type", "phone", "address"],        //, removed ["order"]
    render_table: "",
    current_details: {},
    all_currents: [],
    edit_current_modal: {},
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
  const currentTypeRef = useRef("")
  const currentCodeIRef = useRef("")
  const currentCodeIIRef = useRef("")
  const currentCodeIIIRef = useRef("")
  const currentCodeIVRef = useRef("")
  const currentDescriptionRef = useRef("")

  const currentNameEditRef = useRef("")
  const currentAddressEditRef = useRef("")
  const currentProvinceEditRef = useRef("")
  const currentDistrictEditRef = useRef("")
  const currentTaxOfficeEditRef = useRef("")
  const currentTaxNoEditRef = useRef("")
  const currentIDNoEditRef = useRef("")
  const currentPhoneIEditRef = useRef("")
  const currentPhoneIIEditRef = useRef("")
  const currentMailEditRef = useRef("")
  const currentTypeEditRef = useRef("")
  const currentCodeIEditRef = useRef("")
  const currentCodeIIEditRef = useRef("")
  const currentCodeIIIEditRef = useRef("")
  const currentCodeIVEditRef = useRef("")
  const currentDescriptionEditRef = useRef("")

  //b Functions etc. ------------------------------------------------------
    
  //- New Current Create Funcs
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
    currentTypeRef,
    currentCodeIRef,
    currentCodeIIRef,
    currentCodeIIIRef,
    currentCodeIVRef,
    currentDescriptionRef
  ]

  var currentEditInputs = [
    currentNameEditRef,
    currentAddressEditRef,
    currentProvinceEditRef,
    currentDistrictEditRef,
    currentTaxOfficeEditRef,
    currentTaxNoEditRef,
    currentIDNoEditRef,
    currentPhoneIEditRef,
    currentPhoneIIEditRef,
    currentMailEditRef,
    currentTypeEditRef,
    currentCodeIEditRef,
    currentCodeIIEditRef,
    currentCodeIIIEditRef,
    currentCodeIVEditRef,
    currentDescriptionEditRef
  ]

  const getProvinceList = () => {
    let resp = new TurkeyProvDist()

    dispatch({    //- Get provinces
      type: 'PROVINCES',
      value: resp.getProvinceList()
    })
    
  }

  const getDistrictList = (province) => {
    let resp = new TurkeyProvDist()
    let dist = resp.getDistrictList(province);

    dispatch({    //. Get districts when we chose province
      type: 'DISTRICTS',
      value: dist
    })

    return dist;
  }
  
  const createCurrent = async () => {
    let mail = currentMailEditRef.current.value;
    if (mail === "") mail = undefined

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
      mail: mail,
      current_type: currentTypeRef.current.value,
      code_1: currentCodeIRef.current.value,
      code_2: currentCodeIIRef.current.value,
      code_3: currentCodeIIIRef.current.value,
      code_4: currentCodeIVRef.current.value,
      description: currentDescriptionRef.current.value,
    }

    let create = await Current.createCurrent(current_details);

    await showCurrentList();    
    clearCurrentInputs();
  }
  
  const clearCurrentInputs = () => {

    for (let i of currentInputs) {                                                          //. Loop for clear inputs
      if (i === currentProvinceRef || i === currentDistrictRef || i === currentTypeRef) {   //. Check select inputs
        i.current.value = "default"
      }
      else {
        i.current.value = ""
      }
    }

    dispatch({        //. Current details clear
      type: 'CURRENT_DETAILS',
      value: {}
    })

  }

  //- Current Table Funcs
  //? Show spesific currents
  const showCurrentList = async () => {
    let t = new Table(Current.showCurrent, state.table_columns, state.table_rows);
    let dt = await t.getData();

    dispatch({                //. Set all currents
      type: 'ALL_CURRENTS',
      value: dt
    })

    t.setExecuteButtons([     //. Buttons in the table
      {
        func: (id) => funcLoad(getCurrentDetails, id),
        class: "golden-btn shadow-md px-1 w-8 rounded-md active:scale-90",
        type: "edit",
        icon: "fa-solid fa-pen-to-square"
      },
      {
        func: (id) => funcLoad(removeCurrent, id),
        class: "ml-1 danger-btn shadow-md px-1 w-8 rounded-md active:scale-90",
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
    let dt = await Current.getCurrent(id.id)

    let current_modal = showCurrentModal();
    current_modal.show();
    
    dispatch({        //. Set current details
      type: 'CURRENT_DETAILS',
      value: dt
    })
    
    currentNameEditRef.current.value = dt.details.name,
    currentAddressEditRef.current.value = dt.details.address,
    currentTaxOfficeEditRef.current.value = dt.details.tax_office
    currentTaxNoEditRef.current.value = dt.details.tax_no
    currentIDNoEditRef.current.value = dt.details.identification_no
    currentPhoneIEditRef.current.value = dt.details.phone
    currentPhoneIIEditRef.current.value = dt.details.phone_2
    currentMailEditRef.current.value = dt.details.mail
    currentTypeEditRef.current.value = dt.details.current_type
    currentCodeIEditRef.current.value = dt.details.code_1
    currentCodeIIEditRef.current.value = dt.details.code_2
    currentCodeIIIEditRef.current.value = dt.details.code_3
    currentCodeIVEditRef.current.value = dt.details.code_4
    currentDescriptionEditRef.current.value = dt.details.description

    if (dt.details.province === "" || dt.details.province === undefined || dt.details.province === null) {
      dt.details.province = "default";
    }
    currentProvinceEditRef.current.value = dt.details.province

    let dist = getDistrictList(dt.details.province);    
    for (let d of dist) {
      if (d === dt.details.district) currentDistrictEditRef.current.value = d
    }    
    
  }

  const editCurrent = async (id) => {
    let details = new Current(id)

    let mail = currentMailEditRef.current.value;
    if (mail === "") mail = undefined

    let changes = {
      name: currentNameEditRef.current.value,
      address: currentAddressEditRef.current.value,
      province: currentProvinceEditRef.current.value,
      district: currentDistrictEditRef.current.value,
      tax_office: currentTaxOfficeEditRef.current.value,
      tax_no: currentTaxNoEditRef.current.value,
      identification_no: currentIDNoEditRef.current.value,
      phone: currentPhoneIEditRef.current.value,
      phone_2: currentPhoneIIEditRef.current.value,
      mail: mail,
      current_type: currentTypeEditRef.current.value,
      code_1: currentCodeIEditRef.current.value,
      code_2: currentCodeIIEditRef.current.value,
      code_3: currentCodeIIIEditRef.current.value,
      code_4: currentCodeIVEditRef.current.value,
      description: currentDescriptionEditRef.current.value,
    }

    let cr = await details.editCurrent(changes)

    await showCurrentList();
    hideCurrentModal();
  }
  
  const clearCurrentEditInputs = () => {

    for (let i of currentEditInputs) {                                    //. Loop for clear inputs
      if (i === currentProvinceEditRef || i === currentDistrictEditRef || i === currentTypeEditRef) { //. Check select inputs
        i.current.value = "default"
      }
      else {
        i.current.value = ""
      }
    }
  }

  const removeCurrent = async (id) => {
    let rmv = await Current.removeCurrent(id.id);

    await showCurrentList();
  }

  //- Table Search Funcs
  const filterCurrents = async (event) => {
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
    
    let t = new Table(Current.showCurrent, state.table_columns, state.table_rows);
    let dt = t.dataFilter(newFilter);

    t.setExecuteButtons([     //. Buttons in the table
      {
        func: (id) => getCurrentDetails(id),
        class: "golden-btn shadow-md px-1 w-8 rounded-md active:scale-90",
        type: "edit",
        icon: "fa-solid fa-pen-to-square"
      },
      {
        func: (id) => removeCurrent(id),
        class: "ml-1 danger-btn shadow-md px-1 w-8 rounded-md active:scale-90",
        type: "remove",
        icon: "fa-solid fa-xmark"
      }
    ])

    dispatch({               //. Get rendered table
      type: 'RENDER_TABLE',
      render: t.render()
    })
  }

  //? Create modal object for show-hide etc.
  const showCurrentModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("editCurrentModal");
    const modal = new Modal(el, options);

    dispatch({        //. Set current modal object
      type: 'EDIT_CURRENT_MODAL',
      value: modal
    })

    return modal;
  }

  const hideCurrentModal = () => {
    state.edit_current_modal.hide();
    clearCurrentEditInputs();

    dispatch({        //. Set current modal object
      type: 'EDIT_CURRENT_MODAL',
      value: {}
    })
  }


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
    currentTypeRef,
    currentCodeIRef,
    currentCodeIIRef,
    currentCodeIIIRef,
    currentCodeIVRef,
    currentDescriptionRef,
    
    currentNameEditRef,
    currentAddressEditRef,
    currentProvinceEditRef,
    currentDistrictEditRef,
    currentTaxOfficeEditRef,
    currentTaxNoEditRef,
    currentIDNoEditRef,
    currentPhoneIEditRef,
    currentPhoneIIEditRef,
    currentMailEditRef,
    currentTypeEditRef,
    currentCodeIEditRef,
    currentCodeIIEditRef,
    currentCodeIIIEditRef,
    currentCodeIVEditRef,
    currentDescriptionEditRef,

    //, States, Variables etc.
    ...state,
    dispatch,

    //, Functions
    clearCurrentEditInputs,
    clearCurrentInputs,
    createCurrent,
    editCurrent,
    filterCurrents,
    getCurrentDetails,
    getDistrictList,
    getProvinceList,
    hideCurrentModal,
    removeCurrent,
    showCurrentList,

  }

  return (
    <CurrentContext.Provider value={current}>
      {children}
    </CurrentContext.Provider>
  )
}

export const useCurrent = () => useContext(CurrentContext)
export default Provider