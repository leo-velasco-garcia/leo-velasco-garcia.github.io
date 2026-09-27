// import React from 'react'
import { useContext, useEffect } from 'react';
import './NavMovil.css'
import { Link, NavLink, useLocation } from "react-router-dom";
import { AppContext } from '../context/AppContext';

const NavMovil = () => {
    const { Language, setLanguage, menuAbierto, setMenuAbierto, theme, setTheme } = useContext(AppContext);
    const { pathname } = useLocation();

    useEffect(() => {
        setMenuAbierto(false);
    }, [pathname, setMenuAbierto]);

    return (
        <nav className={menuAbierto == true ? "NavMovil Abierto" : "NavMovil Cerrado"}>
            <Link to={"/"} className='linkhuno'>
                <h1 className='navli'>LEO VELASCO</h1>
            </Link>
            <nav className="nav">
                <ul className="navul">
                    <NavLink to={"/work"} className={({ isActive }) =>
                        isActive ? "link active" : "link"}>
                        <li className="navli">
                            {Language == "ES" ? "PORTFOLIO" : "WORK"}
                        </li>
                    </NavLink>
                    <NavLink to={"/about"} className={({ isActive }) =>
                        isActive ? "link active" : "link"}>
                        <li className="navli">
                            {Language == "ES" ? "SOBRE MÍ" : "ABOUT"}
                        </li>
                    </NavLink>
                    <NavLink to={"/contact"} className={({ isActive }) =>
                        isActive ? "link active" : "link"}>
                        <li className="navli">
                            {Language == "ES" ? "CONTACTO" : "CONTACT"}
                        </li>
                    </NavLink>
                </ul>
            </nav>
            <div className="toggles">
                <div className="idiomas">
                    <button className={Language === "EN" ? "btnidmactive" : "btnidm"} onClick={() => setLanguage("EN")}>EN</button>
                    <span>/</span>
                    <button className={Language === "ES" ? "btnidmactive" : "btnidm"} onClick={() => setLanguage("ES")}>ES</button>
                </div>
                <div className="temas">
                    <button className={theme === "claro" ? "btnthmactive" : "btnthm"} onClick={() => setTheme("claro")}>
                        <span className={"material-symbols-outlined " + (theme === "claro" ? "lleno" : "")}>
                            light_mode
                        </span>
                    </button>
                    <span className='barrita'>/</span>
                    <button className={theme === "oscuro" ? "btnthmactive" : "btnthm"} onClick={() => setTheme("oscuro")}>
                        <span className={"material-symbols-outlined " + (theme === "claro" ? "" : "lleno")}>
                            dark_mode
                        </span>
                    </button>
                </div>
            </div>
            <button className="botonesNav abrir" onClick={() => setMenuAbierto(false)}>
                <span className="material-symbols-outlined">
                    close
                </span>
            </button>
        </nav>
    )
}

export default NavMovil