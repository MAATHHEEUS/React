// Requires
const express = require('express');
const cors = require("cors");
var mysql = require('mysql2');
const e = require('express');

// Banco
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "les"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Db Connected!");
});

// Requests
const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log("Server Running");
});

// Produtos
app.get("/produtos", (req, res) => {
    con.query("SELECT * FROM `produto` WHERE situacao_prod = 'A'", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/produtosI", (req, res) => {
    con.query("SELECT * FROM `produto` WHERE situacao_prod = 'I'", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/produtos/:id", (req, res) => {
    const { nome } = req.body;
    const { valor } = req.body;
    const { imagem } = req.body;
    const { id } = req.params;
    con.query(`UPDATE produto SET nome_prod = '${nome}', valor_prod = '${valor}', imagem_prod = '${imagem}' WHERE id_prod = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/produtosI/:id", (req, res) => {
    const { id } = req.params;
    con.query(`UPDATE produto SET situacao_prod = 'A' WHERE id_prod = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/produtos", (req, res) => {
    const { nome } = req.body;
    const { valor } = req.body;
    const { imagem } = req.body;
    con.query(`INSERT INTO produto (nome_prod, valor_prod, imagem_prod) VALUES ('${nome}', '${valor}', '${imagem}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/produtos/:id", (req, res) => {
    const { id } = req.params;
    con.query(`UPDATE produto SET situacao_prod = 'I' WHERE id_prod = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Cliente
app.get("/cliente/:email", (req, res) => {
    const { email } = req.params;
    con.query(`SELECT * FROM cliente WHERE (email_cliente = '${email}' OR id_cliente = '${email}') AND situacao_cliente != 'I'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/cliente/:id", (req, res) => {
    const { nome } = req.body;
    const { email } = req.body;
    const { nascimento } = req.body;
    const { cpf } = req.body;
    const { senha } = req.body;
    const { id } = req.params;
    con.query(`UPDATE cliente SET nome_cliente = '${nome}', email_cliente = '${email}', nasc_cliente = '${nascimento}', CPF_cliente = '${cpf}', senha = '${senha}' WHERE id_cliente = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/cliente", (req, res) => {
    const { nome } = req.body;
    const { email } = req.body;
    const { nascimento } = req.body;
    const { cpf } = req.body;

    con.query(`INSERT INTO cliente(nome_cliente, email_cliente, nasc_cliente, CPF_cliente) VALUES ('${nome}','${email}','${nascimento}','${cpf}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/cliente/:id", (req, res) => {
    const { id } = req.params;
    con.query(`UPDATE cliente SET situacao_cliente = 'I' WHERE id_cliente = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Endereço
app.get("/endereco/:id_cliente", (req, res) => {
    const { id_cliente } = req.params;
    con.query(`SELECT * FROM endereco WHERE id_cliente_end = '${id_cliente}' AND situacao_end = 'A'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/endereco/:id", (req, res) => {
    const { identificacao } = req.body;
    const { tipo } = req.body;
    const { cep } = req.body;
    const { rua } = req.body;
    const { bairro } = req.body;
    const { numero } = req.body;
    const { cidade } = req.body;
    const { uf } = req.body;
    const { id } = req.params;
    con.query(`UPDATE endereco SET identificacao_end = '${identificacao}', tipo = '${tipo}', cep_end = '${cep}', rua_end = '${rua}', bairro_end = '${bairro}', UF = '${uf}', numero_end = ${numero}, cidade = '${cidade}' WHERE id_end = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/endereco", (req, res) => {
    const { identificacao } = req.body;
    const { tipo } = req.body;
    const { cep } = req.body;
    const { rua } = req.body;
    const { bairro } = req.body;
    const { numero } = req.body;
    const { cidade } = req.body;
    const { uf } = req.body;
    const { id_cliente } = req.body;

    con.query(`INSERT INTO endereco(identificacao_end, tipo, cep_end, rua_end, bairro_end, UF, numero_end, cidade, id_cliente_end) VALUES ('${identificacao}','${tipo}','${cep}','${rua}', '${bairro}', '${uf}', '${numero}', '${cidade}', '${id_cliente}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/endereco/:id", (req, res) => {
    const { id } = req.params;
    con.query(`UPDATE endereco SET situacao_end = 'I' WHERE id_end = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Cartão
app.get("/cartao/:id_cliente", (req, res) => {
    const { id_cliente } = req.params;
    con.query(`SELECT * FROM cartao WHERE id_cliente_card = '${id_cliente}' AND situacao_card = 'A'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/cartao/:id", (req, res) => {
    const { identificacao } = req.body;
    const { nome } = req.body;
    const { numero } = req.body;
    const { tipo } = req.body;
    const { cvv } = req.body;
    const { bandeira } = req.body;
    const { vencimento } = req.body;
    const { id } = req.params;
    con.query(`UPDATE cartao SET identificacao_card = '${identificacao}', tipo_card = '${tipo}', nome_card = '${nome}', cvv_card = '${cvv}', numero_card = '${numero}', bandeira_card = '${bandeira}', vencimento_card = '${vencimento}' WHERE id_card = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/cartao", (req, res) => {
    const { identificacao } = req.body;
    const { nome } = req.body;
    const { tipo } = req.body;
    const { numero } = req.body;
    const { cvv } = req.body;
    const { bandeira } = req.body;
    const { vencimento } = req.body;
    const { id_cliente } = req.body;

    con.query(`INSERT INTO cartao(identificacao_card, tipo_card, cvv_card, nome_card, bandeira_card, numero_card, vencimento_card, id_cliente_card) VALUES ('${identificacao}','${tipo}','${cvv}','${nome}','${bandeira}', '${numero}', '${vencimento}', '${id_cliente}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/cartao/:id", (req, res) => {
    const { id } = req.params;
    con.query(`UPDATE cartao SET situacao_card = 'I' WHERE id_card = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// VENDA
app.post("/venda", (req, res) => {
    const { id_card } = req.body;
    const { id_end } = req.body;
    const { cupons } = req.body;
    const { total } = req.body;
    const { frete } = req.body;
    const { id_cliente } = req.body;
    const { produtos } = req.body;

    con.query(`INSERT INTO venda(id_card_ven, id_end_ven, cupons_ven, total_ven, frete_ven, id_cliente_ven, status_ven) VALUES ('${id_card}','${id_end}','${cupons}','${total}','${frete}', '${id_cliente}', 'EM PROCESSAMENTO')`, function (err, result) {
        if (err) throw err;
        res.send(result);

        insereProdutosVenda(result.insertId, produtos);
    });
});

function insereProdutosVenda(id_venda, produtos) {
    var values = [];
    produtos.forEach(prod => {
        values.push([id_venda, prod.id_prod, prod.quantidade, 'EM PROCESSAMENTO'])
    })

    var sql = "INSERT INTO vendaproduto (id_ven_vdp, id_prod_vdp, quantidade_vdp, status_vdp) VALUES ?";
    con.query(sql, [values], function (err) {
        if (err) throw err;
    });
}

function alteraStatusVenda(venda, status) {
    con.query(`UPDATE venda SET status_ven = '${status}' WHERE id_ven = '${venda}'`, function (err, result, fields) {
        if (err) throw err;
    });
}

// TRANSAÇÕES
app.get("/transacao/:id_cliente", (req, res) => {
    const { id_cliente } = req.params;
    let where = ''
    id_cliente === '-1' ? where = `` : where = `WHERE V.ID_CLIENTE_VEN = ${id_cliente}`
    con.query(`
        SELECT V.ID_VEN, V.ID_CLIENTE_VEN, E.IDENTIFICACAO_END,
C.IDENTIFICACAO_CARD, V.CUPONS_VEN, V.TOTAL_VEN, V.FRETE_VEN,
V.STATUS_VEN, VP.ID_VDP, VP.QUANTIDADE_VDP, VP.STATUS_VDP, P.NOME_PROD, P.VALOR_PROD
FROM VENDA V
JOIN ENDERECO E ON V.ID_END_VEN = E.ID_END
JOIN CARTAO C ON V.ID_CARD_VEN = C.ID_CARD
JOIN VENDAPRODUTO VP ON V.ID_VEN = VP.ID_VEN_VDP
JOIN PRODUTO P ON VP.ID_PROD_VDP = P.ID_PROD
 ${where}
        `, function (err, result, fields) {
        if (err) throw err;
        let retorno = [];
        result.forEach(reg => {
            const index = retorno.findIndex(item => item.id_venda === reg.ID_VEN);
            if (index !== -1) {
                retorno[index].produtos.push({ id_vdp: reg.ID_VDP,  status_vdp: reg.STATUS_VDP, quantidade: reg.QUANTIDADE_VDP, nome: reg.NOME_PROD, preco: reg.VALOR_PROD });
            }
            else {
                let trans = {
                    id_venda: reg.ID_VEN,
                    id_cliente: reg.ID_CLIENTE_VEN,
                    endereco: reg.IDENTIFICACAO_END,
                    cartao: reg.IDENTIFICACAO_CARD,
                    cupons: reg.CUPONS_VEN,
                    total: reg.TOTAL_VEN,
                    frete: reg.FRETE_VEN,
                    status: reg.STATUS_VEN,
                    produtos: [{ id_vdp: reg.ID_VDP, status_vdp: reg.STATUS_VDP, quantidade: reg.QUANTIDADE_VDP, nome: reg.NOME_PROD, preco: reg.VALOR_PROD }]
                }
                retorno.push(trans);
            }
        })
        res.send(retorno);
    });
});

app.put("/troca/:id", (req, res) => {
    const { quantidade } = req.body;
    const { venda } = req.body;
    const { id } = req.params;
    con.query(`UPDATE vendaproduto SET status_vdp = 'TROCA${quantidade}' WHERE id_vdp = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);

        alteraStatusVenda(venda, `TROCA${quantidade}`);
    });
});

app.put("/trocastatus", (req, res) => {
    const { status } = req.body;
    const { venda } = req.body;
    const { vdp } = req.body;
    con.query(`UPDATE vendaproduto SET status_vdp = '${status}' WHERE id_vdp = '${vdp}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);

        alteraStatusVenda(venda, status);
    });
});