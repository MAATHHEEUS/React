import React from 'react'
import Dados from './Dados'

export default function Body() {
  return(
    <section>
        <h2>Isso é o corpo</h2>
        <p>Conteúdo do corpo</p>
        <Dados
            canal='Dev Matheus Carvalho Oliveira'
            youtube='youtube.com/devmatheus-carvalho-oliveira'
            curso='React.js' 
        />
    </section>
  )
}