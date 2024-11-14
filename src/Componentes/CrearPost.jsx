import React, { useState } from 'react';
import { createPost } from '../utils/axiosClient'; // Importar la función desde axiosClient
import { useAuth0 } from '@auth0/auth0-react';

function CrearPost() {
    const { user } = useAuth0();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagen) {
            alert('Por favor, sube una imagen para el post.');
            return;
        }

        // Crear un objeto FormData para enviar los datos
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('user', user.name);
        formData.append('imagen', imagen); // Agregar la imagen

        try {
            // Llamar a la función `createPost` de axiosClient
            const nuevoPost = await createPost(formData);
            alert('Post creado con éxito');
            console.log('Nuevo Post:', nuevoPost);

            // Limpiar los campos del formulario
            setTitulo('');
            setDescripcion('');
            setImagen(null);
            setImagenPreview(null);
        } catch (error) {
            console.error('Error al crear el post:', error);
            alert('Ocurrió un error al crear el post.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
        setImagenPreview(URL.createObjectURL(file));
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

                <button type="submit" className="btn btn-primary mt-3"> Crear post </button>
            </form>
        </div>
    );
}

export default CrearPost;
