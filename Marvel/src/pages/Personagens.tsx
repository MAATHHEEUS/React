import { useEffect, useState } from 'react';
import { BackGround, Image } from '../components/BackGround';
import { NavBar, Logo, Link, Perfil, Foto } from '../components/NavBar';
import { Carrosel, Controle, Container, Galeria, Item } from '../components/Carrosel';
import { JSX } from 'react/jsx-runtime';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Seta from '../assets/imgs/Icon-awesome-arrow-right.png';
import Spider from '../assets/imgs/spider.png';
import Wanda from '../assets/imgs/wanda.png';
import Thanos from '../assets/imgs/thanos.png';
import Hulk from '../assets/imgs/hulk.png';

export default function App() {

    // HOOKS
    useEffect(
        () => {
            const linkAtual = document.getElementById('link__personagens');
            if (linkAtual) linkAtual.style.opacity = '100%';
        }
    )
    const [url, setUrl] = useState(window.location.href.toString().replace("Personagens", ""));
    const [currentItem, setCurrentItem] = useState(0);
    const [visible, setVisible] = useState(false);


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

    const toggleModal = () => {
        setVisible(!visible);
    };

    const montaItens = () => {
        const itens: JSX.Element[] = [];
        personagens.forEach((item) => {
            itens.push(<Item key={item.id} id={"Item"+item.id} className="item current-item">
                <Card key={item.id} id={"Card"+item.id} Imagem={item.imagem} Titulo={item.titulo} Descricao={item.descricao} onClick={toggleModal}></Card>
            </Item>);
        })
        return <>{itens}</>
    }

    // OBJETOS
    var personagens = [
        {
            "id" : 1, 
            "titulo" : "Homem-Aranha", 
            "descricao" : "Após ser mordido por uma aranha radioativa, Peter Parker se torna o amigo da vizinhança, o Homem-Aranha.", 
            "imagem" : Spider
        },
        {
            "id" : 2, 
            "titulo" : "Wanda Maximoff", 
            "descricao" : "Wanda Maximoff foi sequestrada da Sérvia e trazida para a Montanha Wundagore, base do Alto Evolucionário. Durante anos, ela e seu irmão gêmeo, Pietro, acreditavam que eram filhos de um casal de ciganos.", 
            "imagem" : Wanda
        },
        {
            "id" : 3, 
            "titulo" : "Thanos", 
            "descricao" : "A lua Titã era governada por Mentor (A'Lars), quando então reinava paz e tecnologia. Mentor tinha dois filhos: Eros e Thanos.  Ao contrário do irmão, Thanos, era bem mais poderoso e almejava ainda mais.", 
            "imagem" : Thanos
        },
        {
            "id" : 4, 
            "titulo" : "Hulk", 
            "descricao" : "Na história original dos quadrinhos, o Hulk é um selvagem e poderoso alter ego do Dr. Robert Bruce Banner, um cientista que foi atingido por raios gama enquanto salvava um adolescente durante o teste militar.", 
            "imagem" : Hulk
        }
    ];

    const modal = document.getElementById('modal');

    if (visible) {
        if(modal){
            modal.style.display = 'flex';
        } 
    } else {
        if(modal) modal.style.display = 'none';
    }

    return (
        <>
            <BackGround>
                <NavBar>
                    <Logo>Marvel</Logo>
                    <Link id='link__personagens' href='#'>Personagens</Link>
                    <Link href={`${url}Filmes`}>Filmes</Link>
                    <Link href={`${url}HQs`}>HQs</Link>
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
                <Modal Visible={visible} toggleModal={toggleModal} imagem={Wanda}/>
                <Image></Image>
            </BackGround>
        </>
    )
}