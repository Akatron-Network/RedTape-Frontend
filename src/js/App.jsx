import AllRoutes from './AllRoutes'
import MainProvider from './context/MainContext'
import CurrentProvider from './context/CurrentContext'

function App() {
  return (
    <MainProvider>
      <CurrentProvider>

        <AllRoutes />
        
      </CurrentProvider>
    </MainProvider>
  )
}

export default App
