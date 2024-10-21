// src/pages/LikesPage.js
import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import Likes from '../Componentes/Likes';

function LikesPage({ user, logout, likedPosts }) {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Barra lateral */}
        <BarraLateral user={user} />

        {/* Contenido principal */}
        <div className="col-10 bg-black text-white">
          {/* Barra superior */}
          <BarraSuperior logout={logout} />

          {/* Lista de posts a los que se les ha dado like */}
          <Likes likedPosts={likedPosts} />
        </div>
      </div>
    </div>
  );
}

export default LikesPage;
