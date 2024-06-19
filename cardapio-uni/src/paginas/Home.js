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
    async function getLojas() {
      try {
        const conexao = await fetch("https://api.jsonbin.io/v3/b/667314ece41b4d34e405ba11", {
          method: "GET",
          headers: {
            "X-Master-Key": "$2a$10$ZBNe5zljorQD6qhdzyP4C.JZMmoCkQA7gEcIcOPaP9EWWtn7NYzGW"
          }
        });
        if (!conexao.ok) throw new Error("Não foi possível acessar API com as lojas.");
        else {
          const conexaoConvertida = conexao.json();
          conexaoConvertida.then(res => {
            console.log(res.record.lojas);
            setLojas(res.record.lojas);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getLojas();
  }, []);

  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));

  const [lojas, setLojas] = useState([]);

  const [produtos, setProdutos] = useState([
    {
      id: uuid4(),

      descricao: "Desc Desc Desc Desc",

      imagem: "https://github.com/MAATHHEEUS.png",

      loja: "Loja 1",

      nome: "Produto x",

      favorito: false
    }, {

      id: uuid4(),

      descricao: "Desc Desc Desc Desc dflksnfklsdfnksndlnksçndflksndkfçsdflskçdnf",

      imagem: "https://github.com/MAATHHEEUS.png",

      loja: "Loja 2",

      nome: "Produto x2",

      favorito: false
    }
  ]);

  const adicionaProduto = async (produto) => {
    console.log(produtos);
    setProdutos([...produtos, produto]);
  }

  async function criarProduto(nome, valor, imagem) {
    const conexao = await fetch("https://api.jsonbin.io/v3/b/667314ece41b4d34e405ba11", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "X-Master-Key": "$2a$10$ZBNe5zljorQD6qhdzyP4C.JZMmoCkQA7gEcIcOPaP9EWWtn7NYzGW"
      },
      body: JSON.stringify({
        "lojas": [
          {
            "id": 1,
            "nome": "Loja 1",
            "cor": "#57C278"
          },
          {
            "id": 2,
            "nome": "Loja Editada",
            "cor": "#fcba03"
          }
        ],
        "usuarios": [
          {
            "id": 1,
            "nome": "João",
            "email": "email",
            "senha": "1234",
            "tipo": "usuario"
          }
        ]
      })
    });
    if (!conexao.ok) throw new Error("Não foi possível guardar o produto.");
  }

  const deletarProduto = (id) => {
    console.log('Deletando produto!' + id);
    setProdutos(produtos.filter(produto => produto.id !== id));
  }

  const mudarCorLoja = (cor, id) => {
    setLojas(lojas.map((loja) => {
      if (loja.id === id) loja.cor = cor;
      return loja;
    }));
  }

  const favoritarProduto = (id) => {
    setProdutos(produtos.map(produto => {
      if (produto.id === id) produto.favorito = !produto.favorito;
      return produto;
    }));
  }

  console.log(usuario);

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
