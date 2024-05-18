import styled from "styled-components";

export const Carrosel = styled.div`
    border: 1px solid red; 
    position: fixed;
    padding: 6rem 0rem 5.25rem 8rem;
    max-width: 100%;
    height: 80%;
    margin: 0 auto;
    top: 7.1rem;
    opacity: 80%;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(21,22,22,1) 52%);
`;

export const Controle = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    left: auto;
    text-align: right;
    background: linear-gradient(to right, transparent 0%, black 200%);
    bottom: 0;
    font-size: 20px;
    line-height: 250px;
    width: 40px;
    color: #fff;
    transition: all 600ms ease-in-out;
    opacity: 0.1;
    cursor: pointer;
    border: none;

    :hover {
        opacity: 1;
    }
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
    gap: 15px;
`;

export const Item = styled.div`
    color: #FFFFFF;
    // width: 250px;
    // height: 250px;
    flex-shrink: 0;
    transition: all 600ms ease-in-out;
    // opacity: 0.5;

    .current-item {
        opacity: 1;
    }
`;