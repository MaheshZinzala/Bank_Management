import React from "react";

function ProtectedRoute({ children }) {
  const isLogin = localStorage.getItem("login");
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
