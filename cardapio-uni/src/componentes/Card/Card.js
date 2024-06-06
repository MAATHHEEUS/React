import './Card.css'
import { AiFillCloseCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Card(props) {

    const cssBack = {
        backgroundColor: props.corBack
    }

    const favoritar = () => {
        props.favoritarProduto(props.idProduto)
    }

    const propsFavorito = {
        size: 25,
        onClick: favoritar,
        className: 'favoritar'
    }

    return (
        <div className='card'>
            {props.favorito
                ? <AiFillHeart color='#ff0000' {...propsFavorito} />
                : <AiOutlineHeart  {...propsFavorito}/>
            }
            <AiFillCloseCircle size={25} className='deletar' onClick={() => props.deletarProduto(props.idProduto)} />
            <div className='cabecalho' style={cssBack}>
                <img src={props.imagem} alt={props.nome}></img>
            </div>
            <div className='rodape'>
                <h4>{props.nome}</h4>
                <h5>{props.descricao}</h5>
            </div>
        </div>
    )
}