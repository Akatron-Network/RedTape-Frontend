import AllRoutes from './AllRoutes'
import MainProvider from './context/MainContext'
import CurrentRegisterProvider from './context/CurrentRegisterContext'

function App() {
  return (
    <MainProvider>
      <CurrentRegisterProvider>

        <AllRoutes />
        
      </CurrentRegisterProvider>
    </MainProvider>
  )
}

export default App
