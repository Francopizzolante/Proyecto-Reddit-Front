import React from 'react';
import BarraLateral from '../Componentes/BarraLateral';
import BarraSuperior from '../Componentes/BarraSuperior';
import { useAuth0 } from '@auth0/auth0-react';

function PageLayout({ title, children }) {
  const { user, logout } = useAuth0();

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Barra lateral */}
        <BarraLateral user={user} />

        {/* Contenido principal */}
        <div className="col-10 bg-black text-white">
          {/* Barra superior */}
          <BarraSuperior logout={logout} />

          {/* Título de la página */}
          <div className="container mt-4 text-center">
            <h2>{title.replace('{user}', user.name)}</h2>
          </div>

          {/* Contenido dinámico */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default PageLayout;
