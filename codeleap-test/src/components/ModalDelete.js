import styled from 'styled-components';

const Modal = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: flex-start;
    padding: 6rem 0rem;
    justify-content: center;
    position: fixed;
    display: none;
    background: rgba(49,49,49,0.8);
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: #FFFFFF;
    color: #000000;
    font-family: Roboto;
    border: 1px solid #CCCCCC;
    padding: 1.8rem;
    margin: 1rem 2.3rem;
    width: 55%;
    box-sizing: border-box;

    @media only screen and (min-width: 768px){
        width: 40%;
    }
`;

const Texto = styled.p`
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 1.6rem;
    margin-bottom: 2.1rem;
`;

const GrupoBotoes = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    gap: 1rem;

    @media only screen and (min-width: 368px){
        flex-direction: row;
    }
`;

const Botao = styled.button`
    border: 1px solid #000000;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.12rem;
    background-color: #FFFFFF;
    font-family: Roboto;
    width: 5rem;
    height: 2rem;

    @media only screen and (min-width: 768px){
        width: 7rem;
        height: 2rem;
    }
`;

export default function ModalDelete(props) {

    // FUNCOES
    const excluirPost = async (evento, id) => {
        evento.preventDefault();
        try {
            const conexao = await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (!conexao.ok) throw new Error("Não foi possível deletar o post.");
            else{
                alert("Post excluído.");
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    }

    return(
        <Modal id={`modalDelete_${props.Post}`}>
            <Container>
                <Texto>Are you sure you want to delete this item?</Texto>
                <GrupoBotoes>
                    <Botao onClick={props.toggleModal}>Cancel</Botao>
                    <Botao onClick={(e) => excluirPost(e, props.Post)}>OK</Botao>
                </GrupoBotoes>
            </Container>
        </Modal>
    );
}