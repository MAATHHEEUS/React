import React,{useState, useEffect} from 'react' 
import Home from './componentes/Home'
import CalcIMC from './componentes/CalcIMC'
import './App.css'

export default function App() {

  const [pagina, setPagina] = useState(0)

  useEffect(
    ()=>{
        const res = window.location.href.split("?")
        setPagina(res[1])
    }
  )

  const retornaPagina=()=>{
    if(pagina == 1) return <CalcIMC/>
    else return <Home/>
  }

  return (
    <>
      {retornaPagina()}
    </>
  );
}