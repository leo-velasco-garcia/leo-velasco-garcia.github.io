// import React from 'react'
import { Link } from "react-router-dom";
import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <div className="NotFound">
      <div className="sombra"></div>
      <p>Esta página no existe… todavía</p>
      <Link className="linknf" to={"/"}>
        <button>VOLVER</button>
      </Link>
    </div>
  )
}

export default NotFoundPage