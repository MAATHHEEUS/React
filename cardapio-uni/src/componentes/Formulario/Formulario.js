import { useState } from 'react';
import './Formulario.css';
import CampoTexto from '../CampoTexto/CampoTexto';
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa';
import Botao from '../Botao/Botao';
import uuid4 from "uuid4";

export default function 
Formulario(props) {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    const [loja, setLoja] = useState(props.lojas.length > 0 ? props.lojas[0].nome : "");

    const SubmitForm = (evento) => {
        var id = uuid4();
        evento.preventDefault();
        console.log(loja);
        props.adicionaProduto({
            id,
            descricao,
            imagem,
            loja,
            nome,
            favorito: false
        });
        setNome('');
        setDescricao('');
        setImagem('');
    }

    return (
        <section className="formulario" style={{display: props.usuario[4] !== "Loja" ? "none" : "flex"}}>
            <form onSubmit={SubmitForm}>
                <h2>Preencha os dados para criar o card do produto</h2>
                <CampoTexto
                    obrigatorio={true}
                    label="Nome"
                    placeholder="Digite o nome do produto"
                    max={60}
                    valor={nome}
                    atualizaValor={valor => setNome(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Descrição"
                    max={100}
                    placeholder="Digite uma pequena descrição do produto"
                    valor={descricao}
                    atualizaValor={valor => setDescricao(valor)}
                />
                <CampoTexto
                    max={250}
                    label="Imagem"
                    placeholder="URL da imagem"
                    valor={imagem}
                    atualizaValor={valor => setImagem(valor)}
                />
                <ListaSuspensa
                    obrigatorio={true}
                    label="Loja"
                    items={props.lojas}
                    valor={loja}
                    atualizaValor={valor => setLoja(valor)}
                />
                <Botao>
                    Criar Card
                </Botao>
            </form>
        </section>
    )
}