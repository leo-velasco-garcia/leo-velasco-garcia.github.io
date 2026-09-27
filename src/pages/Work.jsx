
import Header from '../components/Header'
import { useContext, useEffect, useRef, useState } from 'react'
import React from 'react'
import { AppContext } from '../context/AppContext'
import "./Work.css"

const archivosImg = import.meta.glob('../assets/imgs/*.{webp,jpeg,jpg,png}', {
    eager: true,
    import: 'default',
    query: '?url',
})

const nombreArchivo = (nombreTrabajo, numeroImagen) => {
    const nombreSinEspacios = nombreTrabajo.replace(/\s/g, '')
    const entradas = Object.entries(archivosImg)
    const entradaQueEncaja = entradas.find(entry => {
        const path = entry[0]
        const rutaModelo =
            `/${nombreSinEspacios}${numeroImagen}\\.(webp|jpeg|jpg|png)$`
        const regex = new RegExp(rutaModelo, 'i')
        return regex.test(path)
    })
    if (entradaQueEncaja) {
        return entradaQueEncaja[1]
    }
    return undefined
}


const Work = () => {
    const { trabajos, Language } = useContext(AppContext);
    const [trabajoActivo, setTrabajoActivo] = useState(0)
    const [imagenActiva, setImagenActiva] = useState(0)
    const centroRef = useRef(null)
    const workRefs = useRef([])
    const infoRefs = useRef([])
    const imageRefs = useRef([])
    const interseccionesRef = useRef(new Map())

    useEffect(() => {
        const observer = new IntersectionObserver(
            (elementosObservados) => {
                elementosObservados.forEach((elemento) => {
                    if (elemento.isIntersecting) {
                        interseccionesRef.current.set(elemento.target, elemento.intersectionRatio)
                    } else {
                        interseccionesRef.current.delete(elemento.target)
                    }
                })

                const elementoMasVisible = [...interseccionesRef.current.entries()]
                    .sort(([, ratioA], [, ratioB]) => ratioB - ratioA)[0]?.[0]

                if (elementoMasVisible) {
                    const elemento = elementoMasVisible
                    setTrabajoActivo(Number(elemento.dataset.workIndex))

                    if (elemento.dataset.imageIndex !== undefined) {
                        setImagenActiva(Number(elemento.dataset.imageIndex))
                    }
                }
            },
            { root: centroRef.current, threshold: [0.5] }
        )
        Object.values(imageRefs.current).forEach((elemento) => {
            if (elemento) {
                observer.observe(elemento)
            }
        })
        Object.values(infoRefs.current).forEach((elemento) => {
            if (elemento) {
                observer.observe(elemento)
            }
        })
        return () => observer.disconnect()
    }, [])

    const scrollATrabajo = (workIndex) => {
        const esMovil = window.matchMedia('(max-width: 1024px)').matches
        const destino = esMovil ? infoRefs.current[workIndex] : workRefs.current[workIndex]

        destino?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <div className='work'>
            <Header></Header>
            <div className="contenido">
                <div className="lateral">
                    {trabajos.map((trabajo, i) => (
                        <button
                            className={trabajoActivo === i ? 'activo' : ''}
                            key={trabajo.nombreEN}
                            onClick={() => scrollATrabajo(i)}
                        >
                            {trabajoActivo === i ? '■ ' : '□ '}
                            {Language === 'ES' ? trabajo.nombreES : trabajo.nombreEN}
                        </button>
                    ))}
                </div>
                <div className="centro" ref={centroRef}>
                    {trabajos.map((trabajo, workIndex) => (
                        <React.Fragment key={trabajo.nombreEN}>
                            <section
                                className='infoMovil'
                                data-work-index={workIndex}
                                ref={(element) => {
                                    infoRefs.current[workIndex] = element
                                }}
                            >
                                <h2>{(Language === 'ES' ? trabajo.nombreES : trabajo.nombreEN)}</h2>
                                <h3>{(Language === 'ES' ? trabajo.subtituloES : trabajo.subtituloEN)}</h3>
                                <div className="tags">
                                    {(Language === 'ES'
                                        ? trabajo.tagsES
                                        : trabajo.tagsEN
                                    ).map((tag, key) => (
                                        <span key={key}>{tag}</span>
                                    ))}
                                </div>
                                <div className='descripcion'>
                                    {(Language === 'ES' ? trabajo.descripcionES : trabajo.descripcionEN)
                                        .split('\n')
                                        .map((parrafo, indice) => (
                                            <p key={indice}>{parrafo}</p>
                                        ))}
                                </div>

                            </section>
                            {trabajo.media.map((imageCaption, imgIndex) => {
                                const numeroDeImagen = imgIndex + 1
                                const imagen = nombreArchivo(trabajo.nombreEN, numeroDeImagen)
                                const media = trabajo.media[imgIndex]

                                return (
                                    <figure
                                        className="imagen-trabajo"
                                        data-image-index={imgIndex}
                                        data-work-index={workIndex}
                                        key={`${trabajo.nombreEN}-${numeroDeImagen}`}
                                        ref={(element) => {
                                            imageRefs.current[`${workIndex}-${imgIndex}`] = element
                                            if (imgIndex === 0) workRefs.current[workIndex] = element
                                        }}
                                    >

                                        {media.tipo === "img" ?
                                            <img
                                                className="imgTrabajo"
                                                src={imagen}
                                                alt={`${trabajo.nombreEN} ${numeroDeImagen}`}
                                            />
                                            : media.tipo === "vimeo" ?
                                                (<>
                                                    <div style={{ padding: '56.25% 0 0 0', position: 'relative', width: '100%' }}>
                                                        <iframe src={media.url} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} title={Language == "ES" ? trabajo.nombreES : trabajo.nombreEN}>
                                                        </iframe>
                                                    </div>
                                                    <script src="https://player.vimeo.com/api/player.js"></script>
                                                </>)
                                                : (<>
                                                    <div className="youtube-wrapper">
                                                        <iframe className="youtube-iframe" src={media.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                                    </div>
                                                </>)
                                        }
                                        <p className='PieMovil'>{Language === 'ES'
                                            ? trabajo.media[imgIndex]?.pieES
                                            : trabajo.media[imgIndex]?.pieEN}</p>
                                    </figure>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </div>
                <div className="dcha">
                    <h2>{(Language === 'ES' ? trabajos[trabajoActivo].nombreES : trabajos[trabajoActivo].nombreEN)}</h2>
                    <h3>{(Language === 'ES' ? trabajos[trabajoActivo].subtituloES : trabajos[trabajoActivo].subtituloEN)}</h3>
                    <div className="tags">
                        {(Language === 'ES'
                            ? trabajos[trabajoActivo].tagsES
                            : trabajos[trabajoActivo].tagsEN
                        ).map((tag, key) => (
                            <span key={key}>{tag}</span>
                        ))}
                    </div>
                    <div className='descripcion'>
                        {(Language === 'ES' ? trabajos[trabajoActivo].descripcionES : trabajos[trabajoActivo].descripcionEN)
                            .split('\n')
                            .map((parrafo, indice) => (
                                <p key={indice}>{parrafo}</p>
                            ))}
                    </div>
                    <div className='pie'>
                        <p>{Language === 'ES'
                            ? trabajos[trabajoActivo].media[imagenActiva]?.pieES
                            : trabajos[trabajoActivo].media[imagenActiva]?.pieEN}</p>

                    </div>
                </div>
                <nav className="navmovil">
                    {trabajos.map((trabajo, i) => (
                        <button
                            className={trabajoActivo === i ? 'activo' : ''}
                            key={trabajo.nombreEN}
                            onClick={() => scrollATrabajo(i)}
                        >
                            {trabajoActivo === i ? '■ ' : '□ '}
                            {Language === 'ES' ? trabajo.nombreES : trabajo.nombreEN}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Work