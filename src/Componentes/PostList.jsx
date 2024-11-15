import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import {getAllPosts, getPostsByUser, getPostsLikedByUser, getCommentsByPostId, addLikeToPost, removeLikeFromPost,} from '../utils/axiosClient';
import { useAuth0 } from '@auth0/auth0-react';

function PostList({ fetchType }) {
    const { user } = useAuth0();
    const [posts, setPosts] = useState([]); // Estado para los posts cargados
    const [commentsData, setCommentsData] = useState({}); // Combina visibilidad y contenido de comentarios
    const [error, setError] = useState(null);

    // Cargar posts según el tipo de consulta
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let fetchedPosts;
                switch (fetchType) {
                    case 'all':
                        fetchedPosts = await getAllPosts();
                        break;
                    case 'user':
                        fetchedPosts = await getPostsByUser(user.name);
                        break;
                    case 'liked':
                        fetchedPosts = await getPostsLikedByUser(user.name);
                        break;
                    default:
                        throw new Error('Tipo de consulta inválido');
                }
                setPosts(fetchedPosts);
            } catch (err) {
                console.error('Error al cargar los posts:', err);
                setError('No hay posts para mostrar.');
            }
        };
        fetchPosts();
    }, [fetchType, user.name]);

    // Maneja el evento de "like"
    const handleLike = async (postId) => {
        try {
            const postIndex = posts.findIndex((post) => post.id === postId);
            if (postIndex === -1) return;

            const post = posts[postIndex];
            const isLiked = post.likedBy?.includes(user.name);

            // Lógica de like/unlike
            let updatedPost;
            if (isLiked) {
                await removeLikeFromPost(postId, user.name);
                updatedPost = {
                    ...post,
                    likedBy: post.likedBy.filter((u) => u !== user.name),
                    likesCount: post.likesCount - 1,
                };
            } else {
                await addLikeToPost(postId, user.name);
                updatedPost = {
                    ...post,
                    likedBy: [...(post.likedBy || []), user.name],
                    likesCount: post.likesCount + 1,
                };
            }

            // Actualizar posts
            setPosts((prevPosts) => {
                const updatedPosts = [...prevPosts];
                updatedPosts[postIndex] = updatedPost;

                // Filtrar en LikesPage
                return fetchType === 'liked' && !updatedPost.likedBy.includes(user.name)
                    ? updatedPosts.filter((_, i) => i !== postIndex)
                    : updatedPosts;
            });
        } catch (error) {
            console.error('Error manejando el like:', error);
        }
    };

    // Alterna visibilidad y carga comentarios
    const toggleComments = async (postId) => {
        setCommentsData((prev) => ({
            ...prev,
            [postId]: {
                visible: !prev[postId]?.visible,
                comments: prev[postId]?.comments || null,
            },
        }));

        if (!commentsData[postId]?.comments) {
            try {
                const comments = await getCommentsByPostId(postId);
                setCommentsData((prev) => ({
                    ...prev,
                    [postId]: {
                        ...prev[postId],
                        comments,
                    },
                }));
            } catch (error) {
                console.error(`Error al cargar comentarios para el post ${postId}:`, error);
            }
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {posts.map((post) => (
                <div
                    key={post.id}
                    style={{
                        border: "1px solid white",
                        padding: "20px",
                        margin: "20px 0",
                        maxWidth: "600px",
                        width: "100%"
                    }}
                >
                    {/* Información del usuario y la fecha */}
                    <div className="d-flex justify-content-between mb-3">
                        <span>{post.user}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-center">{post.titulo}</h4>

                    {/* Imagen del post */}
                    <div
                        className="text-center mb-3"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <img
                            src={`http://localhost:3000${post.imagen}`}
                            alt="Post visual"
                            style={{
                                width: '300px',
                                height: '300px',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                    <p>{post.descripcion}</p>

                    {/* Likes y comentarios */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <span className="me-2">{post.likesCount}</span>
                            <FaHeart
                                onClick={() => handleLike(post.id)}
                                style={{
                                    color: post.likedBy?.includes(user.name) ? 'red' : 'gray',
                                    cursor: 'pointer',
                                }}
                                size={24}
                            />
                        </div>
                        <button className="btn btn-light" onClick={() => toggleComments(post.id)}>
                            {commentsData[post.id]?.visible ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
                        </button>
                    </div>

                    {/* Comentarios */}
                    {commentsData[post.id]?.visible && (
                        <div className="comments-section mt-3">
                            {commentsData[post.id]?.comments ? (
                                commentsData[post.id].comments.map((comment) => (
                                    <div key={comment.id} className="comment mt-2 p-2 border border-secondary">
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bold">{comment.user}</span>
                                            <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="mt-2">{comment.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No hay comentarios aún.</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostList;
