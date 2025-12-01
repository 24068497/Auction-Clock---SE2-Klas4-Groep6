import React from "react";
import { Link } from 'react-router-dom';

class NotFound extends React.Component {

    render() {
        return (
            <div class="container mt-2">
                <i class="bi bi-laptop fs-1"></i>
                <h5>Pagina niet gevonden!</h5>
                <p>
                    Voor uw zoekopdracht is er helaas geen pagina gevonden!<br />
                    Als u terug wilt naar een bestaande pagina kunt u hierboven op Home klikken of via de knop hieronder om terug te keren naar de homepagina van de website.<br />
                    <button class="btn btnStyle"><Link to='/' class="nav-link text-white">Terug naar Home</Link></button>
                </p>
            </div>
        );
    }
}

export default NotFound;