// src/PasswordUpdate.js
import React, { useState } from "react";
import "../styles/PasswordUpdate.css";

const PasswordUpdate = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // Handle password update logic here (e.g., API call)
    alert("Password updated successfully");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Update Your Password</h1>
        <p>Enter a new password for your account.</p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
