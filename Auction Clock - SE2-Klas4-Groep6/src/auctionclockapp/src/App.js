import Home from './pages/Home';
import Login from './pages/Login';
import Privacy from './pages/Privacy';

import VisitorHeader from './components/VisitorHeader';
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="page">
            <Router>
                <VisitorHeader />

                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/privacy' element={<Privacy />} />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </main>

                <Footer />

            </Router>
        </div>
    )
}

export default App;