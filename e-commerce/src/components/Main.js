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
                    produto => <Card key={produto.id} id={produto.id} nome={produto.nome} preco={produto.valor} img={produto.imagem} />
                )
            }
        </div>
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
                    <input className='form__input' type='text' placeholder='produto x'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>valor...</label>
                    <input className='form__input' type='text' placeholder='34,99'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>imagem...</label>
                    <input className='form__input' type='text' placeholder='url online'></input>
                </div>
                <div className='main__form__botoes'>
                    <button className='botao__guardar'>Guardar</button>
                    <button className='botao__limpar'>Limpar</button>
                </div>
            </form>
        </main>
    )
}