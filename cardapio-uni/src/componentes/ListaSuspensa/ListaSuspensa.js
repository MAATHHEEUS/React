import './ListaSuspensa.css'

export default function ListaSuspensa(props) {

    const AtualizaValor = (evento) => {
        props.atualizaValor(evento.target.value);
    }

    return (
        <div className="lista__suspensa">
            <label>{props.label}</label>
            <select required={props.obrigatorio} value={props.valor} onChange={AtualizaValor}>
                <option value=""></option>
                {props.items.map(item => <option key={item.nome} value={item.nome}>{item.nome}</option>)}
            </select>
        </div>
    )
}