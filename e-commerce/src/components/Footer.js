import React from 'react';
import "../styles/footer.css";
import Logo from "../imgs/logo.png";

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__container__logo'>
                <img src={Logo} className='footer__imagem' alt='Logo' />
                <h1 className='footer__titulo'>E-commerce</h1>
            </div>
            <p className='footer__info'>Desenvolvido por <a href='https://www.linkedin.com/in/devmatheus-carvalho-oliveira/' target='_blank' className='footer__info__destaque'>Matheus</a></p>
        </footer>
    )
}