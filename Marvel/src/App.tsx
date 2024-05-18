import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.tsx';
import Personagens from './pages/Personagens.tsx';
import Filmes from './pages/Filmes.tsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Personagens" element={<Personagens />} />
        <Route path="/Filmes" element={<Filmes />} />
      </Routes>
    </>
  )
}

export default App
