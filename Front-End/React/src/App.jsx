import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Dashboard, DetailReport, FormEditReport, FormReport, YourReport } from './pages/Dashboard';
import Admin from './pages/Admin';
import useClearReport from './utils/clearReport';

function App() {
    useClearReport();
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='dashboard-admin' element={<Admin />} />
                <Route path='/your-report' element={<YourReport />} />
                <Route path='/detail/:id' element={<DetailReport />} />
                <Route path='/form-report' element={<FormReport />} />
                <Route path='/form-edit/:id' element={<FormEditReport />} />
            </Routes>
        </Router>
    );
}

export default App;
