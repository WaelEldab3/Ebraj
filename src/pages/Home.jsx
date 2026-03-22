import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 w-full">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-3xl text-blue-500 font-bold">Welcome to the Home Page</h1>
      </div>
    </div>
  );
};

export default Home;
