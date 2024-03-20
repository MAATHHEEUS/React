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
            <input className='main__input' type="text" placeholder='digite seu peso em kg' value={p} onChange={(e)=>{sp(e.target.value)}}/>
        </div>
    )
}

// Função para criar o componente de input peso
const inputAltura=(a, sa) => {
    return(
        <div>
            <label className='main__label__calcIMC'>Altura </label>
            <input className='main__input' type="text" placeholder='digite sua altura em metros' value={a} onChange={(e)=>{sa(e.target.value)}}/>
        </div>
    )
}

// Função para calcular o resultado e retorna o botão
const calcular=(p, a, sr) => {
    const calcularIMC=()=>{
        if(isNaN(p))alert('Peso deve ser apenas números separados por ponto(.). Ex.:75.8')
        if(isNaN(a))alert('Altura deve ser apenas números separados por ponto(.). Ex.:1.75')
        sr(p/(a * a))
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

export default function CalcIMC(){

    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')
    const [resultado, setResultado] = useState(0)

    return(
        <main className='main'>
            <h1 className='main__title'>Calculadora de IMC</h1>
            <Menu/>
            {inputPeso(peso, setPeso)}
            {inputAltura(altura, setAltura)}
            {calcular(peso, altura, setResultado)}
            {mostraResultado(resultado)}
            {tabela(resultado)}
        </main>   
    )
}