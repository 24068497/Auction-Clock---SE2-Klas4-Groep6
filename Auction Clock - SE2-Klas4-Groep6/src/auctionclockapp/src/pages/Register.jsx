import React from "react";
import { Link } from "react-router-dom";

class Registreren extends React.Component {
    render() {
        const styles = {
            page: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
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
            button: {
                width: "100%",
                padding: "10px",
                background: "linear-gradient(180deg, #1e8d5a, #0a5a35)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
            },
        };

        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Registreren</h2>
                    <form>
                        <label htmlFor="firstname" style={styles.label}>Voornaam:</label>
                        <input id="firstname" type="text" style={styles.input} placeholder="Uw voornaam" />

                        <label htmlFor="lastname" style={styles.label}>Achternaam:</label>
                        <input id="lastname" type="text" style={styles.input} placeholder="Uw achternaam" />

                        <label htmlFor="company" style={styles.label}>Bedrijfsnaam:</label>
                        <input id="company" type="text" style={styles.input} placeholder="Naam van uw bedrijf" />

                        <label htmlFor="kvk" style={styles.label}>KVK-nummer:</label>
                        <input id="kvk" type="text" style={styles.input} placeholder="Voer uw KVK-nummer in" />

                        <label htmlFor="adres" style={styles.label}>Bedrijfsadres:</label>
                        <input id="city" type="text" style={styles.input} placeholder="Straatnaam en huisnummer van bedrijf" />

                        <label htmlFor="plaats" style={styles.label}>Bedrijfsplaats:</label>
                        <input id="address" type="text" style={styles.input} placeholder="Plaats van uw bedrijf" />

                        <label htmlFor="Telefoonnummer" style={styles.label}>Telefoonnummer:</label>
                        <input id="email" type="email" style={styles.input} placeholder="Uw Telefoonnummer" />

                        <label htmlFor="email" style={styles.label}>E-mailadres:</label>
                        <input id="email" type="email" style={styles.input} placeholder="Uw e-mailadres" />

                        <label htmlFor="password" style={styles.label}>Wachtwoord:</label>
                        <input id="password" type="password" style={styles.input} placeholder="Kies een wachtwoord" />

                        <label htmlFor="confirmPassword" style={styles.label}>Bevestig wachtwoord:</label>
                        <input id="confirmPassword" type="password" style={styles.input} placeholder="Herhaal wachtwoord" />

                        <button type="button" style={styles.button}>Registreren</button>
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
