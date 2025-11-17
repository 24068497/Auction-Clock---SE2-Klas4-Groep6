// src/pages/AdminAuction.jsx
import React, { useEffect, useState } from "react";
import AuctionClock from "../components/AuctionClock";

export default function AdminAuction() {
    const [queue, setQueue] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        async function loadQueue() {
            const res = await fetch("https://localhost:5001/api/auctions/queue/today");
            const data = await res.json();
            setQueue(data);
        }
        loadQueue();
    }, []);

    const activeProduct = queue[activeIndex];

    const handleNext = () => {
        if (activeIndex < queue.length - 1) {
            setActiveIndex(i => i + 1);
        } else {
            alert("Alle kavels van vandaag zijn geveild ✅");
        }
    };

    return (
        <div style={{ padding: "30px", textAlign: "center" }}>
            <h1>Veilingmeester</h1>

            {activeProduct && (
                <>
                    <h2>{activeProduct.name}</h2>
                    {activeProduct.imagePath && (
                        <img
                            src={activeProduct.imagePath}
                            alt={activeProduct.name}
                            style={{ maxWidth: "200px", borderRadius: "10px", marginBottom: "15px" }}
                        />
                    )}
                    <p>{activeProduct.description}</p>
                </>
            )}

            <AuctionClock
                role="admin"
                startPrice={activeProduct ? activeProduct.startPrice : 0}
                duration={10}             // ⏱ maximaal 10 seconden
            />

            <h3 style={{ marginTop: "30px" }}>Veilingvolgorde vandaag</h3>
            <ol style={{ textAlign: "left", maxWidth: "400px", margin: "10px auto" }}>
                {queue.map((p, idx) => (
                    <li
                        key={p.productId}
                        style={{
                            fontWeight: idx === activeIndex ? "bold" : "normal",
                            color: idx === activeIndex ? "#007bff" : "#333",
                        }}
                    >
                        {p.orderInAuction ?? idx + 1}. {p.name} – €{p.startPrice.toFixed(2)}
                    </li>
                ))}
            </ol>

            <button
                onClick={handleNext}
                disabled={activeIndex >= queue.length - 1}
                className="btn btn-primary"
            >
                Volgende kavel
            </button>
        </div>
    );
}
