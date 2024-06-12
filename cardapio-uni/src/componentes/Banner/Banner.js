import { Link } from 'react-router-dom'
import './Banner.css'

export default function Banner() {
    return (
        <header className="banner">
            <img src="./imagens/banner.png" alt="Imagem banner do cardápio UNIVERSAL" />
            <Link to="/Login">
                Entrar
            </Link>
        </header>
    )
}