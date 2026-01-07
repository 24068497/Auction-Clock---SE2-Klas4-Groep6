import React, { useState } from "react";
import { useParams } from 'react-router-dom';

const AddAuctionTime = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        startTime: "",
        endTime: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startTime = formData.startTime;
        const endTime = formData.endTime;

        if (endTime < startTime || endTime == startTime) {
            setMessage("De veiling kan niet eindigen voordat deze van start is geweest!");
            return;
        }

        const data = new FormData();
        data.append("StartTime", startTime);
        data.append("EndTime", endTime);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5164/api/Products/create-auction-time/${id}`, {
                method: "POST",
                body: data,
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (response.ok) {
                setMessage("De veilingstijden zijn succesvol toegevoegd aan het product!");
                setFormData({
                    startTime: "",
                    endTime: "",
                });
            } else {
                setMessage("Er ging iets mis tijdens het toevoegen van de veilingsdatum.");
            }

        } catch (error) {
            console.error(error);
            setMessage("Fout bij het verbinden met de server.");
        }
    }

    const styles = {
        page: { display: "flex", justifyContent: "center", alignItems: "center", background: "#e9f0e6", padding: "40px" },
        card: { background: "#fff", padding: "2rem", maxWidth: "400px", width: "100%", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
        title: { textAlign: "center", marginBottom: "1.5rem" },
        label: { display: "block", marginBottom: "0.4rem", fontSize: "14px" },
        input: { width: "100%", padding: "10px", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "6px", outline: "none" },
        message: { textAlign: "center", marginTop: "1rem", color: "#0a5a35", fontWeight: "600" },
    };

    return (
        <>
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Veilingstijden bepalen</h2>
                    <form onSubmit={handleSubmit}>
                        <label style={styles.label}>StartTijd:</label>
                        <input name="startTime" type="time" value={formData.startTime} onChange={handleChange} style={styles.input} required />

                        <label style={styles.label}>EindTijd:</label>
                        <input name="endTime" type="time" value={formData.endTime} onChange={handleChange} style={styles.input} required />

                        <button type="submit" class="btn form-btn">Veilingstijden opslaan</button>
                    </form>
                    {message && <p style={styles.message}>{message}</p>}
                </div>
            </div>
        </>
    );
};

export default AddAuctionTime;