import Card from '../Card/Card';
import './Loja.css'
import hexToRgba from 'hex-to-rgba';

export default function Loja(props) {

    const cssBack = {
        backgroundColor: hexToRgba(props.cor, '0.4')
    };

    const cssTitle = {
        borderColor: props.cor,
        color: props.cor
    }

    return (
        props.produtos.length > 0 ? <section className="loja" style={cssBack}>
            <input onChange={evento => props.mudarCor(evento.target.value, props.id)} value={props.cor} type='color' className='input-cor' />
            <h3 style={cssTitle}>{props.nome}</h3>
            <div className='produtos'>
                {props.produtos.map((produto, index) => 
                    <Card
                        key={index}
                        nome={produto.nome}
                        descricao={produto.descricao}
                        imagem={produto.imagem}
                        corBack={props.cor}
                        deletarProduto={props.deletarProduto}
                    />
                )}
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