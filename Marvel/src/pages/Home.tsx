import React, { useEffect, useState } from 'react';
import { BackGround, ImageAnimated } from '../components/BackGround';
import { Title } from '../components/Title';
import { LoginContainer, LoginBoasVindas, LoginSpan, LoginInput, CheckBox, Label, LoginLinkForgetSenha, LoginButton, NotLoginSpan, LoginLinkCadastrar, LoginMsg } from '../components/Login'

export default function Home() {

    // HOOKS
    useEffect(
        () => {
            setTimeout(animationLogin, 6000);
        }
    )
    const [nome, setNome] = useState(localStorage.getItem('salvarlogin') == 'true' ? String(localStorage.getItem('nome')) : "");
    const [senha, setSenha] = useState(localStorage.getItem('salvarlogin') == 'true' ? String(localStorage.getItem('senha')) : "");
    const [checked, setChecked] = useState(localStorage.getItem('salvarlogin') == 'true' ? true : false);

    // FUNCOES
    const animationLogin = () => {
        const login = document.getElementById('login__container');
        if (login) login.style.display = 'flex';
    }

    const entrar = () => {
        var url = window.location.href.toString(); 
        const camposValidados = validaLogin();
        if (!camposValidados.includes(false)) window.location.href = (url+'Personagens');
        else alert('Preencha os dados para entrar!');
    }

    const validaLogin = () => {
        const inputs = document.querySelectorAll("input");
        let retorno: boolean[] = [];
        inputs.forEach((campo) => {
            retorno.push(verificaCampo(campo));
            campo.addEventListener("invalid", evento => evento.preventDefault());
            if (campo.name == 'salvarlogin') localStorage.setItem(campo.name, campo.checked ? "true" : 'false');
            else localStorage.setItem(campo.name, campo.value);
        });
        return retorno;
    }

    const verificaCampo = (campo: any) => {
        const msgErro = document.getElementById(`erro__${campo.name}`);
        campo.setCustomValidity('');
        const validadorDeInput = campo.checkValidity();
        if (!validadorDeInput || campo.value == '') {
            campo.style.border = "2px solid red";
            campo.style.marginBottom = '0rem';
            if (msgErro) msgErro.style.display = "flex";
            return false;
        }
        else {
            campo.style.border = "none";
            campo.style.marginBottom = '1rem';
            if (msgErro) msgErro.style.display = "none";
            return true;
        }
    }

    return (
        <>
            <BackGround>
                <div>
                    <Title>MARVEL</Title>
                    <LoginContainer id='login__container'>
                        <LoginBoasVindas>Bem-vindo(a) de volta!</LoginBoasVindas>
                        <LoginSpan>Acesse sua conta:</LoginSpan>
                        <LoginInput type='text' placeholder='Usuário' name='nome' minLength={3} maxLength={100} value={nome} onChange={(e) => { setNome(e.target.value) }}></LoginInput>
                        <LoginMsg id='erro__nome'>Usuário deve ter no mínimo 3 caracteres.</LoginMsg>
                        <LoginInput type='password' placeholder='Senha' name='senha' minLength={6} maxLength={20} value={senha} onChange={(e) => { setSenha(e.target.value) }}></LoginInput>
                        <LoginMsg id='erro__senha'>Senha deve ter no mínimo 6 caracteres.</LoginMsg>
                        <div>
                            <CheckBox type='checkbox' name='salvarlogin' checked={checked} onChange={(e) => { setChecked(e.target.checked) }}></CheckBox>
                            <Label>Salvar login</Label>
                            <LoginLinkForgetSenha href='#'>Esqueci a senha</LoginLinkForgetSenha>
                        </div>
                        <LoginButton onClick={() => entrar()}>Entrar</LoginButton>
                        <NotLoginSpan>Ainda não tem login? <LoginLinkCadastrar href='#'>Cadastre-se</LoginLinkCadastrar></NotLoginSpan>
                    </LoginContainer>
                </div>
                <ImageAnimated></ImageAnimated>
            </BackGround>
        </>
    )
}