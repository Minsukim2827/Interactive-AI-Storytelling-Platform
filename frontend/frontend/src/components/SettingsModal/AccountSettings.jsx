import React, { useEffect, useState } from "react";
import "./SettingsModal.css";
import axios from "./../axios";
import { useAuth } from "./../AuthProvider"; // Import useAuth to access user context

const AccountSettings = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(
            `/api/user/details?userId=${user.id}`
          );
          const userInfo = response.data;
          setUserDetails(userInfo);
          initializeEditableFields(userInfo); // Initialize editableFields state
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      } else {
        console.log("No user ID found");
      }
    };

    fetchData();
  }, [user]);

  // Initialize editableFields state based on userDetails
  const initializeEditableFields = (userInfo) => {
    const fields = {};
    for (const key in userInfo) {
      fields[key] = false;
    }
    setEditableFields(fields);
  };

  const handleEdit = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      await Promise.all([
        axios.post("/api/user/update-email", {
          user_id: user.id,
          new_email: userDetails.email,
        }),
        axios.post("/api/user/update-username", {
          user_id: user.id,
          new_username: userDetails.username,
        }),
      ]);
      initializeEditableFields(userDetails); // Reset editableFields after saving
    } catch (error) {
      console.error("Error updating email/username: ", error);
    }
  };

  return (
    <div className="account-settings">
      <h3 className="section-title">Profile Picture</h3>
      <form className="settings-form">
        {userDetails &&
          Object.entries(userDetails).map(([key, value]) => (
            <div className="form-group" key={key}>
              <label htmlFor={key} className="form-label">
                {key}
              </label>
              {editableFields[key] ? (
                <input
                  type="text"
                  id={key}
                  name={key}
                  className="form-input"
                  value={value}
                  onChange={handleInputChange}
                />
              ) : (
                <span className="form-value">{value}</span>
              )}
              {key !== "id" && (
                <button
                  type="button"
                  className="change-button"
                  onClick={() => handleEdit(key)}
                >
                  Change
                </button>
              )}
            </div>
          ))}
        <button type="button" className="submit-button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
