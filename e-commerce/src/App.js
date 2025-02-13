import {Routes, Route, Link} from 'react-router-dom';
import "./App.css";
import "./styles/reset.css";
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import ChatBot from './components/ChatBot.js';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Footer/>
      <ChatBot />
    </div>
  );
}

export default App;
