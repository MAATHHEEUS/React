import React from 'react'

export default function Relogio(props){

    const cumprimento=()=>{
        const hora = new Date().getHours()
        if(hora >= 0 && hora < 13){
            return <p>Bom dia</p>
        }else if(hora >= 13 && hora < 18){
            return <p>Boa tarde</p>
        }else{
            return <p>Boa noite</p>
        }
    }

    return(
        <div className='relogio'>
            {cumprimento()}
            <p style={{display:props.ligado?'initial':'none'}} className='relogio__texto'>
                {new Date().toLocaleTimeString()}
            </p>
            <button className='relogio__botao' onClick={()=>props.setLigado(!props.ligado)}>
                Relógio
            </button>
        </div>
    )
}