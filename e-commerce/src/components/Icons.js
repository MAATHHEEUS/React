import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sair from "../imgs/icone-sair.png";
import Casa from "../imgs/icone-casa.png";

export default function Icons(props){
    const navigate = useNavigate();

    const sair = () => {
        localStorage.removeItem('cliente');
        navigate('/');
        props.setIsClient(false);
    }

    return(
        <div style={{position: 'absolute', right: 50}}>
            <img src={Casa} onClick={() => navigate('/user')} style={props.isClient ? {display: 'flex', marginBottom: '20px', cursor: 'pointer'} : {display: 'none'}} alt='Icone de Home' title='Perfil'/>
            <img onClick={() => sair()} src={Sair} style={props.isClient ? {display: 'flex', cursor: 'pointer'} : {display: 'none'}} alt='Icone de Sair' title='Sair'/>
        </div>
    )
}