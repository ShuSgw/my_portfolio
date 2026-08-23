import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const readStoredTheme = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useDarkMode = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  useEffect(() => {
    if (theme === null) return;
    document.body.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, toggleTheme: setTheme };
};

export default useDarkMode;
