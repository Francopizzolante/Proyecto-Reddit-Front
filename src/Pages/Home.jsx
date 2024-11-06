import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import PostList from '../Componentes/PostList';
import posts from '../data/posts';

function Home({ user, logout }) {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Barra lateral */}
        <BarraLateral user={user} />
        
        {/* Contenido principal */}
        <div className="col-10 bg-black text-white">
          {/* Barra superior */}
          <BarraSuperior logout={logout} />
          
          {/* Sección de posts */}
          <PostList posts={posts} filterType="all" />
        </div>
      </div>
    </div>
  )
}

export default Home;
