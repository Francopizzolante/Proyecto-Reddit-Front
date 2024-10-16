// src/pages/InicioPage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Inicio({ onLoginClick }) {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#000', color: '#0F0' }}>
      <div className="text-center">
        <img src="Logo.png" alt="Logo" className="mb-4" />
        <div className="mb-3">
          <button className="btn btn-success btn-lg btn-block" onClick={onLoginClick}>Ingresar</button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;