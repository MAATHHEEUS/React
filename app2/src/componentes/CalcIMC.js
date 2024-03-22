import React, { useState } from 'react'
import Menu from './Menu'
import './styles/CalcIMC.css'

// Função para criar a tabela
const tabela=(r) => {
    return(
        <table className='main__tabela'>
            <thead>
                <tr>
                    <th>Classificação</th><th>IMC</th>
                </tr>
            </thead>
            <tbody>
                <tr style={{backgroundColor: Number(r) > 0 && Number(r) < 18.5 ? "red" : ""}}>
                    <td>Abaixo do Peso</td><td>Abaixo de 18,5</td>
                </tr>
                <tr style={{backgroundColor: Number(r) >= 18.5 && Number(r) <= 24.9 ? "red" : ""}}>
                    <td>Peso Normal</td><td>Entre 18,5 e 24,9</td>
                </tr>
                <tr style={{backgroundColor: Number(r) > 24.9 && Number(r) <= 29.9 ? "red" : ""}}>
                    <td>Sobrepeso</td><td>Entre 25 e 29,9</td>
                </tr>
                <tr style={{backgroundColor: Number(r) > 29.9 && Number(r) <= 34.9 ? "red" : ""}}>
                    <td>Obesidade grau I</td><td>Entre 30 e 34,9</td>
                </tr>
                <tr style={{backgroundColor: Number(r) > 34.9 && Number(r) <= 39.9 ? "red" : ""}}>
                    <td>Obesidade grau II</td><td>Entre 35 e 39,9</td>
                </tr>
                <tr style={{backgroundColor: Number(r) >= 40 ? "red" : ""}}>
                    <td>Obesidade grau III ou Mórbida</td><td>Acima de 40</td>
                </tr>
            </tbody>
        </table>
    )
}

// Função para criar o componente de input peso
const inputPeso=(p, sp) => {
    return(
        <div>
            <label className='main__label'>Peso </label>
            <input id='input_peso' className='main__input' type="text" readOnly placeholder='digite seu peso em kg' value={p} onChange={(e)=>{sp(e.target.value)}}/>
        </div>
    )
}

// Função para criar o componente de input peso
const inputAltura=(a, sa) => {
    return(
        <div>
            <label className='main__label'>Altura </label>
            <input id='input_altura' className='main__input' type="text" readOnly placeholder='digite sua altura em metros' value={a} onChange={(e)=>{sa(e.target.value)}}/>
        </div>
    )
}

// Função para calcular o resultado e retorna o botão
const calcular=(sr) => {
    const calcularIMC=()=>{
        let peso = document.getElementById('input_peso').value
        let altura = document.getElementById('input_altura').value
        if(isNaN(peso) || peso == '')alert('Peso deve ser apenas números separados por ponto. Exemplo: 75.8')
        if(isNaN(altura) || altura == '')alert('Altura deve ser apenas números separados por ponto. Exemplo: 1.75')
        sr(peso/(altura * altura))
    }
    return(
        <button className='main__botaoCalcular' onClick={calcularIMC}>Calcular</button>
    )
}

// Função para montar o resultado
const mostraResultado=(r) => {
    return(
        <p>Resultado: {r.toFixed(2)}</p>
    )
}

// Função para criar um botão da calculadora
const botaoCalculadora=(conteudo) => {
    const print=(conteudo)=>{
        // Descobre qual input está destacado
        let inputDestacado = ''
        const inputs = document.getElementsByClassName("main__input");
        for (let i = 0; i < inputs.length; i++) {
            if(inputs[i].style.borderColor == "green") inputDestacado = inputs[i].id
        }
        if(inputDestacado != ''){
            // Troca a vírgula por ponto
            if(conteudo == ',')conteudo = '.'
            // Não permite digitar mais de um ponto
            if(!String(document.getElementById(inputDestacado).value).includes('.') || conteudo != '.'){
                document.getElementById(inputDestacado).value += conteudo
            }
        }
    }
    return(
        <button className='main__botaoCalculadora' onClick={()=>print(conteudo)}>{conteudo}</button>
    )
}

const botaoSelecionarInput=(input)=> {
    const mudarCor=(input)=>{
        const inputs = document.getElementsByClassName("main__input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.borderColor = "transparent"
        }
        document.getElementById('input_'+input).style.borderColor = 'green'
    }
    return(
        <button className='main__botaoCalculadora' onClick={()=>mudarCor(input)}>{input}</button>
    )
}

const botaoApagarInput=() => {
    const apagar=()=>{
        const inputs = document.getElementsByClassName("main__input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = ""
        }
    }
    return(
        <button className='main__botaoApagar' onClick={()=>apagar()}>apagar</button>
    )
}

export default function CalcIMC(){

    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')
    const [resultado, setResultado] = useState(0)

    return(
        <main className='main'>
            <h1 className='main__title'>Calculadora de IMC</h1>
            <Menu/>
            <div className='main__conteudo'>
                <div className='main__conteudo__calculadora'>
                    <div className='div_botoesCalculadora'>{botaoCalculadora(1)}{botaoCalculadora(2)}{botaoCalculadora(3)}</div>
                    <div className='div_botoesCalculadora'>{botaoCalculadora(4)}{botaoCalculadora(5)}{botaoCalculadora(6)}</div>
                    <div className='div_botoesCalculadora'>{botaoCalculadora(7)}{botaoCalculadora(8)}{botaoCalculadora(9)}</div>
                    <div>{botaoSelecionarInput('peso')}{botaoCalculadora(0)}{botaoSelecionarInput('altura')}</div>
                    <div>{botaoApagarInput()}{botaoCalculadora(',')}{calcular(setResultado)}</div>
                </div>
                <div className='main__conteudo__resultado'>  
                    {inputPeso(peso, setPeso)}
                    {inputAltura(altura, setAltura)}
                    {mostraResultado(resultado)}
                    {tabela(resultado)}
                </div>
            </div>
        </main>   
    )
}