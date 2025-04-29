import { Routes, Route, Outlet } from 'react-router-dom';
import AppBarNav from './components//AppBarNav';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage'
import CustomerProfile from './pages/CustomerProfilePage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBarNav />
        <Container maxWidth='lg' >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customers' element={<CustomersPage />} />
          <Route path='/customers/:id' element={<CustomerProfile />} />
        </Routes>
        </Container>
      </LocalizationProvider>
    </>
  )
}

export default App
