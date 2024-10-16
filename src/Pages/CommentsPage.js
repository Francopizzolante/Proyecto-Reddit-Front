// src/pages/CommentsPage.js
import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import Comments from '../Componentes/Comments';

function CommentsPage({ user, logout, userComments }) {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Barra lateral */}
        <BarraLateral user={user} />

        {/* Contenido principal */}
        <div className="col-10 bg-black text-white">
          {/* Barra superior */}
          <BarraSuperior logout={logout} />

          {/* Lista de comentarios hechos por el usuario */}
          <Comments userComments={userComments} userName={user.name} />
        </div>
      </div>
    </div>
  );
}

export default CommentsPage;
