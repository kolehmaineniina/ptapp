import { Routes, Route } from 'react-router-dom';
import AppBarNav from './components//AppBarNav';
import CustomersPage from './pages/CustomersPage'
import CustomerProfile from './pages/CustomerProfilePage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container } from '@mui/material';
import { getCustomers } from './api/customers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TrainigsCalendar from './pages/CalendarPage';

function App() {

  const { data: customerData, isLoading: customersLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });
  
  const customers = customerData?._embedded?.customers ?? [];

  const queryClient = useQueryClient();

  const refreshCustomers = async () => {
    await queryClient.invalidateQueries({ queryKey: ['customers'] });
 }
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBarNav customers={customers}/>
        <Container maxWidth='xl' sx={{ py: 3 }}>
        <Routes>
          <Route path='/' element={<CustomersPage refreshCustomers={refreshCustomers} customers={customers} isLoading={customersLoading} />} />
          <Route path='/calendar' element={<TrainigsCalendar />} />
          <Route path='/customers/:id' element={<CustomerProfile />} />
        </Routes>
        </Container>
      </LocalizationProvider>
    </>
  )
}

export default App
