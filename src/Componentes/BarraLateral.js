// src/Componentes/BarraLateral.js
import React from 'react';
import { Link } from 'react-router-dom';

function BarraLateral({ user }) {
  return (
    <div className="col-2 bg-dark text-white d-flex flex-column align-items-center justify-content-start pt-5">
      <img
        src={user.picture} // Imagen del perfil del usuario
        alt={user.name}
        className="rounded-circle mb-3"
        style={{ width: '100px', height: '100px' }} // Estilo de la imagen (circular y centrada)
      />
      <h5>{user.name}</h5>
      <nav className="nav flex-column mt-3">
        <hr></hr>
        <Link className="nav-link text-white" to="/">Home</Link>
        <hr></hr>
        <Link className="nav-link text-white" to="/crear-post">Crear post</Link>
        <hr></hr>
        <Link className="nav-link text-white" to="/likes">Likes</Link>
        <hr></hr>
        <Link className="nav-link text-white" to="/posts">Posts</Link>
        <hr></hr>
        <Link className="nav-link text-white" to="/comments">Comments</Link>
        <hr></hr>
      </nav>
    </div>
  );
}

export default BarraLateral;
