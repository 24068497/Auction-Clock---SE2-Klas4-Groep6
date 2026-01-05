import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function VisitorHeader() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    name: decoded["name"],
                    role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                });
            } catch (err) {
                console.error("Fout bij decoderen token", err);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/"); // terug naar home
    };

    const handleImageLinks = () => {
        if (user && user.role === "Koper") {
            return (
                <Link className="navbar-brand" to="/Koper/dashboard">
                    <img src="/img/LogoFlorabid.png" width="100px" alt="Logo" />
                </Link>
            );
        } else if (user && user.role === "Verkoper") {
            return (
                <Link className="navbar-brand" to="/Verkoper/dashboard">
                    <img src="/img/LogoFlorabid.png" width="100px" alt="Logo" />
                </Link>
            );
        } else if (user && user.role === "Auctioneer") {
            return (
                <Link className="navbar-brand" to="/Auctioneer/dashboard">
                    <img src="/img/LogoFlorabid.png" width="100px" alt="Logo" />
                </Link>
            );
        } else if (user && user.role === "Admin") {
            return (
                <Link className="navbar-brand" to="/Admin/dashboard">
                    <img src="/img/LogoFlorabid.png" width="100px" alt="Logo" />
                </Link>
            );
        } else {
            return (
                <Link className="navbar-brand" to="/">
                    <img src="/img/LogoFlorabid.png" width="100px" alt="Logo" />
                </Link>
            );
        }
    };

    const handleNavLinks = () => {
        if (user && user.role === "Koper") {
            return (
               <li className="nav-item fs-5">
                  <Link className="nav-link text-dark" to='/Koper/dashboard'>Home</Link>
               </li>
            );
        } else if (user && user.role === "Verkoper") {
            return (
                <li className="nav-item fs-5">
                    <Link className="nav-link text-dark" to='/Verkoper/dashboard'>Home</Link>
                </li>
            );
        } else if (user && user.role === "Auctioneer") {
            return (
                <li className="nav-item fs-5">
                    <Link className="nav-link text-dark" to='/Auctioneer/dashboard'>Home</Link>
                </li>
            );
        } else if (user && user.role === "Admin") {
            return (
                <li className="nav-item fs-5">
                    <Link className="nav-link text-dark" to='/Admin/dashboard'>Home</Link>
                </li>
            );
        }
        else {
            return (
                <li className="nav-item fs-5">
                    <Link className="nav-link text-dark" to='/'>Home</Link>
                </li>
            );
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-nav">
            <div className="container-fluid">
                {handleImageLinks()}

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {handleNavLinks()}

                        <li className="nav-item fs-5">
                            <Link className="nav-link text-dark" to='/products'>Producten</Link>
                        </li>
                        {(!user || (user.role !== 'Admin' && user.role !== 'Auctioneer')) && (
                            <li className="nav-item fs-5">
                                <Link className="nav-link text-dark" to="/auction/customer">
                                    Veiling
                                </Link>
                            </li>
                        )}

                        {user && (user.role === 'Admin' || user.role === 'Auctioneer') && (
                            <li className="nav-item fs-5">
                                <Link className="nav-link text-dark" to="/admin/auction">
                                    Admin Veiling
                                </Link>
                            </li>
                        )}


                    </ul>
                    
                    

                    <div className="d-flex">
                        {user ? (
                            <>
                                <span className="navbar-text me-3 fs-5">
                                    Hallo {user.name}!
                                </span>
                                <button className="btn btn-outline-dark" onClick={handleLogout}>
                                    Uitloggen
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link text-dark me-3" to='/register'>Registreren</Link>
                                <Link className="nav-link text-dark" to='/login'>Inloggen</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default VisitorHeader;
