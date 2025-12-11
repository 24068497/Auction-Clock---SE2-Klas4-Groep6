import React from "react";
import { jwtDecode } from "jwt-decode";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            loggedIn: false
        };
    }

    componentDidMount() {
        this.checkUser();
    }

    checkUser = () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            this.setState({
                name: decoded["name"],
                loggedIn: true
            });
        } catch (err) {
            console.error("Fout bij decoderen token", err);
        }
    };

    handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(); 
    };

    render() {
        return (
            <>
                <title>Home</title>
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-lg-6 col-md-12">
                            <article className="m-4">
                                <h2>Welkom bij de veilingklok van RoyalFloraHolland</h2>
                                <p>
                                    Bloemen en planten maken onze wereld groener.<br />
                                    Ze kleuren onze huizen, tuinen en buurten en vergroenen onze steden.<br />
                                </p>
                                <p>
                                    Onze coöperatie is een twee-eenheid: we zijn een vereniging én een bedrijf.<br />
                                    We hebben twee doelen: een gezonde en aantrekkelijke coöperatie voor onze leden zijn en blijven én bouwen aan het grootste internationale B2B platform binnen de sierteeltsector.<br />
                                    Duurzaamheid is hierbij een belangrijk fundament. Door bundeling van kennis en kracht bereiken we duurzaam succes, internationale groei en versterken we de coöperatie.<br />
                                </p>
                            </article>
                        </div>

                      
                        <div className="col-lg-6 col-md-12 mt-4">
                            <div className="ratio ratio-16x9">
                                <iframe
                                    src="https://www.youtube.com/embed/nDMpvh0puSU?si=BPKTxo5ZVoW4DB_C"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
