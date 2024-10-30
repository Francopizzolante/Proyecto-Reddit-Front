import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import Posts from '../Componentes/Posts';

function PostsPage({ user, logout, userPosts }) {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Barra lateral */}
        <BarraLateral user={user} />

        {/* Contenido principal */}
        <div className="col-10 bg-black text-white">
          {/* Barra superior */}
          <BarraSuperior logout={logout} />

          {/* Lista de posts creados por el usuario */}
          <Posts userPosts={userPosts} userName={user.name}/>
        </div>
      </div>
    </div>
  );
}

export default PostsPage;
