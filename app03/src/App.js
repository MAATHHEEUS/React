import React,{useState} from 'react';
import Calculadora from './componentes/Calculadora';
import Velha from './componentes/Velha';
import Card from './componentes/Card';

function App() {
  
  return (
    <div style={{display:"flex"}}>
      <Card titulo="Jogo da Velha" conteudo={<Velha/>}/>
      <Card titulo="Calculadora Simples" conteudo={<Calculadora/>}/>
    </div>
  );
}

export default App;