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
import './App.css';

function App() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  // Estado con todos los posts, incluyendo likes y autor
  const [userPosts] = useState(posts);

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
        <Route path="/crear-post" element={<CrearPostPage/>} />
        <Route path="/likes" element={<LikesPage likedPosts={likedPosts}/>} />
        <Route path="/posts" element={<PostsPage userPosts={postsByUser}/>} />
        <Route path="/comments" element={<CommentsPage/>} />
        <Route path="/" element={<Home allPosts={userPosts}/>} />
      </Routes>
    </Router>
  );
}

export default App;
