import React from 'react'
import FastBack from './imgs/FastBack.png'
import Polo from './imgs/Polo.png'
import Onix from './imgs/Onix.png'
import Fit from './imgs/Fit.png'

export default class Imagem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            carro:FastBack
        }
    }

    verImagem(carro){
        alert(document.getElementById('inputSelectCarro').value)
        if(carro == 'FastBack'){      
            this.setState({
                carro:FastBack
            })
        }else if(carro == 'Polo'){ 
            console.log(this.state.carro)     
            this.setState({
                carro:Polo
            })
        }else if(carro == 'Onix'){      
            this.setState({
                carro:Onix
            })
        }else if(carro == 'Fit'){      
            this.setState({
                carro:Fit
            })
        }

        var modal = document.getElementById("myModal");

        var captionText = document.getElementById("caption");
        captionText.innerHTML = this.props.carro;
        modal.style.display = "block";
        var span = document.getElementsByClassName("close")[0];

        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    render() {
        return(
            <div className='main__caixaImagem'>      
                <button className='main__caixaImagem__botao' onClick={()=>this.verImagem(this.props.carro)}>Ver carro</button>
                <div id="myModal" className="modal">
                    <span className="close">&times;</span>
                    <img id='img' src={this.state.carro} alt={this.props.carro} className='modal-content'/>
                    <div id="caption"></div>
                </div>
            </div>
        )
    }
}