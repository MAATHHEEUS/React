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
    con.query("SELECT * FROM `produto`", function (err, result, fields) {
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
    con.query(`DELETE FROM produto WHERE id_prod = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// Cliente
app.get("/cliente/:email", (req, res) => {
    const {email} = req.params;
    con.query(`SELECT * FROM cliente WHERE email_cliente = '${email}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/cliente/:id", (req, res) => {
    const {nome} = req.body;
    const {email} = req.body;
    const {nascimento} = req.body;
    const {cpf} = req.body;
    const {cep} = req.body;
    const {rua} = req.body;
    const {bairro} = req.body;
    const {numero} = req.body;
    const {cidade} = req.body;
    const {uf} = req.body;
    const {id} = req.params;
    con.query(`UPDATE cliente SET nome_cliente = '${nome}', email_cliente = '${email}', nasc_cliente = '${nascimento}', CPF_cliente = '${cpf}', cep_cliente = '${cep}', rua_cliente = '${rua}', bairro_cliente = '${bairro}', numero_cliente = '${numero}', cidade_cliente = '${cidade}', uf_cliente = '${uf}' WHERE id_cliente = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/cliente", (req, res) => {
    const {nome} = req.body;
    const {email} = req.body;
    const {nascimento} = req.body;
    const {cpf} = req.body;
    const {cep} = req.body;
    const {rua} = req.body;
    const {bairro} = req.body;
    const {numero} = req.body;
    const {cidade} = req.body;
    const {uf} = req.body;
    con.query(`INSERT INTO cliente(nome_cliente, email_cliente, nasc_cliente, CPF_cliente, cep_cliente, rua_cliente, numero_cliente, bairro_cliente, cidade_cliente, uf_cliente) VALUES ('${nome}','${email}','${nascimento}','${cpf}','${cep}','${rua}','${numero}','${bairro}','${cidade}','${uf}')`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/cliente/:id", (req, res) => {
    const {id} = req.params;
    con.query(`DELETE FROM cliente WHERE id_cliente = '${id}'`, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
