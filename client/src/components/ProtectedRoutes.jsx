import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoutes;
