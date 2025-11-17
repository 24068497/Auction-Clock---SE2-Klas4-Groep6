import React from "react";
import AuctionClock from "../components/AuctionClock";

export default function CustomerAuction() {
    const handleBuy = (price) => console.log("Gekocht voor €" + price.toFixed(2));

    return (
        <div style={{ textAlign: "center", paddingTop: "30px" }}>
            <h1>Live Veiling</h1>
            <AuctionClock role="customer" startPrice={25} duration={10} onBuy={handleBuy} />
        </div>
    );
}
