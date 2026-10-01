// import React from 'react'
import Header from '../components/Header'
import "./Contact.css"
import { AppContext } from '../context/AppContext';
import { useContext, useRef } from 'react';
import CharacterGrid from '../components/CharacterGrid';

const Contact = () => {
    const { Language } = useContext(AppContext);
    const mailRef = useRef(null);
    return (
        <div className='contact'>
            <CharacterGrid variant="inward" originRef={mailRef}></CharacterGrid>
            <Header></Header>
            <div className="wrapper">
                <a ref={mailRef} className='mail centeredLabel' target="_blank" href="mailto:leo.velasco.garcia@gmail.com">{Language == "ES" ? "Escríbeme" : "Email me"}</a>
            </div>
        </div >
    )
}

export default Contact