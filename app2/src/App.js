import React,{useState, useEffect} from 'react' 
import Home from './componentes/Home'
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
    if(pagina == 1) return <><h1>Pagina {pagina}</h1></>
    else if(pagina == 2) return <><h1>Pagina {pagina}</h1></>
    else return <Home/>
  }

  return (
    <>
      {retornaPagina()}
    </>
  );
}