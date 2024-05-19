import styled from "styled-components";

export const Carrosel = styled.div`
    position: fixed;
    padding: 6rem 0rem 5.25rem 8rem;
    max-width: 80%;
    height: 80%;
    margin: 0 auto;
    top: 7.1rem;
    opacity: 90%;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(21,22,22,1) 52%);
`;

export const Controle = styled.button`
    position: absolute;
    top: 0;
    right: -3.1rem;
    left: auto;
    text-align: right;
    background: transparent;
    bottom: 6.25rem;
    font-size: 1.25rem;
    line-height: 15.6rem;
    width: 2.5rem;
    color: #fff;
    transition: all 600ms ease-in-out;
    cursor: pointer;
    border: none;
`;

export const Container = styled.div`
    overflow-x: auto;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
`;

export const Galeria = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 5rem;
`;

export const Item = styled.div`
    color: #FFFFFF;
    flex-shrink: 0;
    transition: all 600ms ease-in-out;
    opacity: 0.7;
`;