import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Client() {
    return (
        <>
            <section className='buttons'>
                <Link className='botao__user' id="btn-cliente" to='/user'>Usuário</Link>
                <Link className='botao__adm' to='/adm'>Adm</Link>
            </section>
        </>
    )
}