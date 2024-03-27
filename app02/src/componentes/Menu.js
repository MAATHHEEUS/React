import React from 'react'

export default class Menu extends React.Component{
    // Para usar props
    constructor(props){
        super(props)

        // States
        this.state={
            pagina: 0
        }

        // Outras instruções do construtor
    }

    // Manipular state
    trocarPagina(p){
        if(p == 1) window.open("http://localhost:3000?1", "_self")
        else if(p == 2) window.open("http://localhost:3000?2", "_self")
        else window.open("http://localhost:3000", "_self")
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
            <nav className='main__menu'>
                <a onClick={()=>this.trocarPagina(0)} className="main__menu__link">Home</a>
                <a onClick={()=>this.trocarPagina(1)} className="main__menu__link">IMC</a>
            </nav>
        )
    }
        
}