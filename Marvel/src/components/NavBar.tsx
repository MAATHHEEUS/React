import User from '../assets/imgs/profile-picture.png';
import styled from 'styled-components';

export const NavBar = styled.div`
    box-shadow: 0px 3px 3px 0px #FF000087;
    background: #000000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 7.1rem;
    width: 100%;
    position: fixed;
    top: 0rem;
`;

export const Logo = styled.div`
    font-family: MarvelRegular;
    font-size: 3.1rem;
    font-weight: 400;
    line-height: 3.7rem;
    text-align: left;
    background: #FF0000;
    color: #FFFFFF;
    width: fit-content;
    height: fit-content;
    padding: 0rem 1rem 0rem 1rem;
    margin-right: 18rem;
`;

export const Link = styled.a`
    font-family: Inter;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 2.25rem;
    text-align: left;
    opacity: 25%;
    color: #FFFFFF;
    text-decoration: none;
`;

export const Perfil = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

export const Foto = styled.div`
    background-image: url(${User});
    width: 3.4rem;
    height: 3.4rem;
`;