import React from 'react';
import { BackGround } from './BackGround';
import { Title } from './Title';
import { LoginContainer, LoginBoasVindas, LoginSpan, LoginInput, CheckBox, Label, LoginLinkForgetSenha, LoginButton, NotLoginSpan, LoginLinkCadastrar } from './Login'

export default function Home() {
    return(
        <>
            <BackGround>
                <Title>MARVEL</Title>
                <LoginContainer>
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
                    <NotLoginSpan>Ainda não tem login? <LoginLinkCadastrar>Cadastre-se</LoginLinkCadastrar></NotLoginSpan>
                </LoginContainer>
            </BackGround>
        </>
      )
}