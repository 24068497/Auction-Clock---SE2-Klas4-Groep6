import React, { useEffect, useState } from "react";
import "../AuctionClock.css";

export default function AuctionClock({
    role = "customer",
    startPrice = 10,
    duration = 20,        // in seconden
    onBuy,
}) {
    const [timeLeft, setTimeLeft] = useState(duration);  // in seconden
    const [price, setPrice] = useState(startPrice);
    const [running, setRunning] = useState(false);

    // Reset klok wanneer product verandert
    useEffect(() => {
        setTimeLeft(duration);
        setPrice(startPrice);
        setRunning(role === "customer"); // klant: automatisch starten, admin: stil
    }, [startPrice, duration, role]);

    //Prijs volgen
    useEffect(() => {
        if (!running) return;

        const totalMs = duration * 1000;
        const interval = setInterval(() => {
            const fraction = Math.max(0, timeLeft * 1000 / totalMs);
            setPrice(startPrice * fraction);
        }, 50); 

        return () => clearInterval(interval);
    }, [running, timeLeft, startPrice, duration]);


    // Timer: 1 seconde op scherm = 1 seconde in het echt
    useEffect(() => {
        if (!running) return;
        if (timeLeft <= 0) {
            setRunning(false);
            return;
        }

        const id = setTimeout(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000); 

        return () => clearTimeout(id);
    }, [running, timeLeft]);

    function startClock() {
        if (timeLeft <= 0) return;
        setRunning(true);
    }

    function stopClock() {
        setRunning(false);
    }

    function resetClock() {
        setRunning(false);
        setTimeLeft(duration);
        setPrice(startPrice);
    }

    function buyProduct() {
        stopClock();
        if (onBuy) onBuy(price);
    }

    return (
        <div className="auction-clock-container">
            <div className="clock-circle">
                <div className="clock-inner">
                    <div className="clock-time">{timeLeft}s</div>
                </div>
            </div>

            <h1 className="price">€ {price.toFixed(2)}</h1>

            <p className="status-text">
                {running ? "⏱ Veiling loopt…" : "⏸ Veiling gepauzeerd"}
            </p>

            {/* KOPER KNOP */}
            {role === "customer" && (
                <button
                    className="buy-btn"
                    onClick={buyProduct}
                    disabled={!running || timeLeft === 0}
                >
                    KOOP NU
                </button>
            )}

            {/* ADMIN KNOPPEN */}
            {role === "admin" && (
                <div className="admin-controls">
                    <button onClick={startClock} disabled={running || timeLeft === 0}>
                        Start
                    </button>
                    <button onClick={stopClock} disabled={!running}>
                        Pauze
                    </button>
                    <button onClick={resetClock}>
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}
