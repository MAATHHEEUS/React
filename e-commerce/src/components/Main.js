import React, { useState, useEffect } from 'react';
import Card from './Card.js'
import "../styles/main.css";

export default function Main() {

    const [produtos, setProdutos] = useState([]);
    const [produtosInativos, setProdutosInativos] = useState([]);

    // Estado para a pesquisa
    const [pesquisa, setPesquisa] = useState('');

    // Função para lidar com a pesquisa
    const handlePesquisa = (e) => {
        setPesquisa(e.target.value);
    };

    // Filtra os produtos com base na pesquisa
    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome_prod.toLowerCase().includes(pesquisa.toLowerCase()) || produto.valor_prod.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const montaCards = () => {
        if (produtos.length === 0) return <p>nenhum produto foi adicionado</p>
        return <div className='main__products__container'>
            {
                produtosFiltrados.map(
                    produto => <Card key={produto.id_prod} id={produto.id_prod} nome={produto.nome_prod} preco={produto.valor_prod} img={produto.imagem_prod} funcaoClick={evento => excluirProduto(evento, produto.id_prod)} funcaoEdit={evento => preencheInputs(evento, produto.id_prod, produto.nome_prod, produto.valor_prod, produto.imagem_prod)} />
                )
            }
        </div>
    }

    const preencheInputs = (evento, id, nome, valor, imagem) => {
        evento.preventDefault();
        document.getElementById("id_prod").value = id;
        document.getElementById("descricao").value = nome;
        document.getElementById("valor").value = valor;
        document.getElementById("imagem").value = imagem;
    }

    const excluirProduto = async (evento, id) => {
        evento.preventDefault();
        try {
            const conexao = await fetch(`http://localhost:3001/produtos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (!conexao.ok) throw new Error("Não foi possível deletar o produto.");
            else {
                alert("Produto inativado.");
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        async function getProdutos() {
            try {
                const conexao = await fetch("http://localhost:3001/produtos");
                if (!conexao.ok) throw new Error("Não foi possível acessar API com os produtos.");
                else {
                    const conexaoConvertida = conexao.json();
                    conexaoConvertida.then(res => {
                        setProdutos(res);
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProdutos();
    }, []);

    const limparForm = (evento) => {
        evento.preventDefault();
        const inputs = document.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = "";
        })
    }

    const submitForm = async (evento) => {
        evento.preventDefault();

        const id = document.getElementById("id_prod").value;
        const descricao = document.getElementById("descricao").value;
        const valor = document.getElementById("valor").value;
        const imagem = document.getElementById("imagem").value;

        try {
            id === "" ? await criarProduto(descricao, valor, imagem) : await atualizaProduto(id, descricao, valor, imagem);
            alert('Produto guardado com sucesso.');
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }

    const buscarInativos = async (evento) => {
        evento.preventDefault();
        try {
            const conexao = await fetch("http://localhost:3001/produtosI");
            if (!conexao.ok) throw new Error("Não foi possível acessar API com os produtos.");
            else {
                const conexaoConvertida = conexao.json();
                conexaoConvertida.then(res => {
                    setProdutosInativos(res);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function criarProduto(nome, valor, imagem) {
        const conexao = await fetch("http://localhost:3001/produtos", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                valor: valor,
                imagem: imagem
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar o produto.");
    }

    async function atualizaProduto(id, nome, valor, imagem) {
        const conexao = await fetch(`http://localhost:3001/produtos/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                valor: valor,
                imagem: imagem
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar o produto.");
    }

    async function ativarProduto(evento, id) {
        evento.preventDefault();
        const conexao = await fetch(`http://localhost:3001/produtosI/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            }
        });
        if (!conexao.ok) throw new Error("Não foi possível ativar o produto.");
        else window.location.reload();
    }

    return (
        <main className='main'>
            <section className='main__products'>
                <input
                    type="text"
                    placeholder="Pesquisar produtos"
                    value={pesquisa}
                    onChange={handlePesquisa}
                />
                <h2 className='main__products__titulo'>Meus Produtos:</h2>
                {montaCards()}
                <button className='botao__guardar' onClick={evento => buscarInativos(evento)}>Inativos</button>
                <div id='inativos'>
                    {produtosInativos.length === 0 ? <p>Não há produtos inativos</p> : produtosInativos.map(
                        produto => <li key={produto.id_prod} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <p>{produto.nome_prod}</p>
                            <p>Preço: R$ {produto.valor_prod}</p>
                            <button onClick={evento => ativarProduto(evento, produto.id_prod)}>Ativar</button>
                        </li>
                    )}
                </div>
            </section>
            <form className='main__form'>
                <h2 className='main__form__titulo'>Adicionar Produtos:</h2>
                <input className='form__input' id='id_prod' type='hidden'></input>
                <div className='main__form__input'>
                    <label className='input__label'>nome...</label>
                    <input className='form__input' id='descricao' type='text' placeholder='produto x'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>valor...</label>
                    <input className='form__input' id='valor' type='text' placeholder='34,99'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>imagem...</label>
                    <input className='form__input' id='imagem' type='text' placeholder='url online'></input>
                </div>
                <div className='main__form__botoes'>
                    <button className='botao__guardar' onClick={evento => submitForm(evento)}>Guardar</button>
                    <button className='botao__limpar' onClick={evento => limparForm(evento)}>Limpar</button>
                </div>
            </form>
        </main>
    )
}