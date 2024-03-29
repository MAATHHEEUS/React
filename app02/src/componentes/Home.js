import React,{useEffect, useState} from 'react' 
import Nota from './Nota'
import Resultado from './Resultado'
import Imagem from './Imagem'
import Menu from './Menu'

// Objeto com os carros
const carros = [
  {ano: '2024', modelo: 'FastBack'},
  {ano: '2020', modelo: 'Polo'},
  {ano: '2019', modelo: 'Onix'},
  {ano: '2019', modelo: 'Fit'}
]

// Variável para saber quais os campos do form
const camposForm = [
  "nome",
  "carro",
  "notaDesempenho",
  "notaConsumo",
  "notaConforto"
]

// Usando função map para colocar os carros em forma de lista
const montaLista=(filtro)=>carros.map(
  (elemento, indice)=>{
    if(elemento.ano == filtro || filtro == ''){
      return <option key={indice} value={elemento.modelo}>{elemento.modelo} - {elemento.ano}</option>
    }
  }
)

const botoesFiltro=(lista, stateFiltro)=>{
  // Filtra os anos
  const anos = []
  lista.forEach(element => {
      if(!anos.includes(element.ano))anos.push(element.ano)
  })
  
  // Para cada ano cria um botão
  const botoes = []
  anos.forEach(ano => {
      let id = "radio_" + ano
      botoes.push(
          <div className='main__botoesRadio__radio'>   
              <input type="radio" id={id} name="ano" value={ano} onChange={(e)=>stateFiltro(e.target.value)}/>
              <label htmlFor={id}>{ano}</label>
          </div>  
      )
  })

  return(
    <fieldset className='main__botoesRadio__field'>
      <legend>Filtrar por ano:</legend>
      {botoes}
    </fieldset>
  )
}

// Função para salvar/modificar os dados digitados no localStorage
const salvar=(chaves, valores)=>{
  valores.map(
    (elemento, indice)=>{
      if(elemento == ''){
        alert("O campo *" + chaves[indice] + "* está vazio!")
        return
      }
      localStorage.setItem(chaves[indice], elemento)
  })
  let soma = parseFloat(valores[2])+parseFloat(valores[3])+parseFloat(valores[4])
  localStorage.setItem("soma", soma)
  localStorage.setItem("status", soma >= 60 ? "aprovado" : "reprovado")
  alert("Dados salvos!")
}

// Função para consultar os dados que estão salvos no localStorage
const consultar=(chaves)=>{
  chaves.map(
    (elemento, indice)=>
    alert(chaves[indice] + " : " + localStorage.getItem(elemento))
  )
  alert("Soma das notas : " + localStorage.getItem("soma"))
  alert("Resultado : " + localStorage.getItem("status"))
}

// Função para apagar os dados que estão armazenados no localStorage
const apagar=(chaves)=>{
  if(window.confirm("Deseja apagar os dados?")){
    chaves.map(
      (elemento, indice)=>
      localStorage.removeItem(elemento)
    )
    localStorage.removeItem("soma")
    localStorage.removeItem("status")
    alert("Dados apagados!")
  }
}

export default function Home() {

  const [filtro, setFiltro] = useState('')

  // States relacionados aos inputs da tela
  const [nome, setNome] = useState('')
  const [carro, setCarro] = useState('FastBack')
  const [notas, setNotas] = useState({
    "desempenho":"0,0",
    "consumo":"0,0",
    "conforto":"0,0"
  })

  // Função para manipular o state notas
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

  
  useEffect(
    ()=>{
      setCarro(document.getElementById('inputSelectCarro').value)
    }
  )


  return (
    <main className='main'>
      <h1 className='main__title'>Formulário Carro</h1>
      <Menu/>
      <label className='main__label'>Digite seu nome </label>
      <input type="text" placeholder='digite seu nome' value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
      <label className='main__label'>Selecione um carro </label>
      <select id='inputSelectCarro' value={carro} onChange={(e)=>{setCarro(e.target.value)}}>
        {montaLista(filtro)}
      </select>
      <div className='main__botoesRadio'>
        {botoesFiltro(carros, setFiltro)}
        <Imagem carro={carro}/>
      </div>
      <Nota atributoAvaliado="desempenho" nota={notas.desempenho} setNotas={handleNotas}/>
      <Nota atributoAvaliado="consumo" nota={notas.consumo} setNotas={handleNotas}/>
      <Nota atributoAvaliado="conforto" nota={notas.conforto} setNotas={handleNotas}/>
      <Resultado somaNotas={parseFloat(notas.desempenho)+parseFloat(notas.consumo)+parseFloat(notas.conforto)}/>
      <div className='main__botoes'>
        <button onClick={()=>{salvar(camposForm, [nome, carro, notas.desempenho, notas.conforto, notas.consumo])}} className='main__botoes__salvar'>Salvar</button>
        <button onClick={()=>{consultar(camposForm)}} className='main__botoes__consultar'>Consultar</button>
        <button onClick={()=>{apagar(camposForm)}} className='main__botoes__apagar'>Apagar</button>
      </div>
    </main>
  );
}