import './CampoTexto.css'

export default function CampoTexto({ label, valor, obrigatorio, placeholder, atualizaValor, max }) {

    const AtualizaValor = (evento) => {
        atualizaValor(evento.target.value);
    }

    return(
        <div className="campo__texto">
            <label>{label}</label>
            <input value={valor} maxLength={max} minLength={3} onChange={AtualizaValor} required={obrigatorio} placeholder={placeholder} type="text"/>
        </div>
    )
}