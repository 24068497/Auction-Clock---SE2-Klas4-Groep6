import Home from './pages/Home';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Register from './pages/Register';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import AddProduct from './pages/AddProduct';
import AdminDashboard from './pages/AdminDashboard';
import CompanyDashboard from './pages/CompanyDashboard';

import VisitorHeader from './components/VisitorHeader';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

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
                        <Route path='/register' element={<Register />} />
                        <Route path='/products' element={<Products />} />
                        <Route path='/*' element={<NotFound />} />
                        <Route path='/product/add' element={<AddProduct />} />

                        {/* Beveiligde routes */}
                        <Route path='/admin/dashboard' element={
                            <PrivateRoute allowedRoles={['Admin']}>
                                <AdminDashboard />
                            </PrivateRoute>
                        } />

                        <Route path='/company/dashboard' element={
                            <PrivateRoute allowedRoles={['Company']}>
                                <CompanyDashboard />
                            </PrivateRoute>
                        } />
                    </Routes>
                </main>

                <Footer />
            </Router>
        </div>
    )
}

export default App;
