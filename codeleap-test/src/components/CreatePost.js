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
    margin: 1rem 2.3rem;
    width: 80%;
    box-sizing: border-box;

    @media only screen and (min-width: 768px){
        width: 90%;
    }
`;

const Texto = styled.p`
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.6rem;
    margin-bottom: 2.1rem;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 0.4rem;
    width: 100%;
    box-sizing: border-box;
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.12rem;
`;

const Input = styled.input`
    box-sizing: border-box;
    color: #CCCCCC;
    border: 1px solid #777777;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1rem;
    margin-bottom: 1.3rem;
    border-radius: 4px;
    padding: 0.37rem;
    width: 100%;
`;

const TextArea = styled.textarea`
    box-sizing: border-box;
    color: #CCCCCC;
    border: 1px solid #777777;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1rem;
    margin-bottom: 1.3rem;
    border-radius: 4px;
    padding: 0.37rem;
    width: 100%;
    resize: none;
`;

const Create = styled.a`
    background-color: #CCCCCC;
    color: #FFFFFF;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.6rem;
    text-transform: uppercase;
    align-self: center;
    border: none;
    padding: 0.4rem 1.8rem;
    text-decoration: none;
    margin-top: 1rem;

    @media only screen and (min-width: 468px){
        align-self: flex-end;
    }
`;

export default function CreatePost() {

    // HOOKS
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(
        () => {
            const botao = document.getElementById('botao__criar');
            if (botao) {
                if ((title.trim() != '' && title.trim().length >= 3) && (content.trim() != '' && content.trim().length >= 3)) {
                    botao.style.backgroundColor = '#000000';
                    botao.style.pointerEvents = '';
                    botao.setAttribute('tabIndex', 'default');
                } else {
                    botao.style.backgroundColor = '#CCCCCC';
                    botao.style.pointerEvents = 'none';
                    botao.setAttribute('tabIndex', '-1');
                }
            }
        }
    )

    // FUNCOES
    const CreatePost = async (e, user) => {
        e.preventDefault();

        try {
            await salvaDados(user, title, content);
            alert('Post criado com sucesso.');
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }

    async function salvaDados(usuario, titulo, conteudo) {
        const conexao = await fetch("http://localhost:4000/produtos", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: usuario,
                title: titulo,
                content: conteudo
            })
        });
        if (!conexao.ok) throw new Error("Não foi possível salvar seu post.");
    }

    return (
        <Container>
            <Texto>What’s on your mind?</Texto>
            <InputGroup>
                <Label>Title</Label>
                <Input type="text" placeholder="Hello world" name='title' minLength={3} maxLength={100} value={title} onChange={(e) => { setTitle(e.target.value) }}></Input>
            </InputGroup>
            <InputGroup>
                <Label>Content</Label>
                <TextArea placeholder="Content here" rows={4} name='content' minLength={3} maxLength={255} value={content} onChange={(e) => { setContent(e.target.value) }}></TextArea>
            </InputGroup>
            <Create id="botao__criar" href={''} onClick={(e) => CreatePost(e)} tabIndex={-1}>Create</Create>
        </Container>
    );
}