import React,{useState} from 'react'
import Relogio from './components/Relogio'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import './App.css'

export default function App() {

  const [ligado, setLigado] = useState(false)

  return(
    <>
      <Header/>
      <Relogio
        ligado={ligado}
        setLigado={setLigado}
      />
      <Body/>
      <Footer/>
    </>
  )
}