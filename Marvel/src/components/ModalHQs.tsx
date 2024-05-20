import styled from 'styled-components';
import X from '../assets/imgs/x.png';
import StarFull from '../assets/imgs/star-yellow.png';
import StarEmpty from '../assets/imgs/star-grey.png';
import Surfista from '../assets/imgs/surfista-hq.png';
import Wolverine from '../assets/imgs/wv-hq.png';
import Thor from '../assets/imgs/thor-hq.png';
import Americanas from '../assets/imgs/logo-americanas.png';
import Amazon from '../assets/imgs/logo-amazon.png';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    display: none;
    background: rgba(49,49,49,0.8);
`;

const Conteudo = styled.div`
    display: flex;
    position: absolute;
    top: 63%;
    left: 40%;
    transform: translate(-50%, -50%);
    background: #f1f1f1;
    color: #FFFFFF;
    font-family: Inter;
    border-radius: 1.8rem;
    width: 40.6rem;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,0,0,1) 99%);
    font-weight: 400;
`;

const Texto = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 3rem 1.7rem 2.5rem 2.4rem;
`;

const Titulo = styled.h1`
    font-size: 1.87rem;
    line-height: 2.25rem;
`;

const Descricao = styled.div`
    font-size: 0.75rem;
    line-height: 1.37rem;
    height: 180px;
    font-weight: 300;
`;

const SubTitulo = styled.h2`
    font-size: 1.6rem;
    line-height: 1.9rem;
`;

const Avaliacao = styled.div`
    display: flex;
    gap: 0.2rem;
`;

const BotaoX = styled.button`
    position: absolute;
    top: 23.75rem;
    right: 2.5rem;
    display: flex;
    justify-content: center;
    border: 2px solid #FFFFFF;
    border-radius: 50%;
    background-color: transparent;
    padding: 0.4rem;
`;

export default function ModalPersonagem(props: any) {

    // FUNCOES
    const montaEstrelas = (avaliacao: number) => {
        const estrelas: JSX.Element[] = [];
        for (let i = 0; i < avaliacao; i++) {
            estrelas.push(
                <img src={StarFull} key={i} />
            );
        }
        if (estrelas.length == 5) return <>{estrelas}</>
        else {
            while (estrelas.length != 5) {
                estrelas.push(
                    <img src={StarEmpty} key={estrelas.length} />
                );
            }
            return <>{estrelas}</>
        }
    }

    const montaDescricao = (descricao: string) => {
        const linhas: JSX.Element[] = [];
        const aux = descricao.split('\n');
        aux.forEach((linha) => {
            linhas.push(
                <p key={linhas.length}>{linha}</p>
            );
        });
        return(linhas);
    }

    // OBJETOS
    var personagens = [
        {
            "id": 0,
            "titulo": "",
            "descricao": ``,
            "avaliacao": 0,
            "imagem": ''
        },
        {
            "id": 1,
            "titulo": "Thor: Vikings",
            "descricao": `Garth Ennis e sua violência atacam novamente na HQ que leva a violência das histórias de Thor ao limite! Na minissérie de 2003 vemos vikings de um passado distante voltando a vida.`,
            "avaliacao": 4,
            "imagem": Thor
        },
        {
            "id": 2,
            "titulo": "Surfista Prateado: Parábola",
            "descricao": `O único oponente do Devorador de Mundos é o herói que ele aprisionou na Terra: o Surfista Prateado, Galactus jurou não consumir o planeta, mas e se, em vez disso, ele transformar a civilização em seus adoradores?`,
            "avaliacao": 4,
            "imagem": Surfista
        },
        {
            "id": 3,
            "titulo": "Wolverine: Origens",
            "descricao": `Origem é uma minissérie em quadrinhos publicada pela Marvel Comics em seis edições, entre 2001 e 2002. A história conta a revelação do passado do personagem Wolverine.`,
            "streaming" : Amazon,
            "avaliacao": 5,
            "imagem": Wolverine
        }
    ];

    const id = props.Personagem != '' ? props.Personagem.toString().replace('personagemCard', '') : 0;

    return (
        <>
            <Container id="modal">
                <Conteudo>
                    <img src={personagens[id].imagem} alt='Personagem' />
                    <Texto>
                        <Titulo>{personagens[id].titulo}</Titulo>
                        <Descricao>
                            {montaDescricao(personagens[id].descricao)}
                            <br/><p>Disponível para compra:</p>
                            <img src={Americanas} alt="Logo da Americanas" />
                            <img src={Amazon} alt="Logo da Amazon" />
                        </Descricao>
                        <SubTitulo>Crítica </SubTitulo>
                        <Avaliacao>
                            {montaEstrelas(personagens[id].avaliacao)}
                        </Avaliacao>
                    </Texto>
                    <BotaoX onClick={props.toggleModal}><img src={X} alt="Botao fechar" /></BotaoX>
                </Conteudo>
            </Container>
        </>
    );
}