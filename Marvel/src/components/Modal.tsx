import styled from 'styled-components';
import X from '../assets/imgs/x.png';

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
    line-height: 1.4;
    background: #f1f1f1;
    color: #FFFFFF;
    font-family: Inter;
    border-radius: 1.8rem;
    max-width: 600px;
    min-width: 300px;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,0,0,1) 99%);
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

export default function Modal(props : any) {

  return (
    <>
        <Container id="modal">
            <Conteudo>
                <img src={props.imagem} alt='Personagem'/>
                <h2>Hello Modal</h2>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                perferendis suscipit officia recusandae, eveniet quaerat assumenda
                id fugit, dignissimos maxime non natus placeat illo iusto!
                Sapiente dolorum id maiores dolores? Illum pariatur possimus
                quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                placeat tempora vitae enim incidunt porro fuga ea.
                </p>
                <BotaoX onClick={props.toggleModal}><img src={X} alt="Botao fechar" /></BotaoX>
            </Conteudo>
        </Container>
    </>
  );
}