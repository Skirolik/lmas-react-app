import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmailConfirmation = () => {
  const { token } = useParams();
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Set the default base URL for Axios
  axios.defaults.baseURL = "http://localhost:8080";

  useEffect(() => {
    // Make an API call to the backend to confirm the email
    const confirmEmail = async () => {
      try {
        const response = await axios.get(`/confirm/${token}`);
        if (response.data.message) {
          setConfirmationMessage(response.data.message);
        } else {
          setConfirmationMessage(
            "Email confirmation failed. Please try again."
          );
        }
      } catch (error) {
        setConfirmationMessage("Email confirmation failed. Please try again.");
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <div>
      <h2>Email Confirmation</h2>
      <p>{confirmationMessage}</p>

      <p>
        Login <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default EmailConfirmation;
