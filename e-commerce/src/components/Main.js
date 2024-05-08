import React, { useState, useEffect } from 'react';
import Card from './Card.js'
import "../styles/main.css";

export default function Main() {

    const [produtos, setProdutos] = useState([]);

    const montaCards = () => {
        if (produtos.length == 0) return <p>nenhum produto foi adicionado</p>
        return <div className='main__products__container'>
            {
                produtos.map(
                    produto => <Card key={produto.id} id={produto.id} nome={produto.nome} preco={produto.valor} img={produto.imagem} funcaoClick={evento => excluirProduto(evento, produto.id)} />
                )
            }
        </div>
    }

    const excluirProduto = async (evento, id) => {
        evento.preventDefault();
        try {
            const conexao = await fetch(`http://localhost:4000/produtos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (!conexao.ok) throw new Error("Não foi possível deletar o produto.");
            else{
                alert("Produto excluído.");
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        async function getProdutos() {
            try {
                const conexao = await fetch("http://localhost:4000/produtos");
                if (!conexao.ok) throw new Error("Não foi possível acessar API com os produtos.");
                else {
                    const conexaoConvertida = conexao.json();
                    conexaoConvertida.then(res => {
                        setProdutos(res);
                        console.log(res);
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

        const descricao = document.getElementById("descricao").value;
        const valor = document.getElementById("valor").value;
        const imagem = document.getElementById("imagem").value;

        try {
            await criarProduto(descricao, valor, imagem);
            alert('Produto guardado com sucesso.');
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }

    async function criarProduto(nome, valor, imagem) {
        const conexao = await fetch("http://localhost:4000/produtos", {
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

    return (
        <main className='main'>
            <section className='main__products'>
                <h2 className='main__products__titulo'>Meus Produtos:</h2>
                {montaCards()}
            </section>
            <form className='main__form'>
                <h2 className='main__form__titulo'>Adicionar Produtos:</h2>
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