import React, { useState } from "react";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startPrice: 0,
        auctionDate: "",
        auctionId: 0,
        company: 0,
        customer: 0,
        photo: null,
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData({ ...formData, photo: files[0] });
        } else {
            let newValue = value;

            // Zet bepaalde velden om naar integer
            if (["startPrice", "auctionId", "company", "customer"].includes(name)) {
                newValue = value === "" ? "" : parseInt(value, 10);
            }

            setFormData({ ...formData, [name]: newValue });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const auctionDate = new Date(formData.auctionDate);

        if (auctionDate < currentDate) {
            setMessage("Geef een geldige datum mee. Let op dat de datum nog niet verstreken is!");
            return;
        }

        console.log(currentDate);
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("startPrice", formData.startPrice);
        data.append("auctionDate", formData.auctionDate);
        data.append("company", formData.company);
        if (formData.photo) data.append("photo", formData.photo);

        try {

            const response = await fetch("http://localhost:5164/api/products", {
                method: "POST",
                body: data,
            });

                if (response.ok) {
                    setMessage("Product succesvol toegevoegd!");
                    setFormData({
                        name: "",
                        description: "",
                        startPrice: 0,
                        auctionDate: "",
                        company: 0,
                        photo: null,
                    });
                } else {
                    setMessage("Er ging iets mis bij het toevoegen van het product.");
                }
        } catch (error) {
            console.error(error);
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
                <h2 style={styles.title}>Nieuw Product Aanmaken</h2>
                <form onSubmit={handleSubmit}>
                    <label style={styles.label}>Naam:</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Productnaam" style={styles.input} required />

                    <label style={styles.label}>Beschrijving:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Korte beschrijving" style={{ ...styles.input, height: "80px" }} />

                    <label style={styles.label}>Startprijs (€):</label>
                    <input name="startPrice" type="number" step="1" value={formData.startPrice} onChange={handleChange} placeholder="Bijv. 49" style={styles.input} required />

                    <label style={styles.label}>Veilingdatum:</label>
                    <input name="auctionDate" type="date" value={formData.auctionDate} onChange={handleChange} style={styles.input} required />

                    <label style={styles.label}>Bedrijf (Company ID):</label>
                    <input name="company" type="number" value={formData.company} onChange={handleChange} style={styles.input} required />

                    <label style={styles.label}>Foto uploaden:</label>
                    <input name="photo" type="file" accept="image/*" onChange={handleChange} style={styles.input} />

                    <button type="submit" class="btn form-btn">Product Toevoegen</button>
                </form>
                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

export default AddProduct;
 