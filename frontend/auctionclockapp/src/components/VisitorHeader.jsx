import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { navItems } from "./NavItems";

function VisitorHeader() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    // Bij mount: haal token op en decodeer rol + naam
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

    // Guest menu voor niet-ingelogde bezoekers
    const guestMenu = [
        { name: "Home", path: "/" },
        { name: "Producten", path: "/products" },
        { name: "Privacy", path: "/privacy" },
    ];

    // Kies menu op basis van rol, fallback naar guest
    const menu = user?.role ? navItems[user.role] : guestMenu;

    return (
        <nav className="navbar navbar-expand-lg bg-nav">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Logo</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    {/* Menu items dynamisch renderen */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {menu.map(item => (
                            <li key={item.path} className="nav-item fs-5">
                                <Link className="nav-link text-dark" to={item.path}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Login/Logout */}
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
