import { useEffect, useState } from 'react';
import './LoginForm.css';
import CampoTexto from '../CampoTexto/CampoTexto';
import ModalResetSenha from '../ModalResetSenha/ResetSenha';
import CampoSenha from "../CampoSenha/CampoSenha";
import Botao from "../Botao/Botao";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modal, setModal] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUsuarios() {
            try {
                const conexao = await fetch("https://api.jsonbin.io/v3/b/66731fe7acd3cb34a859f313", {
                    method: "GET",
                    headers: {
                        "X-Master-Key": "$2a$10$ZBNe5zljorQD6qhdzyP4C.JZMmoCkQA7gEcIcOPaP9EWWtn7NYzGW"
                    }
                });
                if (!conexao.ok) throw new Error("Não foi possível acessar API com os usuários.");
                else {
                    const conexaoConvertida = conexao.json();
                    conexaoConvertida.then(res => {
                        console.log(res.record.usuarios);
                        setUsuarios(res.record.usuarios);
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUsuarios();
    }, []);

    const SubmitForm = (evento) => {
        evento.preventDefault();
        let cadastro = usuarios.find((usuario) => usuario.email === email);
        if (cadastro === undefined) alert("Email ainda não cadastrado!");
        else {
            if (cadastro.senha !== senha) alert("Senha incorreta!");
            else {
                setEmail('');
                setSenha('');
                localStorage.setItem("usuario", JSON.stringify(Object.values(cadastro)));
                navigate("/");
            }
        }
    }

    const ativaModal = () => {
        setModal(!modal);
    }

    return (
        <section className="formulario">
            <ModalResetSenha modal={modal} ativaModal={ativaModal} />
            <form onSubmit={SubmitForm}>
                <h1>Login</h1>
                <CampoTexto
                    obrigatorio={true}
                    label="Email"
                    max={100}
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
                    max={30}
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