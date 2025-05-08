import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route,  } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />   
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export  {App};
