import React,{useState} from 'react' 
import Nota from './componentes/Nota'
import Resultado from './componentes/Resultado'
import './App.css'

export default function App() {

  const carros = [
    {ano: '2024', modelo: 'FastBack'},
    {ano: '2020', modelo: 'Polo'},
    {ano: '2019', modelo: 'Onix'},
    {ano: '2019', modelo: 'Fit'}
  ]

  const listaCarros = carros.map(
    (elemento, indice)=>
      <option value={elemento.modelo}>{elemento.modelo} - {elemento.ano}</option>
  )

  const [nome, setNome] = useState('')
  const [carro, setCarro] = useState('FastBack')
  const [notas, setNotas] = useState({
    "desempenho":"0,0",
    "consumo":"0,0",
    "conforto":"0,0"
  })

  const handleNotas=(e)=>{
    if(e.target.getAttribute('name')=='desempenho'){
      setNotas({
        "desempenho":e.target.value,
        "consumo":notas.consumo,
        "conforto":notas.conforto
      })
    }else if(e.target.getAttribute('name')=='consumo'){
      setNotas({
        "desempenho":notas.desempenho,
        "consumo":e.target.value,
        "conforto":notas.conforto
      })
    }else if(e.target.getAttribute('name')=='conforto'){
      setNotas({
        "desempenho":notas.desempenho,
        "consumo":notas.consumo,
        "conforto":e.target.value
      })
    }
  }

  return (
    <main className='main'>
      <h1 className='main__title'>Formulário</h1>
      <label className='main__label'>Digite seu nome </label>
      <input type="text" placeholder='digite seu nome' value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
      <br/>
      <label className='main__label'>Selecione um carro </label>
      <select value={carro} onChange={(e)=>{setCarro(e.target.value)}}>
        {listaCarros}
      </select>
      <Nota atributoAvaliado="desempenho" nota={notas.desempenho} setNotas={handleNotas}/>
      <Nota atributoAvaliado="consumo" nota={notas.consumo} setNotas={handleNotas}/>
      <Nota atributoAvaliado="conforto" nota={notas.conforto} setNotas={handleNotas}/>
      <Resultado somaNotas={parseFloat(notas.desempenho)+parseFloat(notas.consumo)+parseFloat(notas.conforto)}/>
    </main>
  );
}