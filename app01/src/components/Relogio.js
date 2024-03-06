import React from 'react'

export default function Relogio(props){
    return(
        <div className='relogio'>
            <p style={{display:props.ligado?'initial':'none'}} className='relogio__texto'>
                {new Date().toLocaleTimeString()}
            </p>
            <button className='relogio__botao' onClick={()=>props.setLigado(!props.ligado)}>
                Relógio
            </button>
        </div>
    )
}