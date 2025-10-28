import React from "react";
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <div class="container-fluid">
                <footer class="footer bg-footer">

                    <div class="row">
                        <div class="col-12">
                            <button class="btn bg-nav">
                                <Link class="nav-link text-dark" to='/privacy'>
                                    Privacybeleid
                                </Link>
                            </button>
                        </div>
                        <br />
                    </div>

                    <div class="row">

                        <div class="col">
                            <img src="../img/RoyalFloraHollandFooterlogo.png" width="175px"></img>
                        </div>

                        <div class="col text-white">
                            <h6>Contactgegevens RoyalFloraHolland:</h6>
                            <p>
                                Tel:  +31 88 789 89 89<br />
                                Email: <a href="mailto:events@royalfloraholland.com" class="text-decoration-none text-white">events@royalfloraholland.com</a><br />
                                <br />Wij zijn op werkdagen bereikbaar van 9.00 - 17.00 uur
                            </p>
                        </div>

                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;