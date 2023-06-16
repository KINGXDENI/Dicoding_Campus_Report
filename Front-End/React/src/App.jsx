import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Dashboard, DetailReport, FormReport, YourReport } from './pages/Dashboard';
import Admin from './pages/Admin';
import { isUserLoggedIn, isAdminLoggedIn } from './components/validation';
import useClearReport from './components/clearReport';

function App() {
    useClearReport();
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='dashboard' element={ isUserLoggedIn() ? <Dashboard /> : <Navigate to='/login' />} />
                <Route path='dashboard-admin' element={ isAdminLoggedIn() ? <Admin /> : <Navigate to='/login' />} />
                <Route path='/your-report' element={<YourReport />} />
                <Route path='/detail/:id' element={<DetailReport />} />
                <Route path='/form-report' element={<FormReport />} />
            </Routes>
        </Router>
    );
}

export default App;
