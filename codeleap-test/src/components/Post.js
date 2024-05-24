import styled from 'styled-components';
import Delete from '../imgs/delete-forever.png';
import Editar from '../imgs/bx-edit.png';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: #FFFFFF;
    color: #000000;
    font-family: Roboto;
    border: 1px solid #CCCCCC;
    margin: 1rem 2.3rem;
    width: 80%;
    box-sizing: border-box;

    @media only screen and (min-width: 768px){
        width: 90%;
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.6rem;
    margin-bottom: 1rem;
    background-color: #000000;
    color: #FFFFFF;
    padding: 1.7rem 2.3rem;
    box-sizing: border-box;
    height: auto;
    width: 100%;
    justify-content: space-between;
    gap: 0.5rem;

    @media only screen and (min-width: 768px){
        flex-direction: row;
        height: 5rem;
        gap: 0rem;
    }
`;

const Icons = styled.div`
    display: flex;
    gap: 1rem;
    
    & img {
        cursor: pointer;
    }

    @media only screen and (min-width: 768px){
        align-self: flex-end;
    }
`;

const Dados = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Roboto;
    font-size: 1.12rem;
    font-weight: 700;
    line-height: 1.3rem;
    color: #777777;
    margin: 1rem 1.8rem;
    width: 80%;
    justify-content: space-between;

    & p:nth-child(2) {
        font-weight: 400;
    }  
    
    @media only screen and (min-width: 768px){
        width: 90%;
        flex-direction: row;
    }
`;

const Content = styled.p`
    font-family: Roboto;
    font-size: 1.12rem;
    font-weight: 400;
    line-height: 1.3rem;
    color: #000000;
    margin: 0rem 1.8rem 1rem 1.8rem;
`;

export default function Post(props) {

    // HOOKS
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

    // FUNCOES
    const montaHora = (date) => {
        const atual = new Date();
        const convert = new Date(date.toString());
        let retorno = diffDates(atual, convert);
        return <p>{retorno}</p>
    }

    const diffDates = (final, inicial) => {
        // Dias
        if (parseInt((final - inicial) / 86_400_000) > 0) {
            return `${parseInt((final - inicial) / 86_400_000)} days ago`;
        }
        else if (parseInt((final - inicial) / 3_600_000) > 0) { // Horas
            return `${parseInt((final - inicial) / 3_600_000)} hours ago`;
        }
        else {
            if (parseInt((final - inicial) / 60_000) > 0) {
                return `${parseInt((final - inicial) / 60_000)} minutes ago`;
            } else {
                return `${1} minute ago`;
            }
        }
    }

    // EDIT MODAL
    const toggleModalEdit = () => {
        setVisibleEdit(!visibleEdit);
    };

    const modalEdit = document.getElementById(`modalEdit_${props.Id}`);

    if (visibleEdit) {
        if (modalEdit) {
            modalEdit.style.display = 'flex';
        }
    } else {
        if (modalEdit) modalEdit.style.display = 'none';
    }

    // DELETE MODAL
    const toggleModalDelete = () => {
        setVisibleDelete(!visibleDelete);
    };

    const modalDelete = document.getElementById(`modalDelete_${props.Id}`);

    if (visibleDelete) {
        if (modalDelete) {
            modalDelete.style.display = 'flex';
        }
    } else {
        if (modalDelete) modalDelete.style.display = 'none';
    }

    return (
        <Container>
            <Title>{props.Title}
                <Icons style={{ display: localStorage.getItem('userName') == props.User ? 'flex' : 'none' }}>
                    <img src={Delete} alt="Delete Icon" onClick={() => toggleModalDelete()} />
                    <img src={Editar} alt="Edit Icon" onClick={() => toggleModalEdit()} />
                </Icons>
            </Title>
            <Dados>
                <p>@{props.User}</p>
                {montaHora(props.Date)}
            </Dados>
            <Content>{props.Content}</Content>
            <ModalEdit toggleModal={toggleModalEdit} Post={props.Id} Content={props.Content} Title={props.Title}></ModalEdit>
            <ModalDelete Post={props.Id} toggleModal={toggleModalDelete}></ModalDelete>
        </Container>
    );
}