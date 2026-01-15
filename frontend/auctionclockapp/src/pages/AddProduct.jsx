import React, { useState } from "react";

// Het aanmaken van een nieuw product // 
const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        minimumPrice: 0,
        auctionDate: "",
        photo: null,
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData({ ...formData, photo: files[0] });
        } else {
            let newValue = value;

            if (["minimumPrice"].includes(name)) {
                newValue = value === "" ? "" : parseInt(value, 10);
            }

            setFormData({ ...formData, [name]: newValue });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const auctionDate = new Date(formData.auctionDate);

        currentDate.setHours(0, 0, 0, 0);
        auctionDate.setHours(0, 0, 0, 0);

        if (auctionDate < currentDate) {
            setMessage("Geef een geldige datum mee. Let op dat de datum nog niet verstreken is!");
            return;
        }

        const token = localStorage.getItem("token"); 

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("minimumPrice", formData.minimumPrice);
        data.append("auctionDate", formData.auctionDate);

        try {
            // Product aanmaken via de API //
            const response = await fetch("http://localhost:5164/api/products/create-product", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(`Fout bij het aanmaken van product: ${errorData.title || 'Onbekende fout'}`);
                return;
            }

            const result = await response.json();
            const productId = result.productId;

            if (formData.photo) {
                const photo = new FormData();
                photo.append("photo", formData.photo);

                await fetch(`http://localhost:5164/api/products/upload-photo?productId=${productId}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: photo
                });
            }

            if (response.ok) {
                setMessage("Product succesvol toegevoegd!");
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
                    <input name="name" value={formData.name} onChange={handleChange} style={styles.input} required />

                    <label style={styles.label}>Beschrijving:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...styles.input, height: "80px" }} />

                    <label style={styles.label}>Minimumprijs (€):</label>
                    <input name="minimumPrice" type="number" value={formData.minimumPrice} onChange={handleChange} style={styles.input} required />

                    <label style={styles.label}>Veilingdatum:</label>
                    <input name="auctionDate" type="date" value={formData.auctionDate} onChange={handleChange} style={styles.input} required />

                    <label style={styles.label}>Foto uploaden:</label>
                    <input name="photo" type="file" accept="image/*" onChange={handleChange} style={styles.input} />

                    <button type="submit" className="btn form-btn">Product opslaan</button>
                </form>

                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

export default AddProduct;