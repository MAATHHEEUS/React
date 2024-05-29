import { useState } from 'react';
import Banner from './componentes/Banner/Banner';
import Formulario from './componentes/Formulario/Formulario';
import Loja from './componentes/Loja/Loja';
import Rodape from './componentes/Rodape/Rodape';

function App() {

  const lojas = [
    {
      nome: 'Loja 1',
      primaria: '#57C278',
      secundaria: '#D9F7E9'
    },
    {
      nome: 'Loja 2',
      primaria: '#fcba03',
      secundaria: '#f7f7c3'
    }
  ];

  const [produtos, setProdutos] = useState([]);

  const adicionaProduto = (produto) => {
    setProdutos([...produtos, produto]);
  }

  return (
    <>
      <Banner />
      <Formulario lojas={lojas} adicionaProduto={produto => adicionaProduto(produto)} />
      {lojas.map(loja => <Loja
        key={loja.nome}
        nome={loja.nome}
        primaria={loja.primaria}
        secundaria={loja.secundaria}
        produtos={produtos.filter(produto => produto.loja === loja.nome)}
      />)}
      <Rodape />
    </>
  );
}

export default App;
