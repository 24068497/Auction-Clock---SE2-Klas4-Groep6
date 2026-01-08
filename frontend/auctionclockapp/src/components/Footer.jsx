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

                    <div class="col">
                        <img src="img/Logo_Florabid-Photoroom.png" width="100px" class="mt-2"></img>
                        </div>

                        <div className="col text-white">
                            <h6>Contactgegevens FloraBid:</h6>
                            <p>
                                Tel:  +31 12 345 67 89<br />
                                Adres: LaanVanSlechtOnderwijs 1<br />
                                Afdeling: SE
                            </p>
                        </div>

                    </div>
                </footer>
        );
    }
}

export default Footer;