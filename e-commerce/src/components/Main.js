import React, { useState, useEffect } from 'react';
import Card from './Card.js'
import "../styles/main.css";

export default function Main() {

    const [produtos, setProdutos] = useState([]);
    const [produtosInativos, setProdutosInativos] = useState([]);
    const [formDisplay, setFormDisplay] = useState("Produtos");

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
                    produto => <Card key={produto.id_prod} id={produto.id_prod} nome={produto.nome_prod} preco={produto.valor_prod} img={produto.imagem_prod} estoque={produto.estoque_prod} funcaoClick={evento => excluirProduto(evento, produto.id_prod)} funcaoEdit={evento => preencheInputs(evento, produto.id_prod, produto.nome_prod, produto.valor_prod, produto.imagem_prod, produto.estoque_prod)} />
                )
            }
        </div>
    }

    const preencheInputs = (evento, id, nome, valor, imagem, estoque) => {
        evento.preventDefault();
        document.getElementById("id_prod").value = id;
        document.getElementById("descricao").value = nome;
        document.getElementById("valor").value = valor;
        document.getElementById("imagem").value = imagem;
        document.getElementById("estoque").value = estoque;
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
                    buscaVendas(-1);
                    buscaCupons(-1);
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
        const estoque = document.getElementById("estoque").value;

        try {
            id === "" ? await criarProduto(descricao, valor, imagem, estoque) : await atualizaProduto(id, descricao, valor, imagem, estoque);
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

    async function criarProduto(nome, valor, imagem, estoque) {
        const conexao = await fetch("http://localhost:3001/produtos", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                valor: valor,
                imagem: imagem,
                estoque
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar o produto.");
    }

    async function atualizaProduto(id, nome, valor, imagem, estoque) {
        const conexao = await fetch(`http://localhost:3001/produtos/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                valor: valor,
                imagem: imagem,
                estoque
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

    function toggleMenu() {
        document.getElementById('sidebar').classList.toggle('collapsed');
    }

    function showContent(event, section) {
        setFormDisplay(section);
        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
    }

    // VENDAS
    const [Vendas, setVendas] = useState([{
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

    // Estado para a pesquisa
    const [pesquisaVendas, setPesquisaVendas] = useState('');

    // Função para lidar com a pesquisa
    const handlePesquisaVendas = (e) => {
        setPesquisaVendas(e.target.value);
    };

    // Filtra os vendas com base na pesquisa
    const vendasFiltradas = Vendas.filter((venda) =>
        venda.status.toLowerCase().includes(pesquisaVendas.toLowerCase()) || venda.cupons.toLowerCase().includes(pesquisaVendas.toLowerCase())
    );

    async function buscaVendas(id_cliente) {
        try {
            const conexao = await fetch(`http://localhost:3001/transacao/${id_cliente}`);
            if (!conexao.ok) throw new Error("Não foi possível acessar API com os Vendas.");
            else {
                const conexaoConvertida = conexao.json();
                conexaoConvertida.then(res => {
                    setVendas(res);
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

    // 🎯 Função para formatar valores em reais (R$)
    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };

    function montaVendas() {
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


        return vendasFiltradas.map((item, index) => (
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
                                        {produto.status_vdp === 'EM PROCESSAMENTO' ?
                                            <span onClick={() => trocarStatus(produto.id_vdp, "EM TRANSITO", item.id_venda)} title="Enviar pedido">
                                                <svg className="svg-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M3 13V6a1 1 0 011-1h11a1 1 0 011 1v7h2.6a1 1 0 01.7.3l2.4 2.4a1 1 0 01.3.7V18a1 1 0 01-1 1h-1a2 2 0 01-4 0H8a2 2 0 01-4 0H3a1 1 0 01-1-1v-1a1 1 0 011-1h1" />
                                                </svg>
                                            </span> : <></>}
                                        {produto.status_vdp === 'EM TRANSITO' ?
                                            <span onClick={() => trocarStatus(produto.id_vdp, "ENTREGUE", item.id_venda)} title="Confirmar entrega">
                                                <svg className="svg-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z M9 12l2 2 4-4" />
                                                </svg>
                                            </span> : <></>}
                                        {produto.status_vdp.includes('TROCA') && !produto.status_vdp.includes("TROCA AUTORIZADA") ?
                                            <span onClick={() => trocarStatus(produto.id_vdp, `TROCA AUTORIZADA${produto.status_vdp.replace("TROCA", "")}`, item.id_venda)} title="Autorizar troca">
                                                <svg className="svg-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M4 7h12l-1.41-1.41L16 4l4 4-4 4-1.41-1.41L16 9H4V7zm16 10H8l1.41 1.41L8 20l-4-4 4-4 1.41 1.41L8 15h12v2z" />
                                                </svg>
                                            </span> : <></>}
                                        {produto.status_vdp.includes("TROCA AUTORIZADA") ?
                                            <span onClick={() => gerarCupom(item.id_cliente, Number(produto.preco.replace(",", ".")) * Number(produto.status_vdp.replace("TROCA AUTORIZADA", "")), produto.id_vdp, item.id_venda)} title="Confirmar recebimento e gerar cupom.">
                                                <svg className="svg-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M5 3h10l4 4v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm7 10l2 2 4-4M7 8h6" />
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

    const trocarStatus = async (id, status, venda) => {
        let estoque = 'N';
        if(status.includes("TROCA AUTORIZADA")) {
            if(window.confirm("O produto deve voltar para o estoque?")) estoque = 'S';
        }
        if (window.confirm("Tem certeza que deseja trocar o status dessa venda?")) {
            const conexao = await fetch(`http://localhost:3001/trocastatus`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    vdp: id,
                    status: status,
                    venda: venda,
                    estoque: estoque
                })
            });
            if (!conexao.ok) throw new Error("Não foi possível guardar os dados da venda.");
            window.location.reload();
        }
    }

    // CUPONS
    const gerarCupom = async (idCliente, preco, id_vdp, venda) => {
        if (window.confirm("Tem certeza que deseja gerar um cupom para essa venda?")) {
            const conexao = await fetch(`http://localhost:3001/gerarcupom`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    cliente: idCliente,
                    preco: preco.toFixed(2),
                    vdp: id_vdp,
                    status: "CUPOM GERADO",
                    venda: venda
                })
            });
            if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cupom.");
            window.location.reload();
        }
    }

    const [cupons, setCupons] = useState([{
        id_cupom: "",
        cliente: "",
        valor_cupom: "",
        status_cupom: "",
        cod_cupom: ""
    }]);

    async function buscaCupons(id_cliente) {
        try {
            const conexao = await fetch(`http://localhost:3001/cupons/${id_cliente}`);
            if (!conexao.ok) throw new Error("Não foi possível acessar API com os Cupons.");
            else {
                const conexaoConvertida = conexao.json();
                conexaoConvertida.then(res => {
                    setCupons(res);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const montaCupons = () => {
        const tdStyle = {
            border: '1px solid #ccc',
            padding: '8px'
        };

        return cupons.map((item) => (
            <React.Fragment key={item.id_cupom}>
                <tr>
                    <td style={tdStyle}>{item.id_cupom}</td>
                    <td style={tdStyle}>{item.cod_cupom}</td>
                    <td style={tdStyle}>{item.nome_cliente}</td>
                    <td style={tdStyle}>{item.status_cupom}</td>
                    <td style={tdStyle}>{item.valor_cupom}</td>
                </tr>
            </React.Fragment>));
    }

    return (
        <main className='main'>
            <div className="sidebar" id="sidebar">
                <button onClick={() => toggleMenu()}>☰</button>
                <div className="menu-item" onClick={evento => showContent(evento, 'Produtos')}>🛍️ Produtos</div>
                <div className="menu-item" onClick={evento => showContent(evento, 'Vendas')}>🔄 Vendas</div>
                <div className="menu-item" onClick={evento => showContent(evento, 'Cupons')}>🎟️ Cupons</div>
            </div>
            <section className='main__products' style={formDisplay !== 'Produtos' ? { display: 'none' } : {}}>
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
            <form className='main__form' style={formDisplay !== 'Produtos' ? { display: 'none' } : {}}>
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
                <div className='main__form__input'>
                    <label className='input__label'>estoque...</label>
                    <input className='form__input' id='estoque' type='text' placeholder='estoque'></input>
                </div>
                <div className='main__form__botoes'>
                    <button className='botao__guardar' onClick={evento => submitForm(evento)}>Guardar</button>
                    <button className='botao__limpar' onClick={evento => limparForm(evento)}>Limpar</button>
                </div>
            </form>
            <form className='main__form' style={formDisplay !== 'Vendas' ? { display: 'none' } : {}}>
                <h2 className='main__form__titulo'>Vendas: </h2>
                <input
                    type="text"
                    placeholder="Pesquisar vendas"
                    value={pesquisaVendas}
                    onChange={handlePesquisaVendas}
                />
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
                        {montaVendas()}
                    </tbody>
                </table>
            </form>
            <form className='main__form' style={formDisplay !== 'Cupons' ? { display: 'none' } : {}}>
                <h2 className='main__form__titulo'>Cupons: </h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>#</th>
                            <th style={thStyle}>Código</th>
                            <th style={thStyle}>Cliente</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {montaCupons()}
                    </tbody>
                </table>
            </form>
        </main>
    )
}