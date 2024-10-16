// src/Componentes/CrearPost.js
import React, { useState } from 'react';

function CrearPost() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías manejar la lógica para guardar el post (por ejemplo, enviarlo a un backend)
    console.log('Post creado:', { titulo, contenido });
    // Resetea el formulario después de enviar
    setTitulo('');
    setContenido('');
  };

  return (
    <div className="container mt-5">
      <h2>Crear un nuevo post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título del post</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido del post</label>
          <textarea
            className="form-control"
            id="contenido"
            rows="5"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Crear post
        </button>
      </form>
    </div>
  );
}

export default CrearPost;
