import React from "react";
import { Link } from 'react-router-dom';
class VisitorHeader extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-nav">
                <div className="container-fluid">
                    <Link class="navbar-brand" to='/'>
                        <img src="/img/RoyalFloraHollandlogo.png" width="150px"></img>
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item fs-5">
                                <Link class="nav-link text-dark" to='/'>
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item fs-5">
                                <a className="nav-link text-dark" href="/products">Producten</a>
                            </li>
                        </ul>

                        <span class="navbar-text fs-5">
                            <Link class="nav-link text-dark" to='/register'>
                                Registreren
                            </Link>
                        </span>

                        <span class="navbar-text fs-5">
                            <Link class="nav-link text-dark" to='/login'>
                                Inloggen
                            </Link>
                        </span>

                    </div>
                </div>
            </nav>
        )
    }
}

export default VisitorHeader;