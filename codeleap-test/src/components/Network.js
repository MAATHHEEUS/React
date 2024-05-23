import { useState, useEffect } from "react";
import styled from 'styled-components';
import CreatePost from './CreatePost';
import Post from './Post';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    background-color: #FFFFFF;
    color: #FFFFFF;
    font-family: Roboto;
    width: 70%;
    min-height: 100vh;

    @media only screen and (min-width: 768px){
        width: 50%;
    }
`;

const Title = styled.h1`
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.6rem;
    margin-bottom: 1.8rem;
    background-color: #000000;
    padding: 1.7rem 2.3rem;
    box-sizing: border-box;
    height: 5rem;
    width: 100%;
    // white-space: nowrap;
`;

export default function Network() {

    // HOOKS
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            try {
                const conexao = await fetch("http://127.0.0.1:8000/posts/");
                if (!conexao.ok) throw new Error("Não foi possível acessar API com os posts.");
                else {
                    const conexaoConvertida = conexao.json();
                    conexaoConvertida.then(res => {
                        setPosts(res);
                        console.log(res);
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPosts();
    }, []);

    return(
        <Container>
            <Title>CodeLeap Network</Title>
            <CreatePost></CreatePost>
            <Post></Post>
            <Post></Post>
            <ModalEdit></ModalEdit>
            <ModalDelete></ModalDelete>
        </Container>
    );   
}
