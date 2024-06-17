import Botao from "../Botao/Botao";
import CampoTexto from "../CampoTexto/CampoTexto";
import "./ResetSenha.css";
import { AiFillCloseCircle } from "react-icons/ai";

export default function ResetSenha() {
    return(
        <div className="modal">
            <div className="container">
                <AiFillCloseCircle />
                <form>
                    <h2>Resetar senha</h2>
                    <CampoTexto />
                    <Botao>
                        Enviar nova senha
                    </Botao>
                </form>
            </div>
        </div>
    )
}