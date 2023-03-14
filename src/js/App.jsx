import AllRoutes from './AllRoutes'
import AdminPanelProvider from './context/AdminPanelContext'
import MainProvider from './context/MainContext'
import CurrentProvider from './context/CurrentContext'
import CurrentActivityProvider from './context/CurrentActivityContext'
import StockProvider from './context/StockContext'
import OrdersProvider from './context/OrdersContext'
import OrdersEntryProvider from './context/OrdersEntryContext'
import TasksProvider from './context/TasksContext';


function App() {
  return (
    <AdminPanelProvider>
      <MainProvider>
        <CurrentProvider>
          <CurrentActivityProvider>
            <StockProvider>
              <OrdersProvider>
                <OrdersEntryProvider>
                  <TasksProvider>

                    <AllRoutes />

                  </TasksProvider>
                </OrdersEntryProvider>
              </OrdersProvider>
            </StockProvider>
          </CurrentActivityProvider>
        </CurrentProvider>
      </MainProvider>
    </AdminPanelProvider>
  )
}

export default App
