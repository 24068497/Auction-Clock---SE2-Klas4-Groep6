import React from "react";
import { Link } from "react-router-dom";

class Registreren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            company: "",
            kvk: "",
            adres: "",
            plaats: "",
            telNr: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleRegister = async () => {
        if (!this.validateForm()) {
            alert("Vul alle verplichte velden correct in.");
            return;
        }

        if (this.state.password !== this.state.confirmPassword) {
            alert("Wachtwoorden komen niet overeen!");
            return;
        }

        const dto = {
            name: `${this.state.firstname} ${this.state.lastname}`.trim(),
            email: this.state.email,
            password: this.state.password,
            telNr: this.state.telNr,
        };

        try {
            const response = await fetch("http://localhost:5164/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dto),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Registratie fout:", errorData);
                alert("Registratie mislukt:\n" + JSON.stringify(errorData, null, 2));
                return;
            }

            alert("Registratie succesvol!");
        } catch (error) {
            console.error("Netwerkfout:", error);
            alert("Er is een netwerkfout opgetreden.");
        }
    };
    validateForm = () => {
        const errors = {};
        if (!this.state.firstname) errors.firstname = "Voornaam is verplicht";
        if (!this.state.lastname) errors.lastname = "Achternaam is verplicht";
        if (!this.state.telNr) errors.telNr = "Telefoonnummer is verplicht";
        if (!this.state.email) errors.email = "E-mailadres is verplicht";
        if (!this.state.password) errors.password = "Wachtwoord is verplicht";
        if (this.state.password !== this.state.confirmPassword) errors.confirmPassword = "Wachtwoorden komen niet overeen";

        this.setState({ errors });
        return Object.keys(errors).length === 0; 
    };
    
    
    render() {
        const styles = {
            page: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#e9f0e6",
                padding: "40px",
            },
            card: {
                background: "#ffffff",
                padding: "2rem",
                maxWidth: "400px",
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            },
            title: {
                textAlign: "center",
                marginBottom: "1.5rem",
            },
            label: {
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "14px",
            },
            input: {
                width: "100%",
                padding: "10px",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                outline: "none",
            },
        };

        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Registreren</h2>
                    <form>
                        <input
                            id="firstname"
                            type="text"
                            style={styles.input}
                            placeholder="Uw voornaam"
                            value={this.state.firstname}      
                            onChange={this.handleChange}      
                        />
                        <input
                            id="lastname"
                            type="text"
                            style={styles.input}
                            placeholder="Uw achternaam"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                        />
                        <input
                            id="telNr"
                            type="text"
                            style={styles.input}
                            placeholder="Uw telefoonnummer"
                            value={this.state.telNr}
                            onChange={this.handleChange}
                        />
                        <input
                            id="email"
                            type="email"
                            style={styles.input}
                            placeholder="Uw e-mailadres"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <input
                            id="password"
                            type="password"
                            style={styles.input}
                            placeholder="Kies een wachtwoord"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <input
                            id="confirmPassword"
                            type="password"
                            style={styles.input}
                            placeholder="Herhaal wachtwoord"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                        <button
                            type="button"
                            className="btn form-btn"
                            onClick={this.handleRegister}
                        >
                            Registreren
                        </button>
                    </form>
                    
                    <p style={{ textAlign: "center", marginTop: "1rem" }}>
                        Al een account?{" "}
                        <Link
                            to="/login"
                            style={{ color: "#1e8d5a", fontWeight: "600", textDecoration: "none" }}
                        >
                            Log hier in
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Registreren;
