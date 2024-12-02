import React from "react";
import { useAuth } from "../context/authContext"; // Import useAuth hook

const Logout = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>You are logged in. Do you want to log out?</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
