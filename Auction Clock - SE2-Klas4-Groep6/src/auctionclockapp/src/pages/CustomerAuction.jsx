// src/pages/CustomerAuction.jsx
import { useEffect, useState } from "react";
import AuctionClock from "../components/AuctionClock";

export default function CustomerAuction() {
    const [products, setProducts] = useState([]);
    const [activeProduct, setActiveProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5164/api/products");
                if (!res.ok) throw new Error("Fout bij ophalen producten");
                const json = await res.json();

                setProducts(json);

                // Zet het eerste product als actief
                if (json.length > 0) setActiveProduct(json[0]);

            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleBuy = (price) => {
        alert("U heeft gekocht voor €" + price.toFixed(2));
        // Optioneel: API call om aankoop op te slaan
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">

                {/* === PRODUCT LIJST LINKS === */}
                <div className="col-md-3 border-end" style={{ maxHeight: "90vh", overflowY: "auto" }}>
                    <h4 className="text-center mb-3">Kavel Volgorde</h4>

                    {loading && <p>Laden…</p>}
                    {error && <p className="text-danger">{error}</p>}

                    <ul className="list-group">
                        {products.map(p => (
                            <li
                                key={p.productId}
                                className={`list-group-item ${activeProduct?.productId === p.productId ? 'active' : ''}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setActiveProduct(p)}
                            >
                                <strong>{p.name}</strong>
                                <br />
                                <small className="text-muted">€ {Number(p.startPrice).toFixed(2)}</small>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* === PRODUCT + KLOK === */}
                <div className="col-md-9 d-flex justify-content-center align-items-start gap-4">

                    {/* Product details */}
                    {activeProduct && (
                        <div className="card p-3 shadow" style={{ width: "350px" }}>
                            <h4>{activeProduct.name}</h4>

                            {activeProduct.imagePath && (
                                <img
                                    src={`http://localhost:5164${activeProduct.imagePath}`}
                                    alt={activeProduct.name}
                                    className="img-fluid rounded mb-2"
                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                />
                            )}

                            <p>{activeProduct.description}</p>
                            <p><strong>Startprijs:</strong> € {Number(activeProduct.startPrice).toFixed(2)}</p>
                        </div>
                    )}

                    {/* Klantenklok (met koopknop) */}
                    <AuctionClock
                        key={activeProduct?.productId}
                        startPrice={activeProduct?.startPrice || 0}
                        productName={activeProduct?.name || ""}
                        role="customer"
                        onBuy={handleBuy}
                    />
                </div>
            </div>
        </div>
    );
}
