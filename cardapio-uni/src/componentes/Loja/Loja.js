import Card from '../Card/Card';
import './Loja.css'

export default function Loja(props) {

    const cssBack = {
        backgroundColor: props.secundaria
    };

    const cssTitle = {
        borderColor: props.primaria,
        color: props.primaria
    }

    return (
        props.produtos.length > 0 ? <section className="loja" style={cssBack}>
            <h3 style={cssTitle}>{props.nome}</h3>
            <div className='produtos'>
                {props.produtos.map((produto, index) => <Card
                    key={index}
                    nome={produto.nome}
                    descricao={produto.descricao}
                    imagem={produto.imagem}
                    corBack={props.primaria}
                />)}
            </div>
        </section>
            : <section className="loja" style={cssBack}>
                <h3 style={cssTitle}>{props.nome}</h3>
                <div className='produtos'>
                    <h4>Loja sem produtos cadastrados!</h4>
                </div>
            </section>
    )
}