import React from "react";
import { useTheme, ThemeProvider } from "../Navbar/theme-provider"; // Update the path accordingly
import lightPreviewImage from "./lightTheme.png"; // Update with your image paths
import darkPreviewImage from "./darkTheme.png";

const GeneralSettings = () => {
  const { theme, setTheme } = useTheme(); // Access theme context

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div>
      <h3>General Settings</h3>
      {/* Theme section */}
      <div>
        <h4>Theme</h4>
        <div className="theme-options" style={containerStyle}>
          <label style={labelStyle}>
            <input
              type="radio"
              value="light"
              checked={theme === "light"}
              onChange={() => handleThemeChange("light")}
            />
            <img
              src={lightPreviewImage}
              alt="Light Theme"
              className="theme-preview"
              style={previewImageStyle}
            />
            Light
          </label>
          <label style={labelStyle}>
            <input
              type="radio"
              value="dark"
              checked={theme === "dark"}
              onChange={() => handleThemeChange("dark")}
            />
            <img
              src={darkPreviewImage}
              alt="Dark Theme"
              className="theme-preview"
              style={previewImageStyle}
            />
            Dark
          </label>
        </div>
      </div>
    </div>
  );
};

// Define inline styles
const containerStyle = {
  display: "flex",
  alignItems: "center",
};

const labelStyle = {
  marginRight: "20px",
};

const previewImageStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "10%",
  objectFit: "cover",
};

// Wrap GeneralSettings with ThemeProvider
const GeneralSettingsWithThemeProvider = () => {
  return (
    <ThemeProvider>
      <GeneralSettings />
    </ThemeProvider>
  );
};

export default GeneralSettingsWithThemeProvider;
