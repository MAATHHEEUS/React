import { useState, useEffect } from "react";
import styled from 'styled-components';
import Delete from '../imgs/delete-forever.png';
import Editar from '../imgs/bx-edit.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: #FFFFFF;
  color: #000000;
  font-family: Roboto;
  border: 1px solid #CCCCCC;
  margin: 2.3rem;
  width: 90%;
  box-sizing: border-box;
`;

const Title = styled.h1`
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.6rem;
    margin-bottom: 1.8rem;
    background-color: #000000;
    color: #FFFFFF;
    padding: 1.7rem 2.3rem;
    box-sizing: border-box;
    height: 5rem;
    width: 100%;
`;

const Icons = styled.div`
    display: flex;
`;

const Dados = styled.div`
    display: flex;
    font-family: Roboto;
    font-size: 1.12rem;
    font-weight: 700;
    line-height: 1.3rem;
    color: #777777;
    margin:  1rem 1.8rem;
`;

const Content = styled.p`
    font-family: Roboto;
    font-size: 1.12rem;
    font-weight: 400;
    line-height: 1.3rem;
    color: #000000;
    margin: 0rem 1.8rem;
`;

export default function Post() {

    // HOOKS

    return (
        <Container>
            <Title>My First Post at CodeLeap Network!<Icons><img src={Delete} alt="Delete Icon" /><img src={Editar} alt="Edit Icon" /></Icons></Title>
            <Dados>@User 15min</Dados>
            <Content>Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.

Duis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.</Content>
        </Container>
    );
}