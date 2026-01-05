// src/components/NavItems.js
export const navItems = {
    User: [
        { name: "Mijn Dashboard", path: "/user/dashboard" },
        { name: "Home", path: "/" },
        { name: "Mijn veilingen", path: "/auction/customer" },
    ],
    Admin: [
        { name: "Beheer Dashboard", path: "/admin/dashboard" },
        { name: "Home", path: "/" },
        { name: "Producten", path: "/products" },
        { name: "Beheer veilingen", path: "/admin/auction" },
    ],
    Auctioneer: [
        { name: "Home", path: "/" },
        { name: "Producten", path: "/products" },
        { name: "Veilingen beheren", path: "/Auctioneer/dashboard" },
    ],
};



