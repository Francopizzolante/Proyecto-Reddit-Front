// src/Componentes/SeccionPosts.js
import React from 'react';

function SeccionPosts({}) {
  return (
    <div className="mt-5" style={{border: "1px solid white", padding: "20px", margin: "20px 0"}}>
      <div className="d-flex justify-content-between mb-3">
        <span>usuario</span> 
        <span>Fecha</span> 
      </div>
      <h4 className="text-center">Título del post</h4>
      <div className="bg-white text-center mb-3" style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', backgroundColor: '#ccc',}}>
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
