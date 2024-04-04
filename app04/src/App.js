import ListaCarros from "./componentes/ListaCarros";
import {Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <>
      <header>
        <Link to='/'>Home</Link>
        <Link to='/api'>Lista Carros da API</Link>
      </header>
      <main>
        <Routes>
          <Route path="/"/>
          <Route path="/api" element={<ListaCarros />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
