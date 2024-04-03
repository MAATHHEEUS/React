import React from 'react'
import axios from 'axios'

export default class ListaCarros extends React.Component{
    
    state = {
        carros: []
    }

    componentDidMount(){
        // Modelo com uso de axios - necessário instalar 'npm install axios'
        axios.get('https://c1476dc6-a718-411e-ba3d-6510807da63d-00-3ombfqbz0s9v7.riker.replit.dev/')
            .then(res=>{
                const dados = res.data;
                this.setState({carros: dados});
            });

        // Modelo com uso de Fetch 
        // fetch('https://c1476dc6-a718-411e-ba3d-6510807da63d-00-3ombfqbz0s9v7.riker.replit.dev/')
        //     .then(res=>res.json())
        //     .then((resultado)=>{
        //         this.setState({carros: resultado});
        //     });
    }
    
    render(){
        return(
            <div>
                {this.state.carros.map(
                    carro=> <div key={carro.id}>{carro.modelo} - {carro.marca}</div>
                )}
            </div>
        );
    }
}