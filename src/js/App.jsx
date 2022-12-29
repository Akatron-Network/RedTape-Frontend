import AllRoutes from './AllRoutes'
import MainProvider from './context/MainContext'

function App() {
  return (
    <MainProvider>
      <AllRoutes />
    </MainProvider>
  )
}

export default App
