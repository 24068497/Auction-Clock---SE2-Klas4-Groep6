import React from "react";

class VisitorHeader extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg bg-nav">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html"><img src="../img/RoyalFloraHollandlogo.png" width="150px"></img></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="#">Registreren</a>
                            </li>
                        </ul>

                        <span class="navbar-text">
                            <a class="nav-link" href="login.html">Inloggen</a>
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}

export default VisitorHeader;