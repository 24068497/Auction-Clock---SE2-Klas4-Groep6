// Functie voor het afschermen van de routes //
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (!allowedRoles.includes(role)) {
            return <Navigate to="/" />;
        }

        return children;
    } catch (error) {
        console.error("JWT decode fout:", error);
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
