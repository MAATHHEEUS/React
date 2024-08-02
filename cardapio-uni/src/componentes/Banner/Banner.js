import { Link } from 'react-router-dom'
import './Banner.css'

export default function Banner({ usuario = [0, "null", "null", "null"] }) {
    return (
        <header className="banner">
            <img src="./imagens/banner.png" alt="Imagem banner do cardápio UNIVERSAL" />
            <Link to="/Login">
                {usuario[0] !== 0 ? "Sair" : "Entrar"}
            </Link>
        </header>
    )
}