import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import CrearPost from '../Componentes/CrearPost';
import { useAuth0 } from '@auth0/auth0-react';

function CrearPostPage() {

  const { logout, user } = useAuth0();

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
          <CrearPost  />
        </div>
      </div>
    </div>
  );
}

export default CrearPostPage;
