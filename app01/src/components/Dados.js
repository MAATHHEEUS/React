import React from 'react'

export default function Dados(props){
    let n1 = 10
    let n2 = 30
    return(
        <section className='dados'>
            <p>O valor de num em dados é: {props.num}</p>
            <button className='dados__botao' onClick={()=>props.setNum(props.num+10)}>Soma 10</button>
            <p>Canal: {props.canal}</p>
            <p>Youtube: <a className='dados__link' href='https://www.youtube.com/devmatheus-carvalho-oliveira'>{props.youtube}</a></p>
            <p>Curso: {props.curso}</p>
            <p>{'A soma de '+n1+' com '+n2+ ' é igual a '+props.somar(n1,n2)}</p>
        </section>
    )
}