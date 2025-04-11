import { Routes, Route } from 'react-router-dom';
import AppBarNav from './components//AppBarNav';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage'
import TrainingsPage from './pages/TrainingsPage';

function App() {
  return (
    <>
        <AppBarNav />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customers' element={<CustomersPage />} />
          <Route path='/trainings' element={<TrainingsPage />} />
        </Routes>
    </>
  )
}

export default App
