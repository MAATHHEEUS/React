import { useState } from 'react';
import './LoginForm.css';
import CampoTexto from '../CampoTexto/CampoTexto';
import ModalResetSenha from '../ModalResetSenha/ResetSenha';
import CampoSenha from "../CampoSenha/CampoSenha";
import Botao from "../Botao/Botao";
import { Link } from "react-router-dom";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modal, setModal] = useState(false);

    const SubmitForm = (evento) => {
        evento.preventDefault();
        setEmail('');
        setSenha('');
    }

    const ativaModal = () => {
        setModal(!modal);
    }

    return (
        <section className="formulario">
            <ModalResetSenha modal={modal} ativaModal={ativaModal}/>
            <form onSubmit={SubmitForm}>
                <h1>Login</h1>
                <CampoTexto
                    obrigatorio={true}
                    label="Email"
                    placeholder="Digite o email cadastrado"
                    valor={email}
                    atualizaValor={email => setEmail(email)}
                />
                <CampoSenha
                    obrigatorio={true}
                    label="Senha"
                    placeholder="Digite sua senha"
                    valor={senha}
                    modal={modal}
                    atualizaValor={senha => setSenha(senha)}
                />
                <a onClick={() => ativaModal()}>Esqueci a senha</a>
                <Botao>
                    Entrar
                </Botao>
            </form>
            <div className='secao__cadastro'>
                <p>Ainda não tem uma conta?</p>
                <Link to="/Cadastro" className='botao__cadastrar'> Cadastrar </Link>
            </div>
        </section>
    )
}