import React,{useState} from 'react';
import './App.css';

// Elementos
const Tela=(valor, res)=> {
  return(
    <div style={cssTela}>
      <span style={cssTelaOper}>{valor}</span>
      <span style={cssTelaRes}>{res}</span>
    </div>
  );
} 

const btn=(label, func)=> {
  return(
    <button style={cssBtn} onClick={func}>{label}</button>
  );
}

// Estilos
const cssTela={
  display: 'flex',
  paddindLeft: 20,
  paddindRight: 20,
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  backgroundColor: '#444',
  width: 300
}

const cssTelaOper={
  fontSize: 25,
  color: '#fff',
  height: 20
}

const cssTelaRes={
  fontSize: 50,
  color: '#fff',
}

const cssBtn={
  fontSize: 30,
  color: '#fff',
  height: 75,
  width: 75,
  padding: 20,
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  border: 'none'
}

const cssContainer={
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  width: 300,
  border: '1px solid #000'
}

const cssBotoes={
  flexDirection: 'row',
  flexWrap: 'wrap'
}

function App() {
  
  const [valorTela, setValorTela] = useState('');
  const [resultado, setResultado] = useState(0);
  const [acumulador, setAcumulador] = useState(0);
  const [operado, setOperado] = useState(false);

  // Funções
  const addDigitoTela=(digito)=> {
    if(digito == '+' || digito == '-' || digito == '*' || digito == '/' || digito == '.'){
      // Se não tiver valor na tela não pode começar com operação
      if(valorTela == '')return;
      // Verifica o último caracter digitado na tela
      if(verificaDigitoEspecial())return;
    }
    if((digito == '+' || digito == '-' || digito == '*' || digito == '/') && operado){
      setOperado(false);
      setValorTela(resultado+digito);
      return;
    }else if(operado){
      setValorTela(digito);
      setOperado(false);
      return;
    }else{
      const valorDigitadoTela = valorTela+digito;
      setValorTela(valorDigitadoTela);
    }
  }

  // Função para verificar se o último valor digitado na tela é um caracter de operação
  const verificaDigitoEspecial=()=> {
    let digitosEspeciais = ['.', '+', '-', '/', '*'];
    let retorno = false;
    digitosEspeciais.forEach((elemento) => {
      if(String(valorTela).endsWith(elemento)){
        retorno = true;
      }
    })
    return retorno;
  }

  const limparMemoria=()=> {
    setOperado(false);
    setResultado(0);
    setAcumulador(0);
    setValorTela('');
    return;
  }

  const Operacao=(oper)=> {
    // Só realiza operação se tela não estiver vazia
    if(!valorTela == ''){
      if(oper == 'backSpace'){
        let vTela = valorTela;
        vTela = vTela.substring(0, vTela.length-1);
        setValorTela(vTela);
        setOperado(false);
        return;
      }
      try{
        // Eval retorna o resultado da expressão passada - Cálculo
        const r = eval(valorTela)
        setAcumulador(r);
        setResultado(r);
        setOperado(true);
      }
      catch{
        setResultado('#ERRO');
      } 
    }
  }
  
  return (
    <>
      <div style={cssContainer}>
        <h3>Calculadora Simples</h3>
        {Tela(valorTela, resultado)}
        <div style={cssBotoes}>
          {btn('AC', limparMemoria)}
          {btn('(', ()=>addDigitoTela('('))}
          {btn(')', ()=>addDigitoTela(')'))}
          {btn('/', ()=>addDigitoTela('/'))}
          {btn('7', ()=>addDigitoTela('7'))}
          {btn('8', ()=>addDigitoTela('8'))}
          {btn('9', ()=>addDigitoTela('9'))}
          {btn('*', ()=>addDigitoTela('*'))}
          {btn('4', ()=>addDigitoTela('4'))}
          {btn('5', ()=>addDigitoTela('5'))}
          {btn('6', ()=>addDigitoTela('6'))}
          {btn('-', ()=>addDigitoTela('-'))}
          {btn('1', ()=>addDigitoTela('1'))}
          {btn('2', ()=>addDigitoTela('2'))}
          {btn('3', ()=>addDigitoTela('3'))}
          {btn('+', ()=>addDigitoTela('+'))}
          {btn('0', ()=>addDigitoTela('0'))}
          {btn('.', ()=>addDigitoTela('.'))}
          {btn('<-', ()=>Operacao('backSpace'))}
          {btn('=', ()=>Operacao('='))}
        </div>
      </div>
    </>
  );
}

export default App;