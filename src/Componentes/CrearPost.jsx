import React, { useState } from 'react';
import { createPost } from '../utils/axiosClient';
import { useAuth0 } from '@auth0/auth0-react';

function CrearPost() {
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        imagen: null,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            imagen: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.imagen) {
            alert('Por favor, sube una imagen para el post.');
            return;
        }

        const postFormData = new FormData();
        postFormData.append('titulo', formData.titulo);
        postFormData.append('descripcion', formData.descripcion);
        postFormData.append('user', user.name);
        postFormData.append('imagen', formData.imagen);

        try {
            await createPost(postFormData);
            alert('Post creado con éxito');

            // Reiniciar el formulario
            setFormData({
                titulo: '',
                descripcion: '',
                imagen: null,
            });
        } catch (error) {
            console.error('Error al crear el post:', error);
            alert('Ocurrió un error al crear el post.');
        }
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
                        value={formData.titulo}
                        onChange={handleInputChange}
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

                {formData.imagen && (
                    <div className="mt-3">
                        <h5>Vista previa de la imagen:</h5>
                        <img
                            src={URL.createObjectURL(formData.imagen)}
                            alt="Vista previa"
                            style={{ maxHeight: '300px' }}
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="descripcion">Descripción del post</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        rows="5"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Crear post</button>
            </form>
        </div>
    );
}

export default CrearPost;
