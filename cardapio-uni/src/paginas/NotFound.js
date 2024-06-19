import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import Conversa from "../componentes/Conversa/Conversa";

const Imagem = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    opacity: 0.5;
    background-repeat: no-repeat;
    height: 100vh;
    background-color: #f83432;
    align-items: center;
    justify-content: flex-end;
    background-attachment: fixed;
    background-position-x: center;
    background-image: url(./imagens/banner.png);
`;

const Titulo = styled.h1`
    font-size: 2.5rem;
    margin: 1rem;
`;

const Paragrafo = styled.p`
    font-size: 1.5rem;
    margin: 1rem;
`;

const cssLink = {
    textDecoration: 'none',
    fontSize: '1.5rem',
    color: '#FFFFFF',
    fontWeight: '600',
    margin: '2rem',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
};

export default function NotFound() {
    const msg = "Olá, estou com problemas de página não encontrada no CardápioUNI."

    return (
        <>
            <Conversa />
            <Imagem>
                <Titulo>Oops! Você deve estar perdido.</Titulo>
                <Paragrafo>Aqui está alguns links que podem ser úteis:</Paragrafo>
                <Link to='/' style={cssLink}><FaHome />Home</Link>
                <a style={cssLink} href={`https://api.whatsapp.com/send?phone=${5511974200390}&text=${msg}`} target="_blank"><IoLogoWhatsapp />Contato</a>
            </Imagem>
        </>
    )
}