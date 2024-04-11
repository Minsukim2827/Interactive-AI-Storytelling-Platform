import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export default function DarkModeToggle() {
    const [isDarkMode, setDarkMode] = React.useState(localStorage.theme === "dark");
    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
        console.log(checked);
        if (isDarkMode == false) {
            document.documentElement.classList.add('dark');
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem("theme")
        }
    };

    return <>
        <DarkModeSwitch
            style={{ marginBottom: '2rem' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={26}
        />
    </>
}
