// import React from 'react'
import Header from '../components/Header'
import "./Contact.css"
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import CharacterGrid from '../components/CharacterGrid';

const Contact = () => {
    const { Language } = useContext(AppContext);
    return (
        <div>
            <CharacterGrid></CharacterGrid>
            <Header></Header>
            <div className="wrapper">
                <a className='mail' target="_blank" href="mailto:leo.velasco.garcia@gmail.com">{Language == "ES" ? "Escríbeme" : "Email me"}</a>
            </div>
        </div >
    )
}

export default Contact