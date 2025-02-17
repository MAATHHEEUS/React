import React, { useState, useEffect } from 'react';
import "../styles/client.css";

export default function Client() {

    const excluirCliente = async (evento, id) => {
        evento.preventDefault();
        alert("Cliente Excluído");
    }

    useEffect(() => {
        async function getDados() {
            console.log("Teste")
        }
        getDados();
    }, []);

    const limparForm = (evento) => {
        excluirCliente(evento, 0);
        evento.preventDefault();
        const inputs = document.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = "";
        })
    }

    const submitForm = async (evento) => {
        evento.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const nascimento = document.getElementById("nascimento").value;
        const cpf = document.getElementById("cpf").value;
        const cep = document.getElementById("cep").value;
        const rua = document.getElementById("rua").value;
        const numero = document.getElementById("numero").value;
        const bairro = document.getElementById("bairro").value;
        const cidade = document.getElementById("cidade").value;
        const uf = document.getElementById("uf").value;

        try {
            await criarCliente(nome, email, nascimento, cpf, cep, rua, numero, bairro, cidade, uf);
            alert('Dados guardados com sucesso.');
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }

    async function criarCliente(nome, email, nascimento, cpf, cep, rua, numero, bairro, cidade, uf) {
        const conexao = await fetch("http://localhost:4000/produtos", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nome: nome
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cliente.");
    }

    return (
        <main className='main'>
            <form className='main__form'>
                <h2 className='main__form__titulo'>Cadastro de Cliente:</h2>
                <div className='main__form__input'>
                    <label className='input__label'>nome...</label>
                    <input className='form__input' id='nome' type='text' placeholder='nome que deseja ser chamado'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>email...</label>
                    <input className='form__input' id='email' type='email' placeholder='email@email.com'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>data de nascimento...</label>
                    <input className='form__input' id='nascimento' type='date' placeholder='dd/mm/aaaa'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>CPF...</label>
                    <input className='form__input' id='cpf' type='text' placeholder='000.000.000-00'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>cep...</label>
                    <input className='form__input' id='cep' type='text' placeholder='000-00000'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>rua...</label>
                    <input className='form__input' id='rua' type='text' placeholder='Rua x'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>número...</label>
                    <input className='form__input' id='numero' type='text' placeholder='00'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>bairro...</label>
                    <input className='form__input' id='bairro' type='text' placeholder='Jardim Azul'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>cidade...</label>
                    <input className='form__input' id='cidade' type='text' placeholder='Cidade'></input>
                </div>
                <div className='main__form__input'>
                    <label className='input__label'>estado/UF...</label>
                    <input className='form__input' id='uf' type='text' placeholder='SP'></input>
                </div>
                <div className='main__form__botoes'>
                    <button className='botao__guardar' onClick={evento => submitForm(evento)}>Guardar</button>
                    <button className='botao__limpar' onClick={evento => limparForm(evento)}>Limpar</button>
                </div>
            </form>
        </main>
    )
}