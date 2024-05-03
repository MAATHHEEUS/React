import React from 'react';
import "../styles/main.css";

export default function Main() {
    return (
        <main className='main'>
            <section className='main__products'>
                <h2 className='main__products__titulo'>Meus Produtos:</h2>
                <div className='main__products__container'></div>
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
                    <input className='form__input' type='text' placeholder='Por exemplo: img/produto_x.pgn'></input>
                </div>
                <div className='main__form__botoes'>
                    <button className='botao__guardar'>Guardar</button>
                    <button className='botao__limpar'>Limpar</button>
                </div>
            </form>
        </main>
    )
}