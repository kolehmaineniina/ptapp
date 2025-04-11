import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppBarNav from './components/Navigation/AppBarNav';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage';
import TrainingsPage from './pages/TrainingsPage';

function App() {
  return (
    <BrowserRouter>
        <AppBarNav />
    </BrowserRouter>
  )
}

export default App
