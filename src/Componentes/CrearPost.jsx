// src/Componentes/CrearPost.js
import React, { useState } from 'react';

function CrearPost() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState(''); // Cambiado a descripción
  const [imagen, setImagen] = useState(null); // Estado para la imagen
  const [imagenPreview, setImagenPreview] = useState(null); // Estado para la vista previa de la imagen

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imagen) {
      alert('Por favor, sube una imagen para el post.');
      return;
    }

    console.log('Post creado:', { titulo, descripcion, imagen });
    setTitulo('');
    setDescripcion('');
    setImagen(null);
    setImagenPreview(null); // Limpiar la vista previa después de crear el post
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setImagenPreview(URL.createObjectURL(file)); // Mostrar la vista previa
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
          <label htmlFor="imagen">Subir imagen</label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {imagenPreview && (
          <div className="mt-3">
            <h5>Vista previa de la imagen:</h5>
            <img src={imagenPreview} alt="Vista previa" style={{ maxHeight: '300px' }} />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="descripcion">Descripción del post</label>
          <textarea
            className="form-control"
            id="descripcion"
            rows="5"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
