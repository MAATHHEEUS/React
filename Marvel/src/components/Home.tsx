import React, { useEffect } from 'react';
import { BackGround, Image } from './BackGround';
import { Title } from './Title';
import { LoginContainer, LoginBoasVindas, LoginSpan, LoginInput, CheckBox, Label, LoginLinkForgetSenha, LoginButton, NotLoginSpan, LoginLinkCadastrar } from './Login'

export default function Home() {

    useEffect(
        () => {
            setTimeout(animationLogin, 6000);
        }
    )

    const animationLogin=() => {
        const login = document.getElementById('login__container');
        if(login) login.style.display = 'flex';
    }

    return (
        <>
            <BackGround>
                <div>
                    <Title>MARVEL</Title>
                    <LoginContainer id='login__container'>
                        <LoginBoasVindas>Bem-vindo(a) de volta!</LoginBoasVindas>
                        <LoginSpan>Acesse sua conta:</LoginSpan>
                        <LoginInput type='text' placeholder='Usuário'></LoginInput>
                        <LoginInput type='password' placeholder='Senha'></LoginInput>
                        <div>
                            <CheckBox type='checkbox'></CheckBox>
                            <Label>Salvar login</Label>
                            <LoginLinkForgetSenha href='#'>Esqueci a senha</LoginLinkForgetSenha>
                        </div>
                        <LoginButton>Entrar</LoginButton>
                        <NotLoginSpan>Ainda não tem login? <LoginLinkCadastrar href='#'>Cadastre-se</LoginLinkCadastrar></NotLoginSpan>
                    </LoginContainer>
                </div>
                <Image></Image>
            </BackGround>
        </>
    )
}