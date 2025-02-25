import DashboardPage from '@pages/Dashboard';
import LoginPage from '@pages/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;
