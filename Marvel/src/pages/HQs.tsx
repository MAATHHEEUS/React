import { useEffect, useState } from 'react';
import { BackGround, Image } from '../components/BackGround';
import { NavBar, Logo, Link, Perfil, Foto } from '../components/NavBar';
import { Carrosel, Controle, Container, Galeria, Item } from '../components/Carrosel';
import { JSX } from 'react/jsx-runtime';
import Card from '../components/Card';
import Modal from '../components/ModalHQs';
import Seta from '../assets/imgs/Icon-awesome-arrow-right.png';
import Surfista from '../assets/imgs/surfista-hq.png';
import Wolverine from '../assets/imgs/wv-hq.png';
import Thor from '../assets/imgs/thor-hq.png';

export default function HQs() {

    // HOOKS
    useEffect(
        () => {
            const linkAtual = document.getElementById('link__HQs');
            if (linkAtual) linkAtual.style.opacity = '100%';
        }
    )
    const [url, setUrl] = useState(window.location.href.toString().replace("HQs", ""));
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
            "titulo": "Thor: Vikings",
            "descricao": "Garth Ennis e sua violência atacam novamente na HQ que leva a violência das histórias de Thor ao limite! Na minissérie de 2003 vemos vikings de um passado distante voltando a vida.",
            "imagem": Thor
        },
        {
            "id": 2,
            "titulo": "Surfista Prateado: Parábola",
            "descricao": "O único oponente do Devorador de Mundos é o herói que ele aprisionou na Terra: o Surfista Prateado, Galactus jurou não consumir o planeta, mas e se, em vez disso, ele transformar a civilização em seus adoradores?",
            "imagem": Surfista
        },
        {
            "id": 3,
            "titulo": "Wolverine: Origens",
            "descricao": "Origem é uma minissérie em quadrinhos publicada pela Marvel Comics em seis edições, entre 2001 e 2002. A história conta a revelação do passado do personagem Wolverine. ",
            "imagem": Wolverine
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
                    <Link id='link__filmes' href={`${url}Filmes`}>Filmes</Link>
                    <Link id='link__HQs' href='#'>HQs</Link>
                    <Perfil>
                        <Foto></Foto>
                        <Link href={`${url}`}>Sair</Link>
                    </Perfil>
                </NavBar>
                <Carrosel>
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