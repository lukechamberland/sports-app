import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import FirstPage from './components/FirstPage';
import Circle from './components/Circle';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<div>home page</div>}/>
        <Route path="/circle" element={<Circle />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
