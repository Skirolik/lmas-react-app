import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (e.g., by checking session storage, authentication token, etc.)
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      window.location.href = "/"; // Redirect to login page if not logged in
    }
  }, []);

  return <div>Logout</div>;
};

export default LogoutPage;
