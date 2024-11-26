import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;