import styled from "styled-components";

const Imagem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 18rem;
    height: 27.4rem;
    top: 15.5rem;
    left: 9.1rem;
    border-radius: 1.8rem;
    background-image: url(${(props) => props.url});
`;

const Conteudo = styled.div`
    width: 18rem;
    height: 14.6rem;
    top: 28.3rem;
    left: 9.1rem;
    border-radius: 1.8rem;
    background: linear-gradient(320deg, rgba(128, 0, 0, 0.301961) 30.2%, #FF0000 100%);
    font-family: Inter;
    font-weight: 400;
    text-align: center;
    color: #FFFFFF;
`;

const Titulo = styled.h1`
    font-size: 1.25rem;
    line-height: 1.25rem;
    margin: 1.75rem 0rem 0.8rem 0rem;
`;

const Descricao = styled.p`
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin: 0rem 1.1rem 0.4rem 1.6rem;
    text-align: left;
    padding: 5px;
    height: 7.6rem;
`;

const Detalhes = styled.p`
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1.25rem;
`;

export default function Card(props : any) {
    return (
        <Imagem url={props.Imagem}>
            <Conteudo>
                <Titulo>{props.Titulo}</Titulo>
                <Descricao>{props.Descricao}</Descricao>
                <Detalhes onClick={props.onClick}>ver detalhes</Detalhes>
            </Conteudo>
        </Imagem>
    );
}