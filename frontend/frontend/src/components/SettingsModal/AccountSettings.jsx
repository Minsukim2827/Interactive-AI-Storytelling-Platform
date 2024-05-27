import React from "react";
import "./SettingsModal.css";

const AccountSettings = () => {
  return (
    <div className="account-settings">
      <h3 className="section-title">Profile Picture</h3>
      <form className="settings-form">
        <div className="form-group">
          <label htmlFor="fname" className="form-label">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lname" className="form-label">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
};

export default AccountSettings;


