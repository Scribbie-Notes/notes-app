import { createContext, useContext, useEffect, useState } from "react";

export const themeContext = createContext();

export const useTheme = () => useContext(themeContext);

export function ThemeProvider({ children }) {
  function getTheme() {
    const theme = localStorage.getItem("theme")==="dark" ? "dark" : "light";
    return theme;
  }
  const [theme, setTheme] = useState(() => getTheme());

  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    document.body.classList.remove("light", "dark");
    document.body.classList.add(`${theme}`)
    
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}
