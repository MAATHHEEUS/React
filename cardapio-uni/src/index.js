import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './paginas/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './paginas/Login';
import NotFound from './paginas/NotFound';
import Cadastro from './paginas/Cadastro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Cadastro' element={<Cadastro />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);