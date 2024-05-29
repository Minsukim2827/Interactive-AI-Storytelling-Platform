import React from "react";
import "./SettingsModal.css";
import { useAuth } from "./../AuthProvider"; // Import useAuth to access user context
import axios from "./../axios";

const AccountSettings = () => {
  const { user } = useAuth(); // Access user context

  const fetchData = async () => {
    if (user && user.id) {
      try {
        const response = await axios.get(
          `/api/users?id=${user.id}`
        );
        const userInfo = Object.values(response.data);
        console.log(userInfo);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    } else {
      console.log("No user ID found");
    }
  };

  fetchData();

  return (
    <div className="account-settings">
      <h3 className="section-title">Profile Picture</h3>
      <form className="settings-form" action="AccountSettings.php" method="get">
        <div className="form-group">
          <label htmlFor="fname" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="form-input"
            placeholder={user.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-input"
            placeholder={user.id}
          />
        </div>
        <button  type="submit" className="submit-button">
          Save changes
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
