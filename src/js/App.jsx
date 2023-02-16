import AllRoutes from './AllRoutes'
import MainProvider from './context/MainContext'
import CurrentProvider from './context/CurrentContext'
import CurrentActivityProvider from './context/CurrentActivityContext'

function App() {
  return (
    <MainProvider>
      <CurrentProvider>
        <CurrentActivityProvider>

          <AllRoutes />
        
        </CurrentActivityProvider>
      </CurrentProvider>
    </MainProvider>
  )
}

export default App
