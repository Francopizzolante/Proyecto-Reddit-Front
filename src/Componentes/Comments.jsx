import React, { useEffect, useState } from 'react';
import { getCommentsByUser, getPostTitleById } from '../utils/axiosClient';
import { useAuth0 } from '@auth0/auth0-react';

const Comments = () => {
    const { user } = useAuth0();
    const [comments, setComments] = useState([]); // Comentarios con títulos combinados
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommentsWithTitles = async () => {
            try {
                const userComments = await getCommentsByUser(user.name);
                
                // Obtener títulos de los posts
                const commentsWithTitles = await Promise.all(
                    userComments.map(async (comment) => {
                        const title = await getPostTitleById(comment.postId);
                        return { ...comment, postTitle: title };
                    })
                );

                setComments(commentsWithTitles);
            } catch (err) {
                console.error(err);
                setError('No hay commentarios que mostrar.');
            } finally {
                setLoading(false);
            }
        };

        if (user?.name) {
            fetchCommentsWithTitles();
        }
    }, [user]);

    if (loading) return <div>Cargando comentarios...</div>;
    if (error) return <div>{error}</div>;
    if (!comments.length) return <div>No hay comentarios disponibles.</div>;

    return (
        <div className="container mt-5">
            {comments.map((comment, index) => (
                <div key={index} className="comment mt-4 p-3 border border-light">
                    <div className="d-flex justify-content-between">
                        <span>{comment.postTitle}</span> {/* Título del post */}
                        <span>{new Date(comment.created_at).toLocaleDateString()}</span> {/* Fecha formateada */}
                    </div>
                    <p className="mt-2">{comment.content}</p> {/* Contenido del comentario */}
                </div>
            ))}
        </div>
    );
};

export default Comments;
