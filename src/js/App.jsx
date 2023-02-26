import AllRoutes from './AllRoutes'
import MainProvider from './context/MainContext'
import CurrentProvider from './context/CurrentContext'
import CurrentActivityProvider from './context/CurrentActivityContext'
import StockProvider from './context/StockContext'
import OrdersProvider from './context/OrdersContext'
import OrdersEntryProvider from './context/OrdersEntryContext'

function App() {
  return (
    <MainProvider>
      <CurrentProvider>
        <CurrentActivityProvider>
          <StockProvider>
            <OrdersProvider>
              <OrdersEntryProvider>

                <AllRoutes />
          
              </OrdersEntryProvider>
            </OrdersProvider>
          </StockProvider>
        </CurrentActivityProvider>
      </CurrentProvider>
    </MainProvider>
  )
}

export default App
