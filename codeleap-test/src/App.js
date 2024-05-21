import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
