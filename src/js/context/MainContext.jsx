import { Modal } from 'flowbite';
import { createContext, useContext, useState } from 'react'

const MainContext = createContext();

const Provider = ({ children }) => {
  const [sidePanel, setSidePanel] = useState(false)
  const [errorText, setErrorText] = useState("");
  
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
    
    let el = document.getElementById("loadingModal");
    const modal = new Modal(el, options);
    
    return modal;
  }

  //f Function Load for error handling and loading
  const funcLoad = async (func, ...arg) => {
    let modal = createLoadingModal()
    modal.show();

    try {
      await func(...arg)
    } catch (error) {
      console.log(error);
    }
    
    modal.hide();
  }

  const main = {
    //* Refs

    //* States, Variables etc.
    errorText,
    sidePanel,

    //* Functions
    createLoadingModal,
    funcLoad,
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