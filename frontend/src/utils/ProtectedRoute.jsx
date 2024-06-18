import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ childeren }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />
    }

    return childeren;
}

export default ProtectedRoute