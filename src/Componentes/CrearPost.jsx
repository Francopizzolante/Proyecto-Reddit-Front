import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios
import { useAuth0 } from '@auth0/auth0-react';

function CrearPost() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  const { logout, user } = useAuth0();
  // Maneja el envío del formulario para crear un nuevo post
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación: Verifica si se ha subido una imagen
    if (!imagen) {
      alert('Por favor, sube una imagen para el post.');
      return;
    }
    console.log(user)

    // Crea un objeto para enviar los datos y la imagen al backend
    const data = {
      user: user.name,
      titulo: titulo,
      descripcion: descripcion
    }

    try {
      // Envía los datos al backend
      const response = await axios.post('http://localhost:3000/api/posts', data, {
        header:{
          'Content-Type':'application/json'
        }
      })

      alert('Post creado con éxito');
      console.log(response.data);

      // Reinicia los campos del formulario y la vista previa
      setTitulo('');
      setDescripcion('');
      setImagen(null);
      setImagenPreview(null);
    } catch (error) {
      console.error('Error creando el post:', error);
      alert('Ocurrió un error al crear el post. Inténtalo nuevamente.');
    }
  };

  // Maneja el cambio de la imagen y genera la vista previa
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setImagenPreview(URL.createObjectURL(file));
  };

  return (
    <div className="container mt-5">
      <h2>Crear un nuevo post</h2>
      <form onSubmit={handleSubmit}>

        {/* Campo para el título del post */}
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

        {/* Campo para la subida de imagen */}
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

        {/* Vista previa de la imagen seleccionada */}
        {imagenPreview && (
          <div className="mt-3">
            <h5>Vista previa de la imagen:</h5>
            <img src={imagenPreview} alt="Vista previa" style={{ maxHeight: '300px' }} />
          </div>
        )}

        {/* Campo para la descripción del post */}
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

        {/* Botón para enviar el formulario y crear el post */}
        <button type="submit" className="btn btn-primary mt-3"> Crear post </button>
      </form>
    </div>
  );
}

export default CrearPost;
