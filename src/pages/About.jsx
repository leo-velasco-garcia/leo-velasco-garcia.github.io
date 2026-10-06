
// import React from 'react'
import Header from '../components/Header'
import "./About.css"
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import CharacterGrid from '../components/CharacterGrid';

const About = () => {
    const { Language, theme } = useContext(AppContext);
    return (
        <div className='aboutContainer'>
            <CharacterGrid></CharacterGrid>
            <Header></Header>

            <div className="about">
                <div className="perfil">
                    <section>
                        <div className="asciiText">
                            {theme == "oscuro" ?  `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXX^˝¨   \`YXXXXXXXXX
XXXXXXXXXXXXXXXXL        ºXXXXXXXX
XXXXXXXXXXXXXXX7          \`SXXXXXX
XXXXXXXXXXXXXX´ .a*XXXb*:   YXXXXX
XXXXXXXXXXXXX´ .XXXXXXXXXL   YXXXX
XXXXXXXXXXXX¨  :XXXXXXXXXX   \`XXXX
XXXXXXXXXXX´   ]´…--XXxm-…:   QXXX
XXXXXXXXXP     XX<u}XXX{u>!   lXXX
XXXXXXXXF     .XXXXXXXXXXX!    DXX
XXXXXXX¨      {XXXXXXXXXXX]    XXX
XXXXXX7       ¨XXX^˝¨A\`¨*X:    \\XX
XXXXP^         XXXxXXXXXxX·     XX
X7¨           .XP \\XXXX7]X      XX
              dXL       ¨       ]X
             JXXXb…    .        qX
             \\XXXXXXXXP          X
              VXXXXXX7     
               \\XXXº¨`: ` 
 
 
                 nd6XXXb…
                TXXXXXXXXL
               :XXXXXXXXXXb.
              dXP^¨   \`¨^XXX.
             dX^         ºXXX.
            aXX¨          XXXb
           dXXX =^””  \`””= XXX.
         JXXXXX  <6>   <6> XXXL
        AXXXXXP            XXXX
       nXXXXXX!            XXXX
      .XXXXXXXb   …== ==.  XXXXL
    .xXXXXXXXXX           :XXXXXL
 .oXXXXXXXXXXXP .JL     J…XXXXXXT
xXXXXXXXXXXXXX¨ \\XXxxxxxXXXXXXXX!
XXXXXXXXXXXXX^   ¨^XXXX^XXXXXXXX[
XXXXXXXXXXXXXL        …XXXXXXXXXXL
XXXXXXXXXXXXXX.      .XXXXXXXXXXXX
XXXXXXXXXXXXXXX:   .xXXXXXXXXXXXXX`}
                        </div>
                    </section>
                    <section className='james'>
                        <div className="item">
                            {/* <span className="cuadr">■</span> */}
                            <div className="itemContent">
                                <h3>{Language === 'ES' ? "Cualidades" : "Skills"}</h3>
                                <p>{Language === 'ES' ? "Empatía" : "Empathy"}</p>
                                <p>{Language === 'ES' ? "Responsabilidad" : "Responsability"}</p>
                                <p>{Language === 'ES' ? "Resolución de problemas" : "Troubleshooting"}</p>
                                <p>{Language === 'ES' ? "Capacidad analítica" : "Analytical capacity"}</p>
                                <p>{Language === 'ES' ? "Gestión de equipos de trabajo" : "Work teams management"}</p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="itemContent">
                                <h3>Software</h3>
                                <p>Illustrator</p>
                                <p>InDesign</p>
                                <p>Photoshop</p>
                                <p>AfterEffects</p>
                                <p>Figma</p>
                                <p>HTML</p>
                                <p>Css</p>
                                <p>Sass</p>
                                <p>JavaScript</p>
                                <p>React</p>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="cv">
                    <section>
                        <h2>{Language === 'ES' ? "Experiencia laboral" : "Work experience"}</h2>
                        <div className="item">
                            <span className="cuadr">■</span>
                            <div className="itemContent">
                                <h3>La Esfera de los Libros</h3>
                                <p>{Language === 'ES' ? "Mapas para el libro “Zaragoza. Ciudad Inmortal”" : "Maps for the book ‘Zaragoza. Ciudad Inmortal’"}</p>
                                <p>{Language === 'ES' ? "Maquetación para el libro “El Gran Libro de la Mitología Nórdica”" : "Layout design for the book 'El Gran Libro de la Mitología Nórdica'"}</p>
                                <p>{Language === 'ES' ? "Maquetación para el libro “Crónica de sangre”" : "Layout design for the book 'Crónica de sangre'"}</p>
                                <p>{Language === 'ES' ? "Maquetación e ilustraciones para el libro “Prohibido aburrirse”" : "Layout and illustrations for the book ‘Prohibido aburrirse’"}</p>
                                <p>{Language === 'ES' ? "Ilustraciones para el libro “Golazos”" : "Illustrations for the book ‘Golazos’"}</p>
                                <span>{Language === 'ES' ? "2024 — Actualidad" : "2024 — Present"}</span>
                            </div>
                        </div>
                        <div className="item">
                            <span className="cuadr">■</span>
                            <div className="itemContent">
                                <h3>Real Automóvil Club de España (RACE)</h3>
                                <p>{Language === 'ES' ? "Operador de asistencia en carretera" : "Roadside assistance teleoperator"}</p>
                                <span>2023</span>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2>{Language === 'ES' ? "Formación" : "Education"}</h2>
                        <div className="item">
                            <span className="cuadr">■</span>
                            <div className="itemContent">
                                <h3>{Language === 'ES' ? "Máster en Diseño Interactivo" : "Master’s Degree in Interactive Design"}</h3>
                                <p>Escuela Superior de Diseño de Madrid</p>
                                <span>{Language === 'ES' ? "2026 — Actualidad" : "2026 — Present"}</span>
                            </div>
                        </div>
                        <div className="item">
                            <span className="cuadr">■</span>
                            <div className="itemContent">
                                <h3>{Language === 'ES' ? "Grado en Diseño Gráfico" : "Bachelor’s Degree in Graphic Design"}</h3>
                                <p>Escuela Superior de Diseño de Madrid</p>
                                <span>2022 — 2026</span>
                            </div>
                        </div>
                        <div className="item">
                            <span className="cuadr">■</span>
                            <div className="itemContent">
                                <h3>{Language === 'ES' ? "Bachillerato en la Modalidad de Artes" : "High School Diploma, Arts Major"}</h3>
                                <p>{Language === 'ES' ? "Matrícula de Honor" : "With honors"}</p>
                                <p>IES María Zambrano (Leganés)</p>
                                <span>2020 — 2022</span>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2>{Language === 'ES' ? "Formación complementaria" : "Additional Education"}</h2>
                        <div className="item">
                            <span className="cuadr">■</span>
                            <div className="itemContent">
                                <h3>{Language === 'ES' ? "Grado Profesional de Música (Guitarra Clásica — Composición)" : "Professional Training (Classical Guitar — Musical Composition)"}</h3>
                                <p>Conservatorio Profesional de Música Manuel Rodríguez Sales</p>
                                <span>2017 — 2023</span>
                            </div>
                        </div>
                        <div className="item">
                            <span className="cuadr">■</span>
                            <div className="itemContent">
                                <h3>{Language === 'ES' ? "Curso Intensivo de Cómic" : "Comic Drawing Bootcamp"}</h3>
                                <p>Academia C10</p>
                                <span>2019</span>
                            </div>
                        </div>
                    </section>
                    <section className='skills'>
                        <div className="item">
                            {/* <span className="cuadr">■</span> */}
                            <div className="itemContent">
                                <h3>{Language === 'ES' ? "Cualidades" : "Skills"}</h3>
                                <p>{Language === 'ES' ? "Empatía" : "Empathy"}</p>
                                <p>{Language === 'ES' ? "Responsabilidad" : "Responsability"}</p>
                                <p>{Language === 'ES' ? "Resolución de problemas" : "Troubleshooting"}</p>
                                <p>{Language === 'ES' ? "Capacidad analítica" : "Analytical capacity"}</p>
                                <p>{Language === 'ES' ? "Gestión de equipos de trabajo" : "Work teams management"}</p>
                            </div>
                        </div>
                        <div className="item">
                            {/* <span className="cuadr">■</span> */}
                            <div className="itemContent">
                                <h3>Software</h3>
                                <p>Illustrator</p>
                                <p>InDesign</p>
                                <p>Photoshop</p>
                                <p>AfterEffects</p>
                                <p>Cinema4D</p>
                                <p>Figma</p>
                                <p>HTML</p>
                                <p>Css</p>
                                <p>Sass</p>
                                <p>JavaScript</p>
                                <p>React</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div >
    )
}

export default About