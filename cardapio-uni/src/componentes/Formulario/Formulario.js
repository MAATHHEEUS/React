import { useState } from 'react'
import './Formulario.css'
import CampoTexto from '../CampoTexto/CampoTexto'
import ListaSuspensa from '../ListaSuspensa/ListaSuspensa'
import Botao from '../Botao/Botao'

export default function Formulario(props) {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    const [loja, setLoja] = useState(props.lojas[0].nome);

    const SubmitForm = (evento) => {
        evento.preventDefault();
        props.adicionaProduto({
            nome,
            descricao,
            imagem,
            loja
        });
        setNome('');
        setDescricao('');
        setImagem('');
    }

    return (
        <section className="formulario">
            <form onSubmit={SubmitForm}>
                <h2>Preencha os dados para criar o card do produto</h2>
                <CampoTexto
                    obrigatorio={true}
                    label="Nome"
                    placeholder="Digite o nome do produto"
                    valor={nome}
                    atualizaValor={valor => setNome(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Descrição"
                    placeholder="Digite uma pequena descrição do produto"
                    valor={descricao}
                    atualizaValor={valor => setDescricao(valor)}
                />
                <CampoTexto
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