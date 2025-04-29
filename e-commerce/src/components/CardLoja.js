import React from 'react';
import "../styles/card.css";
import iconePlus from "../imgs/icone-plus.png";

export default function CardLoja(props) {
    return (
        <div className="card">
            <img src={props.img} alt="Imagem do produto" className='card__imagem'/>
            <div className="card__container__info">
                <p className='card__container__name'>{props.nome}</p>
                <div className="card__container__value">
                    <p>$ {props.preco}</p>
                    <img src={iconePlus} alt="Ícone de Editar" onClick={props.funcaoClick}/>
                </div>
                <p>Disponível: {props.estoque}</p>
            </div>
        </div>
    )
}