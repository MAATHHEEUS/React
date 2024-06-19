import { useState } from "react";
import Botao from "../Botao/Botao";
import CampoTexto from "../CampoTexto/CampoTexto";
import "./ResetSenha.css";
import { AiFillCloseCircle } from "react-icons/ai";

export default function ResetSenha({ modal, ativaModal }) {

    const [email, setEmail] = useState('');

    return (
        <div className="modal" style={{ display: modal ? "flex" : "none" }}>
            <div className="container">
                <AiFillCloseCircle onClick={ativaModal} size={30} className="icon__x"/>
                <form>
                    <h2>Resetar senha</h2>
                    <CampoTexto
                        obrigatorio={true}
                        label="Email"
                        placeholder="Digite o email cadastrado"
                        valor={email}
                        atualizaValor={email => setEmail(email)}
                    />
                    <Botao>
                        Enviar nova senha
                    </Botao>
                </form>
            </div>
        </div>
    )
}