import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import trabajos from "../trabajos";

const getSystemTheme = () => (
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro"
);



export const AppContextProvider = ({ children }) => {
    const [Language, setLanguage] = useState("EN");
    const [theme, setTheme] = useState(getSystemTheme);
    const [menuAbierto, setMenuAbierto] = useState(false);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = Language;
    }, [Language]);

    const value = { Language, setLanguage, trabajos, menuAbierto, setMenuAbierto, theme, setTheme };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};