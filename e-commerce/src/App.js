import {Routes, Route, Link} from 'react-router-dom';
import "./App.css";
import "./styles/reset.css";
import Header from './components/Header.js';
import Main from './components/Main.js';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      {/* <header>
        <Link to='/'>Home</Link>
        <Link to='/api'>Lista Carros da API</Link>
      </header>
      <main>
        <Routes>
          <Route path="/"/>
          <Route path="/api" element="" />
        </Routes>
      </main> */}
    </div>
  );
}

export default App;
