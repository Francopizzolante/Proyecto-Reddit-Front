import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Inicio from './Pages/Inicio';
import Home from './Pages/Home';
import CrearPostPage from './Pages/CrearPostPage';
import LikesPage from './Pages/LikesPage';
import PostsPage from './Pages/PostsPage';
import CommentsPage from './Pages/CommentsPage';
import posts from './data/posts';
import comments from './data/comments';
import './App.css';

function App() {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  // Estado con todos los posts, incluyendo likes y autor
  const [userPosts] = useState(posts);
  const [userComments] = useState(comments);

  // Si el usuario no está autenticado, muestra la página de inicio con opción de login
  if (!isAuthenticated) {
    return <Inicio onLoginClick={loginWithRedirect} />;
  }

  // Filtrar posts por tipo para cada página
  const likedPosts = userPosts.filter(post => post.isLiked);
  const postsByUser = userPosts.filter(post => post.authorId === user.name);

  return (
    <Router>
      <Routes>
        <Route path="/crear-post" element={<CrearPostPage user={user} logout={logout} />} />
        <Route path="/likes" element={<LikesPage user={user} logout={logout} likedPosts={likedPosts} userComments={userComments} />} />
        <Route path="/posts" element={<PostsPage user={user} logout={logout} userPosts={postsByUser} userComments={userComments} />} />
        <Route path="/comments" element={<CommentsPage user={user} logout={logout} userComments={userComments} />} />
        <Route path="/" element={<Home user={user} logout={logout} allPosts={userPosts} userComments={userComments} />} />
      </Routes>
    </Router>
  );
}

export default App;
