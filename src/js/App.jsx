import AllRoutes from './AllRoutes'
import AdminPanelProvider from './context/AdminPanelContext'
import MainProvider from './context/MainContext'
import CurrentProvider from './context/CurrentContext'
import CurrentActivityProvider from './context/CurrentActivityContext'
import StockProvider from './context/StockContext'
import OrdersProvider from './context/OrdersContext'
import OrdersEntryProvider from './context/OrdersEntryContext'
import TasksProvider from './context/TasksContext';
import DashboardProvider from './context/DashboardContext'
import OffersProvider from './context/OffersContext'
import OffersEntryProvider from './context/OffersEntryContext'


function App() {
  return (
    <>
    
      <MainProvider>
        <DashboardProvider>
          <AdminPanelProvider>
            <CurrentProvider>
              <CurrentActivityProvider>
                <StockProvider>
                  <OrdersProvider>
                    <OrdersEntryProvider>
                      <TasksProvider>
                        <OffersProvider>
                          <OffersEntryProvider>

                            <AllRoutes />
                            
                          </OffersEntryProvider>
                        </OffersProvider>
                      </TasksProvider>
                    </OrdersEntryProvider>
                  </OrdersProvider>
                </StockProvider>
              </CurrentActivityProvider>
            </CurrentProvider>
          </AdminPanelProvider>
        </DashboardProvider>
      </MainProvider>
      
    </>
  )
}

export default App
