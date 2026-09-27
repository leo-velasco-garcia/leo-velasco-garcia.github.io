// import React from 'react'
import { Link } from "react-router-dom";
import Noise from "../components/Noise";
import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <div className="NotFound">
      <Noise></Noise>
      <div className="sombra"></div>
      <p>Esta página no existe… todavía</p>
      <Link className="linknf" to={"/"}>
        <span className="invisible">X</span>
        <button>VOLVER</button>
        <p className="flecha">↗</p>
      </Link>
    </div>
  )
}

export default NotFoundPage