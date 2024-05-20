import styled from 'styled-components';
import X from '../assets/imgs/x.png';
import StarFull from '../assets/imgs/star-yellow.png';
import StarEmpty from '../assets/imgs/star-grey.png';
import Ferro from '../assets/imgs/iron-man.png';
import Ferro2 from '../assets/imgs/iron-man2.png';
import Thor from '../assets/imgs/thor.png';
import Capitao from '../assets/imgs/capitan.png';
import Marvel from '../assets/imgs/marvel.png';
import Disney from '../assets/imgs/logo-disney.png';

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

const Streaming = styled.img`
    background: #FFFFFF;
    box-shadow: 0px 3px 3px 0px #00000029;
    width: 3rem;
    height: 2.9rem;
    border-radius: 0.6rem;
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
            "titulo": "Capitão América: Primeiro Vingador",
            "descricao": `Em Capitão América: O Primeiro Vingador, conhecemos a história de Steve Rogers (Chris Evans) e como ele se tornou o melhor soldado do mundo.`,
            "streaming" : Disney,
            "avaliacao": 4,
            "imagem": Capitao
        },
        {
            "id": 2,
            "titulo": "Capitã Marvel",
            "descricao": `Capitã Marvel é uma alienígena Kree que se encontra no meio de uma batalha entre seu povo e os Skrulls. Com a ajuda de Nick Fury, ela tenta impedir uma invasão na Terra.`,
            "streaming" : Disney,
            "avaliacao": 4,
            "imagem": Marvel
        },
        {
            "id": 3,
            "titulo": "Homem de Ferro",
            "descricao": `Tony Stark (Robert Downey Jr.) é um industrial bilionário, que também é um brilhante inventor, ao ser sequestrado, ele é obrigado a construir uma arma devastadora, mas ao invés disso, cria uma armadura capaz de mudar a história.`,
            "streaming" : Disney,
            "avaliacao": 5,
            "imagem": Ferro
        },
        {
            "id": 4,
            "titulo": "Homem de Ferro 2",
            "descricao": `O mundo já sabe que o inventor bilionário Tony Stark (Robert Downey Jr.) é o super-herói blindado Homem de Ferro. Sofrendo pressão do governo, da mídia e do público para compartilhar sua tecnologia com as forças armadas.`,
            "streaming" : Disney,
            "avaliacao": 4,
            "imagem": Ferro2
        },
        {
            "id": 5,
            "titulo": "Thor",
            "descricao": `Quando é banido do reino de Asgard e exilado na Terra, o arrogante guerreiro Thor (Chris Hemsworth) é obrigado a lutar para reaver seus poderes perdidos.`,
            "streaming" : Disney,
            "avaliacao": 5,
            "imagem": Thor
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
                            <br/><p>Disponível em Streaming:</p>
                            <Streaming src={personagens[id].streaming} alt='Logo da plataforma de Streaming'></Streaming>
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