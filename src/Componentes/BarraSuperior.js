// src/Componentes/BarraSuperior.js
import React from 'react';

function BarraSuperior({ logout }) {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
      <div className="d-flex justify-content-center w-100">
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            aria-label="Buscar"
            aria-describedby="button-buscar"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-light" type="button" id="button-buscar">
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="ml-auto">
        <button className="btn btn-danger" onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default BarraSuperior
