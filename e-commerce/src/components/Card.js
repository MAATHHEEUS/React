import React from 'react';
import "../styles/card.css";
import iconeDelete from "../imgs/icone-delete.png";

export default function Card(props) {
    return (
        <div className="card">
            <img src={props.img} alt="Imagem do produto" className='card__imagem'/>
            <div className="card__container__info">
                <p className='card__container__name'>{props.nome}</p>
                <div className="card__container__value">
                    <p>$ {props.preco}</p>
                    <img src={iconeDelete} alt="Ícone de deletar"/>
                </div>
            </div>
        </div>
    )
}