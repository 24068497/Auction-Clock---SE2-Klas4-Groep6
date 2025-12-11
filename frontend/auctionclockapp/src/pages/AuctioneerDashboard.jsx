import React from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';

class AuctioneerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            role: ""
        };
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            this.setState({
                name: decoded["name"],
                role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            });
        } catch (err) {
            console.error("Fout bij decoderen token", err);
        }
    };

    render() {
        return (
            <div className="container mt-5">
                <h1>Auctioneer Dashboard</h1>
                <p>Welkom, {this.state.name}!</p>
                <p>Jouw rol: {this.state.role}</p>
                <Link className="nav-link text-dark me-3" to='/admin/auction'>Naar Veilingklok</Link>
            </div>
        );
    }
}

export default AuctioneerDashboard;
