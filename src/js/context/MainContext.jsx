import { createContext, useContext, useState } from 'react'

const Context = createContext();

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
    <Context.Provider value={data}>
      {children}
    </Context.Provider>
  )
}

export const useMain = () => useContext(Context)
export default Provider