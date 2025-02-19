import React, { useState, useEffect } from 'react';
import "../styles/client.css";

export default function Client() {

    const [isClient, setIsClient] = useState(false);
    const [formControl, setFormControl] = useState(false);

    const excluirCliente = async (evento, id) => {
        evento.preventDefault();
        try {
            const conexao = await fetch(`http://localhost:3001/cliente/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (!conexao.ok) throw new Error("Não foi possível deletar o produto.");
            else {
                alert("Cliente excluído.");
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    }

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
            isClient ? await atualizaCliente(cliente.id_cliente, nome, email, nascimento, cpf, cep, rua, numero, bairro, cidade, uf) : await criarCliente(nome, email, nascimento, cpf, cep, rua, numero, bairro, cidade, uf);
            alert('Dados guardados com sucesso.');
            window.open(`http://localhost:3000/Home/${cliente.id_cliente}`, "_self");
        } catch (error) {
            alert(error);
        }
    }

    async function criarCliente(nome, email, nascimento, cpf, cep, rua, numero, bairro, cidade, uf) {
        const conexao = await fetch("http://localhost:3001/cliente", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                nascimento: nascimento,
                cpf: cpf,
                cep: cep,
                rua: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                uf: uf
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cliente.");
    }

    async function atualizaCliente(id, nome, email, nascimento, cpf, cep, rua, numero, bairro, cidade, uf) {
        const conexao = await fetch(`http://localhost:3001/cliente/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                nascimento: nascimento,
                cpf: cpf,
                cep: cep,
                rua: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                uf: uf
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cliente.");
    }

    async function jaSouCliente(evento) {
        evento.preventDefault();
        const email = prompt("Digite seu email:");
        if (email === null || email === '') alert("Digite um email válido!");
        else {
            buscaCliente(email)
        }
    }

    async function buscaCliente(email) {
        try {
            const conexao = await fetch(`http://localhost:3001/cliente/${email}`);
            if (!conexao.ok) throw new Error("Não foi possível acessar API com os clientes.");
            else {
                const conexaoConvertida = conexao.json();
                conexaoConvertida.then(res => {
                    res.length === 0 ? alert("Email não encontrado!") : montaCliente(res[0])
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [cliente, setCliente] = useState({
        CPF_cliente: "",
        bairro_cliente: "",
        cep_cliente: "",
        cidade_cliente: "",
        email_cliente: "",
        id_cliente: 0,
        nasc_cliente: "",
        nome_cliente: "",
        numero_cliente: "",
        rua_cliente: "",
        uf_cliente: ""
    });

    const onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        const newValues = {
            ...cliente,
            [name]: value
        };
        setCliente(newValues);
    }

    function montaCliente(cliente) {
        setCliente(cliente);
        setFormControl(true);
        setIsClient(true);
    }

    return (
        <main className='main'>
            {!formControl && <div className='main__form__botoes'>
                <button className='botao__guardar' onClick={evento => jaSouCliente(evento)}>Já sou cliente</button>
                <button className='botao__limpar' onClick={() => setFormControl(true)}>Cadastrar</button>
            </div>}
            {formControl &&
                <form className='main__form'>
                    {!isClient ? <h2 className='main__form__titulo'>Cadastro de Cliente:</h2> : <h2 className='main__form__titulo'>Edição de Cliente:</h2>}
                    <div className='main__form__input'>
                        <label className='input__label'>email...</label>
                        <input className='form__input' id='email' type='email' placeholder='email@email.com' onChange={onChange} defaultValue={cliente.email_cliente}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>nome...</label>
                        <input className='form__input' id='nome' type='text' placeholder='nome que deseja ser chamado' onChange={onChange} defaultValue={cliente.nome_cliente}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>data de nascimento...</label>
                        <input className='form__input' id='nascimento' type='date' placeholder='dd/mm/aaaa' onChange={onChange} defaultValue={cliente.nasc_cliente}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>CPF...</label>
                        <input className='form__input' id='cpf' type='text' placeholder='000.000.000-00' onChange={onChange} defaultValue={cliente.CPF_cliente}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>cep...</label>
                        <input className='form__input' id='cep' type='text' placeholder='000-00000' onChange={onChange} defaultValue={cliente.cep_cliente}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>rua...</label>
                        <input className='form__input' id='rua' type='text' placeholder='Rua x' onChange={onChange} defaultValue={cliente.rua_cliente}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>número...</label>
                        <input className='form__input' id='numero' type='text' placeholder='00' onChange={onChange} defaultValue={cliente.numero_cliente}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>bairro...</label>
                        <input className='form__input' id='bairro' type='text' placeholder='Jardim Azul' onChange={onChange} defaultValue={cliente.bairro_cliente}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>cidade...</label>
                        <input className='form__input' id='cidade' type='text' placeholder='Cidade' onChange={onChange} defaultValue={cliente.cidade_cliente}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>estado/UF...</label>
                        <input className='form__input' id='uf' type='text' placeholder='SP' onChange={onChange} defaultValue={cliente.uf_cliente}></input>
                    </div>
                    <div className='main__form__botoes'>
                        <button className='botao__guardar' onClick={evento => submitForm(evento)}>Guardar</button>
                        {!isClient ? <button className='botao__limpar' onClick={evento => limparForm(evento)}>Limpar</button> : <button className='botao__excluir' onClick={evento => excluirCliente(evento, cliente.id_cliente)}>Excluir</button>}
                    </div>
                </form>}
        </main>
    )
}