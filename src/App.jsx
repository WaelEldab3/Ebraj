import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Agreement from './pages/Agreement';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import PublicLaw from './pages/PublicLaw';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Agreement />} />
          <Route path="/home" element={<Home />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/login" element={<Login />} />
          <Route path="/public-law" element={<PublicLaw />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
