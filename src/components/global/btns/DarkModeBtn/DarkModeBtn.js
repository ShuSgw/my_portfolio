import React from "react";
import {MdDarkMode} from "react-icons/md";
import {BsFillSunFill} from "react-icons/bs";
import Toggle from "react-toggle";
import useDarkMode from "../../../../hooks/useDarkMode";

const ThemeBtn = () => {
  const {theme, toggleTheme} = useDarkMode();

  if (theme === null) return null;

  return (
    <Toggle
      icons={{
        checked: <MdDarkMode />,
        unchecked: <BsFillSunFill />,
      }}
      onChange={(e) => toggleTheme(e.target.checked ? "dark" : "light")}
      checked={theme === "dark"}
    />
  );
};

export default ThemeBtn;
