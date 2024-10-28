"use client";
import React from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import s from "./ThemeToggleButton.module.scss";

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <button onClick={toggleTheme} className={s.switchButton}>
      {theme === "light" ? <FaMoon /> : <MdOutlineWbSunny />}
    </button>
  );
};

export default ThemeToggleButton;
