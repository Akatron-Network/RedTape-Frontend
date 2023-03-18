import { Modal } from 'flowbite';
import { createContext, useContext, useState } from 'react'

const MainContext = createContext();

const Provider = ({ children }) => {

  const [sidePanel, setSidePanel] = useState(false)
  const [errorText, setErrorText] = useState({code: "", message: "", response: ""});
  const [errorModal, setErrorModal] = useState({});
  const [adminAll, setAdminAll] = useState(true)
  
  //f Loading Modal
  const createLoadingModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("loadingModal");
    const modal = new Modal(el, options);
    
    return modal;
  }

  //f Error Modal
  const createErrorModal = () => {
    const options = {
      backdrop: 'static',
    };
    
    let el = document.getElementById("errorModal");
    const modal = new Modal(el, options);

    setErrorModal(modal);
    
    return modal;
  }

  const hideErrorModal = () => {
    errorModal.hide();

    setErrorModal({});
  }

  //f Function Load for error handling and loading
  const funcLoad = async (func, ...arg) => {
    let loading_modal = createLoadingModal();
    let error_modal = createErrorModal();
    
    try {
      loading_modal.show();

      await func(...arg)

      loading_modal.hide();
      
    } catch (error) {
      loading_modal.hide();
      error_modal.show();

      let response = undefined;
      if(error.response !== undefined && error.response !== null) response = error.response.data.Data
      setErrorText({code: error.code, message: error.message, response: response})
    }
  }

  //f Admin Check
  const adminCheck = async () => {
    if(localStorage.user_details !== undefined) var dt = JSON.parse(localStorage.user_details);
    else { return; }
    
    if (dt.admin) { setAdminAll(true) }
    else { setAdminAll(false) }
  }

  const main = {
    //* Refs

    //* States, Variables etc.
    adminAll,
    errorText,
    sidePanel,

    //* Functions
    adminCheck,
    createErrorModal,
    createLoadingModal,
    funcLoad,
    hideErrorModal,
    setSidePanel,
  }

  return (
    <MainContext.Provider value={main}>
      {children}
    </MainContext.Provider>
  )
}

export const useMain = () => useContext(MainContext)
export default Provider