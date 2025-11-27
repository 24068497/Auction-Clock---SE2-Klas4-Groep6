import React, { useEffect, useState, useRef } from "react";
import "../AuctionClock.css";

export default function AuctionClock({
                                         role = "customer",
                                         startPrice = 10,
                                         duration = 20,
                                         onBuy,
                                     }) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [price, setPrice] = useState(startPrice);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    // Reset klok wanneer product verandert
    useEffect(() => {
        resetClock();
    }, [startPrice, duration]);

    // Start automatisch bij koper
    useEffect(() => {
        if (role === "customer") setRunning(true);
    }, [role]);

    // Lineaire prijs- en tijdsafname
    useEffect(() => {
        if (!running) return;

        const startTimestamp = Date.now();
        const totalMs = duration * 1000;
        const startP = startPrice;

        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTimestamp;

            if (elapsed >= totalMs) {
                setTimeLeft(0);
                setPrice(0);
                stopClock();
                return;
            }

            setPrice(startP * (1 - elapsed / totalMs)); // dalende prijs
            setTimeLeft(Math.ceil((totalMs - elapsed) / 1000)); // tijd update
        }, 50);

        return () => clearInterval(intervalRef.current);
    }, [running, startPrice, duration]);

    function startClock() {
        setRunning(true);
    }

    function stopClock() {
        setRunning(false);
        clearInterval(intervalRef.current);
    }

    function resetClock() {
        stopClock();
        setTimeLeft(duration);
        setPrice(startPrice);
    }

    // KOOP
    function buyProduct() {
        stopClock();
        if (onBuy) onBuy(price); // GEEN ALERT MEER HIER!
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
                    <button onClick={startClock} disabled={running || timeLeft === 0}>Start</button>
                    <button onClick={stopClock} disabled={!running}>Pauze</button>
                    <button onClick={resetClock}>Reset</button>
                </div>
            )}
        </div>
    );
}
