import Header from './components/Header';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import FirstPage from './components/FirstPage';
import Circle from './components/Circle';
import './App.css';
import Home from './components/Home';
import Post from './components/Post';
import Scrollbar from './components/Scrollbar';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home header={<Header />} />} />
        <Route path="/home/:id" element={<Post circle={<Circle />} header={<Header />} />} />
        <Route path="/circle" element={<Circle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
