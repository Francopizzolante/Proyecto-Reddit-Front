import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import PostList from '../Componentes/PostList';
import posts from '../data/posts';

function LikesPage({ user, logout, userComments }) {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* Barra lateral */}
        <BarraLateral user={user} />

        {/* Contenido principal */}
        <div className="col-10 bg-black text-white">
          
          {/* Barra superior */}
          <BarraSuperior logout={logout} />

          {/* Título de la página centrado */}
          <div className="container mt-4 text-center">
            <h2>Posts likeados por {user.name}</h2>
          </div>

          {/* Lista de posts a los que se les ha dado like */}
          <PostList posts={posts} comments={userComments} filterType="liked" />
        </div>
      </div>
    </div>
  );
}

export default LikesPage;
