import { useEffect, useState } from 'react';
import { BackGround, Image } from '../components/BackGround';
import { NavBar, Logo, Link, Perfil, Foto } from '../components/NavBar';
import { Carrosel, Controle, Container, Galeria, Item } from '../components/Carrosel';
import { JSX } from 'react/jsx-runtime';
import Card from '../components/Card';
import Filtro from '../components/Filtro';
import Modal from '../components/ModalFilme';
import Seta from '../assets/imgs/Icon-awesome-arrow-right.png';
import Ferro from '../assets/imgs/iron-man.png';
import Ferro2 from '../assets/imgs/iron-man2.png';
import Thor from '../assets/imgs/thor.png';
import Capitao from '../assets/imgs/capitan.png';
import Marvel from '../assets/imgs/marvel.png';

export default function Filmes() {

    // HOOKS
    useEffect(
        () => {
            const linkAtual = document.getElementById('link__filmes');
            if (linkAtual) linkAtual.style.opacity = '100%';
        }
    )
    const [url, setUrl] = useState(window.location.href.toString().replace("Filmes", ""));
    const [currentItem, setCurrentItem] = useState(0);
    const [visible, setVisible] = useState(false);
    const [personagem, setPersonagem] = useState("");


    // FUNCOES
    const ScroolCarrosel = (e: any) => {
        const items = document.querySelectorAll(".item");
        const maxItems = items.length;
        let isLeft = '';
        if (e.target) {
            isLeft = e.target.classList.contains("arrow-left");
        }

        if (isLeft) {
            setCurrentItem(currentItem - 1);
        } else {
            setCurrentItem(currentItem + 1);
        }

        if (currentItem >= maxItems) {
            setCurrentItem(0);
        }

        if (currentItem < 0) {
            setCurrentItem(maxItems - 1);
        }

        items.forEach((item) => item.classList.remove("current-item"));
        items.forEach((item) => item.style.opacity = '0.6');

        if (currentItem < maxItems) {
            items[currentItem].scrollIntoView({
                behavior: "smooth",
                inline: "center"
            });

            items[currentItem].classList.add("current-item");
            items[currentItem].style.opacity = '1';
        }
    }

    const toggleModal = (e: any) => {
        setPersonagem(e.target.id.toString());
        setVisible(!visible);
    };

    const montaItens = () => {
        const itens: JSX.Element[] = [];
        personagens.forEach((item) => {
            itens.push(<Item key={item.id} id={"Item" + item.id} className="item current-item">
                <Card key={item.id} id={"Card" + item.id} Imagem={item.imagem} Titulo={item.titulo} Descricao={item.descricao} onClick={toggleModal}></Card>
            </Item>);
        })
        return <>{itens}</>
    }

    // OBJETOS
    var personagens = [
        {
            "id": 1,
            "titulo": "Capitão América",
            "descricao": "Em Capitão América: O Primeiro Vingador, conhecemos a história de Steve Rogers (Chris Evans) e como ele se tornou o melhor soldado do mundo.",
            "imagem": Capitao
        },
        {
            "id": 2,
            "titulo": "Capitã Marvel",
            "descricao": "Capitã Marvel, parte do exército de elite dos Kree, uma raça alienígena, encontra-se no meio de uma batalha entre seu povo e os Skrulls. ",
            "imagem": Marvel
        },
        {
            "id": 3,
            "titulo": "Homem de Ferro",
            "descricao": "Tony Stark (Robert Downey Jr.) é um industrial bilionário, que também é um brilhante inventor, ao ser sequestrado, ele é obrigado a construir uma arma devastadora, mas ao invés disso, cria uma armadura capaz de mudar a história.",
            "imagem": Ferro
        },
        {
            "id": 4,
            "titulo": "Homem de Ferro 2",
            "descricao": "O mundo já sabe que o inventor bilionário Tony Stark (Robert Downey Jr.) é o super-herói blindado Homem de Ferro. Sofrendo pressão do governo, da mídia e do público para compartilhar sua tecnologia com as forças armadas",
            "imagem": Ferro2
        },
        {
            "id": 5,
            "titulo": "Thor",
            "descricao": "Quando é banido do reino de Asgard e exilado na Terra, o arrogante guerreiro Thor (Chris Hemsworth) é obrigado a lutar para reaver seus poderes perdidos. ",
            "imagem": Thor
        }
    ];

    const modal = document.getElementById('modal');

    if (visible) {
        if (modal) {
            modal.style.display = 'flex';
        }
    } else {
        if (modal) modal.style.display = 'none';
    }

    return (
        <>
            <BackGround>
                <NavBar>
                    <Logo>Marvel</Logo>
                    <Link id='link__personagens' href={`${url}Personagens`}>Personagens</Link>
                    <Link id='link__filmes' href='#'>Filmes</Link>
                    <Link id='link__HQs' href={`${url}HQs`}>HQs</Link>
                    <Perfil>
                        <Foto></Foto>
                        <Link href={`${url}`}>Sair</Link>
                    </Perfil>
                </NavBar>
                <Carrosel>
                    <Filtro></Filtro>
                    <Controle aria-label='Próxima imagem' onClick={(e) => ScroolCarrosel(e)}>
                        <img src={Seta} alt='Seta para direita' />
                    </Controle>
                    <Container>
                        <Galeria>
                            {montaItens()}
                        </Galeria>
                    </Container>
                </Carrosel>
                <Modal Visible={visible} toggleModal={toggleModal} Personagem={personagem} />
                <Image></Image>
            </BackGround>
        </>
    )
}