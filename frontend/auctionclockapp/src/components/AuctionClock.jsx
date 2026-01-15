import React, { useEffect, useState } from "react";
import "../AuctionClock.css";

function formatDate(dateString) {
    if (!dateString) return "";
    const d = new Date(dateString);

    return d.toLocaleDateString("nl-NL",
        { day: "2-digit", month: "2-digit", year: "2-digit" }
    );
}

export default function AuctionClock({
    role = "customer", 
    startPrice = 10,
    minimumPrice = 0,
    duration = 20,
    onBuy,
    auctionDate,
    startTime,
    endTime
    }) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [price, setPrice] = useState(startPrice);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        setTimeLeft(duration);
        setPrice(startPrice);
    }, [startPrice, duration, role]);

    useEffect(() => {
        if (!running) return;

        const totalMs = duration * 1000;
        const interval = setInterval(() => {
            const fraction = Math.max(0, timeLeft * 1000 / totalMs);
            const newPrice = Math.max(startPrice * fraction, minimumPrice);

            setPrice(currentPrice => {
                if (currentPrice <= minimumPrice) {
                    return minimumPrice;
                }
                return newPrice;
            })
        }, 50);

        return () => clearInterval(interval);
    }, [running, timeLeft, startPrice, duration, minimumPrice]);

    // Timer //
    useEffect(() => {
        if (!running) return;
        if (timeLeft <= 0) {
            setTimeLeft(0);
            return;
        }

        const id = setTimeout(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearTimeout(id);
    }, [running, timeLeft]);

    // refresed de klok om te checken of het tijd is //
    useEffect(() => {
        const interval = setInterval(() => {
            if (!auctionDate || !startTime || !endTime) return;

            const now = new Date();

            const auctionDay = new Date(auctionDate);
            auctionDay.setHours(0, 0, 0, 0);

            // starttijd van de veiling //
            const startTimeDate = new Date(startTime);
            const start = new Date(auctionDay);
            start.setHours(
                startTimeDate.getHours(),
                startTimeDate.getMinutes(),
                0,
                0
            );

            // eindtijd van de veiling //
            const endTimeDate = new Date(endTime);
            const end = new Date(auctionDay);
            end.setHours(
                endTimeDate.getHours(),
                endTimeDate.getMinutes(),
                0,
                0
            );

            setRunning(now >= start && now <= end);

        }, 1000);

        return () => clearInterval(interval);
    }, [auctionDate, startTime, endTime]);


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
                    <h1 className="price">€ {Number(price).toFixed(2)}</h1>
                </div>
            </div>

            <p className="status-text">
                <p>Veildatum: {formatDate(auctionDate)}</p>
                {running ? "Veiling loopt…" : "Veiling gepauzeerd"}
            </p>

            {role === "customer" && (
                <button
                    className="buy-btn"
                    onClick={buyProduct}
                    disabled={!running || timeLeft === 0}
                >
                    KOOP NU
                </button>
            )}

            {role === "admin" && (
                <div className="admin-controls">
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