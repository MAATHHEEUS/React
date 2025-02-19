
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import "./styles/reset.css";
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import ChatBot from './components/ChatBot.js';
import Client from './components/Client.js';
import Home from './components/Home.js';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/adm" element={<Main />} />
      <Route path="/user" element={<Client />} />
      <Route path='*' element={<Home />} />
    </Routes>
    <Footer />
    <ChatBot />
  </>
  );
}

export default App;