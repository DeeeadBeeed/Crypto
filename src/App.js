import React from 'react';
import Navbar from './components/Navbar'; 
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import Coin from './components/Coin';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>
    </div>
  );
};

export default App;
