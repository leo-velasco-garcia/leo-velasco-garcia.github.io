import { useContext } from 'react';
import './App.css';
import CharacterGrid from "./components/CharacterGrid";
import { Link } from "react-router-dom";
import { AppContext } from './context/AppContext';

const App = () => {
  const { Language, setLanguage, theme, setTheme } = useContext(AppContext);

  return (
    <div className="app">
      <CharacterGrid />
      <div className="centro">
        <h1>LEO VELASCO</h1>
        <ul className="app_navul">
          <li className="app_navli">
            <Link to={"/work"} className="link mono" viewTransition>
              {Language == "ES" ? "PORTFOLIO" : "WORK"}
            </Link>
          </li>
          <li className="app_navli" viewTransition>
            <Link to={"/about"} className="link mono">
              {Language == "ES" ? "SOBRE MÍ" : "ABOUT"}
            </Link>
          </li>
          <li className="app_navli" viewTransition>
            <Link to={"/about"} className="link mono">
              {Language == "ES" ? "CONTACTO" : "CONTACT"}
            </Link>
          </li>
        </ul>
      </div>


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
    </div>
  )
}

export default App