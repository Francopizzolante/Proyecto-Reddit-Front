import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import Comments from '../Componentes/Comments';
import posts from '../data/posts';

function CommentsPage({ user, logout, userComments }) {

  // Filtrar comentarios para mostrar solo los del usuario logueado
  const userSpecificComments = userComments.filter(comment => comment.user === user.name);

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
            <h2>Comentarios hechos por {user.name}</h2>
          </div>

          {/* Lista de comentarios hechos por el usuario */}
          <Comments userComments={userSpecificComments} userPosts={posts} />
        </div>
      </div>
    </div>
  );
}

export default CommentsPage;
