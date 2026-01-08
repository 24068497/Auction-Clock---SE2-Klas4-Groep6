import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AddAuctionTime = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        startTime: "",
        endTime: "",
        startPrice: 0,
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "startPrice" ? parseFloat(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.endTime <= formData.startTime) {
            setMessage("De veiling kan niet eindigen voordat deze gestart is!");
            return;
        }

        const data = new FormData();
        data.append("StartTime", formData.startTime);
        data.append("EndTime", formData.endTime);
        data.append("StartPrice", formData.startPrice);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5164/api/products/create-auction-time/${id}`, {
                method: "POST",
                body: data,
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setMessage("Veiling succesvol ingesteld!");
            } else {
                const err = await response.text();
                setMessage(err);
            }

        } catch {
            setMessage("Fout bij het verbinden met de server.");
        }
    };

    const styles = {
        page: { display: "flex", justifyContent: "center", alignItems: "center", background: "#e9f0e6", padding: "40px" },
        card: { background: "#fff", padding: "2rem", maxWidth: "400px", width: "100%", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
        title: { textAlign: "center", marginBottom: "1.5rem" },
        label: { display: "block", marginBottom: "0.4rem", fontSize: "14px" },
        input: { width: "100%", padding: "10px", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "6px", outline: "none" },
        message: { textAlign: "center", marginTop: "1rem", color: "#0a5a35", fontWeight: "600" },
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Veiling instellen</h2>

                <form onSubmit={handleSubmit}>
                    <label style={styles.label}>Startprijs (€):</label>
                    <input name="startPrice" type="number" value={formData.startPrice} onChange={handleChange} style={styles.input} required />

                    <label style={styles.label}>Starttijd:</label>
                    <input name="startTime" type="time" value={formData.startTime} onChange={handleChange} style={styles.input} required />

                    <label style={styles.label}>Eindtijd:</label>
                    <input name="endTime" type="time" value={formData.endTime} onChange={handleChange} style={styles.input} required />

                    <button type="submit" className="btn form-btn">Veiling opslaan</button>
                </form>

                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

export default AddAuctionTime;
