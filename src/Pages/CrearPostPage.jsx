import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import CrearPost from '../Componentes/CrearPost';

function CrearPostPage({ user, logout }) {
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Barra lateral */}
        <BarraLateral user={user} />

        {/* Contenido principal */}
        <div className="col-10 bg-black text-white">
          {/* Barra superior */}
          <BarraSuperior logout={logout} />

          {/* Formulario de creación de post */}
          <CrearPost />
        </div>
      </div>
    </div>
  );
}

export default CrearPostPage;
