import React, { useState, useEffect } from 'react';
import Card from './CardLoja.js'
import "../styles/main.css";
import "../styles/popup.css";

export default function Loja() {

    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);

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

    // 🎯 Função para formatar valores em reais (R$)
    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };

    // PESQUISA
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

    // PRODUTOS E CARRINHO

    const montaCards = () => {
        if (produtos.length === 0) return <p>nenhum produto foi adicionado</p>
        return <div className='main__products__container'>
            {
                produtosFiltrados.map(
                    produto => <Card key={produto.id_prod} id={produto.id_prod} nome={produto.nome_prod} preco={produto.valor_prod} img={produto.imagem_prod} funcaoClick={evento => adicionarAoCarrinho(evento, produto)} />
                )
            }
        </div>
    }

    const adicionarAoCarrinho = (evento, produto) => {
        evento.preventDefault();
        setCarrinho((prevCarrinho) => {
            const produtoExiste = prevCarrinho.find((item) => item.id_prod === produto.id_prod);

            if (produtoExiste) {
                return prevCarrinho.map((item) =>
                    item.id_prod === produto.id_prod ? { ...item, quantidade: item.quantidade + 1 } : item
                );
            } else {
                return [...prevCarrinho, { ...produto, quantidade: 1 }];
            }
        });
    }

    // 🔴 Decrementar quantidade ou remover produto se for zero
    const removerDoCarrinho = (evento, id) => {
        evento.preventDefault();
        setCarrinho((prevCarrinho) => {
            return prevCarrinho
                .map((item) =>
                    item.id_prod === id ? { ...item, quantidade: item.quantidade - 1 } : item
                )
                .filter((item) => item.quantidade > 0); // Remove quando a quantidade for 0
        });
    };

    const limparCarrinho = (evento) => {
        evento.preventDefault();
        setCarrinho([]);
    }

    // 💰 Calcular o total do carrinho
    const totalCarrinho = carrinho.reduce((total, item) => total + Number(item.valor_prod.replace(',', '.')) * item.quantidade, 0);

    // COMPRAR
    const comprar = async (evento) => {
        evento.preventDefault();
        buscaEnderecos(localStorage.getItem('cliente'))
        togglePopupEndereco();
    }

    // Função para abrir/fechar o pop-up do endereço
    const togglePopupEndereco = () => {
        setIsOpenEndereco(!isOpenEndereco);
    };

    // Estado para controlar o pop-up do endereço
    const [isOpenEndereco, setIsOpenEndereco] = useState(false);

    // ENDEREÇOS DO CLIENTE
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
            await criarEnd(identificacao, tipo, cep, rua, numero, bairro, cidade, uf);
            alert('Dados guardados com sucesso.');
            buscaEnderecos(localStorage.getItem('cliente'));
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
                id_cliente: localStorage.getItem('cliente')
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cliente.");
    }

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

    const valorFrete = enderecoAtual === 0 ? 0 : 12.96 * enderecoAtual;

    // PAGAMENTO
    const avancarPagamento = async (evento) => {
        evento.preventDefault();
        buscaCartoes(localStorage.getItem('cliente'))
        togglePopupPagamento();
    }

    // Função para abrir/fechar o pop-up do endereço
    const togglePopupPagamento = () => {
        setIsOpenPagamento(!isOpenPagamento);
    };

    // Estado para controlar o pop-up do endereço
    const [isOpenPagamento, setIsOpenPagamento] = useState(false);

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
            await criarCard(identificacao, nome, tipo, vencimento, numero, cvv, bandeira);
            alert('Dados guardados com sucesso.');
            buscaCartoes(localStorage.getItem('cliente'));
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
                id_cliente: localStorage.getItem('cliente')
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível guardar os dados do cartão.");
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

    const [cumpomTroca, setCupomTroca] = useState('');
    const [cumpomPromo, setCupomPromo] = useState('');

    // Função para calcular o desconto com os cupons
    const calculaCupons = () => {
        if (cumpomTroca.includes("CP") && cumpomPromo.includes("FRIDAY")) return 20;
        if (cumpomTroca.includes("CP") || cumpomPromo.includes("FRIDAY")) return 10;
        else return 0;
    }

    return (
        <main className='main'>
            {isOpenEndereco && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>📍 Endereços</h2>
                        {montaEnderecos()}
                        <div className='input_label'>
                            <label>identificação...</label>
                            <input name='identificacao_end' id='identificacao' type='text' placeholder='casa, trabalho...' onChange={onChangeEnd} value={endereco.identificacao_end}></input>
                        </div>
                        <div className='input_label'>
                            <label>tipo...</label>
                            <input name='tipo' id='tipo' type='text' placeholder='cobrança ou entrega' onChange={onChangeEnd} value={endereco.tipo}></input>
                        </div>
                        <div className='input_label'>
                            <label>cep...</label>
                            <input name='cep_end' id='cep' type='text' placeholder='000-00000' onChange={onChangeEnd} value={endereco.cep_end}></input>
                        </div>
                        <div className='input_label'>
                            <label>rua...</label>
                            <input name='rua_end' id='rua' type='text' placeholder='Rua x' onChange={onChangeEnd} value={endereco.rua_end}></input>
                        </div>
                        <div className='input_label'>
                            <label>número...</label>
                            <input name='numero_end' id='numero' type='text' placeholder='00' onChange={onChangeEnd} value={endereco.numero_end}></input>
                        </div>
                        <div className='input_label'>
                            <label>bairro...</label>
                            <input name='bairro_end' id='bairro' type='text' placeholder='Jardim Azul' onChange={onChangeEnd} value={endereco.bairro_end}></input>
                        </div>
                        <div className='input_label'>
                            <label>cidade...</label>
                            <input name='cidade' id='cidade' type='text' placeholder='Cidade' onChange={onChangeEnd} value={endereco.cidade}></input>
                        </div>
                        <div className='input_label'>
                            <label>estado/UF...</label>
                            <input name='UF' id='uf' type='text' placeholder='SP' onChange={onChangeEnd} value={endereco.UF}></input>
                        </div>
                        <div className='input_label'>
                            <label>frete...</label>
                            <input name='frete' id='frete' type='text' disabled readOnly value={formatarMoeda(valorFrete)}></input>
                        </div>
                        <h3>💰 Total da compra: R$ {formatarMoeda(totalCarrinho + valorFrete)}</h3>
                        <button style={enderecoAtual !== 0 ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={(evento) => submitFormEnd(evento)}>✅ Salvar Novo</button>
                        <button style={enderecoAtual === 0 ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={(e) => avancarPagamento(e)}>💰 Avançar</button>
                        <button onClick={togglePopupEndereco}>❌ Fechar</button>
                    </div>
                </div>
            )}
            {isOpenPagamento && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>💳 Cartões</h2>
                        {montaCartoes()}
                        <div className='input_label'>
                            <label>identificação...</label>
                            <input name='identificacao_card' id='identificacao_card' type='text' placeholder='Meu cartão' onChange={onChangeCard} value={cartao.identificacao_card}></input>
                        </div>
                        <div className='input_label'>
                            <label>nome...</label>
                            <input name='nome_card' id='nome_card' type='text' placeholder='nome impresso no cartão' onChange={onChangeCard} value={cartao.nome_card}></input>
                        </div>
                        <div className='input_label'>
                            <label>data de vencimento...</label>
                            <input name='vencimento_card' id='vencimento' type='text' placeholder='mm/aaaa' onChange={onChangeCard} value={cartao.vencimento_card}></input>
                        </div>
                        <div className='input_label'>
                            <label>número...</label>
                            <input name='numero_card' id='numero_card' type='text' placeholder='0000.0000.0000.0000' onChange={onChangeCard} value={cartao.numero_card}></input>
                        </div>
                        <div className='input_label'>
                            <label>CVV...</label>
                            <input name='cvv_card' id='cvv_card' type='text' placeholder='000' onChange={onChangeCard} value={cartao.cvv_card}></input>
                        </div>
                        <div className='input_label'>
                            <label>bandeira...</label>
                            <input name='bandeira_card' id='bandeira_card' type='text' placeholder='Visa, MasterCard...' onChange={onChangeCard} value={cartao.bandeira_card}></input>
                        </div>
                        <div className='input_label'>
                            <label>tipo...</label>
                            <input name='tipo_card' id='tipo_card' type='text' placeholder='Preferencial ou secundário' onChange={onChangeCard} value={cartao.tipo_card}></input>
                        </div>
                        <div className='input_label'>
                            <label>cupom de troca...</label>
                            <input name='troca' id='troca' type='text' placeholder='CPTROCA' onChange={(e) => setCupomTroca(e.target.value)} value={cumpomTroca}></input>
                        </div>
                        <div className='input_label'>
                            <label>cupom promocional...</label>
                            <input name='promocional' id='promocional' type='text' placeholder='BLACKFRIDAY' onChange={(e) => setCupomPromo(e.target.value)} value={cumpomPromo}></input>
                        </div>
                        <h3>💰 Total da compra: R$ {formatarMoeda(totalCarrinho + valorFrete - calculaCupons())}</h3>
                        <button style={cartaoAtual !== 0 ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={(evento) => submitFormCard(evento)}>✅ Salvar Novo</button>
                        <button style={cartaoAtual === 0 ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={(e) => alert('Finalizar a compra!!!')}>💰 Finalizar</button>
                        <button onClick={togglePopupPagamento}>❌ Fechar</button>
                    </div>
                </div>
            )}
            <section className='main__products'>
                <input
                    type="text"
                    placeholder="Pesquisar produtos"
                    value={pesquisa}
                    onChange={handlePesquisa}
                />
                <h2 className='main__products__titulo'>Produtos:</h2>
                {montaCards()}
            </section>
            <form className='main__form'>
                <h2 className='main__form__titulo'>🛒 Carrinho de Produtos:</h2>
                <ul id='produtos'>
                    {carrinho.length === 0 ? <p>Não há produtos</p> : carrinho.map(
                        produto => <li key={produto.id_prod} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            <p>{produto.nome_prod}</p>
                            <p>Preço: R$ {produto.valor_prod}</p>
                            <strong> (x{produto.quantidade})</strong>
                            <button onClick={(e) => adicionarAoCarrinho(e, produto)}>➕</button>
                            <button onClick={(e) => removerDoCarrinho(e, produto.id_prod)}>➖</button>
                        </li>
                    )}
                </ul>
                <h3>💰 Total: R$ {formatarMoeda(totalCarrinho)}</h3>
                <div className='main__form__botoes'>
                    <button className='botao__guardar' style={carrinho.length === 0 ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={evento => comprar(evento)}>Comprar</button>
                    <button className='botao__limpar' style={carrinho.length === 0 ? { opacity: '0.6', cursor: 'not-allowed' } : {}} onClick={evento => limparCarrinho(evento)}>Limpar Carrinho</button>
                </div>
            </form>
        </main>
    )
}