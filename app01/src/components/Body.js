import React,{useState} from 'react'
import Dados from './Dados'

export default function Body() {
  const somar=(v1, v2)=>{
    return v1+v2
  }

  const [num, setNum] = useState(10)

  return(
    <main className='conteudo'>
      <section className='conteudo__texto'>
          <h2>Isso é o corpo</h2>
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
    </main>
  )
}