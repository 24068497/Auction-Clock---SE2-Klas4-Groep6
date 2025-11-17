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

    useEffect(() => {
        setTimeLeft(duration);
        setPrice(startPrice);
        setRunning(false);
        clearInterval(intervalRef.current);
    }, [startPrice, duration]);

    useEffect(() => {
        if (role === "customer") {
            setRunning(true);
        }
    }, [role]);

    useEffect(() => {
        if (!running) return;

        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                setPrice((p) => Math.max(0, p - startPrice / duration));
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [running, startPrice, duration]);

    const handleStart = () => setRunning(true);
    const handlePause = () => { setRunning(false); clearInterval(intervalRef.current); };
    const handleReset = () => { setRunning(false); clearInterval(intervalRef.current); setTimeLeft(duration); setPrice(startPrice); };
    const handleBuy = () => { if (onBuy) onBuy(price); alert(`Je hebt gekocht voor €${price.toFixed(2)}`); setRunning(false); };

    return (
        <div className="auction-clock-container">
            <div className="clock-circle">
                <div className="clock-inner">
                    <div className="clock-time">{timeLeft}s</div>
                </div>
            </div>

            <h1 className="price">€ {price.toFixed(2)}</h1>

            <p className="status-text">{running ? "⏱ Veiling loopt…" : "⏸ Veiling gepauzeerd"}</p>

            {role === "customer" && (
                <button className="buy-btn" onClick={handleBuy} disabled={!running || timeLeft === 0}>
                    KOOP NU
                </button>
            )}

            {role === "admin" && (
                <div className="admin-controls">
                    <button onClick={handleStart} disabled={running || timeLeft === 0}>Start</button>
                    <button onClick={handlePause} disabled={!running}>Pauze</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            )}
        </div>
    );
}
