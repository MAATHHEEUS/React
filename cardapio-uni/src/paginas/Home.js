import { useEffect, useState } from 'react';
import Banner from '../componentes/Banner/Banner';
import Formulario from '../componentes/Formulario/Formulario';
import Loja from '../componentes/Loja/Loja';
import Rodape from '../componentes/Rodape/Rodape';
import uuid4 from "uuid4";
import Conversa from '../componentes/Conversa/Conversa';
import Informativo from '../componentes/Informativo/Informativo';

function Home() {

  useEffect(() => {
    async function getDados() {
      try {
        // Lojas
        let conexao = await fetch("https://api.jsonbin.io/v3/b/667314ece41b4d34e405ba11", {
          method: "GET",
          headers: {
            "X-Master-Key": "$2a$10$ZBNe5zljorQD6qhdzyP4C.JZMmoCkQA7gEcIcOPaP9EWWtn7NYzGW"
          }
        });
        if (!conexao.ok) throw new Error("Não foi possível acessar API com as lojas.");
        else {
          const conexaoConvertida = conexao.json();
          conexaoConvertida.then(res => {
            setLojas(res.record.lojas);
          });
        }

        // Produtos
        conexao = await fetch("https://api.jsonbin.io/v3/b/66770020acd3cb34a85b8427", {
          method: "GET",
          headers: {
            "X-Master-Key": "$2a$10$ZBNe5zljorQD6qhdzyP4C.JZMmoCkQA7gEcIcOPaP9EWWtn7NYzGW"
          }
        });
        if (!conexao.ok) throw new Error("Não foi possível acessar API com os produtos.");
        else {
          const conexaoConvertida = conexao.json();
          conexaoConvertida.then(res => {
            setProdutos(res.record.produtos);
          });
        }
      } catch (error) {
        console.log(`Erro no getDados :: ${error}`);
      }
    }
    getDados();
  }, []);

  const usuarioNull = [
    0, "null", "null", "null"
  ];

  const [usuario, setUsuario] = useState(localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : usuarioNull);

  const [lojas, setLojas] = useState([]);

  const [produtos, setProdutos] = useState([]);

  const adicionaProduto = (produto) => {
    setProdutos([produto, ...produtos]);
    PUT_Produto(produto);
  }

  async function PUT_Produto(produto) {
    try {
      const conexao = await fetch("https://api.jsonbin.io/v3/b/66770020acd3cb34a85b8427", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "X-Master-Key": "$2a$10$ZBNe5zljorQD6qhdzyP4C.JZMmoCkQA7gEcIcOPaP9EWWtn7NYzGW"
        },
        body: JSON.stringify({
          "produtos": [
            ...produtos,
            produto
          ]
        })
      });
      if (!conexao.ok) throw new Error("Não foi possível atualizar produtos.");
    } catch (error) {
      console.log(`Erro no PUT_Produto :: ${error}`);
    }
  }

  const deletarProduto = (id) => {
    setProdutos(produtos.filter(produto => produto.id !== id));
    console.log(produtos);
  }

  const mudarCorLoja = (cor, id) => {
    setLojas(lojas.map((loja) => {
      if (loja.id === id) loja.cor = cor;
      return loja;
    }));
    PUT_Loja();
  }

  async function PUT_Loja() {
    try {
      const conexao = await fetch("https://api.jsonbin.io/v3/b/667314ece41b4d34e405ba11", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "X-Master-Key": "$2a$10$ZBNe5zljorQD6qhdzyP4C.JZMmoCkQA7gEcIcOPaP9EWWtn7NYzGW"
        },
        body: JSON.stringify({
          "lojas": [
            ...lojas
          ]
        })
      });
      if (!conexao.ok) throw new Error("Não foi possível atualizar lojas.");
    } catch (error) {
      console.log(`Erro no PUT_Loja :: ${error}`);
    }
  }

  const favoritarProduto = (id) => {
    if (usuario[4] === "Usuário") {
      setProdutos(produtos.map(produto => {
        if (produto.id === id) produto.favorito = !produto.favorito;
        return produto;
      }));
    } else {
      alert("Entre com seu login para poder favoritar!");
    }
  }

  return (
    <>
      <Conversa />
      <Banner usuario={usuario} />
      <Formulario
        lojas={lojas.filter(loja => loja.nome === usuario[1])}
        adicionaProduto={produto => adicionaProduto(produto)}
        usuario={usuario}
      />
      {lojas.map(loja => <Loja
        key={loja.id}
        id={loja.id}
        favoritarProduto={favoritarProduto}
        mudarCor={mudarCorLoja}
        nome={loja.nome}
        cor={loja.cor}
        secundaria={loja.secundaria}
        produtos={produtos.filter(produto => produto.loja === loja.nome)}
        deletarProduto={deletarProduto}
        usuario={usuario}
      />)}
      <Informativo usuario={usuario} />
      <Rodape />
    </>
  );
}

export default Home;
