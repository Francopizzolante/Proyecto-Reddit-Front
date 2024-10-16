// src/Componentes/SeccionPosts.js
import React from 'react';

function SeccionPosts({}) {
  return (
    <div className="post mt-5">
      <div className="d-flex justify-content-between mb-3">
        <span>usuario</span> {/* Nombre del usuario */}
        <span>Fecha</span> {/*agregar la fecha real del post */}
      </div>
      <h4 className="text-center">Título del post</h4>
      <div className="image-container bg-white text-center mb-3" style={{ height: '300px' }}>
        <span>Imagen</span>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-light">Likes</button>
        <button className="btn btn-light">Comments</button>
      </div>
    </div>
  );
}

export default SeccionPosts;
