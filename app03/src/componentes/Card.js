import React, {useState} from 'react'
import '../styles/card.css'

export default function Card(props){

    const [estaVirado, setEstaVirado] = useState(false);

    const virarCard = () => setEstaVirado((virar) => !virar);
    
    return(
        <div className={`card ${estaVirado ? 'virado' : ''}`}>
            <div className="front"> 
                {props.titulo}
                <button onClick={virarCard} className='btn'>Ver</button>
            </div>
            <div className="back">
                {props.conteudo}
                <button onClick={virarCard} className='btn'>Voltar</button>
            </div>
        </div>
    );
}