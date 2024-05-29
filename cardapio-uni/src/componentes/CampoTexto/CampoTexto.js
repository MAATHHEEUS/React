import './CampoTexto.css'

export default function CampoTexto(props) {

    const AtualizaValor = (evento) => {
        props.atualizaValor(evento.target.value);
    }

    return(
        <div className="campo__texto">
            <label>{props.label}</label>
            <input value={props.valor} onChange={AtualizaValor} required={props.obrigatorio} placeholder={props.placeholder} type="text"/>
        </div>
    )
}