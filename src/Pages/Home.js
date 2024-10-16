// src/pages/Home.js
import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import SeccionPosts from '../Componentes/SeccionPosts';
import './Home.css';

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
          <SeccionPosts user={user} />
        </div>
      </div>
    </div>
  );
}

export default Home;
