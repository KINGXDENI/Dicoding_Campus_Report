import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Dashboard, DetailReport, FormReport, YourReport } from './pages/Dashboard';
import Admin from './pages/Admin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/dashboard-admin' element={<Admin />} />
                <Route path='/your-report' element={<YourReport />} />
                <Route path='/detail' element={<DetailReport />} />
                <Route path='/form-report' element={<FormReport />} />
            </Routes>
        </Router>
    );
}

export default App;
