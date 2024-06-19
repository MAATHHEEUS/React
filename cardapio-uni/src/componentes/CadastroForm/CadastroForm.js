import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../Botao/Botao";
import CampoSenha from "../CampoSenha/CampoSenha";
import CampoTexto from "../CampoTexto/CampoTexto";
import ListaSuspensa from "../ListaSuspensa/ListaSuspensa";
import uuid4 from "uuid4";

export default function CadastroForm() {

    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("Loja");
    const navigate = useNavigate();
    const [tipos, setTipos] = useState([
        {
            id: 1,
            nome: 'Loja'
        },
        {
            id: 2,
            nome: 'Usuário'
        }
    ]);

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

    const cadastrar = (evento) => {
        evento.preventDefault();
        usuarios.find((usuario) => usuario.email === email) !== undefined ? alert("Email já cadastrado!") : PUT_User();
    }

    async function PUT_User() {
        let usuarioNovo = {
            "id": uuid4(),
            "nome": nome,
            "email": email,
            "senha": senha,
            "tipo": tipo
        };
        const conexao = await fetch("https://api.jsonbin.io/v3/b/66731fe7acd3cb34a859f313", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "X-Master-Key": "$2a$10$ZBNe5zljorQD6qhdzyP4C.JZMmoCkQA7gEcIcOPaP9EWWtn7NYzGW"
            },
            body: JSON.stringify({
                "usuarios": [
                    ...usuarios,
                    usuarioNovo
                ]
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível cadastrar o usuário.");
        else{
            setEmail("");
            setNome("");
            setSenha("");
            alert("Cadastro realizado com sucesso!");
            navigate("/Login");
        }
    }

    return (
        <section className="formulario">
            <form onSubmit={(evento) => cadastrar(evento)}>
                <h2>Preencha os dados para realizar o cadastro</h2>
                <CampoTexto
                    obrigatorio={true}
                    label="Email"
                    placeholder="Digite um email válido"
                    valor={email}
                    atualizaValor={valor => setEmail(valor)}
                />
                <CampoSenha
                    obrigatorio={true}
                    label="Senha"
                    placeholder="Digite uma senha"
                    valor={senha}
                    atualizaValor={senha => setSenha(senha)}
                />
                <ListaSuspensa
                    obrigatorio={true}
                    label="Tipo"
                    items={tipos}
                    valor={tipo}
                    atualizaValor={valor => setTipo(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label={tipo}
                    placeholder={tipo == 'Loja' ? "Nome da Loja" : "Nome do Usuário"}
                    valor={nome}
                    atualizaValor={valor => setNome(valor)}
                />
                <Botao>
                    Cadastrar
                </Botao>
            </form>
        </section>
    )
}