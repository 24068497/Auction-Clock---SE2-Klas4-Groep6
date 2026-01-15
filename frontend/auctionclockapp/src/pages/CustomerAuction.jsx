import { useEffect, useState } from "react";

import AuctionClock from "../components/AuctionClock";

export default function CustomerAuction() {

    const [products, setProducts] = useState([]);

    const [activeProduct, setActiveProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [history, setHistory] = useState(null); // voor historische prijzen //

    useEffect(() => {

        async function load() {

            setLoading(true);

            try {

                const res = await fetch("http://localhost:5164/api/products");

                if (!res.ok) throw new Error("Fout bij ophalen producten");

                const json = await res.json();

                setProducts(json);

                if (json.length > 0) setActiveProduct(json[0]);

            } catch (e) {

                setError(e.message);

            } finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    const handleBuy = async (price) => {

        if (!activeProduct) return;

        // Plaats bod //

        try {

            await fetch(`http://localhost:5164/api/bids/${activeProduct.productId}`, {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ price: price, verkoper: "Verkoper" })

            });

            alert(`U heeft ${activeProduct.name} gekocht voor € ${price.toFixed(2)}`);

        } catch (err) {

            console.error(err);

            alert("Fout bij het plaatsen van het bod.");

        }
    };

    const handleShowHistory = async () => {

        if (!activeProduct) return;

        try {

            const res = await fetch(`http://localhost:5164/api/bids/price-history/${activeProduct.productId}`);

            if (!res.ok) throw new Error("Kon historieprijs niet ophalen");

            const json = await res.json();

            setHistory(json);

        } catch (err) {

            console.error(err);

            alert("Kon historieprijs niet ophalen");

        }
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">

                {/* Product lijst opgehaald uit database */}
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

                                onClick={() => { setActiveProduct(p); setHistory(null); }}
                            >
                                <strong>{p.name}</strong>
                                <br />
                                <small className="text-dark">€ {Number(p.startPrice || 0).toFixed(2)}</small>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Product + klok */}
                <div className="col-md-9 d-flex justify-content-center align-items-start gap-4">

                    {activeProduct && (
                        <>

                            {/* Product details */}
                            <div className="card p-3 mt-4 shadow" style={{ width: "350px" }}>
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
                                <p><strong>Startprijs:</strong> € {Number(activeProduct.startPrice || 0).toFixed(2)}</p>

                                <button

                                    className="btn btn-sm btn-info"

                                    onClick={handleShowHistory}
                                >

                                    Toon Historische Prijzen
                                </button>

                                {history && (
                                    <div className="mt-2 p-2 border rounded" style={{ background: "#f8f9fa" }}>
                                        <p><strong>Gemiddelde prijs:</strong> € {Number(history.overallAverage || 0).toFixed(2)}</p>
                                        <p><strong>Laatste 10 prijzen:</strong> {history.last10?.map((p, i) => <span key={i}>€ {Number(p).toFixed(2)}{i < history.last10.length - 1 ? ", " : ""}</span>)}</p>
                                        <p><strong>Per Verkoper:</strong></p>

                                        {history.byVerkoper?.map((v, i) => (
                                            <div key={i} className="mb-1">
                                                <em>{v.verkoper}</em>: Gemiddelde € {Number(v.averagePrice || 0).toFixed(2)}, Laatste 10: {v.last10Prices?.map((p, j) => <span key={j}>€ {Number(p).toFixed(2)}{j < v.last10Prices.length - 1 ? ", " : ""}</span>)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Klantenklok  */}
                            <AuctionClock

                                key={activeProduct?.productId}

                                startPrice={activeProduct?.startPrice || 0}

                                minimumPrice={activeProduct?.minimumPrice || 0}

                                productName={activeProduct?.name || ""}

                                onBuy={handleBuy}

                                auctionDate={activeProduct?.auctionDate}

                                startTime={activeProduct?.auction?.startTime}

                                endTime={activeProduct?.auction?.endTime}

                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}