import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { getAllPosts, getPostsByUser, getPostsLikedByUser, getCommentsByPostId } from '../utils/axiosClient';
import { useAuth0 } from '@auth0/auth0-react';

function PostList({ fetchType }) {

    const { user } = useAuth0(); // Obtiene el usuario desde Auth0
    const [posts, setPosts] = useState([]); // Estado para los posts cargados desde el backend
    const [likedPosts, setLikedPosts] = useState({});
    const [commentsVisibility, setCommentsVisibility] = useState({});
    const [commentsByPost, setCommentsByPost] = useState({});
    const [error, setError] = useState(null);

    // Cargar posts según el tipo de consulta
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let fetchedPosts;
                switch (fetchType) {
                    case 'all': // Todos los posts (para Home)
                        fetchedPosts = await getAllPosts();
                        break;
                    case 'user': // Posts del usuario actual (para PostsPage)
                        fetchedPosts = await getPostsByUser(user.name);
                        break;
                    case 'liked': // Posts "likeados" por el usuario (para LikesPage)
                        fetchedPosts = await getPostsLikedByUser(user.name);
                        break;
                    default:
                        throw new Error('Tipo de consulta inválido');
                }
                setPosts(fetchedPosts); // Guarda los posts en el estado
                setLikedPosts(
                    fetchedPosts.reduce((acc, post) => ({
                        ...acc,
                        [post.id]: { liked: post.isLiked || false, likesCount: post.likesCount || 0 },
                    }), {})
                );
            } catch (err) {
                console.error('Error al cargar los posts:', err);
                setError('No hay posts para mostrar');
            }
        };

        fetchPosts();
    }, [fetchType, user.name]);

    // Maneja el evento de "like" en un post específico
    const handleLike = (postId) => {
        setLikedPosts((prevLikedPosts) => {
            const isLiked = prevLikedPosts[postId].liked;
            const newLikesCount = isLiked 
                ? prevLikedPosts[postId].likesCount - 1 
                : prevLikedPosts[postId].likesCount + 1;

            return {
                ...prevLikedPosts,
                [postId]: { liked: !isLiked, likesCount: newLikesCount },
            };
        });
    };

    // Llama al backend para cargar los comentarios de un post específico
    const fetchCommentsForPost = async (postId) => {
        try {
            const comments = await getCommentsByPostId(postId);
            setCommentsByPost((prev) => ({
                ...prev,
                [postId]: comments,
            }));
        } catch (error) {
            console.error(`Error al cargar los comentarios para el post ${postId}:`, error);
        }
    };

    // Alterna la visibilidad de los comentarios de un post
    const toggleComments = (postId) => {
        setCommentsVisibility((prevVisibility) => ({
            ...prevVisibility,
            [postId]: !prevVisibility[postId],
        }));

        if (!commentsVisibility[postId]) {
            fetchCommentsForPost(postId);
        }
    };

    // Renderizado condicional en caso de error
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
                    {/* Información del usuario y la fecha del post */}
                    <div className="d-flex justify-content-between mb-3">
                        <span>{post.user}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-center">{post.titulo}</h4>
                    
                    {/* Imagen del post */}
                    <div className="text-center mb-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img 
                            src={`http://localhost:3000${post.imagen}`}
                            alt="post visual" 
                            style={{ 
                                width: '300px',
                                height: '300px',
                                objectFit: 'cover'
                            }} 
                        />
                    </div>

                    <p>{post.descripcion}</p>

                    {/* Sección de likes y botón para comentarios */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <span className="me-2">{likedPosts[post.id]?.likesCount}</span>
                            <FaHeart
                                onClick={() => handleLike(post.id)}
                                style={{ color: likedPosts[post.id]?.liked ? 'red' : 'gray', cursor: 'pointer' }}
                                size={24}
                            />
                        </div>

                        <button className="btn btn-light" onClick={() => toggleComments(post.id)}>
                            {commentsVisibility[post.id] ? "Ocultar Comentarios" : "Mostrar Comentarios"}
                        </button>
                    </div>

                    {/* Renderiza los comentarios del post si están visibles */}
                    {commentsVisibility[post.id] && (
                        <div className="comments-section mt-3">
                            <h5>Comentarios:</h5>
                            {commentsByPost[post.id] ? (
                                commentsByPost[post.id].map((comment) => (
                                    <div key={comment.id} className="comment mt-2 p-2 border border-secondary">
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bold">{comment.user}</span>
                                            <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="mt-2">{comment.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No hay ningun comentario aun</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostList;
