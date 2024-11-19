import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function BarraSuperior() {

  const { logout } = useAuth0();

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">

      {/* Barra de búsqueda centrada horizontalmente */}
      <div className="d-flex justify-content-center w-100">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            aria-label="Buscar"
          />

          {/* Botón de búsqueda */}
          <div className="input-group-append">
            <button className="btn btn-outline-light" type="button"> Buscar </button>
          </div>
        </div>
      </div>

      {/* Botón de Logout alineado a la derecha */}
      <button className="btn btn-danger ml-auto" onClick={() => logout({ returnTo: window.location.origin })}> Logout </button>
    </div>
  );
}

export default BarraSuperior
