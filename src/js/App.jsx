import AllRoutes from './AllRoutes'
import MainProvider from './context/MainContext'
import CurrentProvider from './context/CurrentContext'
import CurrentActivityProvider from './context/CurrentActivityContext'
import StockProvider from './context/StockContext'

function App() {
  return (
    <MainProvider>
      <CurrentProvider>
        <CurrentActivityProvider>
          <StockProvider>

            <AllRoutes />
        
          </StockProvider>
        </CurrentActivityProvider>
      </CurrentProvider>
    </MainProvider>
  )
}

export default App
