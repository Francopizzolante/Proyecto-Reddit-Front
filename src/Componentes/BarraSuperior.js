// src/Componentes/BarraSuperior.js
import React from 'react';

function BarraSuperior({ logout }) {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-light">
      <h5>Search:</h5>
      <input type="text" className="form-control w-50" />
      <button className="btn btn-danger" onClick={() => logout({ returnTo: window.location.origin })}>
        Logout
      </button>
    </div>
  );
}

export default BarraSuperior;
