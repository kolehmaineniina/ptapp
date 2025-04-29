import { Routes, Route } from 'react-router-dom';
import AppBarNav from './components//AppBarNav';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage'
import CustomerProfile from './pages/CustomerProfilePage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBarNav />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customers' element={<CustomersPage />} />
          <Route path='/customers/:id' element={<CustomerProfile />} />
        </Routes>
      </LocalizationProvider>
    </>
  )
}

export default App
