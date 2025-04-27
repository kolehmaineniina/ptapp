import { Routes, Route } from 'react-router-dom';
import AppBarNav from './components//AppBarNav';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage'
import CustomerDetailsPage from './pages/CustomerDetailsPage';

function App() {
  return (
    <>
        <AppBarNav />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customers' element={<CustomersPage />} />
          <Route path='/customers/:id' element={<CustomerDetailsPage />} />
        </Routes>
    </>
  )
}

export default App
