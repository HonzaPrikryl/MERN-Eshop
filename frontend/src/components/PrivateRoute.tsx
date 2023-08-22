import React from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useAppSelector((state) => state.authReducer);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
