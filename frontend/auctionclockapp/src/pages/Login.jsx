import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleLogin = async () => {
        this.setState({ error: "" });

        if (!this.state.email || !this.state.password) {
            this.setState({ error: "Vul e-mail en wachtwoord in" });
            return;
        }

        const dto = {
            email: this.state.email,
            password: this.state.password
        };

        try {
            const response = await fetch("http://localhost:5164/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto)
            });

            if (!response.ok) {
                this.setState({ error: "Login mislukt, controleer uw gegevens" });
                return;
            }

            const data = await response.json();
            const token = data.token;
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            // Redirect op basis van rol
            if (role === "Admin") {
                window.location.href = "/admin/dashboard";
            } else if (role === "Auctioneer") {
                window.location.href = "/Auctioneer/dashboard";
            } else if (role === "Koper") {
                window.location.href = "/Koper/dashboard";
            } else if (role === "Verkoper") {
                window.location.href = "/Verkoper/dashboard";
            } else {
                window.location.href = "/"; 
            }

        } catch (error) {
            console.error("Netwerkfout:", error);
            this.setState({ error: "Er is een netwerkfout opgetreden" });
        }
    };

    render() {
        const styles = {
            page: { display: "flex", justifyContent: "center", alignItems: "center", background: "#e9f0e6", padding: "40px" },
            card: { background: "#ffffff", padding: "2rem", maxWidth: "350px", width: "100%", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
            title: { textAlign: "center", marginBottom: "1.5rem" },
            label: { display: "block", marginBottom: "0.4rem", fontSize: "14px" },
            input: { width: "100%", padding: "10px", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "6px", outline: "none" },
            error: { color: "red", textAlign: "center", marginBottom: "1rem" }
        };

        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Inloggen</h2>
                    {this.state.error && <div style={styles.error}>{this.state.error}</div>}
                    <form>
                        <label htmlFor="email" style={styles.label}>E-mailadres:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Uw e-mailadres"
                            style={styles.input}
                            value={this.state.email}
                            onChange={this.handleChange}
                        />

                        <label htmlFor="password" style={styles.label}>Wachtwoord:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Uw wachtwoord"
                            style={styles.input}
                            value={this.state.password}
                            onChange={this.handleChange}
                        />

                        <button type="button" className="form-btn" onClick={this.handleLogin}>
                            Login
                        </button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: "1rem" }}>
                        Nog geen account?{" "}
                        <Link to="/register" style={{ color: "#1e8d5a", fontWeight: "600", textDecoration: "none" }}>
                            Registreer hier
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;
