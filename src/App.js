// src/App.js
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
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  // Estado para almacenar los posts creados por el usuario
  const [userPosts, setUserPosts] = useState([]);

  if (!isAuthenticated) {
    return <Inicio onLoginClick={loginWithRedirect} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/crear-post" element={<CrearPostPage user={user} logout={logout} />} />
        <Route path="/likes" element={<LikesPage user={user} logout={logout} likedPosts={[]} />} />
        <Route path="/posts" element={<PostsPage user={user} logout={logout} userPosts={[]} />} />
        <Route path="/comments" element={<CommentsPage user={user} logout={logout} userComments={[]} />} />
        <Route path="/" element={<Home user={user} logout={logout} />} />
      </Routes>
    </Router>
  );
}

export default App;

