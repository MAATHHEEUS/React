import { useState } from "react";
import Botao from "../Botao/Botao";
import CampoSenha from "../CampoSenha/CampoSenha";
import CampoTexto from "../CampoTexto/CampoTexto";
import ListaSuspensa from "../ListaSuspensa/ListaSuspensa";

export default function CadastroForm() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");

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

    return (
        <section className="formulario">
            <form onSubmit={""}>
                <h2>Preencha os dados para realizar o cadastro</h2>
                <CampoTexto
                    obrigatorio={true}
                    label="Nome"
                    placeholder="Digite seu nome"
                    valor={nome}
                    atualizaValor={valor => setNome(valor)}
                />
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
                <Botao>
                    Cadastrar
                </Botao>
            </form>
        </section>
    )
}