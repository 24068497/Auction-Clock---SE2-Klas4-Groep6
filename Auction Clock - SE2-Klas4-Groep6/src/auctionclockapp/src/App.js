import Home from './pages/Home';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Register from './pages/Register';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import AddProduct from './pages/AddProduct';
import AdminAuction from './pages/AdminAuction';
import CustomerAuction from "./pages/CustomerAuction";

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
                        <Route path='/register' element={<Register />} />
                        <Route path='/products' element={<Products />} />
                        <Route path=' /*' element={<NotFound />} />
                        <Route path='/product/add' element={<AddProduct />} />
                        <Route path='/auction/admin' element={<AdminAuction />} />
                        <Route path='/auction/customer' element={<CustomerAuction />} />
                    </Routes>
                </main>

                <Footer />

            </Router>
        </div>
    )
}

export default App;