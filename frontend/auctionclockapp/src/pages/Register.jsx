import React from "react";
import { Link } from "react-router-dom";

class Registreren extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            companyName: "",
            companyAddress: "",
            telNr: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Koper",

            errors: {},
            successMessage: "",
            serverError: ""
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    validateForm = () => {
        // Alles moet worden ingevuld //
        const errors = {};
        if (!this.state.firstname) errors.firstname = "Voornaam is verplicht";
        if (!this.state.lastname) errors.lastname = "Achternaam is verplicht";
        if (!this.state.companyName) errors.companyName = "Bedrijfsnaam is verplicht";
        if (!this.state.companyAddress) errors.companyAddress = "Bedrijfsadres is verplicht";
        if (!this.state.telNr) errors.telNr = "Telefoonnummer is verplicht";
        if (!this.state.email) errors.email = "E-mailadres is verplicht";
        if (!this.state.password) errors.password = "Wachtwoord is verplicht";
        if (this.state.password !== this.state.confirmPassword)
            errors.confirmPassword = "Wachtwoorden komen niet overeen";

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    };

    handleRegister = async () => {
        this.setState({ serverError: "", successMessage: "" });
        // Formulier wordt niet verwerkt niet alles klopt // 
        if (!this.validateForm()) return;

        const dto = {
            name: `${this.state.firstname} ${this.state.lastname}`.trim(),
            email: this.state.email,
            password: this.state.password,
            telNr: this.state.telNr,
            role: this.state.role,
            companyName: this.state.companyName,
            companyAddress: this.state.companyAddress
        };

        try {
            const response = await fetch("http://localhost:5164/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto)
            });

            if (!response.ok) {
                const text = await response.text();
                this.setState({ serverError: text });
                return;
            }

            this.setState({ successMessage: "Registratie succesvol! Je wordt doorgestuurd..." });

            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);

        } catch {
            this.setState({ serverError: "Netwerkfout. Probeer opnieuw." });
        }
    };

    render() {
        const { errors, successMessage, serverError } = this.state;

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
                marginBottom: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                outline: "none",
            },
            error: {
                color: "red",
                fontSize: "13px",
                marginBottom: "0.5rem"
            },
            success: {
                color: "green",
                fontSize: "14px",
                marginBottom: "0.8rem",
                textAlign: "center"
            }
        };

        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Registreren</h2>

                    {serverError && <div style={styles.error}>{serverError}</div>}
                    {successMessage && <div style={styles.success}>{successMessage}</div>}

                    <input id="firstname" style={styles.input} placeholder="Uw voornaam"
                           value={this.state.firstname} onChange={this.handleChange} />
                    {errors.firstname && <div style={styles.error}>{errors.firstname}</div>}

                    <input id="lastname" style={styles.input} placeholder="Uw achternaam"
                           value={this.state.lastname} onChange={this.handleChange} />
                    {errors.lastname && <div style={styles.error}>{errors.lastname}</div>}

                    <input id="companyName" style={styles.input} placeholder="Bedrijfsnaam"
                           value={this.state.companyName} onChange={this.handleChange} />
                    {errors.companyName && <div style={styles.error}>{errors.companyName}</div>}

                    <input id="companyAddress" style={styles.input} placeholder="Bedrijfsadres"
                           value={this.state.companyAddress} onChange={this.handleChange} />
                    {errors.companyAddress && <div style={styles.error}>{errors.companyAddress}</div>}

                    <input id="telNr" style={styles.input} placeholder="Uw telefoonnummer"
                           value={this.state.telNr} onChange={this.handleChange} />
                    {errors.telNr && <div style={styles.error}>{errors.telNr}</div>}

                    <input id="email" type="email" style={styles.input} placeholder="Uw e-mailadres"
                           value={this.state.email} onChange={this.handleChange} />
                    {errors.email && <div style={styles.error}>{errors.email}</div>}

                    <label style={styles.label}>Account type</label>
                    <select id="role" style={styles.input} value={this.state.role} onChange={this.handleChange}>
                        <option value="Koper">Koper</option>
                        <option value="Verkoper">Verkoper</option>
                    </select>

                    <input id="password" type="password" style={styles.input} placeholder="Kies een wachtwoord"
                           value={this.state.password} onChange={this.handleChange} />
                    {errors.password && <div style={styles.error}>{errors.password}</div>}

                    <input id="confirmPassword" type="password" style={styles.input} placeholder="Herhaal wachtwoord"
                           value={this.state.confirmPassword} onChange={this.handleChange} />
                    {errors.confirmPassword && <div style={styles.error}>{errors.confirmPassword}</div>}

                    <button type="button" className="btn form-btn" onClick={this.handleRegister}>
                        Registreren
                    </button>

                    <p style={{ textAlign: "center", marginTop: "1rem" }}>
                        Al een account?{" "}
                        <Link to="/login" style={{ color: "#1e8d5a", fontWeight: "600", textDecoration: "none" }}>
                            Log hier in
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Registreren;
