import React from 'react'

export default function Nota(props){
    return(
        <div className='main__nota'>
            <label className='main__label'>Digite a nota(0-100) para {props.atributoAvaliado}: </label>
            <input name={props.atributoAvaliado} type='text' value={props.nota} onChange={(e)=>{props.setNotas(e)}}></input>
        </div>
    )
}