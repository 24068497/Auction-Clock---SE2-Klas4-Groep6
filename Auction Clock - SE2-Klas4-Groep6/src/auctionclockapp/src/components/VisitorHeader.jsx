import React from "react";
import { Link } from 'react-router-dom';

class VisitorHeader extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-nav">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>
                        <img src="../img/RoyalFloraHollandlogo.png" width="150px" alt="Royal Flora Holland logo" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item fs-5">
                                <Link className="nav-link" to='/'>
                                    Home
                                </Link>
                            </li>

                            {/* 👇 Nieuwe pagina's toegevoegd */}
                            <li className="nav-item fs-5">
                                <Link className="nav-link" to='/auctionClock/customer'>
                                    Klok
                                </Link>
                            </li>

                            <li className="nav-item fs-5">
                                <Link className="nav-link" to='/auctionClock/admin'>
                                    Klok - Veiling Meester
                                </Link>
                            </li>

                            <li className="nav-item fs-5">
                                <Link className="nav-link" to='/a'>
                                    Product aanmaken
                                </Link>
                            </li>
                        </ul>

                        <span className="navbar-text fs-5">
                            <Link className="nav-link" to='/register'>
                                Registreren
                            </Link>
                        </span>

                        <span className="navbar-text fs-5">
                            <Link className="nav-link" to='/login'>
                                Inloggen
                            </Link>
                        </span>

                    </div>
                </div>
            </nav>
        );
    }
}

export default VisitorHeader;
