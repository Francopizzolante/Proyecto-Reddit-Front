import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Inicio from './Pages/Inicio';
import Home from './Pages/Home';
import CrearPostPage from './Pages/CrearPostPage';
import LikesPage from './Pages/LikesPage';
import PostsPage from './Pages/PostsPage';
import CommentsPage from './Pages/CommentsPage';
import './App.css';

function App() {
  const { loginWithRedirect, isAuthenticated} = useAuth0();

  // Si el usuario no está autenticado, muestra la página de inicio con opción de login
  if (!isAuthenticated) {
    return <Inicio onLoginClick={loginWithRedirect} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/crear-post" element={<CrearPostPage/>} />
        <Route path="/likes" element={<LikesPage/>} />
        <Route path="/posts" element={<PostsPage/>} />
        <Route path="/comments" element={<CommentsPage/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
