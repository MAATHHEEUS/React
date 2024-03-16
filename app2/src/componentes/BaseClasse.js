import React from 'react'

export default class BaseClasse extends React.Component{
    // Para usar props
    constructor(props){
        super(props)

        // States
        this.state={
            state1: 'valor 1',
            state2: 0,
            state3: true,
            state4: this.props.props1
        }

        // bindagem - inútil
        let ad = this.ativarDesativar.bind(this)

        // Outras instruções do construtor
    }

    // Manipular state
    ativarDesativar(){
        this.state(
            state=>({
                state3:!state.state3
            })
        )
    }

    componentDidMount(){
        console.log('Componente criado!')
    }

    componentDidUpdate(){
        console.log('Componente atualizado!')
    }

    componentWillUnmount(){
        console.log('Componente removido!')
    }

    render(){
        return(
            <>
                <h1>Compenente de Classe - Base</h1>
                
                {/* com bind */}
                <button onClick={this.ad}>{this.state.state3 ? 'Ativar' : 'Desativar'}</button>
                
                {/* Sem bind */}
                <button onClick={()=>this.ativarDesativar}>{this.state.state3 ? 'Ativar' : 'Desativar'}</button>
            </>
        )
    }
        
}