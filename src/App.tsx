import { Routes, Route } from 'react-router-dom';
import AppBarNav from './components//AppBarNav';
import CustomersPage from './pages/CustomersPage'
import CustomerProfile from './pages/CustomerProfilePage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Container } from '@mui/material';
import { getCustomers } from './api/customers';
import { useQuery } from '@tanstack/react-query';

function App() {

  const { data: customerData, isLoading: customersLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });
  
  const customers = customerData?._embedded?.customers ?? [];

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBarNav customers={customers}/>
        <Container maxWidth='lg' sx={{ py: 3 }}>
        <Routes>
          <Route path='/' element={<CustomersPage customers={customers} isLoading={customersLoading} />} />
          <Route path='/customers/:id' element={<CustomerProfile />} />
        </Routes>
        </Container>
      </LocalizationProvider>
    </Box>
  )
}

export default App
