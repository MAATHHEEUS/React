import React,{useState} from 'react'
import Dados from './Dados'

export default function Body() {
  const somar=(v1, v2)=>{
    return v1+v2
  }

  const [num, setNum] = useState(10)

  const [log, setLog] = useState(false)

  const tarefas = [
    {data: '08/03/24 - 11:00', tarefa: 'Fazer o almoço'},
    {data: '08/03/24 - 12:00', tarefa: 'Comer o almoço'},
    {data: '08/03/24 - 13:00', tarefa: 'Fazer a soneca'},
    {data: '08/03/24 - 14:00', tarefa: 'Acordar da soneca'}
  ]

  const listaTarefas = tarefas.map(
    (elemento, indice)=>
      <li>{elemento.data} : {elemento.tarefa}</li>
  )

  return(
    <main className='conteudo'>
      <section className='conteudo__texto'>
          <h2>Isso é o conteudo do corpo</h2>
          <p>O valor de num no body é: {num}</p>
          <Dados
              canal='Dev Matheus Carvalho Oliveira'
              youtube='youtube.com/devmatheus-carvalho-oliveira'
              curso='React.js'
              somar={somar}
              num={num}
              setNum={setNum} 
          />
      </section>
      <hr className='conteudo__divisoria'/>
      <section className='conteudo__lista'>
          <h2>Lista</h2>
          <ul style={{display:log?'initial':'none', height: '15em'}}>
            {listaTarefas}
          </ul>
          <p  style={{display:!log?'initial':'none'}}>Clique no botão login para ver a lista</p>
          <button className='conteudo__lista__botaoLog' onClick={()=>{setLog(!log)}}>{log?'Logoff':'Login'}</button>
      </section>
    </main>
  )
}