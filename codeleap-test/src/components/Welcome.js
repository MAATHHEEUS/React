import { useState, useEffect } from "react";
import styled from 'styled-components';

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
`;

const Title = styled.h1`
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.6rem;
    margin-bottom: 1.8rem;
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.12rem;
    margin-bottom: 0.7rem;
`;

const Input = styled.input`
    color: #CCCCCC;
    border: 1px solid #777777;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1rem;
    margin-bottom: 1.3rem;
    border-radius: 4px;
    padding: 0.37rem;
    width: 15.75rem;

    @media only screen and (min-width: 430px){
        width: 20.75rem;
    }

    @media only screen and (min-width: 768px){
        width: 27.75rem;
    }
`;

const Enter = styled.a`
    background-color: #CCCCCC;
    color: #FFFFFF;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.6rem;
    text-transform: uppercase;
    align-self: end;
    border: none;
    padding: 0.4rem 1.8rem;
    text-decoration: none;
`;

export default function Welcome(props) {

    // HOOKS
    const [userName, setUserName] = useState('');

    useEffect(
        () => {
            const botao = document.getElementById('botao__entrar');
            if (botao) {
                if (userName.trim() != '' && userName.trim().length >= 3) {
                    botao.style.backgroundColor = '#000000';
                    botao.style.pointerEvents = '';
                    botao.setAttribute('tabIndex', 'default');
                }else{
                    botao.style.backgroundColor = '#CCCCCC';
                    botao.style.pointerEvents = 'none';
                    botao.setAttribute('tabIndex', '-1');
                }
            }
        }
    )

    return (
        <Container>
            <Title>Welcome to CodeLeap network!</Title>
            <Label>Please enter your username</Label>
            <Input placeholder='Matheus Carvalho' type='text' name='username' minLength={3} maxLength={100} value={userName} onChange={(e) => { setUserName(e.target.value) }}></Input>
            <Enter id="botao__entrar" href={props.url} onClick={() => localStorage.setItem("userName", userName)} tabIndex={-1}>Enter</Enter>
        </Container>
    );
}