import React, { useEffect, useState } from 'react';
import { getCommentsByUser, getPostTitleById } from '../utils/axiosClient';
import { useAuth0 } from '@auth0/auth0-react';

const Comments = () => {
    const { user } = useAuth0(); // Obtener datos del usuario logueado desde Auth0
    const [comments, setComments] = useState([]);
    const [titles, setTitles] = useState({}); // Estado para guardar los títulos por postId
    const [error, setError] = useState(null);

    // Llamada al backend para obtener los comentarios del usuario
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const userComments = await getCommentsByUser(user.name); // Cambia 'user.name' si el backend espera otro campo
                setComments(userComments);
            } catch (err) {
                console.error(err);
                setError('Error al cargar los comentarios');
            }
        };

        if (user?.name) {
            fetchComments();
        }
    }, [user]);

    // Función para obtener el título de un post desde el backend y almacenarlo en el estado
    const fetchPostTitle = async (postId) => {
        if (!titles[postId]) {
            const title = await getPostTitleById(postId);
            setTitles((prevTitles) => ({ ...prevTitles, [postId]: title }));
        }
    };

    // Renderizado condicional en caso de errores o datos vacíos
    if (error) return <div>{error}</div>;
    if (!comments.length) return <div>No hay comentarios disponibles.</div>;

    return (
        <div className="container mt-5">
            {/* Mapea y renderiza cada comentario del usuario */}
            {comments.map((comment, index) => {
                // Asegura que el título del post sea obtenido
                fetchPostTitle(comment.postId);

                return (
                    <div key={index} className="comment mt-4 p-3 border border-light">
                        <div className="d-flex justify-content-between">
                            <span>{titles[comment.postId] || 'Cargando título...'}</span> {/* Título dinámico */}
                            <span>{new Date(comment.created_at).toLocaleDateString()}</span> {/* Fecha formateada */}
                        </div>
                        <p className="mt-2">{comment.content}</p> {/* Contenido del comentario */}
                    </div>
                );
            })}
        </div>
    );
};

export default Comments;
