import React from "react";

class Login extends React.Component {
    render() {
        const styles = {
            page: {
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                minHeight: "100vh",
                background: "#e9f0e6",
                padding: "40px",
            },
            card: {
                background: "#ffffff",
                padding: "2rem",
                maxWidth: "350px",
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
            rememberRow: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "1rem",
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
                    <h2 style={styles.title}>Inloggen</h2>
                    <form>
                        <label htmlFor="username" style={styles.label}>
                            Gebruikersnaam:
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Voer uw gebruikersnaam in"
                            style={styles.input}
                        />

                        <label htmlFor="password" style={styles.label}>
                            Wachtwoord:
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Voer uw wachtwoord in"
                            style={styles.input}
                        />
                        <button type="button" style={styles.button}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login
