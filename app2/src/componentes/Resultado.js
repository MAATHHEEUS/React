import React from 'react'

export default function Resultado(props){
    return(
        <div className='main__resultado'>
            <p className='main__resultado__text'>Soma das notas: {props.somaNotas}</p>
            <p className='main__resultado__text' style={{color:props.somaNotas >= 60 ?'green':'red', fontSize: '30px'}}>{props.somaNotas >= 60 ? "Aprovado":"Reprovado"}</p>
        </div>
    )
}