import React, { useEffect, useState } from 'react';
import { getCommentsByUser } from '../utils/axiosClient';
import { useAuth0 } from '@auth0/auth0-react';
import posts from '../data/posts'; // Asegúrate de que tengas los posts disponibles para obtener el título del post

const Comments = () => {
    const { user } = useAuth0(); // Obtener datos del usuario logueado desde Auth0
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    // Función para obtener el título del post a partir del ID
    const getPostTitle = (postId) => {
        const post = posts.find((post) => post.id === postId); // Busca el post por ID
        return post ? post.title : 'Título no disponible'; // Devuelve el título o un mensaje de error
    };

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

    // Renderizado condicional en caso de errores o datos vacíos
    if (error) return <div>{error}</div>;
    if (!comments.length) return <div>No hay comentarios disponibles.</div>;

    return (
        <div className="container mt-5">
            {/* Mapea y renderiza cada comentario del usuario */}
            {comments.map((comment, index) => (
                <div key={index} className="comment mt-4 p-3 border border-light">
                    <div className="d-flex justify-content-between">
                        <span>{getPostTitle(comment.postId)}</span> {/* Título del post obtenido con postId */}
                        <span>{new Date(comment.created_at).toLocaleDateString()}</span> {/* Fecha formateada */}
                    </div>
                    <p className="mt-2">{comment.content}</p> {/* Contenido del comentario */}
                </div>
            ))}
        </div>
    );
};

export default Comments;
