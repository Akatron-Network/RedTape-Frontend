import { createContext, useContext, useState } from 'react'

const MainContext = createContext();

const Provider = ({ children }) => {
  const [sidePanel, setSidePanel] = useState(false)

  const data = {
    //* Refs

    //* States, Variables etc.
    sidePanel,

    //* Functions
    setSidePanel,
  }

  return (
    <MainContext.Provider value={data}>
      {children}
    </MainContext.Provider>
  )
}

export const useMain = () => useContext(MainContext)
export default Provider