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
import Likes from './components/Likes';
import AddPost from './components/AddPost';
import Reply from './components/Reply';
import Bars from './components/Bars';
import YourTakes from './components/YourTakes';
import YourReplies from './components/YourReplies';

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
        <Route path="/likes" element={<Likes />} />
        <Route path="/Add" element={<AddPost />} />
        <Route path="/home/:id/replies/:reply" element={<Reply header={<Header />} />} />
        <Route path="/bars" element={<Bars />} />
        <Route path="/takes" element={<YourTakes />} />
        <Route path="myreplies" element={<YourReplies />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;