import React from 'react';
import "../styles/card.css";
import iconeDelete from "../imgs/icone-delete.png";
import iconeEdit from "../imgs/icone-edit.png";

export default function Card(props) {
    return (
        <div className="card">
            <img src={props.img} alt="Imagem do produto" className='card__imagem'/>
            <div className="card__container__info">
                <p className='card__container__name'>{props.nome}</p>
                <div className="card__container__value">
                    <p>$ {props.preco}</p>
                    <img src={iconeEdit} alt="Ícone de Editar" onClick={props.funcaoEdit}/>
                    <img src={iconeDelete} alt="Ícone de deletar" onClick={props.funcaoClick}/>
                </div>
                <p>Estoque: {props.estoque}</p>
            </div>
        </div>
    )
}