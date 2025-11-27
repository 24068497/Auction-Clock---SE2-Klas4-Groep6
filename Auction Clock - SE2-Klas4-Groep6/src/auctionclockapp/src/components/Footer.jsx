import React from "react";
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
                <footer className="footer bg-footer">

                    <div className="row">
                        <div className="col-12">
                            <button className="btn bg-nav fs-5">
                                <Link class="nav-link text-dark" to='/privacy'>
                                    Privacybeleid
                                </Link>
                            </button>
                        </div>
                        <br />
                    </div>

                    <div className="row">

                        <div className="col">
                            <img src="../img/RoyalFloraHollandFooterlogo.png" width="175px"></img>
                        </div>

                        <div className="col text-white">
                            <h6>Contactgegevens RoyalFloraHolland:</h6>
                            <p>
                                Tel:  +31 88 789 89 89<br />
                                Email: <a href="mailto:events@royalfloraholland.com" className="text-decoration-none text-white">events@royalfloraholland.com</a><br />
                                <br />Wij zijn op werkdagen bereikbaar van 9.00 - 17.00 uur
                            </p>
                        </div>

                    </div>
                </footer>
        );
    }
}

export default Footer;