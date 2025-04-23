import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/client.css";
import Icons from './Icons.js';

export default function Client() {

    const navigate = useNavigate();

    // 🎯 Função para formatar valores em reais (R$)
    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };

    // CONTROLE //
    const [isClient, setIsClient] = useState(localStorage.getItem('cliente') !== null ? true : false);
    const [formControl, setFormControl] = useState(localStorage.getItem('cliente') !== null ? true : false);
    const [formDisplay, setFormDisplay] = useState("Cliente");

    const limparForm = (evento) => {
        evento.preventDefault();
        const inputs = document.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = "";
        })
    }

    function toggleMenu() {
        document.getElementById('sidebar').classList.toggle('collapsed');
    }

    function showContent(event, section) {
        setFormDisplay(section);
        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
    }

    // CLIENTE //
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
                alert("Cliente inativado.");
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    }

    const submitForm = async (evento) => {
        evento.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const nascimento = document.getElementById("nascimento").value;
        const cpf = document.getElementById("cpf").value;
        const senha = document.getElementById("senha").value;

        try {
            isClient ? await atualizaCliente(cliente.id_cliente, nome, email, nascimento, cpf, senha) : await criarCliente(nome, email, nascimento, cpf);
            alert('Dados guardados com sucesso.');
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }

    async function criarCliente(nome, email, nascimento, cpf) {
        const conexao = await fetch("http://localhost:3001/cliente", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                nascimento: nascimento,
                cpf: cpf
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cliente.");
    }

    async function atualizaCliente(id, nome, email, nascimento, cpf, senha) {
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
                senha: senha
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

    useEffect(() => {
        const funcaoAuxiliar = async () => {
            if (localStorage.getItem('cliente') !== null) {
                await buscaCliente(localStorage.getItem('cliente'));
            }
        };

        funcaoAuxiliar();
    }, []);

    const [cliente, setCliente] = useState({
        CPF_cliente: "",
        situacao_cliente: "",
        senha: "",
        email_cliente: "",
        id_cliente: 0,
        nasc_cliente: "",
        nome_cliente: "",
        telefone_cliente: "",
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
        localStorage.setItem("cliente", cliente.id_cliente);
        setCliente(cliente);
        setFormControl(true);
        setIsClient(true);
        buscaEnderecos(cliente.id_cliente);
        buscaCartoes(cliente.id_cliente);
        buscaTransacoes(cliente.id_cliente);
    }

    // ENDEREÇOS //

    const submitFormEnd = async (evento) => {
        evento.preventDefault();

        const identificacao = document.getElementById("identificacao").value;
        const tipo = document.getElementById("tipo").value;
        const cep = document.getElementById("cep").value;
        const rua = document.getElementById("rua").value;
        const numero = document.getElementById("numero").value;
        const bairro = document.getElementById("bairro").value;
        const cidade = document.getElementById("cidade").value;
        const uf = document.getElementById("uf").value;

        try {
            enderecos[enderecoAtual].id_end !== null ? await atualizaEnd(enderecos[enderecoAtual].id_end, identificacao, tipo, cep, rua, numero, bairro, cidade, uf) : await criarEnd(identificacao, tipo, cep, rua, numero, bairro, cidade, uf);
            alert('Dados guardados com sucesso.');
            buscaEnderecos(cliente.id_cliente);
        } catch (error) {
            alert(error);
        }
    }

    async function criarEnd(identificacao, tipo, cep, rua, numero, bairro, cidade, uf) {
        const conexao = await fetch("http://localhost:3001/endereco", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                identificacao: identificacao,
                tipo: tipo,
                cep: cep,
                rua: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                id_cliente: cliente.id_cliente
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cliente.");
    }

    async function atualizaEnd(id, identificacao, tipo, cep, rua, numero, bairro, cidade, uf) {
        const conexao = await fetch(`http://localhost:3001/endereco/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                identificacao: identificacao,
                tipo: tipo,
                cep: cep,
                rua: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                uf: uf
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do endereço.");
    }

    const excluirEnd = async (evento, id) => {
        evento.preventDefault();
        try {
            const conexao = await fetch(`http://localhost:3001/endereco/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (!conexao.ok) throw new Error("Não foi possível deletar o endereço.");
            else {
                alert("Endereço inativado.");
                handleChangeIndex(0);
                buscaEnderecos(cliente.id_cliente);
            }
        } catch (error) {
            alert(error);
        }
    }

    const [enderecos, setEnderecos] = useState([{
        UF: "",
        bairro_end: "",
        cep_end: "",
        cidade: "",
        id_cliente_end: null,
        id_end: null,
        identificacao_end: "Novo",
        numero_end: "",
        rua_end: "",
        tipo: ""
    }]);

    async function buscaEnderecos(id_cliente) {
        try {
            const conexao = await fetch(`http://localhost:3001/endereco/${id_cliente}`);
            if (!conexao.ok) throw new Error("Não foi possível acessar API com os enderecos.");
            else {
                const conexaoConvertida = conexao.json();
                conexaoConvertida.then(res => {
                    const mergedUnique = [enderecos[0], ...res];
                    setEnderecos(mergedUnique);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    function montaEnderecos() {
        return enderecos.map((item, index) => (
            <li
                key={item.id_end}
                className={`item_lista`}
                onClick={() => handleChangeIndex(index)}
            >
                {item.identificacao_end}
            </li>
        ))
    }
    const [enderecoAtual, setEnderecoAtual] = useState(0);
    const [endereco, setEndereco] = useState(enderecos[enderecoAtual]);

    const handleChangeIndex = (index) => {
        setEnderecoAtual(index);
        setEndereco(enderecos[enderecoAtual]); // Atualiza os inputs com os novos dados
    };

    const onChangeEnd = (e) => {
        const { name, value } = e.target;
        setEndereco((prev) => ({ ...prev, [name]: value }));
    }

    // CARTÕES //

    const submitFormCard = async (evento) => {
        evento.preventDefault();

        const identificacao = document.getElementById("identificacao_card").value;
        const nome = document.getElementById("nome_card").value;
        const vencimento = document.getElementById("vencimento").value;
        const numero = document.getElementById("numero_card").value;
        const cvv = document.getElementById("cvv_card").value;
        const bandeira = document.getElementById("bandeira_card").value;
        const tipo = document.getElementById("tipo_card").value;

        try {
            cartoes[cartaoAtual].id_card !== null ? await atualizaCard(cartoes[cartaoAtual].id_card, identificacao, nome, tipo, vencimento, numero, cvv, bandeira) : await criarCard(identificacao, nome, tipo, vencimento, numero, cvv, bandeira);
            alert('Dados guardados com sucesso.');
            buscaCartoes(cliente.id_cliente);
        } catch (error) {
            alert(error);
        }
    }

    async function criarCard(identificacao, nome, tipo, vencimento, numero, cvv, bandeira) {
        const conexao = await fetch("http://localhost:3001/cartao", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                identificacao: identificacao,
                nome: nome,
                tipo: tipo,
                vencimento: vencimento,
                numero: numero,
                cvv: cvv,
                bandeira: bandeira,
                id_cliente: cliente.id_cliente
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cartão.");
    }

    async function atualizaCard(id, identificacao, nome, tipo, vencimento, numero, cvv, bandeira) {
        const conexao = await fetch(`http://localhost:3001/cartao/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                identificacao: identificacao,
                nome: nome,
                tipo: tipo,
                vencimento: vencimento,
                numero: numero,
                cvv: cvv,
                bandeira: bandeira
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cliente.");
    }

    const excluirCard = async (evento, id) => {
        evento.preventDefault();
        try {
            const conexao = await fetch(`http://localhost:3001/cartao/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (!conexao.ok) throw new Error("Não foi possível deletar o Cartão.");
            else {
                alert("Cartão inativado.");
                indexCartao(0);
                buscaCartoes(cliente.id_cliente);
            }
        } catch (error) {
            alert(error);
        }
    }

    const [cartoes, setCartoes] = useState([{
        cvv_card: "",
        bandeira_card: "",
        tipo_card: "",
        numero_card: "",
        vencimento_card: "",
        nome_card: "",
        id_cliente_card: null,
        id_card: null,
        identificacao_card: "Novo",
    }]);

    async function buscaCartoes(id_cliente) {
        try {
            const conexao = await fetch(`http://localhost:3001/cartao/${id_cliente}`);
            if (!conexao.ok) throw new Error("Não foi possível acessar API com os cartoes.");
            else {
                const conexaoConvertida = conexao.json();
                conexaoConvertida.then(res => {
                    const mergedUnique = [cartoes[0], ...res];
                    setCartoes(mergedUnique);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    function montaCartoes() {
        return cartoes.map((item, index) => (
            <li
                key={item.id_card}
                className={`item_lista`}
                onClick={() => indexCartao(index)}
            >
                {item.identificacao_card}
            </li>
        ))
    }
    const [cartaoAtual, setCartaoAtual] = useState(0);
    const [cartao, setCartao] = useState(cartoes[cartaoAtual]);

    const indexCartao = (index) => {
        setCartaoAtual(index);
        setCartao(cartoes[cartaoAtual]); // Atualiza os inputs com os novos dados
    };

    const onChangeCard = (e) => {
        const { name, value } = e.target;
        setCartao((prev) => ({ ...prev, [name]: value }));
    }

    // TRANSAÇÕES
    const [Transacoes, setTransacoes] = useState([{
        id_venda: "",
        id_cliente: "",
        endereco: "",
        cartao: "",
        cupons: "",
        total: "",
        frete: "",
        status: "",
        produtos: [],
    }]);

    async function buscaTransacoes(id_cliente) {
        try {
            const conexao = await fetch(`http://localhost:3001/transacao/${id_cliente}`);
            if (!conexao.ok) throw new Error("Não foi possível acessar API com os Transacoes.");
            else {
                const conexaoConvertida = conexao.json();
                conexaoConvertida.then(res => {
                    setTransacoes(res);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [linhasAbertas, setLinhasAbertas] = useState([]);
    const toggleLinha = (id) => {
        setLinhasAbertas(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const thStyle = {
        border: '1px solid #ccc',
        padding: '8px',
        backgroundColor: '#ddd'
    };

    function montaTransacoes() {
        const tdStyle = {
            border: '1px solid #ccc',
            padding: '8px'
        };

        const ulStyle = {
            listStyle: 'none',
            padding: 0,
            margin: 0
        };

        const liStyle = {
            padding: '8px',
            marginBottom: '6px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#fff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        };

        return Transacoes.map((item, index) => (
            <React.Fragment key={item.id_venda}>
                <tr
                    onClick={() => toggleLinha(item.id_venda)}
                    style={{ cursor: 'pointer', backgroundColor: '#f0f0f0' }}
                >
                    <td style={tdStyle}>{item.id_venda}</td>
                    <td style={tdStyle}>{item.endereco}</td>
                    <td style={tdStyle}>{item.cartao}</td>
                    <td style={tdStyle}>{item.cupons}</td>
                    <td style={tdStyle}>{formatarMoeda(item.total)}</td>
                    <td style={tdStyle}>{formatarMoeda(item.frete)}</td>
                    <td style={tdStyle}>{item.status}</td>
                </tr>
                {linhasAbertas.includes(item.id_venda) && (
                    <tr style={{ backgroundColor: '#fafafa' }}>
                        <td colSpan="2" style={{ ...tdStyle, paddingLeft: '20px' }}>
                            <ul style={ulStyle}>
                                {item.produtos.map((produto, idx) => (
                                    <li
                                        style={liStyle}
                                        className={`item_lista`}
                                        key={idx}>
                                        {`${produto.nome} - R$ ${produto.preco} - ${produto.quantidade}`}
                                        {produto.status_vdp !== 'EM TRANSITO' && !produto.status_vdp.includes('TROCA') ?
                                            <span onClick={() => trocarProduto(produto.id_vdp, produto.quantidade, item.id_venda)} title="Trocar produto">
                                                <svg className="svg-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M4 7h12l-1.41-1.41L16 4l4 4-4 4-1.41-1.41L16 9H4V7zm16 10H8l1.41 1.41L8 20l-4-4 4-4 1.41 1.41L8 15h12v2z" />
                                                </svg>
                                            </span> : <></>}
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                )}
            </React.Fragment>
        ))
    }

    const trocarProduto = async (id, quantidade, venda) => {
        const troca = prompt(`Deseja trocar quantos produtos?\nQuantidade comprada: ${quantidade}`);
        if (troca > quantidade) {
            alert("Impossível trocar quantidade maior que a quantidade comprada.\nTENTE NOVAMENTE!");
        }
        else {
            if (window.confirm("Tem certeza que deseja trocar o produto?")) {
                const conexao = await fetch(`http://localhost:3001/troca/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        quantidade: troca,
                        venda: venda
                    })
                });
                if (!conexao.ok) throw new Error("Não foi possível guardar os dados da venda.");
                window.location.reload();
            }
        }
    }

    return (
        <main className='main'>
            {!formControl && <div className='main__form__botoes'>
                <button className='botao__guardar' id='btn-jasoucliente' onClick={evento => jaSouCliente(evento)}>Já sou cliente</button>
                <button className='botao__limpar' id='btn-newcliente' onClick={() => setFormControl(true)}>Cadastrar</button>
            </div>}
            {formControl &&
                <div className="sidebar" id="sidebar">
                    <button onClick={() => toggleMenu()}>☰</button>
                    <div className="menu-item" onClick={evento => showContent(evento, 'Cliente')}>👤 Cliente</div>
                    <div className="menu-item" style={!isClient ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={evento => showContent(evento, 'Senha')}>🔑 Senha</div>
                    <div className="menu-item" style={!isClient ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={evento => showContent(evento, 'Endereco')}>📍 Endereços</div>
                    <div className="menu-item" style={!isClient ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={evento => showContent(evento, 'Cartao')}>💳 Cartões</div>
                    <div className="menu-item" style={!isClient ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={evento => showContent(evento, 'Transacao')}>🔄 Transações</div>
                    <div className="menu-item" style={!isClient ? { opacity: '0.6', cursor: 'not-allowed', marginTop: '15px' } : { marginTop: '55px' }} onClick={() => navigate('/loja')}>🛍️ Loja</div>
                </div>}
            {formControl && <>
                <form className='main__form' style={formDisplay !== 'Endereco' ? { display: 'none' } : {}}>
                    <div className='lista'>
                        <h2 className='main__form__titulo'>Endereços: </h2>
                        {isClient ? montaEnderecos() : <></>}
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>identificação...</label>
                        <input className='form__input_end' name='identificacao_end' id='identificacao' type='text' placeholder='casa, trabalho...' onChange={onChangeEnd} value={endereco.identificacao_end}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>tipo...</label>
                        <input className='form__input_end' name='tipo' id='tipo' type='text' placeholder='cobrança ou entrega' onChange={onChangeEnd} value={endereco.tipo}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>cep...</label>
                        <input className='form__input_end' name='cep_end' id='cep' type='text' placeholder='000-00000' onChange={onChangeEnd} value={endereco.cep_end}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>rua...</label>
                        <input className='form__input_end' name='rua_end' id='rua' type='text' placeholder='Rua x' onChange={onChangeEnd} value={endereco.rua_end}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>número...</label>
                        <input className='form__input_end' name='numero_end' id='numero' type='text' placeholder='00' onChange={onChangeEnd} value={endereco.numero_end}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>bairro...</label>
                        <input className='form__input_end' name='bairro_end' id='bairro' type='text' placeholder='Jardim Azul' onChange={onChangeEnd} value={endereco.bairro_end}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>cidade...</label>
                        <input className='form__input_end' name='cidade' id='cidade' type='text' placeholder='Cidade' onChange={onChangeEnd} value={endereco.cidade}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>estado/UF...</label>
                        <input className='form__input_end' name='UF' id='uf' type='text' placeholder='SP' onChange={onChangeEnd} value={endereco.UF}></input>
                    </div>
                    <div className='main__form__botoes'>
                        <button className='botao__guardar' onClick={evento => submitFormEnd(evento)}>Guardar</button>
                        <button className='botao__excluir' style={enderecos[enderecoAtual].id_end === null ? { display: 'none' } : {}} onClick={evento => excluirEnd(evento, enderecos[enderecoAtual].id_end)}>Inativar</button>
                    </div>
                </form>
                <form className='main__form' style={formDisplay !== 'Cliente' ? { display: 'none' } : {}}>
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

                    <div className='main__form__botoes'>
                        <button className='botao__guardar' id='guardar-cliente' onClick={evento => submitForm(evento)}>Guardar</button>
                        {!isClient ? <button className='botao__limpar' onClick={evento => limparForm(evento)}>Limpar</button> : <button className='botao__excluir' id='desativar-cliente' onClick={evento => excluirCliente(evento, cliente.id_cliente)}>Inativar</button>}
                    </div>
                </form>
                <form className='main__form' style={formDisplay !== 'Senha' ? { display: 'none' } : {}}>
                    {!isClient ? <h2 className='main__form__titulo'>Cadastro de senha:</h2> : <h2 className='main__form__titulo'>Edição de senha:</h2>}
                    <div className='main__form__input'>
                        <label className='input__label'>senha...</label>
                        <input className='form__input' id='senha' type='password' onChange={onChange} defaultValue={cliente.senha}></input>
                    </div>

                    <div className='main__form__botoes'>
                        <button className='botao__guardar' onClick={evento => submitForm(evento)}>Guardar</button>
                    </div>
                </form>
                <form className='main__form' style={formDisplay !== 'Cartao' ? { display: 'none' } : {}}>
                    <div className='lista'>
                        <h2 className='main__form__titulo'>Cartões: </h2>
                        {isClient ? montaCartoes() : <></>}
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>identificação...</label>
                        <input className='form__input' name='identificacao_card' id='identificacao_card' type='text' placeholder='Meu cartão' onChange={onChangeCard} value={cartao.identificacao_card}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>nome...</label>
                        <input className='form__input' name='nome_card' id='nome_card' type='text' placeholder='nome impresso no cartão' onChange={onChangeCard} value={cartao.nome_card}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>data de vencimento...</label>
                        <input className='form__input' name='vencimento_card' id='vencimento' type='text' placeholder='mm/aaaa' onChange={onChangeCard} value={cartao.vencimento_card}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>número...</label>
                        <input className='form__input' name='numero_card' id='numero_card' type='text' placeholder='0000.0000.0000.0000' onChange={onChangeCard} value={cartao.numero_card}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>CVV...</label>
                        <input className='form__input' name='cvv_card' id='cvv_card' type='text' placeholder='000' onChange={onChangeCard} value={cartao.cvv_card}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>bandeira...</label>
                        <input className='form__input' name='bandeira_card' id='bandeira_card' type='text' placeholder='Visa, MasterCard...' onChange={onChangeCard} value={cartao.bandeira_card}></input>
                    </div>
                    <div className='main__form__input'>
                        <label className='input__label'>tipo...</label>
                        <input className='form__input' name='tipo_card' id='tipo_card' type='text' placeholder='Preferencial ou secundário' onChange={onChangeCard} value={cartao.tipo_card}></input>
                    </div>

                    <div className='main__form__botoes'>
                        <button className='botao__guardar' onClick={evento => submitFormCard(evento)}>Guardar</button>
                        <button className='botao__excluir' style={cartoes[cartaoAtual].id_card === null ? { display: 'none' } : {}} onClick={evento => excluirCard(evento, cartoes[cartaoAtual].id_card)}>Inativar</button>
                    </div>
                </form>
                <form className='main__form' style={formDisplay !== 'Transacao' ? { display: 'none' } : {}}>
                    <h2 className='main__form__titulo'>Transações: </h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Compra</th>
                                <th style={thStyle}>Endereço</th>
                                <th style={thStyle}>Cartão</th>
                                <th style={thStyle}>Cupons Usados</th>
                                <th style={thStyle}>Total</th>
                                <th style={thStyle}>Frete</th>
                                <th style={thStyle}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {montaTransacoes()}
                        </tbody>
                    </table>
                </form>
            </>}
            <Icons isClient={isClient} setIsClient={() => setIsClient()} />
        </main>
    )
}