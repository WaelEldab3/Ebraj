import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Agreement from './pages/Agreement';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Agreement />} />
        <Route path="/home" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
