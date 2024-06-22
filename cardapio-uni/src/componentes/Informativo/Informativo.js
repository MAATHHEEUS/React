import "./Informativo.css";

export default function Informativo({ usuario }) {
    return(
        <section className="informativo" style={{display: usuario[4] !== "Loja" ? "flex" : "none"}}>
            <p> Não achou alguma loja? <strong>Peça para que se cadastrem!</strong> </p>
        </section>
    )
}