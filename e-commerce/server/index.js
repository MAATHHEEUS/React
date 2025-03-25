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
    const {nome} = req.body;
    const {valor} = req.body;
    const {imagem} = req.body;
    const {id} = req.params;
    con.query(`UPDATE produto SET nome_prod = '${nome}', valor_prod = '${valor}', imagem_prod = '${imagem}' WHERE id_prod = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/produtosI/:id", (req, res) => {
    const {id} = req.params;
    con.query(`UPDATE produto SET situacao_prod = 'A' WHERE id_prod = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/produtos", (req, res) => {
    const {nome} = req.body;
    const {valor} = req.body;
    const {imagem} = req.body;
    con.query(`INSERT INTO produto (nome_prod, valor_prod, imagem_prod) VALUES ('${nome}', '${valor}', '${imagem}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/produtos/:id", (req, res) => {
    const {id} = req.params;
    con.query(`UPDATE produto SET situacao_prod = 'I' WHERE id_prod = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Cliente
app.get("/cliente/:email", (req, res) => {
    const {email} = req.params;
    con.query(`SELECT * FROM cliente WHERE email_cliente = '${email}' AND situacao_cliente != 'I'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/cliente/:id", (req, res) => {
    const {nome} = req.body;
    const {email} = req.body;
    const {nascimento} = req.body;
    const {cpf} = req.body;
    const {senha} = req.body;
    const {id} = req.params;
    con.query(`UPDATE cliente SET nome_cliente = '${nome}', email_cliente = '${email}', nasc_cliente = '${nascimento}', CPF_cliente = '${cpf}', senha = '${senha}' WHERE id_cliente = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/cliente", (req, res) => {
    const {nome} = req.body;
    const {email} = req.body;
    const {nascimento} = req.body;
    const {cpf} = req.body;
    
    con.query(`INSERT INTO cliente(nome_cliente, email_cliente, nasc_cliente, CPF_cliente) VALUES ('${nome}','${email}','${nascimento}','${cpf}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/cliente/:id", (req, res) => {
    const {id} = req.params;
    con.query(`UPDATE cliente SET situacao_cliente = 'I' WHERE id_cliente = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Endereço
app.get("/endereco/:id_cliente", (req, res) => {
    const {id_cliente} = req.params;
    con.query(`SELECT * FROM endereco WHERE id_cliente_end = '${id_cliente}' AND situacao_end = 'A'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/endereco/:id", (req, res) => {
    const {identificacao} = req.body;
    const {tipo} = req.body;
    const {cep} = req.body;
    const {rua} = req.body;
    const {bairro} = req.body;
    const {numero} = req.body;
    const {cidade} = req.body;
    const {uf} = req.body;
    const {id} = req.params;
    con.query(`UPDATE endereco SET identificacao_end = '${identificacao}', tipo = '${tipo}', cep_end = '${cep}', rua_end = '${rua}', bairro_end = '${bairro}', UF = '${uf}', numero_end = ${numero}, cidade = '${cidade}' WHERE id_end = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/endereco", (req, res) => {
    const {identificacao} = req.body;
    const {tipo} = req.body;
    const {cep} = req.body;
    const {rua} = req.body;
    const {bairro} = req.body;
    const {numero} = req.body;
    const {cidade} = req.body;
    const {uf} = req.body;
    const {id_cliente} = req.body;
    
    con.query(`INSERT INTO endereco(identificacao_end, tipo, cep_end, rua_end, bairro_end, UF, numero_end, cidade, id_cliente_end) VALUES ('${identificacao}','${tipo}','${cep}','${rua}', '${bairro}', '${uf}', '${numero}', '${cidade}', '${id_cliente}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/endereco/:id", (req, res) => {
    const {id} = req.params;
    con.query(`UPDATE endereco SET situacao_end = 'I' WHERE id_end = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Cartão
app.get("/cartao/:id_cliente", (req, res) => {
    const {id_cliente} = req.params;
    con.query(`SELECT * FROM cartao WHERE id_cliente_card = '${id_cliente}' AND situacao_card = 'A'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/cartao/:id", (req, res) => {
    const {identificacao} = req.body;
    const {nome} = req.body;
    const {numero} = req.body;
    const {tipo} = req.body;
    const {cvv} = req.body;
    const {bandeira} = req.body;
    const {vencimento} = req.body;
    const {id} = req.params;
    con.query(`UPDATE cartao SET identificacao_card = '${identificacao}', tipo_card = '${tipo}', nome_card = '${nome}', cvv_card = '${cvv}', numero_card = '${numero}', bandeira_card = '${bandeira}', vencimento_card = '${vencimento}' WHERE id_card = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/cartao", (req, res) => {
    const {identificacao} = req.body;
    const {nome} = req.body;
    const {tipo} = req.body;
    const {numero} = req.body;
    const {cvv} = req.body;
    const {bandeira} = req.body;
    const {vencimento} = req.body;
    const {id_cliente} = req.body;
    
    con.query(`INSERT INTO cartao(identificacao_card, tipo_card, cvv_card, nome_card, bandeira_card, numero_card, vencimento_card, id_cliente_card) VALUES ('${identificacao}','${tipo}','${cvv}','${nome}','${bandeira}', '${numero}', '${vencimento}', '${id_cliente}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/cartao/:id", (req, res) => {
    const {id} = req.params;
    con.query(`UPDATE cartao SET situacao_card = 'I' WHERE id_card = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});