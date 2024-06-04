import './Card.css'
import { AiFillCloseCircle } from "react-icons/ai";

export default function Card(props) {

    const cssBack = {
        backgroundColor: props.corBack
    }

return (
    <div className='card'>
        <AiFillCloseCircle size={25} className='deletar' onClick={props.deletarProduto} />
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