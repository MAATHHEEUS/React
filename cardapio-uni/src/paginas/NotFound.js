import { Link } from "react-router-dom";
import Rodape from "../componentes/Rodape/Rodape";

export default function NotFound() {
    const msg = "Olá, estou com problemas de página não encontrada no CardápioUNI."

    return (
        <>
            <div>
                <h1>Oops! Você deve estar perdido.</h1>
                <p>Aqui está alguns links que podem ser úteis:</p>
                <Link to='/'>Home</Link>
                <a href={`https://api.whatsapp.com/send?phone=${5511974200390}&text=${msg}`} target="_blank">Contato</a>
            </div>
        </>
    )
}