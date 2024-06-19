import { useState } from 'react';
import Banner from '../componentes/Banner/Banner';
import Formulario from '../componentes/Formulario/Formulario';
import Loja from '../componentes/Loja/Loja';
import Rodape from '../componentes/Rodape/Rodape';
import uuid4 from "uuid4";
import Conversa from '../componentes/Conversa/Conversa';

function Home() {

  const [lojas, setLojas] = useState([
    {
      id: 1,
      nome: 'Loja 1',
      cor: '#57C278'
    },
    {
      id: 2,
      nome: 'Loja 2',
      cor: '#fcba03'
    }
  ]);

  const [produtos, setProdutos] = useState([
    {
      id: uuid4(),

      descricao: "Desc Desc Desc Desc",

      imagem: "https://github.com/MAATHHEEUS.png",

      loja: "Loja 1",

      nome: "Produto x",

      favorito: false
    },{

      id: uuid4(), 

      descricao: "Desc Desc Desc Desc dflksnfklsdfnksndlnksçndflksndkfçsdflskçdnf",

      imagem: "https://github.com/MAATHHEEUS.png",

      loja: "Loja 2",

      nome: "Produto x2",

      favorito: false
    }
  ]);

  const adicionaProduto = (produto) => {
    console.log(produtos);
    setProdutos([...produtos, produto]);
  }

  const deletarProduto = (id) => {
    console.log('Deletando produto!'+id);
    setProdutos(produtos.filter(produto => produto.id !== id));
  }

  const mudarCorLoja = (cor, id) => {
    setLojas(lojas.map((loja) => {
      if(loja.id === id) loja.cor = cor;
      return loja;
    }));
  }

  const favoritarProduto = (id) => {
    setProdutos(produtos.map(produto => {
      if(produto.id === id) produto.favorito = !produto.favorito;
      return produto;
    }));
  }

  return (
    <>
      <Conversa />
      <Banner />
      <Formulario lojas={lojas} adicionaProduto={produto => adicionaProduto(produto)} />
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
      />)}
      <Rodape />
    </>
  );
}

export default Home;
