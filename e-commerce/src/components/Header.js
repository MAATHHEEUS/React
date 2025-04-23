import React from 'react';
import "../styles/header.css";
import Logo from "../imgs/logo.png";

export default function Header(){

    return(
        <header className='header'>
            <img src={Logo} className='header__imagem' alt='Logo'/>
            <h1 className='header__titulo'>E-commerce</h1>
        </header>
    )
}